import { Component, OnInit } from '@angular/core';
import { Game } from 'phaser';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  phaserGame: Phaser.Game = new Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [ MainScene ],
      parent: 'game',
      backgroundColor: "#18216D",
      physics: {
        default: 'arcade'
      }
    }
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'main'})
  }

  create() {
    console.log("create method");
  }

  preload() {
    console.log('preload method');
  }

  override update() {
    console.log('update method');
  }
}