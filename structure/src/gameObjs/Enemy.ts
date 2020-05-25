import {Shot} from "./Shot";
import {Player} from "./Player";

export class Enemy extends Phaser.GameObjects.Image {
    private id: string;
    private tweenMoves: Phaser.Tweens.Tween | undefined;
    private mainScene: any;
    private timingMove = 0;

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        this.mainScene = scene;

        this.initTweenMoves()

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    getId(){
        return this.id;
    }

    getCoordinates(){
        const x = this.getId().split(";")[0];
        const y = this.getId().split(";")[1];

        return [x, y]
    }

    initTweenMoves(){
        this.tweenMoves = this.scene.tweens.add({
            targets: this,
            x: this.x + 90,
            ease: 'Linear',
            duration: 3000,
            yoyo: true,
            repeat: -1
        })
    }

    updatePosition(time: integer, direction: integer) {

    }
}