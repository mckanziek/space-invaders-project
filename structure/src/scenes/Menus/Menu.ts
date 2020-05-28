import {GameHud} from "../GameHud";
import {Main} from "../Main";

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
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)')
    }

    create() {
        this.titleLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 3.6, "Space Invaders",
            {font: '88px arc-font', fill: '#fff'}
        ).setOrigin(0.5);

        this.descriptionLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 4.4, "- Progetto finale scolastico -",
            {font: '40px arc-font', fill: '#fff'}
        ).setOrigin(0.5);


        this.buttonStartNormal = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 5.8, "Modalità normale",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonStartNormal.setColor('#30db16'))
            .on('pointerout', () => this.buttonStartNormal.setColor('#dbba16'))
            .on('pointerdown', () => this.buttonStartNormal.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonStartNormal.setFont('44px arc-font');

                this.scene.stop('menu');

                (this.scene.get('main') as Main).scene.restart({gameMode: 0});
                (this.scene.get('gameHud') as GameHud).initPlayerHealth(0);
            });

        this.buttonStartWeird = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 6.6, "Modalità aggiuntiva",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonStartWeird.setColor('#30db16'))
            .on('pointerout', () => this.buttonStartWeird.setColor('#dbba16'))
            .on('pointerdown', () => this.buttonStartWeird.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonStartWeird.setFont('44px arc-font');

                this.scene.stop('menu');

                (this.scene.get('main') as Main).scene.restart({gameMode: 1});
                (this.scene.get('gameHud') as GameHud).initPlayerHealth(1);
            });

        this.buttonScore = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 7.4, "Punteggi",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonScore.setColor('#30db16'))
            .on('pointerout', () => this.buttonScore.setColor('#dbba16'))
            .on('pointerdown', () => this.buttonScore.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonScore.setFont('44px arc-font');
            });
    }
}