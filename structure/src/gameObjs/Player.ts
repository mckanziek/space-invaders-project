import {Shot} from "./Shot";

export class Player extends Phaser.GameObjects.Image {
    private mainScene: any;
    private canvas: any;

    private inputKey: any;
    private customKeys: any = {};

    private readonly scale: any;
    private health: Phaser.GameObjects.Group = this.scene.add.group();
    private bulletsAlive: Phaser.GameObjects.Group = this.scene.add.group();

    constructor(scene: any, spriteSheet: any, inputKey: any) {
        super(scene, 0, 0, spriteSheet);

        this.inputKey = inputKey;
        this.customKeys.D = this.scene.input.keyboard.addKey('D');

        this.mainScene = scene;
        this.canvas = this.mainScene.sys.canvas;

        //calcolo la scala che dovranno avere gli oggetti in proporzione alla navicella
        this.scale = 70 / this.width;

        //centralizzo la navicella
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - this.height * this.scale;

        //aggiungo la navicella in scena e attivo le fisiche
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(this.scale);

        this.setHealt();
    }

    setHealt() {
        for (let i = 0; i < 3; i++) {
            let healthObj = this.scene.add.image(0, 0, 'healthTest');
            let scale = 25 / healthObj.width;

            healthObj.setScale(scale);
            healthObj.x = (this.canvas.width - (this.width * 0.05)) - (i * (healthObj.width * scale));
            healthObj.y = (healthObj.height * scale);

            this.health.add(healthObj);
        }
    }

    decraseHealt() {
        this.health.getChildren()[this.health.getChildren().length - 1].destroy();
        console.log(this.x + " " + this.width)
    }

    move() {
        if (this.inputKey.left.isDown && this.x > (this.width * this.scale) / 2)
            this.x += -5;
        if (this.inputKey.right.isDown && this.x < (this.canvas.width - (this.width * this.scale) / 2))
            this.x += 5;
        if (this.inputKey.space.isDown && this.bulletsAlive.getLength() < 1) {
            const shot = new Shot(this.scene, this.x, this.y, 'shotTest');
            this.bulletsAlive.add(shot);

            this.mainScene.checkCollision(shot);
        }
        if (this.bulletsAlive.getLength() > 0)
            this.bulletsAlive.getChildren()[0].update();

        if (this.customKeys.D.isDown) this.decraseHealt();
    }
}