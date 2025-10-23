import Phaser from 'phaser';
import { useGameStore } from '../store/gameStore';

type P = { v:number; a:number };
const EMO: Record<string,P> = {
  cemas:{v:-0.6,a:0.6}, sedih:{v:-0.7,a:-0.4}, marah:{v:-0.6,a:0.7},
  malu:{v:-0.5,a:0.3}, kecewa:{v:-0.5,a:-0.1}, lelah:{v:-0.2,a:-0.6}
};
const LABELS: Record<string,P> = {
  gelisah:{v:-0.5,a:0.5}, panik:{v:-0.8,a:0.9}, murung:{v:-0.7,a:-0.4},
  kesal:{v:-0.4,a:0.5}, marah_besar:{v:-0.7,a:0.8}, kecewa_lbl:{v:-0.5,a:-0.1},
  putus_asa:{v:-0.8,a:-0.6}, terganggu:{v:-0.3,a:0.2}, canggung:{v:-0.4,a:0.3},
  pasrah:{v:-0.4,a:-0.5}, tenang:{v:0.6,a:-0.6}
};

export class AlchemistScene extends Phaser.Scene {
  weights: Record<string, number> = { cemas:40, sedih:30, marah:30 };
  vaBox?: Phaser.GameObjects.Rectangle; vaDot?: Phaser.GameObjects.Arc;
  constructor(){ super('Alchemist'); }

  create(){
    const reduced = useGameStore.getState().reducedMotion;
    this.cameras.main.setBackgroundColor('#0a0a0a');
    this.add.text(360, 80, 'Emotion Alchemist', { fontSize:'24px', color:'#fff' }).setOrigin(0.5);
    this.add.text(360, 114, 'Campur 2–3 essence hingga 100%', { fontSize:'16px', color:'#aaa' }).setOrigin(0.5);

    // Perbesar kotak VA dan titik
    this.vaBox = this.add.rectangle(360, 300, 280, 280, 0x111111).setStrokeStyle(1,0x444444);
    this.vaDot = this.add.circle(360, 300, 10, 0x22c55e);

    const mkSlider = (x:number,y:number,key:string)=>{
      const SLIDER_W = 640; const HALF = SLIDER_W/2;
      const line = this.add.rectangle(x,y,SLIDER_W,8,0x333333).setOrigin(0.5);
      const knob = this.add.circle(x-HALF+(this.weights[key]/100)*SLIDER_W, y, 18, 0x6d28d9).setInteractive({draggable:true});
      this.input.setDraggable(knob);
      knob.on('drag', (_p:Phaser.Input.Pointer, nx:number)=>{
        const clamped = Phaser.Math.Clamp(nx, x-HALF, x+HALF); knob.x = clamped;
        this.weights[key] = Math.round(((clamped-(x-HALF))/SLIDER_W)*100); this.renderVA();
      });
      this.add.text(x-HALF-40,y-16,key.toUpperCase(),{fontSize:'16px', color:'#ddd'});
      return { line, knob };
    };

    mkSlider(360, 520, 'cemas');
    mkSlider(360, 600, 'sedih');
    mkSlider(360, 680, 'marah');

    const startBtn = this.add.rectangle(360, 760, 360, 52, 0x4338ca).setInteractive();
    startBtn.on('pointerup', ()=> this.showSuggestions());
    this.add.text(360, 760, 'Lanjut → Beri Nama', { fontSize:'18px' }).setOrigin(0.5);

    this.renderVA();
    if (reduced) this.tweens.setGlobalTimeScale(0.8);
  }

  private mixVA(){
    const sum = Object.values(this.weights).reduce((a,b)=>a+b,0)||1; let V=0,A=0;
    for(const [k,w] of Object.entries(this.weights)) { const e=EMO[k]; V+= (w/sum)*e.v; A+= (w/sum)*e.a; }
    return {V,A};
  }
  private renderVA(){
    const {V,A} = this.mixVA();
    if(this.vaDot){ this.vaDot.x = 360 + V*120; this.vaDot.y = 300 - A*120; }
  }
  private showSuggestions(){
    const {V,A} = this.mixVA(); const dist=(p:P)=>Math.hypot(V-p.v, A-p.a);
    const sorted = Object.entries(LABELS).sort((a,b)=>dist(a[1])-dist(b[1])).slice(0,3);
    let y=820; this.add.text(360, 786, 'Pilih label terdekat:', {fontSize:'16px', color:'#aaa'}).setOrigin(0.5);
    sorted.forEach(([key,p])=>{
      const btn = this.add.rectangle(360,y,420,52,0x14532d).setInteractive().on('pointerup',()=> this.startIntervention(key));
      this.add.text(360,y, `${key.replace('_',' ')}`, {fontSize:'18px'}).setOrigin(0.5);
      y+=62;
    });
  }
  private startIntervention(labelKey:string){
    this.scene.start('Breath', { labelKey });
  }
}