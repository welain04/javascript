// Возможные доработки: 

// сделать память, чтобы при перезагрузке прогресс и перс не терялись (localStorage, JSON)
// атака - после победы не прекращается, можно кликать бесконечно (отмена кликера или переброс в пред. или другую локацию?)
// при одном открытиии кнопка "открыть сундук" не должна появляется, можно вывести сообщение в журнал, что тут ничего нет
// Кнопка главной башни появляется после победы врага в посл. локации


const gameState = { // глобальные переменные
    player: {
        maxHp: 0,
        lastValueHp: 0,
        bonusValue: 0,
        randomName: 0,
        valueStrength: 0,
        valueAgility: 0,
        valueDefense: 0,
        lastValueStrength: 0,
        lastValueAgility: 0,
        lastValueDefense: 0,
        lastValueHpEnemy: 0,
        numberItemInArr: 0,
        presentLocation: 'Холм',
        gameItemPerson: [],
        nameItemPerson: [],
        startCharacteristics: {},
        personName: [
            'Валано',
            'Апаладит',
            'Угаридж',
            'Латенил',
            'Таурион',
            'Ирорун',
            'Аронил',
            'Алинор',
            'Фанильдил',
            'Мерилдор',
            'Эрраниль',
            'Киралинд',
            'Эндари',
            'Эрраниль',
            'Малания',
            'Ардаруме',
            'Алваэн',
            'Илемин',
            'Эланте',
            'Отаари'
        ]
    },
    navigation: { // переменные навигации (ById, ByClassName)
        buttonPersonChange: document.getElementById('button-person-change'),
        buttonPersonReplay: document.getElementById('button-person-replay'),

        hpToSet: document.getElementById('person-hp'),

        nameCurrentLocation: document.getElementById('name-of-the-current-location'),
        journalEntries: document.getElementById('journal-entries'),

        buttonDitch: document.getElementById('location-ditch'),
        buttonGates: document.getElementById('location-gates'),
        buttonYard: document.getElementById('location-yard'),

        locationButtonsHill: document.getElementsByClassName('button-location-hill'),
        locationButtonsGates: document.getElementsByClassName('location-gates'),
        buttonDoctor: document.getElementById('location-doctor'),
        buttonWeapons: document.getElementById('location-weapons'),
        buttonStaircase: document.getElementById('location-staircase'),

        locationButtonsStaircase: document.getElementsByClassName('location-staircase-rooms'),
        buttonBedroom: document.getElementById('location-bedroom'),
        buttonBedroomBox: document.getElementById('bedroom-box'),
        buttonThroneRoom: document.getElementById('location-throne-room'),
        buttonDonjon: document.getElementById('location-donjon'),

        buttonBarn: document.getElementById('location-barn'),
        buttonStable: document.getElementById('location-stable'),

        locationButtonsBranchGates: document.getElementsByClassName('button-location-gates'),
        locationButtonsBranchYard: document.getElementsByClassName('button-location-yard'),
        allButtons: document.getElementsByClassName('button'),

        buttonAttack: document.getElementById('button-attack'),
        buttonComeBack: document.getElementById('button-come-back'),
        buttonUseItem: document.getElementById('button-use-item'),

        containerWindowUseItem: document.getElementById('container-window-use-item'),
        containerVictoryWindow: document.getElementById('container-victory-window'),
        containerWindowLossOfProgress: document.getElementById('container-window-loss-of-progress'),

        containerButtonsSelectionItem: document.getElementById('button-place'),
        buttonExitFromTheBag: document.getElementById('button-exit-from-the-bag'),

        buttonLossOfProgressYes: document.getElementById('loss-of-progress-yes'),
        buttonLossOfProgressNo: document.getElementById('loss-of-progress-no'),

        selectionPersonItems: document.getElementById('person-items'),
        buttonReplay: document.getElementById('button-replay'),
        buttonReplayOnVictoryWindow: document.getElementById('button-replay-win')
    }
}

//стартовые настройки видимости
gameState.navigation.buttonReplay.style.display = "none";
gameState.navigation.containerWindowUseItem.style.display = "none";
gameState.navigation.containerVictoryWindow.style.display = "none";
gameState.navigation.containerWindowLossOfProgress.style.display = "none";


// глобальные функции

