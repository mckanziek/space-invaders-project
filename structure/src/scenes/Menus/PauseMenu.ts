export class PauseMenu extends Phaser.Scene {
    private camera: any;

    private tittleLabel: any;

    private buttonResume: any;
    private buttonMenu: any;

    constructor() {
        super({key: "pauseMenu"});
    }

    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 0.75)')
    }

    create() {
        this.tittleLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 3.6, "Gioco in pausa",
            {font: '88px arc-font', fill: '#fff'}
        ).setOrigin(0.5);

        this.buttonResume = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 5.8, "Continua",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonResume.setColor('#30db16'))
            .on('pointerout', () => this.buttonResume.setColor('#dbba16'))
            .on('pointerdown', () => this.buttonResume.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonResume.setFont('44px arc-font');

                this.scene.stop('pauseMenu');

                this.scene.resume('main');
            });

        this.buttonMenu = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 6.6, "Menu",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonMenu.setColor('#30db16'))
            .on('pointerout', () => this.buttonMenu.setColor('#dbba16'))
            .on('pointerdown', () => this.buttonMenu.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonMenu.setFont('44px arc-font');

                this.scene.stop('pauseMenu');

                this.scene.start('menu');
            });
    }
}