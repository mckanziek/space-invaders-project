import {GameHud} from "../GameHud";
import {Main} from "../Main";

import {Button} from "../../gameObjs/CustomObjs/Button";

export class Menu extends Phaser.Scene {
    private camera: any;

    private titleLabel: any;
    private descriptionLabel: any;

    private buttonStartNormal: any;
    private buttonStartWeird: any;
    private buttonScore: any;

    constructor() {
        super({key: "menu"});
    }

    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)');

        this.events.emit('updateScores');
    }

    create() {
        let centerX = this.sys.canvas.width / 2;

        this.titleLabel = this.add.text(centerX, this.sys.canvas.height / 10 * 3.6, "Space Invaders",
            {font: '88px arc-font', fill: '#fff'}
        ).setOrigin(0.5);

        this.descriptionLabel = this.add.text(centerX, this.sys.canvas.height / 10 * 4.4, "- Progetto finale scolastico -",
            {font: '40px arc-font', fill: '#fff'}
        ).setOrigin(0.5);

        this.buttonStartNormal = new Button(this, centerX, this.sys.canvas.height / 10 * 5.8, "Modalità normale", 44,
            () => {
                this.scene.stop('menu');
                (this.scene.get('main') as Main).scene.restart({gameMode: 0});
                (this.scene.get('gameHud') as GameHud).initPlayerHealth(0, 0);
            }
        );

        this.buttonStartWeird = new Button(this, centerX, this.sys.canvas.height / 10 * 6.6, "Modalità aggiuntiva", 44,
            () => {
                this.scene.stop('menu');
                (this.scene.get('main') as Main).scene.restart({gameMode: 1});
                (this.scene.get('gameHud') as GameHud).initPlayerHealth(1, 0);
            }
        );

        this.buttonScore = new Button(this, centerX, this.sys.canvas.height / 10 * 7.4, "Punteggi", 44,
            () => {
                this.scene.stop('menu');
                this.events.emit('updateScores');
                this.scene.start('scores');
            }
        );
    }
}