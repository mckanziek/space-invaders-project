export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    {type: 'image', key: 'shipTest', url: './assets/spritesheets/shipTest.png'},
                ]
            }
        });
    }

    create() {
        this.scene.start('main');
    }
}