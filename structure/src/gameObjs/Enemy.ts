export class Enemy extends Phaser.GameObjects.Image {
    private readonly id: string;

    private static width: number;
    private static height: number;
    private static timingMove = 0;

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        Enemy.width = this.width;
        Enemy.height = this.height;

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    getId() {
        return this.id;
    }

    getCoordinates() {
        const x = this.getId().split(";")[0];
        const y = this.getId().split(";")[1];

        return [x, y]
    }

    static updatePosition(time: integer, direction: integer, scene: any, canvas: any) {
        let firstEnemy = scene.getEnemiesAreaRange()[2];
        let lastEnemy = scene.getEnemiesAreaRange()[3];

        if (this.timingMove < time) {
            if (direction) {
                if (lastEnemy.x <= canvas.width - (Enemy.width * 2)) {
                    // @ts-ignore
                    scene.enemies.getChildren().forEach(enemy => enemy.x += 10);
                } else {
                    // @ts-ignore
                    scene.enemies.getChildren().forEach(enemy => enemy.y += 15);
                    scene.setEnemiesDirection(0);
                }
            } else {
                if (firstEnemy.x > (this.width * 2)) {
                    // @ts-ignore
                    scene.enemies.getChildren().forEach(enemy => enemy.x -= 10);
                } else {
                    // @ts-ignore
                    scene.enemies.getChildren().forEach(enemy => enemy.y += 15);
                    scene.setEnemiesDirection(1);
                }
            }

            Enemy.timingMove = time + 666;
        }
    }
}