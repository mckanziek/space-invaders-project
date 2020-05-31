/**
 * Classe figlia di Phaser.GameObjects.Image
 *
 * Questa classe serve per generare i colpi
 * da parte dei nemici e del giocatore principale
 */
export class Shot extends Phaser.GameObjects.Image {
    /**
     *
     * @param scene Istanza dove verrà inserito l'oggetto Shot
     * @param x Posizione x dell'oggetto Shot
     * @param y Posizione y dell'oggetto Shot
     * @param speed Velocità di spostamento dell'oggetto Shot
     * @param spritesheet Sprite da assegnare alle istanze di Shot
     */
    constructor(scene: any, x: integer, y: integer, speed: integer, spritesheet: any) {
        super(scene, x, y, spritesheet);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        let scale = 10 / this.width;

        this.setScale(scale);
        this.setDepth(-1);

        this.initMovement(speed);
    }

    /**
     * Questo metodo serve inizializzare la velocità degli oggetti Shot
     *
     * @param speed Velocità di spostamento dell'oggetto Shot
     */
    private initMovement(speed: integer) {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setVelocityY(speed);
    }

    /**
     * Questo metodo serve per controllare se la istanza Shot
     * supera il bordo superiore per poi essere distrutto
     */
    update() {
        if (this.y < 0) this.destroy();
    }
}