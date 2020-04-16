export class Player extends Phaser.GameObjects.Image {
    private inputKey: any;

    constructor(scene: any, x: integer, y: integer, spritesheet: any, inputKey: any) {
        super(scene, x, y, spritesheet);

        this.inputKey = inputKey;

        scene.add.existing(this);
        this.setScale(0.25);
    }

    move(){
        if(this.inputKey.left.isDown) this.x += -10;
        if(this.inputKey.right.isDown) this.x += 10;
    }
}