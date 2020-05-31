import {Button} from "../../gameObjs/CustomObjs/Button";

/**
 * Classe figlia di Phaser.Scene
 *
 * Questa classe serve per visualizzare tutti i punteggi fatti dal giocatore
 */
export class Scores extends Phaser.Scene {
    /**
     * Camera viene usato peer focalizzare un punto nel gioco
     * in questo caso tuttta la scene per poi mettere un background
     * personalizzato
     */
    private camera: Phaser.Cameras.Scene2D.CameraManager | any;
    /**
     * Graphics è un oggetto che serve per creare contenuti primitivi in canvas
     * in questo caso viene usato per disegnare una linea orizzontale
     */
    private graphics: Phaser.GameObjects.Graphics | any;

    /**
     * TitleLabel è l'oggetto per l'inserimento di del titolo nella scena
     */
    private titleLabel: Phaser.GameObjects.Text | any;
    /**
     * ButtonMenu serve per far ritornare al menu principale il giocatore
     */
    private buttonMenu: Button | any;
    /**
     * TextGroup serve per tenere traccia di tutti i testi dei punteggi scritti
     * per poi poterli rimuovere nel modo corretto
     */
    private textGroup: any = [];
    /**
     * MaxScore è il punteggio massimo che ha fatto il giocatore
     * viene aggiornato ad ogni fine di partita
     */
    private maxScore: any;
    /**
     * Scores serve per tenere traccia di tutti i punteggi
     * questa lista viene aggiornata tramite delle sessioni
     */
    static scores: Array<Array<any>> = [[0, ""]];/*[[200, "11/06/2020"],
        [500, "11/06/2020"],
        [100, "11/06/2020"],
        [20, "04/05/2020"],
        [600, "04/05/2020"],
        [450, "04/05/2020"],
        [1203, "09/10/2020"],
        [30, "16/01/2020"],
        [45, "16/01/2020"],
        [600, "04/05/2020"],
        [450, "04/05/2020"],
        [1203, "09/10/2020"]]*/

    constructor() {
        super({key: "scores"});
    }

    /**
     * Init è un metodo predefinito di tutti gli oggetti di Phaser
     * viene usato per inizializzare o creare componenti
     */
    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 1)');

        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {
                color: 0xff0000,
                alpha: 1
            }
        });

        if (sessionStorage.getItem('scores') != null && Scores.scores.length > 0) {
            // @ts-ignore
            Scores.scores = JSON.parse(sessionStorage.getItem('scores'));
        }

        this.updateScores();
        this.scene.moveUp('scores');
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per istanziare i testi e i bottoni del menu dei punteggi
     */
    create() {
        this.titleLabel = this.add.text(this.sys.canvas.width / 2, 66, "Punteggi",
            {font: '70px arc-font', fill: '#347deb'}
        ).setOrigin(0.5);

        this.buttonMenu = new Button(this, 50, 30, "Menu", 40,
            () => {
                this.scene.stop('scores');
                this.scene.start('menu');
            }
        );

        this.graphics.fillRect((this.sys.canvas.width - 400) / 2, 222, 400, 3);

        this.scene.get('menu').events.on('updateScores', this.updateScores, this);
    }

    /**
     * @return max Punteggio massimo nella lista di punteggi
     */
    getMaxScore() {
        let max = 0;

        Scores.scores.forEach(data => max = (data[0] > max) ? data[0] : max);

        return max;
    }

    /**
     * Questo metodo serve per aggiornare il contenuto delle sessioni
     * e per ristampare a video i nuovi punteggi
     */
    updateScores() {
        sessionStorage.setItem('scores', JSON.stringify(Scores.scores));
        this.reformatScores()

        // @ts-ignore
        this.textGroup.forEach(text => text.destroy());

        let textMax = this.maxScore = this.add.text(this.sys.canvas.width / 2, 180, "Punteggio massimo: " + this.getMaxScore(),
            {font: '40px arc-font', fill: '#fff'}
        ).setOrigin(0.5);

        this.textGroup.push(textMax);

        let yRefer = 0;
        let referDate = "";
        this.reformatScores().forEach(data => {
            let dateValue = (data[1] === referDate) ? "||" : data[1];
            let scoreValue = data[0].toString();

            const formatedData = ('- ' + dateValue).padEnd(16, '_') + scoreValue.padStart(4, "_");

            let scoreLabel = this.add.text(this.sys.canvas.width / 2, 264 + yRefer, formatedData,
                {font: '40px arc-font', fill: '#fff'}
            ).setOrigin(0.5);

            this.textGroup.push(scoreLabel);

            yRefer += 40;
            referDate = data[1];
        });
    }

    /**
     * Questo metodo serve per riformattare la lista contenenti i punteggi
     * per fare i modo de che ce ne siano sempre gli ultimi 9
     *
     * @return finalScoreArr Un array formattato con gli ultimi 9 punteggi
     */
    reformatScores() {
        let reversedScores = Scores.scores;
        let finalScoresArr = [];

        let counter = 0;

        for (let i = Scores.scores.length - 1; i > 0; i--) {
            if (counter == 9) break;
            finalScoresArr.push(reversedScores[i]);

            counter++;
        }

        return finalScoresArr;
    }
}