import {Button} from "../../gameObjs/CustomObjs/Button";

/**
 * Classe figlia di Phaser.Scene
 *
 * Questa classe serve per generare il menu che appare
 * quando il gioco va in pausa
 */
export class PauseMenu extends Phaser.Scene {
    /**
     * Camera viene usato peer focalizzare un punto nel gioco
     * in questo caso tuttta la scene per poi mettere un background
     * personalizzato
     */
    private camera: Phaser.Cameras.Scene2D.CameraManager | any;

    /**
     * TitleLabel è l'oggetto per l'inserimento di del titolo nella scena
     */
    private tittleLabel: Phaser.GameObjects.Text | any;

    /**
     * I bottoni servono per la navigazione tra i vari menu per il giocatore
     */
    private buttonResume: Button | any;
    private buttonMenu: Button | any;

    constructor() {
        super({key: "pauseMenu"});
    }

    /**
     * Settaggio della posizione, grandezza e background di camera
     */
    init() {
        this.camera = this.cameras.add(0, 0, this.sys.canvas.width, this.sys.canvas.height);
        this.camera.setBackgroundColor('rgba(0, 0, 0, 0.75)');
    }

    /**
     * Create è un metodo predefinito di tutti gli oggetti di Phaser
     * In questo caso viene usato per istanziare i testi e i bottoni del menu di pausa
     */
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