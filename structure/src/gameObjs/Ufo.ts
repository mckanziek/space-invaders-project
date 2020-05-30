export class Ufo extends Phaser.GameObjects.Image {
    private mainScene: Phaser.Scene | any;

    static ufoLives: Array<Ufo> = [];

    constructor(scene: any, spriteSheet: any) {
        super(scene, scene.sys.canvas.width + 40, 70, spriteSheet);

        this.mainScene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(0.9);

        this.initMove(this);
    }

    initMove(obj: Ufo){
        this.scene.tweens.add({
            targets: this,
            x: this.x - 969,
            y: this.y,
            ease: 'Linear',
            duration: 6666,
            onComplete: function(){
                obj.destroy();
                Ufo.ufoLives = [];
            }
        })
    }

    die() {
        this.mainScene.sound.play("enemyKilled");
        this.mainScene.events.emit('incrementScore', 100);

        this.destroy();
        Ufo.ufoLives = [];
    }
}