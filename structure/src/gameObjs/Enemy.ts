export class Enemy extends Phaser.GameObjects.Image {
    private readonly id: string;
    private customY: number; //Serve per tenere traccia della vera Y dell'oggetto

    private static scene: any;
    private static canvas: any;

    private static width: number;
    private static height: number;

    private static speed = 10;
    private static timingMove = 0;

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        Enemy.width = this.width;
        Enemy.height = this.height;

        Enemy.scene = scene;
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
        let firstEnemy = Enemy.scene.getEnemiesAreaRange()[0];
        let lastEnemy = Enemy.scene.getEnemiesAreaRange()[1];

        if (this.timingMove < time) {
            // @ts-ignore
            Enemy.scene.enemies.getChildren().forEach(enemy => enemy.x += Enemy.speed);

            if (!(lastEnemy.x <= Enemy.canvas.width - (Enemy.width * 2))) {
                Enemy.speed = -30;
                Enemy.goDown();
            }

            if (!(firstEnemy.x > (this.width * 2))) {
                Enemy.speed = 30;
                Enemy.goDown();
            }

            Enemy.timingMove = time + 320;
        }
    }

    static goDown() {
        let bottonEnemy = Enemy.scene.getEnemiesAreaRange()[2];

        if (bottonEnemy.customY < Enemy.canvas.height - (Enemy.height * 2)) {
            setTimeout(function () {
                // @ts-ignore
                Enemy.scene.enemies.getChildren().forEach(enemy => {
                    enemy.customY += 15;
                    enemy.y = enemy.customY;
                });
            }, 100);
        }
    }

    die(){
        Enemy.scene.sound.play("enemyKilled");
        this.setActive(false);
        this.setVisible(false);
    }
}