import {GameHud} from "../GameHud";
import {Main} from "../Main";

import {Button} from '../../gameObjs/CustomObjs/Button';

/**
 * Classe figlia di Phaser.Scene
 *
 * Questa Classe serve per generare la schermata
 * per quando il giocatore perde la partita
 */
export class Lose extends Phaser.Scene {
    /**
     * Camera viene usato peer focalizzare un punto nel gioco
     * in questo caso tuttta la scene per poi mettere un background
     * personalizzato
     */
    private camera: Phaser.Cameras.Scene2D.CameraManager | any;

    /**
     * MessageLabel è l'oggetto per l'inserimento di label nella scena
     * in questo caso il titolo principale
     */
    private messageLabel: Phaser.GameObjects.Text | any;
    /**
     * MessageLabel è l'oggetto per l'inserimento di label nella scena
     * in questo caso il punteggio del giocatore
     */
    private scoreLabel: Phaser.GameObjects.Text | any;

    /**
     * ButtonRestart sono gli oggetti per l'inserimento di bottoni nella scena
     */
    private buttonRestart: Button | any;
    private buttonMenu: Button | any;

    constructor() {
        super({key: "loseScreen"});
    }

    /**
     * Init è un metodo predefinito di tutti gli oggetti di Phaser
     * viene usato per inizializzare o creare componenti
     */
    init() {
        /**
         * Settaggio della posizione, grandezza e background di camera
         */
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)');
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per istanziare i testi e i bottoni della schermata
     * di quando si perde
     */
    create() {
        let centerX = this.sys.canvas.width / 2;

        let gameMode = (this.scene.get('gameHud') as GameHud).getGameMode();
        let score = (this.scene.get('gameHud') as GameHud).getScore();

        this.messageLabel = this.add.text(centerX, this.sys.canvas.height / 10 * 3.6, "Hai perso umano",
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