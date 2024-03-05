class GameScene extends Phaser.Scene { // создаём класс унаследованный от фазер сцены
    constructor() {
        super('Game'); // передаёт параметр
    }

    preload() { // метод класса предзагрузка изображений
        this.load.image('bg', 'assets/sprites/background.png'); // 1. загрузить бэкграунд
        this.load.image('card', 'assets/sprites/card.png'); // загрузить карту
    
        this.load.image('card1', 'assets/sprites/card1.png');
        this.load.image('card2', 'assets/sprites/card2.png');
        this.load.image('card3', 'assets/sprites/card3.png');
        this.load.image('card4', 'assets/sprites/card4.png');
        this.load.image('card5', 'assets/sprites/card5.png');
    }

    create() { // метод класса вывод изображений на экран после загрузки в прелоаде
        this.createBackground();
        this.createCards();
        this.openedCard = null; // присваеваем переменной значение ранее открытой карты
    }

    createBackground() { // создаёт фон для вывода на экран
        // 2. вывести бэкграунд
        // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg'); // координаты центра канваса согласно параметров конфига
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0); // другой метод вывода. перемещает контрпойнт центра картинки в верхний левый угол
    }

    createCards() { // создаёт карты для вывода на экран
        this.cards = []; // создает массив карт
        let positions = this.getCardsPositions(); // передаём в переменную массив позиций всех карт
        Phaser.Utils.Array.Shuffle(positions); // метод Phaser.Utils.Array фейзера для работы с функционалом массивов. Shuffle() - перемешивает массив в случайном порядке
        
        //Цикл заменили см. ниже
        /*for (let position of positions) { // циклом перебераем массив позиций
            this.cards.push(new Card(this, position)); // записывает новые данные в массив карт из класса Card
            // перенесли в Card
            //this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0); // выводим на экран каждую карту согласно массива позиций
        }*/

        for (let value of config.cards) { // циклом перебераем массив картинок карт из конфига
            for (let i = 0; i < 2; i++) { // циклом создаем по 2 одинаковых картинки карты
            
                this.cards.push(new Card(this, value, positions.pop())); // записывает новые данные в массив карт из класса Card (pop() - выбирает последний элемент массива и удаляет его)
            }
        }

        this.input.on('gameobjectdown', this.onCardClicked, this); // метод отслеживает нажатие на элемент (карту) обработчик события через объект инпут
    }

    onCardClicked(pointer, card) { // метод вызывает клик по карте и передает параметры
        if (card.opened) { // проверка если карта уже открыта и на нее кликнуть
            return false; // выйти из функции onCardClicked и не запускать логику игры для открытой карты
        }
        
        if (this.openedCard) { // условие если есть открытая карта
            // уже есть открытая карта
            if (this.openedCard.value === card.value) { // условие если значения открытых пар карт равны
                // запомнить и не закрывать
                this.openedCard = null; // обнуляем значение карт
            } else {
                // если разные закрыть карту предыдущую
                this.openedCard.close(); // вызывает метод закрытия карты
                this.openedCard = card; // записывает значение карты в открытую карту
            }

        } else {
            //еще нет открытой карты
            this.openedCard = card; // записывает значение карты в открытую карту
        }
        
        
        card.open(); // вызывает метод открытие карты из класса card
    }

    getCardsPositions() { // функция создает массив позиций на экране всех карт
        let positions = []; // массив хранения значений
        let cardTexture = this.textures.get('card').getSourceImage(); // сохраняет в переменную значения изображения карты
        let cardWidth = cardTexture.width + 4; // сохраняет в переменную значение ширины карты + отступ по ширине
        let cardHeight = cardTexture.height + 4; // сохраняет в переменную значение высоты карты + отступ по высоте
        // центруем в канвасе всю колоду карт
        let offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2; // вычисляет старт 1 карты по оси Х для равномерных отступов по краям канваса
        let offsetY = (this.sys.game.config.height - cardHeight * config.rows) / 2; // вычисляет старт 1 карты по оси У для равномерных отступов в верху и снизу канваса
    
        for (let row = 0; row < config.rows; row++) { // цикл создает количество рядов согласно данных конфига
            for (let col = 0; col < config.cols; col++) { // цикл создает количество колонок в рядах согласно данных конфига
                positions.push({ // записывает новые данные в масив позиций карт
                    x: offsetX + col * cardWidth, // расчитывает позицию по оси Х для каждой карты
                    y: offsetY + row * cardHeight, // расчитывает позицию по оси У для каждой карты
                });
            }
        }
    
        return positions; // возращает значение расчитанных позиций
    }

}
