import {Scores} from "./Menus/Scores";
import {Button} from "../gameObjs/CustomObjs/Button";

/**
 * Classe filgia di Phaser.Scene
 *
 * Questa classe serve per generare l'hud del gioco
 */
export class GameHud extends Phaser.Scene {
    /**
     * Graphics è un oggetto che serve per creare contenuti primitivi in canvas
     * in questo caso viene usato per disegnare una linea orizzontale
     */
    private graphics: Phaser.GameObjects.Graphics | any;

    /**
     * MainScene serve per avere un riferimento della scena principale del gioco
     */
    private mainScene: Phaser.Scene | any;
    /**
     * GameMode serve per sapere quale set di Sprite si userà nel gioco
     */
    private gameMode: integer = 0;

    /**
     * Score serve per tenere traccia del punteggio del giocatore
     */
    private score = 0;
    /**
     * Playerhealth serve per tenere traccia degli oggetti che rappresentano
     * le vite del giocatore
     */
    private playerHealth: Phaser.GameObjects.Group | any;

    /**
     * ScoreLabel è l'oggetto che serve per visualizzare il punteggio
     * del giocatore in tempo reale
     */
    private scoreLabel: Phaser.GameObjects.Text | any;
    /**
     * PauseButton è il bottone che serve per mettere in pausa il gioco
     */
    private pauseButton: Button | any;

    constructor() {
        super({key: "gameHud"});
    }

    /**
     * Init è un metodo predefinito di tutti gli oggetti di Phaser
     * viene usato per inizializzare o creare componenti
     */
    init() {
        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0xffffff,
                alpha: 1
            }
        });

        this.mainScene = this.scene.get('main');
        this.playerHealth = this.add.group();
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per istanziare i testi e i bottoni del hud del gioco
     */
    create() {
        this.scoreLabel = this.add.text(15, 15, "Punteggio 0",
            {font: '40px arc-font', fill: '#fff'}
        );

        this.pauseButton = new Button(this, this.sys.canvas.width - 45, this.sys.canvas.height - 25, "Pausa", 35,
            () => {
                this.scene.pause('main');
                this.scene.launch('pauseMenu');
            }
        );

        this.mainScene.events.on('incrementScore', function (points: integer) {
            // @ts-ignore
            this.score += points;
            // @ts-ignore
            this.scoreLabel.setText("Punteggio " + this.score);
        }, this);

        this.mainScene.events.on('decreaseHealth', this.decreasePlayerHealth, this);

        this.graphics.fillRect(0, this.sys.canvas.height - 45, this.sys.canvas.width, 3);
    }

    /**
     * Questo metodo serve per inviare i punteggi alla schermata dei punteggi,
     * risettare i punteggi a 0 e rigenerare gli oggetti che rappresentano le
     * vite del giocatore con il giusto sprite
     *
     * @param gameMode Modalita di gioco per scegliere il set di sprite per il gioco
     * @param score Il punteggio con il quale deve ricominciare la nuova partita
     */
    initPlayerHealth(gameMode: integer, score: integer) {

        if (score == 0) {
            // @ts-ignore
            this.playerHealth.getChildren().forEach(health => health.destroy());
            // @ts-ignore
            this.playerHealth.getChildren().forEach(health => health.destroy());


            for (let i = 1; i <= 3; i++) {
                let healthObj = this.add.image(0, 0, 'playerHealth' + gameMode);
                let scale = 25 / healthObj.width;

                healthObj.setScale(scale);
                healthObj.x = (this.mainScene.sys.canvas.width - (i * (healthObj.width * scale)));
                healthObj.y = (healthObj.height * scale) + 6;

                this.playerHealth.add(healthObj);
            }
        }

        this.score = score;

        this.scoreLabel.setText("Punteggio " + this.score);
    }

    /**
     * Questo metodo serve per diminuire le vite del giocatore
     * Se ne rimangono 0 viene chiamata la schermata Lose
     */
    decreasePlayerHealth() {
        this.playerHealth.getChildren()[this.playerHealth.getChildren().length - 1].destroy();
        if (this.playerHealth.getChildren().length == 0) {
            this.scene.pause('main');

            this.pushScore();

            this.scene.launch('loseScreen');
        }
    }

    /**
     * Questo metodo serve per generare un testo con la data attuale
     *
     * @return date ../../....
     */
    getDate() {
        const date = new Date();

        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();

        return d + "/" + m + "/" + y;
    }

    /**
     * Questo metodo serve per aggiornare la lista di punti
     * della schermata Scores
     */
    pushScore() {
        Scores.scores.push([this.score, this.getDate()]);
    }

    /**
     * @return this.score Il punteggio del giocatore
     */
    getScore() {
        return this.score;
    }

    /**
     * @return this.gameMode La modalità di gioco
     */
    getGameMode() {
        return this.gameMode;
    }
}