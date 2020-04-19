export class Shot extends Phaser.GameObjects.Image {
    constructor(scene: any, x: integer, y: integer, spritesheet: any) {
        super(scene, x, y, spritesheet);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setScale(0.05);
        this.setDepth(-1);

        this.initMovement();
    }

    private initMovement(): void {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-400);
    }

    update(){
        if(this.y < 0) this.destroy();
    }
}