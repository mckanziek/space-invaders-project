/**
 * Classe figlia di Phaser.GameObjects.Image
 *
 * Questa classe serve per generare un nemico di passaggio per
 * dare la possibilità al giocatore di avere punti extra
 */
export class Ufo extends Phaser.GameObjects.Image {
    /**
     * MainScene serve per avere un riferimento della scena principale del gioco
     */
    private mainScene: Phaser.Scene | any;
    /**
     * UfoLives serve per tenere traccia di tutte le istanze create
     * della classe Ufo
     */
    static ufoLives: Array<Ufo> = [];

    /**
     *
     * @param scene Istanza dove verrà inserito l'oggetto Ufo
     * @param x Posizione x dalla quale spuntera l'ufo
     * @param spriteSheet Sprite da assegnare alle istanze di Ufo
     */
    constructor(scene: any, x: integer, spriteSheet: any) {
        super(scene, x, 70, spriteSheet);

        this.mainScene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(0.9);

        this.initMove(scene, this);
        scene.sound.play('ufo' + scene.gameMode, {loop: true, volume: (scene.gameMode) ? 3 : 1});
    }

    /**
     * Questo metodo serve per spostare le istanze di Ufo
     * Utilizza l'oggetto Tweens di faser
     *
     * @param scene Oggetto da dove accedo agli audio
     * @param obj Oggetto da spostare
     */
    initMove(scene: any, obj: Ufo) {
        this.scene.tweens.add({
            targets: this,
            x: this.x + ((this.x < 0) ? 969 : -969),
            y: this.y,
            ease: 'Linear',
            duration: 6666,
            onComplete: function () {
                scene.sound.stopAll();
                obj.destroy();
                Ufo.ufoLives = [];
            }
        })
    }

    /**
     * Questo metodo serve per eseguire una serie
     * di eventi se una istanza di Ufo viene 'uccisa'
     */
    die() {
        /**
         * Viene riprodotto un suono
         */
        this.mainScene.sound.play("enemyKilled" + this.mainScene.gameMode);
        /**
         * Viene aumentato lo score del giocatore
         */
        this.mainScene.events.emit('incrementScore', 100);

        this.mainScene.sound.stopAll();

        this.destroy();
        Ufo.ufoLives = [];
    }
}