class Card extends Phaser.GameObjects.Sprite { // создаём класс унаследованный от Phaser.GameObjects.Srite
    constructor(scene, value, position) { // конструктор с параметрами класса Card передает createCards
        super(scene, position.x, position.y, 'card' + value); // передаёт параметры позиций карт для вывода изображений согласно названию и значению
        this.scene = scene; // переменная ссылается на сцену
        this.value = value // передает значение полей карт в объект
        this.setOrigin(0, 0); // перемещает контрпойнт центра картинки в верхний левый угол
        this.scene.add.existing(this); // выводит спрайт изображений на экран (выводит сцену в созданном ранее объекте)
    }
}
