import { Component, OnInit } from '@angular/core';
import { Game } from 'phaser';
import Swal from 'sweetalert2';
import { WelcomeScene } from '../../Scenes/welcome.scene';

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
      width: 1000,
      scene: [ WelcomeScene ],
      parent: 'game',
      backgroundColor: "#18216D",
      pixelArt: true,
      physics: {
        default: 'arcade'
      }
    }
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}