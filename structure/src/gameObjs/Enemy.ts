export class Enemy extends Phaser.GameObjects.Image {
    private readonly id: string;
    private point: integer;
    private customY: number; //Serve per tenere traccia della vera Y dell'oggetto

    private static mainScene: any;
    private static canvas: any;

    private static width: number;
    private static height: number;

    private static speed = 10;
    private static timingMove = 0;

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string, point: integer) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        this.point = point;

        Enemy.width = this.width;
        Enemy.height = this.height;

        Enemy.mainScene = scene;
        Enemy.canvas = scene.sys.canvas

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

            Enemy.timingMove = time + 369;
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

    die() {
        Enemy.mainScene.sound.play("enemyKilled");
        Enemy.mainScene.events.emit('incrementScore', this.point);

        this.setActive(false);
        this.setVisible(false);
    }
}