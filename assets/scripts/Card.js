class Card extends Phaser.GameObjects.Sprite { // создаём класс унаследованный от Phaser.GameObjects.Srite
    constructor(scene, value, position) { // конструктор с параметрами класса Card передает createCards
        super(scene, position.x, position.y, 'card'); // передаёт параметры позиций карт для вывода изображений согласно названию и значению
        this.scene = scene; // переменная ссылается на сцену
        this.value = value // передает значение полей карт в объект
        this.setOrigin(0, 0); // перемещает контрпойнт центра картинки в верхний левый угол
        this.scene.add.existing(this); // выводит спрайт изображений на экран (выводит сцену в созданном ранее объекте)
        this.setInteractive(); // базовая функция делает элементы интерактивными
        this.opened = false; // устанавливает флаг значение при закрытой карте
        //this.on('pointerdown', this.open, this); // метод отслеживает нажатие на элемент (карту)
    }

    open() { // отдельный метод класса карт, открывает карту
        this.opened = true; // устанавливает флаг значение при открытой карте
        this.setTexture('card' + this.value); // передает значение карты какую необходимо открыть после клика
    }

    close() { // отдельный метод класса карт, закрывает карту
        this.opened = false; // устанавливает флаг значение при закрытой карте
        this.setTexture('card'); // передает значение рубашки карты для закрытия
    }
}
