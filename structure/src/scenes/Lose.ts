import {GameHud} from "./GameHud";
import {Main} from "./Main";

export class Lose extends Phaser.Scene {
    private camera: any;

    private messageLabel: any;
    private scoreLabel: any;

    private buttonRestart: any;
    private buttonMenu: any;

    constructor() {
        super({key: "loseScreen"});
    }

    init(){
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)')
    }

    create() {
        let score = (this.scene.get('gameHud') as GameHud).getScore()

        this.messageLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 3.6, "Hai perso bitch",
            {font: '77px arc-font', fill: '#ff0000'}
        ).setOrigin(0.5);

        this.scoreLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 4.4, "Punteggio: " + score,
            {font: '55px arc-font', fill: '#ff0000'}
        ).setOrigin(0.5);

        this.buttonRestart = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 5.8, "Nuova partita",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonRestart.setColor('#30db16'))
            .on('pointerout', () => this.buttonRestart.setColor('#dbba16'))
            .on('pointerdown', ()=> this.buttonRestart.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonRestart.setFont('44px arc-font');

                this.scene.stop('loseScreen');

                (this.scene.get('gameHud') as GameHud).initPlayerHealth();
                (this.scene.get('main') as Main).scene.restart();
            });

        this.buttonMenu = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 6.6, "Menu",
            {font: '44px arc-font', fill: '#dbba16'}
        ).setOrigin(0.5)
            .setInteractive()
            .on('pointerover', () => this.buttonMenu.setColor('#30db16'))
            .on('pointerout', () => this.buttonMenu.setColor('#dbba16'))
            .on('pointerdown', ()=> this.buttonMenu.setFont('38px arc-font'))
            .on('pointerup', () => {
                this.buttonMenu.setFont('44px arc-font');

                this.scene.stop('loseScreen');

                this.scene.start('menu');
            });
    }

}