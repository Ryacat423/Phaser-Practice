export class WelcomeScene extends Phaser.Scene {
  
  constructor() {
    super({key: 'welcome'})
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const bg_music = this.sound.add('welcome_bg');
    // bg_music.play({ volume: 0, loop: true });
    // this.tweens.add({
    //   targets: bg_music,
    //   volume: .3,
    //   duration: 2000
    // });
    
    this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);
    
    const title = this.add.image(centerX, centerY - 30, 'title')
      .setDisplaySize(700,380);
    const button = this.add.image(centerX, centerY + 50, 'button')
      .setScale(.3)

    this.catIdleSprite();
    this.tweens.add({
      targets: title,
      y: title.y - 10,
      scale: .8,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    button.setInteractive({ useHandCursor: true });
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scale: 0.35,
        duration: 100,
        ease: 'Power1'
      });
    });

    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scale: 0.3,
        duration: 100,
        ease: 'Power1'
      });
    });

    this.anims.create({
      key: 'box',
      frames: this.anims.generateFrameNumbers('cat_box', {
        frames: [1,2,3,4,5,6]
      }),
      frameRate: 12,
      repeat: -1
    });
    this.add.sprite(70, 530, 'cat_box')
      .setScale(1.7)
      .setFlipX(true)
      .play('box');
    
  }

  preload() {
    this.load.image('bg', 'assets/images/bg.png');
    this.load.image('title', 'assets/images/game_title.png');
    this.load.image('button', 'assets/images/start_button.png');
    this.load.spritesheet('cat_idle', 'assets/sprites/cat_idle.png', {
      frameWidth: 125,
      frameHeight: 150,
      endFrame: 12
    });

    this.load.spritesheet('cat_box', 'assets/sprites/cat_hide_box.png', {
      frameWidth: 125,
      frameHeight: 150,
      endFrame: 6
    });

    this.load.audio('welcome_bg', 'assets/audio/welcome_bg.mp3');
  }

  catIdleSprite() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('cat_idle', {
        frames: [
          1,1,1,
          2,2,
          3,3,3,
          12,12,12,12 
        ]
      }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'blink',
      frames: this.anims.generateFrameNumbers('cat_idle', {
        frames: [4, 5, 6, 7, 8, 5, 4]
      }),
      frameRate: 12,
      repeat: 0
    });

    const cat = this.add.sprite(705, 550, 'cat_idle')
      .setScale(1.8)
      .play('idle');
    const scheduleBlink = () => {
      this.time.delayedCall(Phaser.Math.Between(3000, 6000), () => {
        cat.play('blink');

        cat.once('animationcomplete-blink', () => {
          cat.play('idle');
          scheduleBlink();
        });
      });
    };

    scheduleBlink();
  }
}