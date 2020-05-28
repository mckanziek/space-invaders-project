import {Shot} from "./Shot";

export class Enemy extends Phaser.GameObjects.Image {
    private readonly id: string;
    private readonly point: integer;
    private customY: number; //Serve per tenere traccia della vera Y dell'oggetto

    private static mainScene: any;
    private static canvas: any;

    private static width: number;
    private static height: number;

    private static speed = 10;
    private static timingMove = 0;
    private static enemyMovedelay = 420;

    private bulletsAlive: Phaser.GameObjects.Group = this.scene.add.group();

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string, point: integer) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        this.point = point;

        Enemy.width = this.width;
        Enemy.height = this.height;

        Enemy.speed = 10;
        Enemy.timingMove = 0;
        Enemy.enemyMovedelay = 420;

        Enemy.mainScene = scene;
        Enemy.canvas = scene.sys.canvas;

        this.customY = this.y;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    getId() {
        return this.id;
    }

    getCoordinates() {
        const x = this.getId().split(";")[0];
        const y = this.getId().split(";")[1];

        return [x, y];
    }

    public incrementSpeed(){
        let speedSign = (Enemy.speed < 0) ? -1 : 1;
        let newSpeed = this.point / 10;

        if(Math.abs(Enemy.speed + newSpeed * speedSign) < 25){
            Enemy.speed += newSpeed * speedSign;
            Enemy.enemyMovedelay -= this.point;
        }
    }

    static updatePosition(time: integer) {
        let firstEnemy = Enemy.mainScene.getEnemiesAreaRange()[0];
        let lastEnemy = Enemy.mainScene.getEnemiesAreaRange()[1];

        if (this.timingMove < time) {
            // @ts-ignore
            Enemy.mainScene.enemies.getChildren().forEach(enemy => enemy.x += Enemy.speed);

            if (!(lastEnemy.x <= Enemy.canvas.width - (Enemy.width * 2))
                || !(firstEnemy.x > (this.width * 2))) {
                Enemy.speed *= -1;
                Enemy.goDown();
            }

            Enemy.timingMove = time + Enemy.enemyMovedelay;
        }
    }

    static goDown() {
        let bottonEnemy = Enemy.mainScene.getEnemiesAreaRange()[2];

        if (bottonEnemy.customY < Enemy.canvas.height - (Enemy.height * 2)) {
            setTimeout(function () {
                // @ts-ignore
                Enemy.mainScene.enemies.getChildren().forEach(enemy => {
                    enemy.customY += 15;
                    enemy.y = enemy.customY;
                });
            }, 100);
        }
    }

    shoot(){
        let shot = new Shot(Enemy.mainScene, this.x, this.y, 450, 'shotTest');
        this.bulletsAlive.add(shot);
        Enemy.mainScene.checkCollisionShotEnemy(shot);

        if (this.bulletsAlive.getLength() > 0)
            this.bulletsAlive.getChildren()[0].update();
    }

    die() {
        this.incrementSpeed();

        Enemy.mainScene.sound.play("enemyKilled");
        Enemy.mainScene.events.emit('incrementScore', this.point);
        Enemy.mainScene.decraseEnemiesShootDelay();

        this.setActive(false);
        this.setVisible(false);
    }
}