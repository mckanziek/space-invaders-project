/**
 * Classe figlia di Phaser.GameObjects.Image
 *
 * Questa classe serve per generare un pezzo dello scudo
 * che proteggie il giocatore
 */
export class ShieldPiece extends Phaser.GameObjects.Image {
    /**
     * Pieces serve per tenere traccia di tutte le
     * istanze di ShieldPiece
     */
    static pieces: Array<ShieldPiece> = [];

    /**
     *
     * @param scene Istanza dove verrà inserito l'oggetto ShieldPiece
     * @param x Posizione x dell'oggetto ShieldPiece
     * @param y Posizione y dell'oggetto ShieldPiece
     * @param spriteSheet Sprite da assegnare alle istanze di ShieldPiece
     */
    constructor(scene: any, x: integer, y: integer, spriteSheet: any) {
        super(scene, 0, 0, spriteSheet);

        ShieldPiece.pieces.push(this);

        this.x = x;
        this.y = y;

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(0.3);
    }
}