export class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
            pack: {
                files: []
            }
        });
    }

    create() {
        this.scene.start('main');
    }
}