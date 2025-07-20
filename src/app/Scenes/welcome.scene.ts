export class WelcomeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'welcome' });
  }

  preload() {
    this.load.image('bg', 'assets/images/bg.png');
    this.load.image('title', 'assets/images/game_title.png');
    this.load.image('button', 'assets/images/start_button.png');
    this.load.image('button2', 'assets/images/tutorial_button.png');
    this.load.image('dog_house', 'assets/images/dog_house.png');
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
    this.load.spritesheet('dog_yawn', 'assets/sprites/dog_yawn.png', {
      frameWidth: 320,
      frameHeight: 270,
      endFrame: 48
    });
    this.load.spritesheet('bubbles', 'assets/sprites/bubbles.png', {
      frameWidth: 300,
      frameHeight: 600,
      endFrame: 106
    });

    this.load.audio('welcome_bg', 'assets/audio/welcome_bg.mp3');
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2 - 100;

    this.sound.add('welcome_bg').play();
    this.createBackground();
    this.createAnimations();
    this.createUI(centerX, centerY);
    this.textures.get('cat_idle').setFilter(Phaser.Textures.FilterMode.NEAREST);
    // this.textures.get('cat_box').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.catIdleSprite();
    this.dogYawnSprite();
  }

  createBackground() {
    this.add.image(0, 0, 'bg')
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.add.image(840,220, 'dog_house').setScale(.7);
  }

  createUI(centerX: number, centerY: number) {
    const title = this.add.image(centerX, centerY - 30, 'title')
      .setDisplaySize(700, 380);

    const button = this.add.image(centerX, centerY + 50, 'button')
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });


    const button2 = this.add.image(centerX, centerY + 110, 'button2')
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });

    this.tweens.add({
      targets: title,
      y: title.y - 10,
      scale: 0.8,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.setupButtonHover(button);
    this.setupButtonHover(button2);

    this.add.sprite(70, 540, 'cat_box')
      .setScale(1.7)
      .setFlipX(true)
      .play('box');

    // this.add.sprite(0, 0, 'leaves')
    //   .setOrigin(0, 0)
    //   .setDisplaySize(this.scale.width, this.scale.height)
    //   .play('fall');
  }

  setupButtonHover(button: Phaser.GameObjects.Image) {
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
  }

  createAnimations() {
    this.anims.create({
      key: 'box',
      frames: this.anims.generateFrameNumbers('cat_box', { start: 1, end: 6 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('leaves', { start: 0, end: 24 }),
      frameRate: 14,
      repeat: -1
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('cat_idle', {
        frames: [1, 1, 1, 2, 2, 3, 3, 3, 12, 12, 12, 12]
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

    this.anims.create({
      key: 'yawn',
      frames: this.anims.generateFrameNumbers('dog_yawn', {
        start: 0,
        end: 47
      }),
      frameRate: 24,
      repeat: 0
    });

    this.anims.create({
      key: 'bubble',
      frames: this.anims.generateFrameNumbers('bubbles', {
        start: 0,
        end: 105
      }),
      frameRate: 48,
      repeat: 0
    });
  }

  catIdleSprite() {
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

  dogYawnSprite() {
    const dog = this.add.sprite(750, 240, 'dog_yawn')
      .setScale(.7)
      .play('yawn');

    const bubble = this.add.sprite(670, 250, 'bubbles')
      .setScale(.2)
      .setVisible(false);

    const playBubbleAfterYawn = () => {
      dog.once('animationcomplete-yawn', () => {
        this.time.delayedCall(1000, () => {
          bubble.setVisible(true).play('bubble');
        });

        this.time.delayedCall(8000, () => {
          dog.play('yawn');
          bubble.setVisible(false);
          playBubbleAfterYawn();
        });
      });
    };

    playBubbleAfterYawn();
  }
}
