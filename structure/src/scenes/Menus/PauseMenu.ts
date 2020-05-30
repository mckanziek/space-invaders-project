import {Button} from "../../gameObjs/CustomObjs/Button";

export class PauseMenu extends Phaser.Scene {
    private camera: Phaser.Cameras.Scene2D.CameraManager | any;

    private tittleLabel: Phaser.GameObjects.Text | any;

    private buttonResume: Button | any;
    private buttonMenu: Button | any;

    constructor() {
        super({key: "pauseMenu"});
    }

    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 0.75)');
    }

    create() {
        let centerX = this.sys.canvas.width / 2;

        this.tittleLabel = this.add.text(centerX, this.sys.canvas.height / 10 * 3.6, "Gioco in pausa",
            {font: '88px arc-font', fill: '#fff'}
        ).setOrigin(0.5);

        this.buttonResume = new Button(this, this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 5.8, "Continua", 44,
            () => {
                this.scene.stop('pauseMenu');
                this.scene.resume('main');
            }
        );

        this.buttonMenu = new Button(this, centerX, this.sys.canvas.height / 10 * 6.6, "Menu", 44,
            () => {
                this.scene.stop('pauseMenu');
                this.scene.start('menu');
            }
        );
    }
}