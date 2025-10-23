import Phaser from 'phaser';
export class BootScene extends Phaser.Scene {
  constructor(){ super('Boot'); }
  preload(){
    // preload minimal assets; extend later for atlas/audio
  }
  create(){
    this.add.text(360, 40, 'Hello Mind', { fontFamily: 'sans-serif', fontSize: '18px', color: '#aaa' }).setOrigin(0.5,0);
  }
}