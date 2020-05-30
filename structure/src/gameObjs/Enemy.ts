import {Shot} from "./Shot";
import {GameHud} from "../scenes/GameHud";

export class Enemy extends Phaser.GameObjects.Sprite {
    private readonly id: string;
    private readonly point: integer;
    private customY: number; //Serve per tenere traccia della vera Y dell'oggetto

    private static mainScene: Phaser.Scene | any;
    private static canvas: any;

    private spriteSheet: string | any;

    private static width: number;
    private static height: number;

    private static speed = 10;
    private static timingMove = 0;
    private static enemyMoveDelay = 420;

    private bulletsAlive: Phaser.GameObjects.Group = this.scene.add.group();

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string, point: integer) {
        super(scene, x, y, spriteSheet);
        super.play('move' + spriteSheet.slice(-2));

        this.id = id;
        this.point = point;

        this.spriteSheet = spriteSheet;

        Enemy.width = this.width;
        Enemy.height = this.height;

        Enemy.speed = 10;
        Enemy.timingMove = 0;
        Enemy.enemyMoveDelay = 420;

        Enemy.mainScene = scene;
        Enemy.canvas = scene.sys.canvas;

        this.customY = this.y;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setScale(0.8);
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
            Enemy.enemyMoveDelay -= this.point;
        }
    }

    static updatePosition(time: integer) {
        let dataPositions = Enemy.mainScene.getEnemiesAreaRange();


        if (this.timingMove < time) {
            Enemy.mainScene.enemies.getChildren().forEach((enemy: Enemy) => enemy.x += Enemy.speed);

            if (!(dataPositions[1].x <= Enemy.canvas.width - (Enemy.width * 1.2))
                || !(dataPositions[0].x >= (Enemy.width * 1.2))) {
                Enemy.speed *= -1;
                Enemy.goDown(dataPositions[2]);
            }

            Enemy.timingMove = time + Enemy.enemyMoveDelay;
        }
    }

    static goDown(buttonEnemy: Enemy) {
        if (buttonEnemy.customY < Enemy.canvas.height - (Enemy.height * 2)) {
            setTimeout(function () {
                // @ts-ignore
                Enemy.mainScene.enemies.getChildren().forEach(enemy => {
                    enemy.customY += 15;
                    enemy.y = enemy.customY;
                });
            }, 100);
        }else{
            this.mainScene.scene.pause('main');

            (this.mainScene.scene.get('gameHud') as GameHud).pushScore();

            this.mainScene.scene.launch('loseScreen');
        }
    }

    shoot(){
        let gameMode = Enemy.mainScene.registry.get("gameMode");

        let shot = new Shot(Enemy.mainScene, this.x, this.y, 450, 'shotSprt' + gameMode);
        this.bulletsAlive.add(shot);
        Enemy.mainScene.checkCollisionShotEnemy(shot);

        if (this.bulletsAlive.getLength() > 0)
            this.bulletsAlive.getChildren()[0].update();
    }

    die() {
        this.incrementSpeed();

        Enemy.mainScene.sound.play("enemyKilled");
        Enemy.mainScene.events.emit('incrementScore', this.point);
        Enemy.mainScene.decreaseEnemiesShootDelay();

        this.setActive(false);
        this.setVisible(false);
    }
}