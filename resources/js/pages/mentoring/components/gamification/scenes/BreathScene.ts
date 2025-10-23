import Phaser from 'phaser';
export class BreathScene extends Phaser.Scene {
  duration = { inhale:4000, hold:4000, exhale:6000 };
  constructor(){ super('Breath'); }
  create(data:{ labelKey?: string }){
    this.cameras.main.setBackgroundColor('#07130b');
    this.add.text(360, 120, 'Breathe 4‑4‑6', { fontSize:'28px' }).setOrigin(0.5);
    const c = this.add.circle(360, 640, 80, 0x22c55e);
    const guide = this.add.text(360, 720, 'Hirup…', { fontSize:'22px', color:'#aaffc3' }).setOrigin(0.5);

    const cycle = async ()=>{
      guide.setText('Hirup…'); await this.tween(c, { scale: 1.8, duration: this.duration.inhale });
      guide.setText('Tahan…'); await this.delay(this.duration.hold);
      guide.setText('Hembus…'); await this.tween(c, { scale: 1.0, duration: this.duration.exhale });
    };

    let loops = 3; const run = async ()=>{ while(loops--) await cycle(); this.finish(); };
    run();
  }
  tween(target:Phaser.GameObjects.GameObject, cfg:Phaser.Types.Tweens.TweenBuilderConfig){
    return new Promise(res=> this.tweens.add({ ...cfg, targets: target, onComplete:()=>res(null) }));
  }
  delay(ms:number){ return new Promise(res=> setTimeout(res, ms)); }
  finish(){
    window.dispatchEvent(new CustomEvent('game:session_end', { detail: { kind:'breathe', seconds: 3*14 } }));
    this.scene.start('Alchemist');
  }
}