export class Ufo extends Phaser.GameObjects.Image {
    private mainScene: Phaser.Scene | any;

    constructor(scene: any, spriteSheet: any) {
        super(scene, scene.sys.canvas.width / 2, 20, spriteSheet);

        this.mainScene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        //this.update();
    }

    update() {
        while(this.x > 0) this.x -= 10;
    }

    die() {
        this.mainScene.sound.play("enemyKilled");
        this.mainScene.events.emit('incrementScore', 100);

        this.setActive(false);
        this.setVisible(false);
    }
}