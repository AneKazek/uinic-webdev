import Phaser from 'phaser';
export class FocusPopScene extends Phaser.Scene {
  score = 0; timeLeft = 30_000; lastSpawn = 0; spawnEvery = 900; targetKey = '◎';
  constructor(){ super('FocusPop'); }
  create(){
    this.cameras.main.setBackgroundColor('#0a0a0a');
    this.add.text(360, 80, 'Focus Pop — Tap target ◎', { fontSize:'24px' }).setOrigin(0.5);
    this.score = 0; this.timeLeft = 30_000; this.lastSpawn = 0;
  }
  spawn(){
    const x = Phaser.Math.Between(80, 640); const y = Phaser.Math.Between(200, 1150);
    const good = Math.random() < 0.6; const txt = this.add.text(x, y, good?this.targetKey:'○', { fontSize:'42px' }).setOrigin(0.5);
    txt.setInteractive({ useHandCursor: true }).on('pointerdown', ()=>{
      if (good) { this.score += 100; txt.setTint(0x22c55e); } else { this.score = Math.max(0, this.score-50); txt.setTint(0xef4444); }
      this.tweens.add({ targets: txt, alpha: 0, duration: 200, onComplete:()=>txt.destroy() });
    });
    this.tweens.add({ targets: txt, alpha: 0, delay: 700, duration: 300, onComplete:()=>txt.destroy() });
  }
  update(t:number, dt:number){
    this.timeLeft -= dt; if (this.timeLeft <= 0) return this.finish();
    if (t - this.lastSpawn > this.spawnEvery) { this.lastSpawn = t; this.spawn(); }
  }
  finish(){
    window.dispatchEvent(new CustomEvent('game:session_end', { detail: { kind:'focus', score: this.score, seconds: 30 } }));
    this.scene.start('Alchemist');
  }
}