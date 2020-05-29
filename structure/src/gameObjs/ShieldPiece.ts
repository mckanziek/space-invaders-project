export class ShieldPiece extends Phaser.GameObjects.Image {
    static pieces: Array<ShieldPiece> = [];

    constructor(scene: any, spriteSheet: any, x: integer, y: integer) {
        super(scene, 0, 0, spriteSheet);

        ShieldPiece.pieces.push(this);

        this.x = x;
        this.y = y;

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(0.3);
    }
}