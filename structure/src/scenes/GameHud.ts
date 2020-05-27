export class GameHud extends Phaser.Scene {
    private mainScene: any;

    private score = 0;
    private playerHealth: Phaser.GameObjects.Group | any;

    constructor() {
        super({key: "gameHud", active: true});
    }

    init(){
        this.mainScene = this.scene.get('main');
        this.playerHealth = this.mainScene.add.group();
    }

    create() {
        let scoreLabel = this.add.text(15, 15, "Punteggio: " + this.score,
            {font: '30px Arial', fill: '#fff'}
        );

        for(let i = 1; i <= 3; i++){
            let healthObj = this.mainScene.add.image(0, 0, 'healthTest');
            let scale = 25 / healthObj.width;

            healthObj.setScale(scale);
            healthObj.x = (this.mainScene.sys.canvas.width - (i * (healthObj.width * scale)));
            healthObj.y = (healthObj.height * scale);

            this.playerHealth.add(healthObj);
        }

        this.mainScene.events.on('incrementScore', function(points: integer){
            // @ts-ignore
            this.score += points;
            // @ts-ignore
            scoreLabel.setText("Punteggio: " + this.score);
        }, this);

        this.mainScene.events.on('decraseHealth', function(){
            // @ts-ignore
            this.playerHealth.getChildren()[this.playerHealth.getChildren().length - 1].destroy();
        }, this);
    }
}