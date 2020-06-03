import {Shot} from "./Shot";

/**
 * Classe figlia di Phaser.GameObjects.Image
 *
 * Questa classe serve per creare il giocatore principale del gioco
 */
export class Player extends Phaser.GameObjects.Image {
    /**
     * MainScene serve per avere un riferimento della scena principale del gioco
     */
    private mainScene: Phaser.Scene | any;
    /**
     * Canvas serve per tenere un riferimento del canvas usato per renderizzare il gioco
     */
    private canvas: any;

    /**
     * InputKey serve per gestire gli eventi da tastiera
     * per gli spostamenti del giocatore
     */
    private inputKey: Phaser.Input.Keyboard.KeyboardManager | any;
    /**
     * CustomKeys serve per tenere traccia di tutti i custom ipunts
     */
    private customKeys: any = {};

    /**
     * Scale è la scala da usare per cambiare la grandezza del
     * oggetto player
     */
    private readonly scale: any;

    /**
     * ShootTiming serve per calcolare quanto tempo ci sarà
     * tra uno sparo e l'altro da parte del giocatore
     */
    private shootTiming = 0;
    /**
     * BulletsAlive serve per tenere traccia dei colpi sparati dal giocatore
     */
    private bulletsAlive: Phaser.GameObjects.Group = this.scene.add.group();

    /**
     *
     * @param scene Istanza dove verrà inserito l'oggetto Player
     * @param spriteSheet Sprite da assegnare alla istanza Player
     * @param inputKey Istanza per gestire gli input
     */
    constructor(scene: any, spriteSheet: any, inputKey: any) {
        super(scene, 0, 0, spriteSheet);

        this.inputKey = inputKey;
        this.customKeys.D = this.scene.input.keyboard.addKey('D');

        this.mainScene = scene;
        this.canvas = this.mainScene.sys.canvas;

        //calcolo la scala che dovranno avere gli oggetti in proporzione alla navicella
        this.scale = (this.width == 100) ?  60 / this.width : 70 / this.width;

        //centralizzo la navicella
        this.x = this.canvas.width / 2;
        this.y = (this.canvas.height - this.height * this.scale) - 25;

        //aggiungo la navicella in scena e attivo le fisiche
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(this.scale);
    }

    /**
     * Questo metodo serve per spostaare il giocatore
     *
     * @param time Riferimento del tempo percorso
     */
    move(time: integer) {
        if (this.inputKey.left.isDown && this.x > (this.width * this.scale) / 2)
            this.x += -5;
        if (this.inputKey.right.isDown && this.x < (this.canvas.width - (this.width * this.scale) / 2))
            this.x += 5;
        if (this.inputKey.space.isDown && this.bulletsAlive.getLength() < 1 && this.shootTiming < time) {
            let gameMode = this.mainScene.registry.get("gameMode");

            const shot = new Shot(this.scene, this.x, this.y, -475, 'shot' + gameMode);
            this.bulletsAlive.add(shot);
            this.mainScene.checkCollisionShotPlayer(shot);

            this.mainScene.sound.play('playerShoot');
            this.shootTiming = time + 450;
        }

        /**
         * Questa condizione serve per fare in modo de che le istanze di Enemy
         * possano sparare solo un colpo alla volta
         */
        if (this.bulletsAlive.getLength() > 0)
            this.bulletsAlive.getChildren()[0].update();

        /**
         * Funzionalità aggiuntiva per fare delle prove.
         * Serve per sparare colpi senza delay
         */
        if (this.customKeys.D.isDown){
            let test = new Shot(this.scene, this.x, this.y, -475, 'shot0');
            this.bulletsAlive.add(test);
            this.mainScene.checkCollisionShotPlayer(test);
        }
    }
}