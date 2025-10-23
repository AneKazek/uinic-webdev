import Phaser from 'phaser';
export class BossRushScene extends Phaser.Scene {
  hp = 100; round = 1; maxRounds = 4;
  thought = 'Aku pasti gagal dan semua orang akan tahu aku bodoh.';
  distortions = ['Catastrophizing','Mind Reading','All‑or‑Nothing'];
  templates = [
    'Aku tidak bisa memprediksi hasil. Aku sudah belajar X, dan bisa perbaiki Y.',
    'Satu ujian tidak menentukan diriku. Aku fokus pada langkah berikutnya.'
  ];
  constructor(){ super('BossRush'); }
  create(){
    this.cameras.main.setBackgroundColor('#0a0a0a');
    this.add.text(360, 80, `Boss Rush — Ronde ${this.round}/${this.maxRounds}`, { fontSize:'22px' }).setOrigin(0.5);
    const hpBg = this.add.rectangle(360, 110, 520, 12, 0x222222).setOrigin(0.5);
    const hpFg = this.add.rectangle(200, 110, 520, 12, 0x22c55e).setOrigin(0,0.5);
    this.events.on('hp', ()=>{ hpFg.width = 520 * (this.hp/100); });

    this.add.rectangle(360, 190, 680, 100, 0x111111).setStrokeStyle(1,0x444444);
    this.add.text(360, 190, '"'+this.thought+'"', { fontSize:'18px', wordWrap:{ width:640 } }).setOrigin(0.5);

    let y=300; this.add.text(360, y-24, '1) Distorsi?', { fontSize:'16px', color:'#aaa' }).setOrigin(0.5);
    this.distortions.forEach((d,i)=>{
      const r = this.add.rectangle(360, y+i*50, 380, 40, 0x312e81).setInteractive();
      this.add.text(360, y+i*50, d, { fontSize:'16px' }).setOrigin(0.5);
      r.on('pointerup', ()=> r.setFillStyle(0x4338ca));
    });

    y = 520; this.add.text(360, y-24, '2) Reframe (pilih template)', { fontSize:'16px', color:'#aaa' }).setOrigin(0.5);
    this.templates.forEach((t,i)=>{
      const r = this.add.rectangle(360, y+i*70, 680, 56, 0x14532d).setInteractive();
      this.add.text(360, y+i*70, t, { fontSize:'16px', wordWrap:{ width:640 } }).setOrigin(0.5);
      r.on('pointerup', ()=> this.counter(t.length));
    });
  }
  counter(len:number){
    const quality = Math.min(3, Math.floor(len/40));
    const dmg = 10 + quality*10; this.hp = Math.max(0, this.hp - dmg); this.events.emit('hp');
    this.cameras.main.shake(120, 0.003);
    if (this.hp<=0 || this.round>=this.maxRounds) return this.finish();
    this.round++; this.scene.restart();
  }
  finish(){
    window.dispatchEvent(new CustomEvent('game:session_end', { detail: { kind:'boss', score: 100 - this.hp, seconds: this.round*20 } }));
    this.scene.start('Alchemist');
  }
}