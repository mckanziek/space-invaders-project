import {Shot} from "./Shot";

export class Player extends Phaser.GameObjects.Image {
    private mainScene: any;
    private canvas: any;

    private inputKey: any;
    private customKeys: any = {};

    private readonly scale: any;

    private shootTiming = 0;
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
    }

    move(time: integer) {
        if (this.inputKey.left.isDown && this.x > (this.width * this.scale) / 2)
            this.x += -5;
        if (this.inputKey.right.isDown && this.x < (this.canvas.width - (this.width * this.scale) / 2))
            this.x += 5;
        if (this.inputKey.space.isDown && this.bulletsAlive.getLength() < 1 && this.shootTiming < time) {
            const shot = new Shot(this.scene, this.x, this.y, -450, 'shotTest');
            this.bulletsAlive.add(shot);
            this.mainScene.checkCollisionShotPlayer(shot);

            this.mainScene.sound.play('playerShoot');
            this.shootTiming = time + 450;
        }
        if (this.bulletsAlive.getLength() > 0)
            this.bulletsAlive.getChildren()[0].update();

        if (this.customKeys.D.isDown) this.mainScene.events.emit('decraseHealth');
    }
}