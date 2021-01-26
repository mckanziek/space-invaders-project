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
                    {type: 'image', key: 'ufo0', url: './assets/spritesheets/enemies/ufo.png'},
                    {type: 'image', key: 'ufo1', url: './assets/spritesheets/enemies/alien.png'},

                    {type: 'image', key: 'shield0', url: './assets/spritesheets/shield/red.png'},
                    {type: 'image', key: 'shield1', url: './assets/spritesheets/shield/green.png'},
                    {type: 'image', key: 'shield2', url: './assets/spritesheets/shield/blue.png'},

                    {type: 'image', key: 'player0', url: './assets/spritesheets/player/player0.png'},
                    {type: 'image', key: 'player1', url: './assets/spritesheets/player/player1.png'},

                    {type: 'image', key: 'playerHealth0', url: './assets/spritesheets/health/healthTest.png'},
                    {type: 'image', key: 'playerHealth1', url: './assets/spritesheets/health/meal.png'},

                    {type: 'image', key: 'shot0', url: './assets/spritesheets/shot/shot.png'},
                    {type: 'image', key: 'shot1', url: './assets/spritesheets/shot/potato.png'},
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
        this.scene.sleep('main');

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
        this.load.audio("playerShoot0", "./assets/audio/shoot.wav");
        this.load.audio("playerShoot1", "./assets/audio/shoot1.wav");

        this.load.audio("playerDeath0", "./assets/audio/explosionPlayer.wav");
        this.load.audio("playerDeath1", "./assets/audio/explosionPlayer1.wav");

        this.load.audio("enemyKilled0", "./assets/audio/invaderkilled.wav");
        this.load.audio("enemyKilled1", "./assets/audio/invaderkilled1.wav");

        this.load.audio("ufo0", './assets/audio/ufo_lowpitch.wav');
        this.load.audio("ufo1", './assets/audio/ufo1.wav');

        this.load.spritesheet('alien00', './assets/spritesheets/enemies/verde.png', { frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('alien10', './assets/spritesheets/enemies/arancione.png', { frameWidth: 55, frameHeight: 45});
        this.load.spritesheet('alien20', './assets/spritesheets/enemies/viola.png', { frameWidth: 55, frameHeight: 45});

        this.load.spritesheet('alien01', './assets/spritesheets/enemies/alien1.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('alien11', './assets/spritesheets/enemies/alien2.png', { frameWidth: 100, frameHeight: 100});
        this.load.spritesheet('alien21', './assets/spritesheets/enemies/alien3.png', { frameWidth: 100, frameHeight: 100});
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per creare le animazioni degli sprite
     */
    create(){
        this.anims.create({key: 'move00', frames: this.anims.generateFrameNumbers('alien00', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move10', frames: this.anims.generateFrameNumbers('alien10', {start: 0, end: 2}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move20', frames: this.anims.generateFrameNumbers('alien20', {start: 0, end: 2}), frameRate: 2, repeat: -1});

        this.anims.create({key: 'move01', frames: this.anims.generateFrameNumbers('alien01', {start: 0, end: 0}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move11', frames: this.anims.generateFrameNumbers('alien11', {start: 0, end: 0}), frameRate: 2, repeat: -1});
        this.anims.create({key: 'move21', frames: this.anims.generateFrameNumbers('alien21', {start: 0, end: 0}), frameRate: 2, repeat: -1});
    }
}