function getRandomIntInclusive(min, max) { //ф-ия выдает рандомное целое число в заданном диапазоне включительно
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

function onOffButtons(arrButtons, onOff) { //ф-ия вкл и выкл видимости элементов по КЛАССАМ
    for (let button of arrButtons) {
        if (onOff === 0) {
            button.style.display = "none";
        } else if (onOff === 1) {
            button.style.display = "flex";
        }
    }
}

onOffButtons(gameState.navigation.locationButtonsBranchGates, 0) //стартовые настройки видимости
onOffButtons(gameState.navigation.locationButtonsBranchYard, 0)

function getNameItem(findName) { //поиск объектов массива предметов по имени
    for (let index = 0; index <= (gameState.player.gameItemPerson.length - 1); index++) {
        if (gameState.player.gameItemPerson[index].itemName === findName) {
            gameState.player.numberItemInArr = index
            return
        }
    }
}

function createButtonNewItemInBag(nameButtonItem, findName, idButton) { //генерация кнопок предметов в сумке
    nameButtonItem.id = idButton;
    getNameItem(findName)
    nameButtonItem.textContent = `${gameState.player.gameItemPerson[gameState.player.numberItemInArr].itemName}`;
    gameState.navigation.containerButtonsSelectionItem.appendChild(nameButtonItem);
    nameButtonItem.classList.add('button', 'button-use-item');
}

function createArrNameItem() { //генерация списка предметов в сумке для области характеристик персонажа
    gameState.player.nameItemPerson = []
    for (obj of gameState.player.gameItemPerson) {
        gameState.player.nameItemPerson.push(obj.itemName)
    }
}

function addLog(message) {
    const newElementDiv = document.createElement('div');
    newElementDiv.textContent = message;
    gameState.navigation.journalEntries.appendChild(newElementDiv);
}


function mainGame() {

    const gameItemStart = [ //5 стартовых предметов
        {
            itemName: 'Лук с ядовитыми стрелами',
            strength() { return changeConstantlyStrength(2) },
            message: `Старинный лук позволяет нанести урон издалека`,
        },
        {
            itemName: 'Мерзкое зелье здоровья',
            hp() { return changeVariableHp(20) },
            strength() { return changeConstantlyStrength(1) },
            message: `Ужасно на вкус, но это закаляет дух!`,
        },
        {
            itemName: 'Вонючая бомба',
            strength() { return changeConstantlyStrength(3) },
            agility() { return changeConstantlyAgility(-1) },
            message: `Ты стал сильнее, но какой ценой?`,
        },
        {
            itemName: 'Отрезвляющий Эль',
            hp() { return changeVariableHp(20) },
            message: `Неожиданный результат...`,
        },
        {
            itemName: 'Банановая кожура',
            defense() { return changeConstantlyDefense(5) },
            message: `Неловкость врага - твоя защита!`,
        }
    ]

    const gameItemPresent = [ //4 предмета, выпадающих после победы врага
        {
            itemName: 'Жабий яд',
            strength() { return changeConstantlyStrength(2) },
            message: `Капля яда на лезвии оружия еще никому не мешала, главное не напороться самому...`
        },
        {
            itemName: 'Бусы из крысиных зубов',
            hp() { return changeVariableHp(5) },
            agility() { return changeConstantlyAgility(5) },
            message: `Шаманы всегда придавали значение таким трофеям, проверим...`
        },
        {
            itemName: 'Меч с ядовитым лезвием', // в камерной
            strength() { return changeConstantlyStrength(3) },
            agility() { return changeConstantlyAgility(-3) },
            message: `Тяжелый, зато эффективный!`
        },
        {
            itemName: 'Зачарованая ряса', // Для сундука в спальне
            defense() { return changeConstantlyDefense(5) },
            message: `Вышивка с котиком - стиль настоящего воина!`
        }
    ]

    const personCharacters = [ //х-ки перса по расам
        {
            raceName: 'Каджит',
            hp() { return getRandomIntInclusive(70, 80) },
            strength() { return getRandomIntInclusive(12, 15) },
            agility() { return getRandomIntInclusive(10, 12) },
            defense() { return getRandomIntInclusive(5, 10) }
        },
        {
            raceName: 'Рептилоид',
            hp() { return getRandomIntInclusive(80, 90) },
            strength() { return getRandomIntInclusive(12, 15) },
            agility() { return getRandomIntInclusive(8, 10) },
            defense() { return getRandomIntInclusive(5, 10) }
        },
        {
            raceName: 'Орк',
            hp() { return getRandomIntInclusive(110, 120) },
            strength() { return getRandomIntInclusive(15, 20) },
            agility() { return getRandomIntInclusive(-5, -8) },
            defense() { return getRandomIntInclusive(7, 12) }
        },
        {
            raceName: 'Человек',
            hp() { return getRandomIntInclusive(90, 100) },
            strength() { return getRandomIntInclusive(12, 17) },
            agility() { return getRandomIntInclusive(3, 5) },
            defense() { return getRandomIntInclusive(8, 10) }
        }
    ]

    const arrayOfEnemies = [ // массив всех врагов в локациях
        {
            nameEnemy: 'Болотная жаба',
            maxHpEnemy: 20,
            hpEnemy: 20,
            strengthEnemy: 15,
            status: 'undefeated',
            bonusWin() { return changeConstantlyDefense(1) },
            bonusItem() {
                const toadPoison = document.createElement('button');
                const idButtonPresent = 'newElementButtonPresentToadPoison'
                getPresentItem(0, toadPoison, idButtonPresent)
                return
            },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 Я ОТПРАВЛЮСЬ В ЖАБИЙ РАЙ, А ТВОЙ ПУТЬ ТОЛЬКО НАЧАЛСЯ! 🔊`)
            },
            attack: clickOnButtonAttack(0, true, true)
        },
        {
            nameEnemy: 'Дворовая сумасшедсшая',
            maxHpEnemy: 40,//40
            hpEnemy: 40,
            strengthEnemy: 15,//15
            status: 'undefeated',
            bonusWin() { return changeConstantlyAgility(3) },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 Кххх...ВЕЛИКИЕ ДЕЛА - ВЕЛИКИЕ СТРАДАНИЯ, ${gameState.player.startCharacteristics.personName} ... Кххх... 🔊`);
            },
            attack: clickOnButtonAttack(1, true, false)
        },
        {
            nameEnemy: 'Гоблин-конюх',
            maxHpEnemy: 40,
            hpEnemy: 40,
            strengthEnemy: 20,
            status: 'undefeated',
            bonusWin() { return changeConstantlyStrength(5) },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 КОРМИ МОИХ ЛОШАДЕЙ БЕЗГЛЮТЕНОВЫМ ЗЕРНОМ 2 РАЗА В ДЕНЬ! 🔊`);
            },
            attack: clickOnButtonAttack(2, true, false)
        },
        {
            nameEnemy: 'Амбарная крыса',
            maxHpEnemy: 30,
            hpEnemy: 30,
            strengthEnemy: 15,
            status: 'undefeated',
            bonusWin() { return changeConstantlyAgility(2) },
            bonusItem() {
                const ratTeethBeads = document.createElement('button');
                const idButtonPresent = 'newElementButtonPresentRatTeethBeads'
                getPresentItem(1, ratTeethBeads, idButtonPresent)
                return
            },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 МЫ НЕ ВЕШАЕМСЯ В ХОЛОДИЛЬНИКЕ БЕЗ ПРИЧИНЫ! 🔊`);
            },
            attack: clickOnButtonAttack(3, true, true)
        },
        {
            nameEnemy: 'Орк-охранник',
            maxHpEnemy: 70,
            hpEnemy: 70,
            strengthEnemy: 25,
            status: 'undefeated',
            bonusWin() { return changeConstantlyStrength(3) },
            bonusItem() {
                const poisonedSword = document.createElement('button');
                const idButtonPresent = 'newElementButtonPresentPoisonedSword'
                getPresentItem(2, poisonedSword, idButtonPresent)
                return
            },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 КАК БЫ НИ БЛИСТЕЛИ ТВОИ ДОСПЕХИ, ТЫ ПРОСТО ОБЫЧНЫЙ ВОР! 🔊`);
            },
            attack: clickOnButtonAttack(4, true, true)
        },
        {
            nameEnemy: 'Трехглавая собака',
            maxHpEnemy: 7,//70
            hpEnemy: 7,//70
            strengthEnemy: 30,
            status: 'undefeated',
            bonusWin() { return changeConstantlyHp(3) },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 ВАВ...ВАв...вав...Иии...иии... 🔊`);
            },
            attack: clickOnButtonAttack(5, true, false)
        },
        {
            nameEnemy: 'Дракон',
            maxHpEnemy: 12,//120
            hpEnemy: 12,
            strengthEnemy: 20,
            status: 'undefeated',
            bonusWin() { return },
            isUnderAttack: 0,
            winText() {
                addLog(`🔊 ТЕПЕРЬ ЭТО ТВОЙ ЗАМОК, ${gameState.player.startCharacteristics.personName}! 🔊`);
                gameState.navigation.containerVictoryWindow.style.display = "flex";
                function mouseClickOnbuttonReplayOnVictoryWindow(event) {
                    resetProgress();
                    setStartCharacteristics();
                }
                gameState.navigation.buttonReplayOnVictoryWindow.removeEventListener('click', mouseClickOnbuttonReplayOnVictoryWindow);
                gameState.navigation.buttonReplayOnVictoryWindow.addEventListener('click', mouseClickOnbuttonReplayOnVictoryWindow);
            },
            attack: clickOnButtonAttack(6, true, false)
        }
    ]

    function setAllCharacteristics() { //установление базовых хар-к персонажа

        const characterRace = personCharacters[getRandomIntInclusive(0, (personCharacters.length - 1))];
        gameState.player.startCharacteristics.raceName = characterRace.raceName

        const raceToSet = document.getElementById('person-race');
        raceToSet.textContent = `Раса: ${characterRace.raceName}`;


        function setPersonName(arrName) {
            gameState.player.randomName = arrName[getRandomIntInclusive(0, 19)]
            gameState.player.startCharacteristics.personName = gameState.player.randomName;

            const selectionName = document.getElementById('person-name');
            selectionName.textContent = `Имя героя: ${gameState.player.randomName}`;
        }
        setPersonName(gameState.player.personName)

        function setValueMaxHp() {
            gameState.player.maxHp = characterRace.hp();
            gameState.player.lastValueHp = gameState.player.maxHp;
            gameState.player.startCharacteristics.maxHp = gameState.player.maxHp;

            gameState.navigation.hpToSet.textContent = `Здоровье: ${gameState.player.lastValueHp}/${gameState.player.maxHp}`;
        }
        setValueMaxHp();

        function setValueStrength() {
            gameState.player.valueStrength = characterRace.strength();
            gameState.player.startCharacteristics.valueStrength = gameState.player.valueStrength;

            const strengthToSet = document.getElementById('person-strength');
            strengthToSet.textContent = `Сила: ${gameState.player.valueStrength}`;
        }
        setValueStrength();

        function setValueAgility() {
            gameState.player.valueAgility = characterRace.agility();
            gameState.player.startCharacteristics.valueAgility = gameState.player.valueAgility;

            const agilityToSet = document.getElementById('person-agility');
            agilityToSet.textContent = `Ловкость: ${gameState.player.valueAgility}`;
        }
        setValueAgility();

        function setValueDefense() {
            gameState.player.valueDefense = characterRace.defense();
            gameState.player.startCharacteristics.valueDefense = gameState.player.valueDefense;

            const defenseToSet = document.getElementById('person-defense');
            defenseToSet.textContent = `Броня: ${gameState.player.valueDefense}`;
        }
        setValueDefense();

        function setPersonItems() {
            const numberrandomItem1 = getRandomIntInclusive(0, (gameItemStart.length - 1))
            const randomItem1 = gameItemStart[numberrandomItem1];
            gameState.player.startCharacteristics.randomItem1 = randomItem1;
            gameState.player.gameItemPerson.push(deepCopy(randomItem1));
            gameItemStart.splice(numberrandomItem1, 1) // чтобы второй предмет не дублировал 1й

            const randomItem2 = gameItemStart[getRandomIntInclusive(0, (gameItemStart.length - 1))];
            gameState.player.startCharacteristics.randomItem2 = randomItem2;
            gameState.player.gameItemPerson.push(deepCopy(randomItem2));
            createArrNameItem()
            gameItemStart.push(deepCopy(randomItem1));// чтобы вернуть 1й предмет в массив

            const newElementButton1 = document.createElement('button');
            const newElementButton2 = document.createElement('button');
            const idButton1 = 'newElementButton1'
            const idButton2 = 'newElementButton2'
            createButtonNewItemInBag(newElementButton1, randomItem1.itemName, idButton1);
            createButtonNewItemInBag(newElementButton2, randomItem2.itemName, idButton2);
            const elementButton1 = document.getElementById(idButton1);
            const elementButton2 = document.getElementById(idButton2);
            gameState.navigation.selectionPersonItems.textContent = `Предметы: ${gameState.player.nameItemPerson.join(', ')}`;

            clickOnButtonChooseItem(newElementButton1, elementButton1, randomItem1.itemName);
            clickOnButtonChooseItem(newElementButton2, elementButton2, randomItem2.itemName);
        }
        setPersonItems();
    }
    setAllCharacteristics()

    function resetProgress() { //обнуление прогресса игры
        onOffButtons(gameState.navigation.allButtons, 1);
        onOffButtons(gameState.navigation.locationButtonsBranchGates, 0);
        onOffButtons(gameState.navigation.locationButtonsBranchYard, 0);
        onOffButtons(gameState.navigation.locationButtonsHill, 1);
        for (obj of arrayOfEnemies) {
            obj.status = 'undefeated';
        }

        gameState.player.presentLocation = 'Холм';
        gameState.navigation.nameCurrentLocation.textContent = `Текущая локация: ${gameState.player.presentLocation}`;
        gameState.navigation.containerButtonsSelectionItem.innerHTML = "";
        gameState.navigation.journalEntries.innerHTML = "Преветсвую, странник! Готов начать свой путь?";

        gameState.navigation.buttonReplay.style.display = "none";
        gameState.navigation.nameCurrentLocation.style.display = 'flex';
        gameState.navigation.containerVictoryWindow.style.display = "none";
    }

    function clickOnButtonReplay() { //кнопка "начать заново" при победе или смерти тем же персом
        function mouseClickOnButtonReplay(event) {
            resetProgress();
            setStartCharacteristics();
            gameState.navigation.buttonReplay.style.display = 'none';
        }
        gameState.navigation.buttonReplay.removeEventListener('click', mouseClickOnButtonReplay);
        gameState.navigation.buttonReplay.addEventListener('click', mouseClickOnButtonReplay);
    }

    function mouseClickOnButtonLossOfProgressNo(event) {
        gameState.navigation.containerWindowLossOfProgress.style.display = "none";
    }

    function clickOnButtonLossOfProgressNo() {
        gameState.navigation.buttonLossOfProgressNo.removeEventListener('click', mouseClickOnButtonLossOfProgressNo);
        gameState.navigation.buttonLossOfProgressNo.addEventListener('click', mouseClickOnButtonLossOfProgressNo);
    }
    clickOnButtonLossOfProgressNo()

    function mouseClickOnButtonLossOfProgressYesPersonChange(event) {
        gameState.player.gameItemPerson = []
        resetProgress()
        setAllCharacteristics()
        gameState.navigation.containerWindowLossOfProgress.style.display = "none";
    }

    function clickOnButtonPersonChange() {//кнопка изменения персонажа
        function mouseClickOnButtonPersonChange(event) {
            gameState.navigation.containerWindowLossOfProgress.style.display = "flex";

            gameState.navigation.buttonLossOfProgressYes.removeEventListener('click', mouseClickOnButtonLossOfProgressYesPersonChange, { once: true });
            gameState.navigation.buttonLossOfProgressYes.addEventListener('click', mouseClickOnButtonLossOfProgressYesPersonChange, { once: true });
        }
        gameState.navigation.buttonPersonChange.removeEventListener('click', mouseClickOnButtonPersonChange);
        gameState.navigation.buttonPersonChange.addEventListener('click', mouseClickOnButtonPersonChange);
    }
    clickOnButtonPersonChange()

    function mouseClickOnbuttonLossOfProgressYesPersonReplay(event) {
        resetProgress()
        setStartCharacteristics()
        gameState.navigation.containerWindowLossOfProgress.style.display = "none";
    }

    function clickOnButtonPersonReplay() {//кнопка начать заново (в любой момент игры) с модальным окном
        function mouseClickOnButtonPersonReplay(event) {
            gameState.navigation.containerWindowLossOfProgress.style.display = "flex";

            gameState.navigation.buttonLossOfProgressYes.removeEventListener('click', mouseClickOnbuttonLossOfProgressYesPersonReplay, { once: true });
            gameState.navigation.buttonLossOfProgressYes.addEventListener('click', mouseClickOnbuttonLossOfProgressYesPersonReplay, { once: true });
        }
        gameState.navigation.buttonPersonReplay.removeEventListener('click', mouseClickOnButtonPersonReplay);
        gameState.navigation.buttonPersonReplay.addEventListener('click', mouseClickOnButtonPersonReplay);
    }
    clickOnButtonPersonReplay()

    function clickOnButtonExitFromTheBag() {// кнопка выйти из сумки
        function mouseClickOnButtonExitFromTheBag(event) {
            gameState.navigation.containerWindowUseItem.style.display = 'none'
        }
        gameState.navigation.buttonExitFromTheBag.removeEventListener('click', mouseClickOnButtonExitFromTheBag);
        gameState.navigation.buttonExitFromTheBag.addEventListener('click', mouseClickOnButtonExitFromTheBag);
    }
    clickOnButtonExitFromTheBag()

    function clickOnButtonUseItem() {// кнопка "использовать предмет"
        function mouseClickOnButtonUseItem(event) {
            gameState.navigation.containerWindowUseItem.style.display = "flex";
        }
        gameState.navigation.buttonUseItem.removeEventListener('click', mouseClickOnButtonUseItem);
        gameState.navigation.buttonUseItem.addEventListener('click', mouseClickOnButtonUseItem);
    }
    clickOnButtonUseItem()

    function mouseClickOnButtonComeBack(event) {
        for (let index = 0; index <= (arrayOfEnemies.length - 1); index++) {
            arrayOfEnemies[index].hpEnemy = arrayOfEnemies[index].maxHpEnemy
        }

        switch (gameState.player.presentLocation) {
            case 'Холм':
                onOffButtons(gameState.navigation.locationButtonsHill, 1);
                onOffButtons(gameState.navigation.locationButtonsBranchGates, 0)
                onOffButtons(gameState.navigation.locationButtonsBranchYard, 0)
                break
            case 'Ров':
            case 'Ворота замка':
            case 'Двор':
                onOffButtons(gameState.navigation.locationButtonsHill, 1);
                onOffButtons(gameState.navigation.locationButtonsBranchYard, 0);
                onOffButtons(gameState.navigation.locationButtonsGates, 0);
                gameState.player.presentLocation = 'Холм';
                break
            case 'Амбар':
            case 'Конюшня':
                onOffButtons(gameState.navigation.locationButtonsBranchYard, 1);
                onOffButtons(gameState.navigation.locationButtonsHill, 0);
                gameState.player.presentLocation = 'Двор';
                break
            case 'Лекарь':
            case 'Камерная':
            case 'Лестница':
                onOffButtons(gameState.navigation.locationButtonsGates, 1);
                onOffButtons(gameState.navigation.locationButtonsHill, 0);
                onOffButtons(gameState.navigation.locationButtonsStaircase, 0);
                gameState.player.presentLocation = 'Ворота замка';
                break
            case 'Спальня':
            case 'Тронный зал':
                gameState.navigation.buttonBedroomBox.style.display = "none";
                gameState.navigation.buttonDonjon.style.display = "none";
                onOffButtons(gameState.navigation.locationButtonsStaircase, 1);
                onOffButtons(gameState.navigation.locationButtonsHill, 0);
                onOffButtons(gameState.navigation.locationButtonsGates, 0);
                gameState.player.presentLocation = 'Лестница';
                break
            case 'Главная башня':
                gameState.navigation.buttonDonjon.style.display = "flex";
                onOffButtons(gameState.navigation.locationButtonsHill, 0);
                onOffButtons(gameState.navigation.locationButtonsGates, 0);
                onOffButtons(gameState.navigation.locationButtonsStaircase, 0);
                gameState.player.presentLocation = 'Тронный зал';
                break
        }
        gameState.navigation.nameCurrentLocation.textContent = `Текущая локация: ${gameState.player.presentLocation}`;
        gameState.navigation.journalEntries.innerHTML = `Продолжай свой путь`
        setIsUnderAttackNull()
    }

    function clickOnButtonComeBack() {// кнопка "вернуться назад"

        gameState.navigation.buttonComeBack.removeEventListener('click', mouseClickOnButtonComeBack);
        gameState.navigation.buttonComeBack.addEventListener('click', mouseClickOnButtonComeBack);
    }
    clickOnButtonComeBack()

    function setStartCharacteristics() {//запоминание/запись стартовых хар-к персонажа

        const characterRace = gameState.player.startCharacteristics.raceName;
        const raceToSet = document.getElementById('person-race');
        raceToSet.textContent = `Раса: ${characterRace}`;

        function setPersonName(arrName) {
            gameState.player.randomName = gameState.player.startCharacteristics.personName;

            const selectionName = document.getElementById('person-name');
            selectionName.textContent = `Имя героя: ${gameState.player.randomName}`;
        }
        setPersonName(gameState.player.personName)

        function setValueMaxHp() {
            gameState.player.maxHp = gameState.player.startCharacteristics.maxHp;
            gameState.player.lastValueHp = gameState.player.maxHp;

            gameState.navigation.hpToSet.textContent = `Здоровье: ${gameState.player.lastValueHp}/${gameState.player.maxHp}`;
        }
        setValueMaxHp();

        function setValueStrength() {
            gameState.player.valueStrength = gameState.player.startCharacteristics.valueStrength;

            const strengthToSet = document.getElementById('person-strength');
            strengthToSet.textContent = `Сила: ${gameState.player.valueStrength}`;
        }
        setValueStrength();

        function setValueAgility() {
            gameState.player.valueAgility = gameState.player.startCharacteristics.valueAgility;

            const agilityToSet = document.getElementById('person-agility');
            agilityToSet.textContent = `Ловкость: ${gameState.player.valueAgility}`;
        }
        setValueAgility();

        function setValueDefense() {
            gameState.player.valueDefense = gameState.player.startCharacteristics.valueDefense;

            const defenseToSet = document.getElementById('person-defense');
            defenseToSet.textContent = `Броня: ${gameState.player.valueDefense}`;
        }
        setValueDefense();

        gameState.player.gameItemPerson = []

        function setPersonItems() {
            const randomItem1 = gameState.player.startCharacteristics.randomItem1;
            const randomItem2 = gameState.player.startCharacteristics.randomItem2;
            gameState.player.gameItemPerson.push(deepCopy(randomItem1));
            gameState.player.gameItemPerson.push(deepCopy(randomItem2));
            createArrNameItem()

            const newElementButton1 = document.createElement('button');
            const newElementButton2 = document.createElement('button');
            createButtonNewItemInBag(newElementButton1, randomItem1.itemName);
            createButtonNewItemInBag(newElementButton2, randomItem2.itemName);
            newElementButton1.id = "newElementButton1";
            newElementButton2.id = "newElementButton2";
            const elementButton1 = document.getElementById('newElementButton1');
            const elementButton2 = document.getElementById('newElementButton2');
            gameState.navigation.selectionPersonItems.textContent = `Предметы: ${gameState.player.nameItemPerson.join(', ')}`;

            clickOnButtonChooseItem(newElementButton1, elementButton1, randomItem1.itemName);
            clickOnButtonChooseItem(newElementButton2, elementButton2, randomItem2.itemName);
        }
        setPersonItems();

        gameState.navigation.journalEntries.innerHTML = "";
        addLog(`Преветсвую, странник! Готов начать свой путь?`);
    }

    function personDeath() { //ф-ия сценария при смерти перса
        onOffButtons(gameState.navigation.allButtons, 0);

        gameState.navigation.nameCurrentLocation.style.display = 'none';
        gameState.navigation.buttonReplay.style.display = 'flex';
        clickOnButtonReplay();
    }

    function getPresentItem(numberItem, nameButton, idButtonPresent) { //ф-ия добавления предмета в сумку в процессе игры
        gameState.player.gameItemPerson.push(gameItemPresent[numberItem]);
        createArrNameItem()

        createButtonNewItemInBag(nameButton, gameItemPresent[numberItem].itemName, idButtonPresent);
        const nameElementButton = document.getElementById(idButtonPresent);
        gameState.navigation.selectionPersonItems.textContent = `Предметы: ${gameState.player.nameItemPerson.join(', ')}`;
        setTimeout(() => {
            addLog(`ПРЕДМЕТ: "${gameItemPresent[numberItem].itemName}" добавлен в сумку`)
        }, 2000);

        clickOnButtonChooseItem(nameButton, nameElementButton, gameItemPresent[numberItem].itemName);
    }

    function setIsUnderAttackNull() { //выведение врага из атаки, чтобы он не переходил в др. локацию
        for (let index = 0; index <= (arrayOfEnemies.length - 1); index++) {
            arrayOfEnemies[index].isUnderAttack = 0
        }
    }

    function attackEnemy(enemyIndex, bonusWin, bonusItem) { // атака и получение бонусов
        let newState = {}; // копируем, чтобы не мутировать напрямую
        newState.enemies = [ ...arrayOfEnemies ];
        newState.player = { ...gameState.player };
        const events = [];
        const enemy = newState.enemies[enemyIndex];
        const player = newState.player;

        if (enemy.status === 'defeated') {
            events.push('Все враги в локации побеждены!');
            return { newState, events };
        }

        // Урон по врагу
        const damageToEnemy = player.valueStrength + getRandomIntInclusive(0, player.valueAgility);
        enemy.hpEnemy = Math.max(enemy.hpEnemy - damageToEnemy, 0);
        events.push(`${enemy.nameEnemy} получил -${damageToEnemy} HP (HP: ${enemy.hpEnemy}/${enemy.maxHpEnemy})`);


        // Урон по игроку
        const damageToPlayer = Math.max(
            enemy.strengthEnemy - player.valueDefense - getRandomIntInclusive(0, player.valueAgility),
            0
        );
        player.lastValueHp = Math.max(player.lastValueHp - damageToPlayer, 0);
        events.push(`Ты получаешь -${damageToPlayer} HP`);


        // Проверка смерти игрока
        if (player.lastValueHp === 0) {
            events.push('***ТЫ УМЕР В БОЮ*** Викинги могут тебе только позавидовать!');
            // Тут можно вернуть состояние с флагом смерти
        }

        // Проверка смерти врага
        if (enemy.hpEnemy === 0) {
            enemy.status = 'defeated';
            events.push(`Враг ${enemy.nameEnemy} побежден!`);
            if (bonusWin) enemy.bonusWin();
            if (bonusItem) enemy.bonusItem();
        }

        return { newState, events };
    }

    function renderBattle(newState, events) { // рендер и лог по итогу атаки
        // Обновляем HP игрока
        gameState.navigation.hpToSet.textContent = `Здоровье: ${newState.player.lastValueHp}/${newState.player.maxHp}`;

        // Пишем в лог
        events.forEach(e => addLog(e));
    }

    function clickOnButtonAttack(enemyIndex, bonusWin, bonusItem) {
        function mouseClickOnButtonAttack() {
            if (arrayOfEnemies[enemyIndex].isUnderAttack === 1) {
                const { newState, events } = attackEnemy(enemyIndex, bonusWin, bonusItem);
                gameState.player = newState.player;
                renderBattle(newState, events);

                if (gameState.player.lastValueHp === 0) {
                    personDeath();
                }
            }
        }

        gameState.navigation.buttonAttack.removeEventListener('click', mouseClickOnButtonAttack);
        gameState.navigation.buttonAttack.addEventListener('click', mouseClickOnButtonAttack);
    }

    function clickOnButtonChooseItem(itemButton, elementButton, findName) { // кнопки выбора предмета в сумке
        function mouseClickOnButtonChooseItem(event) {
            getNameItem(findName)
            const itemUsed = gameState.player.gameItemPerson[gameState.player.numberItemInArr];
            const itemUsedName = itemUsed.itemName;
            const itemUsedMessage = itemUsed.message;

            if (itemUsed.hp) {
                itemUsed.hp()
            }
            if (itemUsed.strength) {
                itemUsed.strength()
            }
            if (itemUsed.agility) {
                itemUsed.agility()
            }
            if (itemUsed.defense) {
                itemUsed.defense()
            }
            elementButton.remove()
            gameState.player.gameItemPerson.splice(gameState.player.numberItemInArr, 1);

            createArrNameItem()

            addLog(`★ Ты использовал предмет: ${itemUsedName}. 
            ${itemUsedMessage} ★`);

            let itemText = `Предметы: ${gameState.player.nameItemPerson.join(', ')}`
            if (gameState.player.nameItemPerson.length === 0) {
                itemText = `Предметы: пусто`
            }
            gameState.navigation.selectionPersonItems.textContent = `${itemText}`;
            gameState.navigation.containerWindowUseItem.style.display = "none";
        }

        itemButton.removeEventListener('click', mouseClickOnButtonChooseItem);
        itemButton.addEventListener('click', mouseClickOnButtonChooseItem);
    }

    function changeVariableHp(bonusHp) { //ф-ия меняет переменное (не макс) значение здоровья на заданное кол-во 
        let newValueHp = gameState.player.lastValueHp + bonusHp;
        gameState.player.bonusValue = bonusHp;

        if ((0 <= newValueHp) && (newValueHp < gameState.player.maxHp)) {
            gameState.player.lastValueHp = newValueHp;

        } else if (newValueHp >= gameState.player.maxHp) {
            gameState.player.lastValueHp = gameState.player.maxHp

        } else {
            gameState.player.lastValueHp = 0;
        }

        gameState.navigation.hpToSet.textContent = `Здоровье: ${gameState.player.lastValueHp}/${gameState.player.maxHp}`;
        setTimeout(() => {
            addLog(`БОНУС: подлечился на +${bonusHp} HP`);
        }, 1000);
    }

    function changeConstantlyHp(bonusHp) { //ф-ия меняет постоянное (макс.) значение здоровья на заданное кол-во
        const newMaxValueHp = gameState.player.maxHp + bonusHp;
        gameState.player.maxHp = newMaxValueHp;

        gameState.navigation.hpToSet.textContent = `Здоровье: ${gameState.player.lastValueHp}/${gameState.player.maxHp}`;
        setTimeout(() => {
            addLog(`БОНУС: +${bonusHp} к максимальному значению здоровья`);
        }, 1000)
    }

    function changeConstantlyStrength(bonusStrength) { //ф-ия меняет постоянное значение силы на заданное кол-во
        gameState.player.lastValueStrength = gameState.player.valueStrength + bonusStrength;
        gameState.player.valueStrength = gameState.player.lastValueStrength;

        const strengthToChange = document.getElementById('person-strength');
        strengthToChange.textContent = `Сила: ${gameState.player.lastValueStrength}`;
        setTimeout(() => {
            addLog(`БОНУС: +${bonusStrength} к силе`);
        }, 1000)
    }

    function changeConstantlyAgility(bonusAgility) { //ф-ия меняет постоянное значение ловкости на заданное кол-во
        gameState.player.lastValueAgility = gameState.player.valueAgility + bonusAgility;
        gameState.player.valueAgility = gameState.player.lastValueAgility;

        const agilityToChange = document.getElementById('person-agility');
        agilityToChange.textContent = `Ловкость: ${gameState.player.lastValueAgility}`;
        setTimeout(() => {
            if (bonusAgility > 0) {
                addLog(`БОНУС: +${bonusAgility} к ловкости`);
            } else if (bonusAgility < 0) {
                addLog(`Расплата: ${bonusAgility} к ловкости`);
            }
        }, 1000);
    }

    function changeConstantlyDefense(bonusDefense) { //ф-ия меняет постоянное значение брони на заданное кол-во
        gameState.player.lastValueDefense = gameState.player.valueDefense + bonusDefense;
        gameState.player.valueDefense = gameState.player.lastValueDefense;

        const defenseToChange = document.getElementById('person-defense');
        defenseToChange.textContent = `Броня: ${gameState.player.lastValueDefense}`;
        setTimeout(() => {
            addLog(`БОНУС: +${bonusDefense} к броне`);
        }, 1000);
    }

    function renderLocation(name, classOff, classOn, idNone, idFlex) { //ИЗменение UI локации
        gameState.player.presentLocation = name;

        if (classOff != 0) {
            onOffButtons(classOff, 0);
        }
        if (classOn != 0) {
            onOffButtons(classOn, 1)
        }
        if (idNone != 0) {
            idNone.style.display = 'none';
        }
        if (idFlex != 0) {
            idFlex.style.display = 'flex';
        }

        gameState.navigation.nameCurrentLocation.textContent = `Текущая локация: ${name}`;
    }

    function startBattle(enemyIndex, messageLocation) {
        setIsUnderAttackNull()
        arrayOfEnemies[enemyIndex].isUnderAttack = 1;
        if (arrayOfEnemies[enemyIndex].status === 'undefeated') {
            gameState.player.lastValueHpEnemy = arrayOfEnemies[enemyIndex].hpEnemy;
            arrayOfEnemies[enemyIndex].attack;
            switch (messageLocation) {
                case 'Стандарт':
                case 'Тронный зал':
                    gameState.navigation.journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[enemyIndex].nameEnemy}. HP: ${arrayOfEnemies[enemyIndex].maxHpEnemy}/${arrayOfEnemies[enemyIndex].maxHpEnemy}`;
                    break
                case 'Главная башня':
                    gameState.navigation.journalEntries.innerHTML = `Вот и оно, древнее зло... ${arrayOfEnemies[6].nameEnemy}. HP: ${arrayOfEnemies[6].maxHpEnemy}/${arrayOfEnemies[6].maxHpEnemy}`;
                    break
            }
        } else {
            switch (messageLocation) {
                case 'Стандарт':
                    gameState.navigation.journalEntries.innerHTML = `Продолжай свой путь`;
                    break
                case 'Тронный зал':
                    gameState.navigation.journalEntries.innerHTML = `Главная башня! Цель многих рыцарей, говорят именно там храняться несметные богатства и таится древнее зло... `
                    break
                case 'Главная башня':
                    gameState.navigation.journalEntries.innerHTML = `Можешь гордиться собой, воин! Ты победил всех врагов!`
                    break
            }
        }
    }

    function mouseClickOnLocationDitch(event) {
        startBattle(0, 'Стандарт');
        renderLocation('Ров', gameState.navigation.locationButtonsHill, 0, 0, 0)
    }

    function clickOnLocationDitch() { // кнопка "Ров"
        gameState.navigation.buttonDitch.removeEventListener('click', mouseClickOnLocationDitch);
        gameState.navigation.buttonDitch.addEventListener('click', mouseClickOnLocationDitch);
    }
    clickOnLocationDitch();

    function mouseClickOnLocationYard(event) {
        startBattle(1, 'Стандарт');
        renderLocation('Двор', gameState.navigation.locationButtonsHill, gameState.navigation.locationButtonsBranchYard, 0, 0)
    }

    function clickOnLocationYard() {  // кнопка "Двор"
        gameState.navigation.buttonYard.removeEventListener('click', mouseClickOnLocationYard);
        gameState.navigation.buttonYard.addEventListener('click', mouseClickOnLocationYard);
    }
    clickOnLocationYard()

    function mouseClickOnLocationBarn(event) {
        if (arrayOfEnemies[1].status === 'defeated') {
            startBattle(3, 'Стандарт');
            renderLocation('Амбар', gameState.navigation.locationButtonsBranchYard, 0, 0, 0);
        } else {
            addLog(`ЧТОБЫ ПРОЙТИ ДАЛЬШЕ победите врага ${arrayOfEnemies[1].nameEnemy} в локации Двор!`);
        }
    }

    function clickOnLocationBarn() { // кнопка "Амбар"
        gameState.navigation.buttonBarn.removeEventListener('click', mouseClickOnLocationBarn);
        gameState.navigation.buttonBarn.addEventListener('click', mouseClickOnLocationBarn);
    }
    clickOnLocationBarn()

    function mouseClickOnLocationStable(event) {
        if (arrayOfEnemies[1].status === 'defeated') {
            startBattle(2, 'Стандарт');
            renderLocation('Конюшня', gameState.navigation.locationButtonsBranchYard, 0, 0, 0);

        } else {
            addLog(`ЧТОБЫ ПРОЙТИ ДАЛЬШЕ победите врага ${arrayOfEnemies[1].nameEnemy} в локации Двор!`);
        }
    }

    function clickOnLocationStable() { // кнопка "Конюшня"
        gameState.navigation.buttonStable.removeEventListener('click', mouseClickOnLocationStable);
        gameState.navigation.buttonStable.addEventListener('click', mouseClickOnLocationStable);
    }
    clickOnLocationStable()

    function mouseClickOnLocationGates(event) {
        renderLocation('Ворота замка', gameState.navigation.locationButtonsHill, gameState.navigation.locationButtonsGates, 0, 0);
    }

    function clickOnLocationGates() { // кнопка "Ворота замка"
        gameState.navigation.buttonGates.removeEventListener('click', mouseClickOnLocationGates);
        gameState.navigation.buttonGates.addEventListener('click', mouseClickOnLocationGates);
    }
    clickOnLocationGates()

    function mouseClickOnLocationDoctor(event) {
        changeVariableHp(10);

        gameState.navigation.journalEntries.innerHTML = `${gameState.player.randomName}, отдохни немного и залечи свои раны прохладным Элем!`

        renderLocation('Лекарь', gameState.navigation.locationButtonsBranchGates, 0, 0, 0);

        setTimeout(() => {
            addLog(`+${gameState.player.bonusValue} к здоровью`);
        }, 1000);
    }

    function clickOnLocationDoctor() { // кнопка "Лекарь"
        gameState.navigation.buttonDoctor.removeEventListener('click', mouseClickOnLocationDoctor);
        gameState.navigation.buttonDoctor.addEventListener('click', mouseClickOnLocationDoctor);
    }
    clickOnLocationDoctor()

    function mouseClickOnLocationWeapons(event) {
        startBattle(4, 'Стандарт');
        renderLocation('Камерная', gameState.navigation.locationButtonsGates, 0, 0, 0);
    }

    function clickOnLocationWeapons() { // кнопка "Камерная"
        gameState.navigation.buttonWeapons.removeEventListener('click', mouseClickOnLocationWeapons);
        gameState.navigation.buttonWeapons.addEventListener('click', mouseClickOnLocationWeapons);
    }
    clickOnLocationWeapons()

    function mouseClickOnLocationStaircase(event) {
        gameState.navigation.journalEntries.innerHTML = `Странно... Лестница совершенно пуста, ни охраны, ни вонючей крысы, что-то тут не так!`

        renderLocation('Лестница', gameState.navigation.locationButtonsGates, gameState.navigation.locationButtonsStaircase, 0, 0);
    }

    function clickOnLocationStaircase() { // кнопка "Лестница"
        gameState.navigation.buttonStaircase.removeEventListener('click', mouseClickOnLocationStaircase);
        gameState.navigation.buttonStaircase.addEventListener('click', mouseClickOnLocationStaircase);
    }
    clickOnLocationStaircase()

    function mouseClickOnLocationBedroom(event) {
        gameState.navigation.journalEntries.innerHTML = `Старый сундук... посмотрим!`;
        renderLocation('Спальня', gameState.navigation.locationButtonsStaircase, 0, 0, gameState.navigation.buttonBedroomBox);
    }

    function clickOnLocationBedroom() { // кнопка "Спальня"
        gameState.navigation.buttonBedroom.removeEventListener('click', mouseClickOnLocationBedroom);
        gameState.navigation.buttonBedroom.addEventListener('click', mouseClickOnLocationBedroom);
    }
    clickOnLocationBedroom()

    function mouseClickOnLocationBedroomBox(event) {
        gameState.navigation.buttonBedroomBox.style.display = 'none';
        gameState.navigation.journalEntries.innerHTML = `• Награда за смелость...3...2...1...`

        function bonusItem() {
            const enchantedRobe = document.createElement('button');
            const idButtonPresent = 'newElementButtonPresentEnchantedRobe';

            getPresentItem(3, enchantedRobe, idButtonPresent);
            return
        }
        bonusItem()
    }

    function clickOnLocationBedroomBox() { // кнопка "Сундук" в спальне
        gameState.navigation.buttonBedroomBox.removeEventListener('click', mouseClickOnLocationBedroomBox, { once: true });
        gameState.navigation.buttonBedroomBox.addEventListener('click', mouseClickOnLocationBedroomBox, { once: true });
    }
    clickOnLocationBedroomBox()

    function mouseClickOnLocationThroneRoom(event) {
        startBattle(5, 'Тронный зал');
        renderLocation('Тронный зал', gameState.navigation.locationButtonsStaircase, 0, 0, gameState.navigation.buttonDonjon);
    }

    function clickOnLocationThroneRoom() { // кнопка "Тронный зал"
        gameState.navigation.buttonThroneRoom.removeEventListener('click', mouseClickOnLocationThroneRoom);
        gameState.navigation.buttonThroneRoom.addEventListener('click', mouseClickOnLocationThroneRoom);
    }
    clickOnLocationThroneRoom()

    function mouseClickOnLocationDonjon(event) {
        if (arrayOfEnemies[5].status === 'defeated') {
            startBattle(6, 'Главная башня');
            renderLocation('Главная башня', 0, 0, gameState.navigation.buttonDonjon, 0);
        } else {
            addLog(`ЧТОБЫ ПРОЙТИ ДАЛЬШЕ победите врага ${arrayOfEnemies[5].nameEnemy} в локации Тронный зал!`);
        }
    }
    
    function clickOnLocationDonjon() { // кнопка "Главная башня"
        gameState.navigation.buttonDonjon.removeEventListener('click', mouseClickOnLocationDonjon);
        gameState.navigation.buttonDonjon.addEventListener('click', mouseClickOnLocationDonjon);
    }
    clickOnLocationDonjon()
}
mainGame()
