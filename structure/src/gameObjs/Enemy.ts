export class Enemy extends Phaser.GameObjects.Image {
    private readonly id: string;

    private static width: number;
    private static height: number;

    /**
     * Serve per tenere traccia della vera Y dell'oggetto
     * Con l'eliminazione di alcune istanze della classe Enemy, l'altezza
     * dell'ultimo oggetto Enemy veniva sfasata
     */
    private customY: number;

    private static direction = 1;
    private static timingMove = 0;

    constructor(scene: any, x: number, y: number, spriteSheet: any, id: string) {
        super(scene, x, y, spriteSheet);

        this.id = id;
        Enemy.width = this.width;
        Enemy.height = this.height;

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

    static updatePosition(time: integer, scene: any, canvas: any) {
        let firstEnemy = scene.getEnemiesAreaRange()[0];
        let lastEnemy = scene.getEnemiesAreaRange()[1];

        console.log(firstEnemy + " " + lastEnemy)

        if (this.timingMove < time) {
            if (Enemy.direction) {
                if (lastEnemy.x <= canvas.width - (Enemy.width * 2)) {
                    // @ts-ignore
                    scene.enemies.getChildren().forEach(enemy => enemy.x += 10);
                } else {
                    Enemy.goDown(scene, canvas);
                    Enemy.direction = 0;
                }
            } else {
                if (firstEnemy.x > (this.width * 2)) {
                    // @ts-ignore
                    scene.enemies.getChildren().forEach(enemy => enemy.x -= 10);
                } else {
                    Enemy.goDown(scene, canvas);
                    Enemy.direction = 1;
                }
            }

            Enemy.timingMove = time + 420;
        }
    }

    static goDown(scene: any, canvas: any){
        let bottonEnemy = scene.getEnemiesAreaRange()[2];

        if(bottonEnemy.customY < canvas.height - (Enemy.height * 2)){
            // @ts-ignore
            scene.enemies.getChildren().forEach(enemy => enemy.customY += 15);
            // @ts-ignore
            scene.enemies.getChildren().forEach(enemy => enemy.y = enemy.customY);
        }
    }
}