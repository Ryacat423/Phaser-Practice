import { Component, OnInit } from '@angular/core';
import { Game } from 'phaser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  phaserGame!: Phaser.Game;
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

  start() {
    Swal.fire('Start?', 'No turning back after starting', 'question')
      .then(() => {
        Swal.fire('Jk MWEHEHEHEHEH😅', 'Just kidding!', 'warning');
      });
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({key: 'main'})
  }

  create() {
    console.log('create method');
    this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.anims.create({
      key: 'cat_tail',
      frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 11 }),
      frameRate: 8,
      repeat: -1
    });

    const cat = this.add.sprite(100, 100, 'cat');
    cat.anims.play('cat_tail');
    cat.setScale(4).setPosition(600, 500);
  }

  preload() {
    console.log('preload method');
    this.load.image('bg', 'assets/background.jpg');
    this.load.spritesheet('cat', '/assets/cat.png', {
      frameWidth: 32, 
      frameHeight: 32
    });
  }

  // override update() {
  //   console.log('update method');
  // }
}