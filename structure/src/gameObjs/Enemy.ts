import {Shot} from "./Shot";

export class Enemy extends Phaser.GameObjects.Image{
    constructor(scene: any, x:number, y:number,  spriteSheet: any) {
        super(scene, x, y, spriteSheet);

        this.setOrigin(0.5, 0.5)

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }
}