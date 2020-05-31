/**
 * Classe figlia di Phaser.GameObjects.Text
 *
 * Questa classe serve per simulare un bottone per le scene,
 * impostando automaticamente gli eventi di entrata e uscita del mouse
 * e lo schiacciamento del bottone.
 */
export class Button extends Phaser.GameObjects.Text {
    /**
     *
     * @param scene Istanza dove verrà inserito l'oggetto Button
     * @param x Posizione x dell'oggetto Button
     * @param y Posizione y dell'oggetto Button
     * @param text Testo da inserire nel bottone
     * @param fontSize Grandezza del testo del bottone
     * @param event Azione da eseguire se il bottone viene schiacciato
     */
    constructor(scene: any, x: integer, y: integer, text: string, fontSize: integer, event: Function) {
        super(scene, x, y, text, {});

        /**
         * Settaggio del colore e la grandezza del testo del bottone
         */
        this.setColor('#dbba16');
        this.setFont(fontSize + 'px arc-font');

        /**
         * Metodo per attivare gli eventi sul bottone
         */
        this.setInteractive();

        this.on('pointerover', () => this.setColor('#30db16'));
        this.on('pointerout', () => this.setColor('#dbba16'))
        this.on('pointerdown', () => this.setFont((fontSize - 6) + 'px arc-font'))
        this.on('pointerup', () => {
            this.setFont(fontSize + 'px arc-font');
            event();
        });

        this.setOrigin(0.5);

        /**
         * Aggiunta del bottone nella scena principale
         */
        scene.add.existing(this);
    }
}