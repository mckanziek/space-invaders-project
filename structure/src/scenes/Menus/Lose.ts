import {GameHud} from "../GameHud";
import {Main} from "../Main";

import {Button} from '../../gameObjs/CustomObjs/Button';

export class Lose extends Phaser.Scene {
    private camera: Phaser.Cameras.Scene2D.CameraManager | any;

    private messageLabel: Phaser.GameObjects.Text | any;
    private scoreLabel: Phaser.GameObjects.Text | any;

    private buttonRestart: Button | any;
    private buttonMenu: Button | any;

    constructor() {
        super({key: "loseScreen"});
    }

    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)');
    }

    create() {
        let centerX = this.sys.canvas.width / 2;

        let gameMode = (this.scene.get('gameHud') as GameHud).getGameMode();
        let score = (this.scene.get('gameHud') as GameHud).getScore();

        this.messageLabel = this.add.text(centerX, this.sys.canvas.height / 10 * 3.6, "Hai perso bitch",
            {font: '77px arc-font', fill: '#ff0000'}
        ).setOrigin(0.5);

        this.scoreLabel = this.add.text(centerX, this.sys.canvas.height / 10 * 4.4, "Punteggio: " + score,
            {font: '55px arc-font', fill: '#ff0000'}
        ).setOrigin(0.5);

        this.buttonRestart = new Button(this, centerX, this.sys.canvas.height / 10 * 5.8, "Nuova partita", 44,
            () => {
                this.scene.stop('loseScreen');
                (this.scene.get('gameHud') as GameHud).initPlayerHealth(gameMode, 0);
                (this.scene.get('main') as Main).scene.restart();
            }
        );

        this.buttonMenu = new Button(this, centerX, this.sys.canvas.height / 10 * 6.6, "Menu", 44,
            () => {
                this.scene.stop('loseScreen');
                this.scene.start('menu');
            }
        );
    }
}