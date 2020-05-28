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

        this.scene.launch('menu');
        this.scene.launch('gameHud');

        this.scene.moveAbove('gameHud', 'menu');
    }

    preload(){
        this.load.audio("playerShoot", "./assets/audio/shoot.wav");
        this.load.audio("playerKilled", "./assets/audio/explosion.wav");
        this.load.audio("enemyKilled", "./assets/audio/invaderkilled.wav");
    }
}