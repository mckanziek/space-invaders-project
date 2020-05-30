export class Button extends Phaser.GameObjects.Text {
    constructor(scene: any, x: integer, y: integer, text: string, fontSize: integer, event: Function) {
        super(scene, x, y, text, {});

        this.setColor('#dbba16');
        this.setFont(fontSize + 'px arc-font');

        this.setInteractive();

        this.on('pointerover', () => this.setColor('#30db16'));
        this.on('pointerout', () => this.setColor('#dbba16'))
        this.on('pointerdown', () => this.setFont((fontSize - 6) + 'px arc-font'))
        this.on('pointerup', () => {
            this.setFont(fontSize + 'px arc-font');
            event();
        });

        this.setOrigin(0.5);
        scene.add.existing(this);
    }
}