export class Preloader extends Phaser.Scene {
    private test: integer | undefined;
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: [
                    {type: 'image', key: 'shipTest', url: './assets/spritesheets/shipTest.png'},
                    {type: 'image', key: 'shotTest', url: './assets/spritesheets/shotTest.png'},
                    {type: 'image', key: 'healthTest', url: './assets/spritesheets/healthTest.png'},
                ]
            }
        });
    }

    create() {
        this.scene.start('main');
    }
}