import {GameHud} from "./GameHud";
import {Main} from "./Main";
import {Button} from "../gameObjs/CustomObjs/Button";

/**
 * Classe figlia di Phaser.Scene
 *
 * Questa classe serve per creare delle schermate con testi dinamici
 * di preciso per il passaggio tra un round all'altro
 */
export class GeneralMessage extends Phaser.Scene {
    /**
     * Camera viene usato peer focalizzare un punto nel gioco
     * in questo caso tuttta la scene per poi mettere un background
     * personalizzato
     */
    private camera: Phaser.Cameras.Scene2D.CameraManager | any;
    /**
     * GameRound è il riferimento del round attuale del gioco
     */
    private gameRound = 1;

    /**
     * MessageLabel è l'oggetto per l'inserimento di label nella scena
     * in questo caso il titolo principale
     */
    private messageLabel: Phaser.GameObjects.Text | any;
    /**
     * ButtonMenu è il bottone che serve per riportare al giocatore
     * nel menu principale
     */
    private buttonMenu: Button| any;

    constructor() {
        super({key: "generalMessage"});
    }

    /**
     * Init è un metodo predefinito di tutti gli oggetti di Phaser
     * viene usato per inizializzare o creare componenti
     */
    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)');
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per istanziare i testi e i bottoni della schermata
     * di quando si vince un round
     */
    create() {
        this.scene.moveUp('generalMessage');

        let gameMode = (this.scene.get('gameHud') as GameHud).getGameMode();
        let score = (this.scene.get('gameHud') as GameHud).getScore();

        let message;
        let messageY;
        let color;

        if (this.gameRound != 3) {
            message = "Round " + ++this.gameRound;
            messageY = 5;
            color = '#347deb';
        } else {
            message = "Hai vinto!!!";
            messageY = 4.7;
            color = '#30db16';
        }

        this.messageLabel = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 10 * messageY, message,
            {font: '88px arc-font', fill: color}
        ).setOrigin(0.5);

        if (message == "Hai vinto!!!") {

            this.buttonMenu = new Button(this, this.sys.canvas.width / 2, this.sys.canvas.height / 10 * 5.8, "Menu", 44,
                () => this.scene.start('menu')
            );

            (this.scene.get('gameHud') as GameHud).pushScore();
            this.gameRound = 1;
        } else {
            let scene = this.scene;
            setTimeout(function () {
                scene.stop('generalMessage');
            }, 1555);

            (this.scene.get('gameHud') as GameHud).initPlayerHealth(gameMode, score);
            (this.scene.get('main') as Main).scene.restart();
        }
    }
}