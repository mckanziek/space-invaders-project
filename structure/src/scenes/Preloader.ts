export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    {type: 'image', key: 'shipTest', url: './assets/spritesheets/shipTest.png'},
                    {type: 'image', key: 'shotTest', url: './assets/spritesheets/shotTest.png'},
                    {type: 'image', key: 'healthTest', url: './assets/spritesheets/healthTest.png'},
                ]
            }
        });
    }

    init() {
        this.scene.start('main');
    }

    preload(){
        this.load.audio("playerShoot", "./assets/audio/shoot.wav");
    }
}