/**
 * Classe figlia di Phaser.Scene
 *
 * Questa classe si occupa di caricare tutti gli assets che servono al gioco
 */
export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    {type: 'image', key: 'ufo', url: './assets/spritesheets/ufo.png'},

                    {type: 'image', key: 'shield0', url: './assets/spritesheets/red.png'},
                    {type: 'image', key: 'shield1', url: './assets/spritesheets/green.png'},
                    {type: 'image', key: 'shield2', url: './assets/spritesheets/blue.png'},

                    {type: 'image', key: 'player0', url: './assets/spritesheets/player0.png'},
                    {type: 'image', key: 'player1', url: './assets/spritesheets/player1.png'},

                    {type: 'image', key: 'playerHealthSprt0', url: './assets/spritesheets/healthTest.png'},
                    {type: 'image', key: 'playerHealthSprt1', url: './assets/spritesheets/meal.png'},

                    {type: 'image', key: 'shotSprt0', url: './assets/spritesheets/shotTest.png'},
                    {type: 'image', key: 'shotSprt1', url: './assets/spritesheets/potato.png'},
                ]
            }
        });
    }

    /**
     * Init è un metodo predefinito di tutti gli oggetti di Phaser
     * viene usato per inizializzare o creare componenti
     */
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

    /**
     * Preload è un metodo predefinito di tutti gli oggetti di Phaser
     * Qua viene usato per caricare gli audio e caricare gli sprite
     */
    preload(){
        this.load.audio("playerShoot", "./assets/audio/shoot.wav");
        this.load.audio("playerKilled", "./assets/audio/explosion.wav");
        this.load.audio("enemyKilled", "./assets/audio/invaderkilled.wav");
        this.load.audio("ufo", './assets/audio/ufo_lowpitch2.wav');

        this.load.spritesheet('alien00', './assets/spritesheets/verde.png', { frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('alien10', './assets/spritesheets/arancione.png', { frameWidth: 55, frameHeight: 45});
        this.load.spritesheet('alien20', './assets/spritesheets/viola.png', { frameWidth: 55, frameHeight: 45});

        this.load.spritesheet('alien01', './assets/spritesheets/verde.png', { frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('alien11', './assets/spritesheets/arancione.png', { frameWidth: 55, frameHeight: 45});
        this.load.spritesheet('alien21', './assets/spritesheets/viola.png', { frameWidth: 55, frameHeight: 45});
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per creare le animazioni degli sprite
     */
    create(){
        this.anims.create({key: 'move00', frames: this.anims.generateFrameNumbers('alien00', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move10', frames: this.anims.generateFrameNumbers('alien10', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move20', frames: this.anims.generateFrameNumbers('alien20', {start: 0, end: 2}), frameRate: 2, repeat: -1});

        this.anims.create({key: 'move01', frames: this.anims.generateFrameNumbers('alien01', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move11', frames: this.anims.generateFrameNumbers('alien11', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move21', frames: this.anims.generateFrameNumbers('alien21', {start: 0, end: 2}), frameRate: 2, repeat: -1});
    }
}