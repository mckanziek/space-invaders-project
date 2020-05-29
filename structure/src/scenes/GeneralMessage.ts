import {GameHud} from "./GameHud";
import {Main} from "./Main";

export class GeneralMessage extends Phaser.Scene {
    private camera: any;

    private gameRound = 1;

    private messageLabel: any;
    private buttonMenu: any;

    constructor() {
        super({key: "generalMessage"});
    }

    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)');
    }

    create() {
        this.scene.moveUp('generalMessage');

        let gameMode = (this.scene.get('gameHud') as GameHud).getGameMode();
        let score = (this.scene.get('gameHud') as GameHud).getScore();

        let message;
        let messageY;
        let color;

        if(this.gameRound != 3){
            message = "Round " + ++this.gameRound;
            messageY = 5;
            color = '#347deb';
        }else{
            message = "Hai vinto!!!";
            messageY = 4.7;
            color = '#30db16';
        }

        this.messageLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * messageY, message,
            {font: '88px arc-font', fill: color}
        ).setOrigin(0.5);

        if(message == "Hai vinto!!!") {
            this.buttonMenu = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 5.8, "Menu",
                {font: '44px arc-font', fill: '#dbba16'}
            ).setOrigin(0.5)
                .setInteractive()
                .on('pointerover', () => this.buttonMenu.setColor('#30db16'))
                .on('pointerout', () => this.buttonMenu.setColor('#dbba16'))
                .on('pointerdown', () => this.buttonMenu.setFont('38px arc-font'))
                .on('pointerup', () => {
                    this.buttonMenu.setFont('44px arc-font');

                    this.scene.start('menu');
                });
            (this.scene.get('gameHud') as GameHud).pushScore();
            this.gameRound = 1;
        }else{
            let scene = this.scene;
            setTimeout(function () {
                scene.stop('generalMessage');
            }, 1555);

            (this.scene.get('gameHud') as GameHud).initPlayerHealth(gameMode, score);
            (this.scene.get('main') as Main).scene.restart();
        }
    }
}