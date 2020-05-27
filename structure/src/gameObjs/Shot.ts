export class Shot extends Phaser.GameObjects.Image {
    constructor(scene: any, x: integer, y: integer, speed: integer, spritesheet: any) {
        super(scene, x, y, spritesheet);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setScale(0.05);
        this.setDepth(-1);

        this.initMovement(speed);
    }

    private initMovement(speed: integer): void {
        this.scene.physics.world.enable(this);
        (this.body as Phaser.Physics.Arcade.Body).setVelocityY(speed);
    }

    update(){
        if(this.y < 0) this.destroy();
    }
}