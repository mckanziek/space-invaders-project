export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    {type: 'image', key: 'playerSprt0', url: './assets/spritesheets/shipTest.png'},
                    {type: 'image', key: 'playerSprt1', url: './assets/spritesheets/doggo.png'},
                    {type: 'image', key: 'playerHealthSprt0', url: './assets/spritesheets/healthTest.png'},
                    {type: 'image', key: 'playerHealthSprt1', url: './assets/spritesheets/meal.png'},
                    {type: 'image', key: 'shotSprt0', url: './assets/spritesheets/shotTest.png'},
                    {type: 'image', key: 'shotSprt1', url: './assets/spritesheets/potato.png'},
                ]
            }
        });
    }

    init(){
        this.scene.start('main', {gameMode: 0});
        this.scene.pause('main');

        this.scene.launch('scores');
        this.scene.stop('scores');

        this.scene.launch('menu');
        this.scene.launch('gameHud');

        this.scene.moveAbove('gameHud', 'menu');
        this.scene.moveAbove('gameHud', 'pauseMenu');
    }

    preload(){
        this.load.audio("playerShoot", "./assets/audio/shoot.wav");
        this.load.audio("playerKilled", "./assets/audio/explosion.wav");
        this.load.audio("enemyKilled", "./assets/audio/invaderkilled.wav");

        this.load.spritesheet('alien00', './assets/spritesheets/verde.png', { frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('alien10', './assets/spritesheets/arancione.png', { frameWidth: 55, frameHeight: 45});
        this.load.spritesheet('alien20', './assets/spritesheets/viola.png', { frameWidth: 55, frameHeight: 45});
    }

    create(){
        this.anims.create({key: 'move00', frames: this.anims.generateFrameNumbers('alien00', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move10', frames: this.anims.generateFrameNumbers('alien10', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move20', frames: this.anims.generateFrameNumbers('alien20', {start: 0, end: 2}), frameRate: 2, repeat: -1});
    }
}