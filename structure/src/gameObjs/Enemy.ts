import {Shot} from "./Shot";
import {Player} from "./Player";

export class Enemy extends Phaser.GameObjects.Image {
    private id: string;
    private tweenMoves: Phaser.Tweens.Tween | undefined;

    private mainScene: any;
    private canvas: any;

    private speed: integer = 1000;
    private timingMove = 0;

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        this.mainScene = scene;
        this.canvas = this.mainScene.sys.canvas;

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
            x: this.x + 100,
            ease: 'Linear',
            duration: this.speed,
            yoyo: true,
            repeat: -1
        })
    }

    updatePosition() {
        let a = this.mainScene.getEnemiesAreaRange()[0];
        let b = this.mainScene.getEnemiesAreaRange()[1];
        let area = b - a;

        let lastEnemy;

        for(let i = 0; i < this.mainScene.enemies.getChildren().length; i++){
            if(i == b && this.mainScene.enemies.get(i) != null)
                lastEnemy = this.mainScene.enemies.get(i);
        }

        if(1){
            if(lastEnemy.x < this.canvas.width - (area * this.width)){
                this.x += 10;
            }
        }
    }
}