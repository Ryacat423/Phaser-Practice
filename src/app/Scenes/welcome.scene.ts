export class WelcomeScene extends Phaser.Scene {
  
  constructor() {
    super({key: 'welcome'})
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const bg_music = this.sound.add('welcome_bg');
    bg_music.play();
    this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);
    
    const title = this.add.image(centerX, centerY - 30, 'title')
      .setDisplaySize(700,380);
    const button = this.add.image(centerX, centerY + 50, 'button')
      .setScale(.2)

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
        scale: 0.27,
        duration: 100,
        ease: 'Power1'
      });
    });

    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scale: 0.2,
        duration: 100,
        ease: 'Power1'
      });
    });

    this.anims.create({
      key: 'box',
      frames: this.anims.generateFrameNumbers('cat_box', {
        frames: [1,2,3,4,5,6]
      }),
      frameRate: 6,
      repeat: -1
    });
    this.add.sprite(70, 530, 'cat_box')
      .setScale(1.7)
      .setFlipX(true)
      .play('box');
    
    this.anims.create({
      key: 'heart',
      frames: this.anims.generateFrameNumbers('cat_love', {
        start: 0,
        end: 43
      }),
      frameRate: 12,
      repeat: -1
    });
  
    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('leaves', {
        start: 0,
        end: 24
      }),
      frameRate: 14,
      repeat: -1
    });

    // this.add.sprite(0,0, 'leaves')
    //   .setOrigin(0, 0)
    //   .setDisplaySize(this.scale.width, this.scale.height)
    //   .play('fall');
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

    this.load.spritesheet('leaves', 'assets/sprites/leaves.png', {
      frameWidth: 312,
      frameHeight: 224,
      endFrame: 25
    });

    // this.load.spritesheet('cat_love', 'assets/sprites/cat_love.png', {
    //   frameWidth: 400,
    //   frameHeight: 400,
    //   endFrame: 44
    // });

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

    const cat = this.add.sprite(805, 550, 'cat_idle')
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