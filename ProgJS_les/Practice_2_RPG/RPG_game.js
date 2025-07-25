// Возможные доработки: 

// сделать память, чтобы при перезагрузке прогресс и перс не терялись (localStorage, JSON)
// атака - после победы не прекращается, можно кликать бесконечно (отмена кликера или переброс в пред. или другую локацию?)
// при одном открытиии кнопка "открыть сундук" не должна появляется, можно вывести сообщение в журнал, что тут ничего нет
// Кнопка главной башни появляется после победы врага в посл. локации



// переменные за глобал ф-ией
let maxHp = 0;
let lastValueHp = 0;
let bonusValue = 0;
let randomName = 0;
let valueStrength = 0;
let valueAgility = 0;
let valueDefense = 0;
let lastValueStrength = 0;
let lastValueAgility = 0;
let lastValueDefense = 0;
let lastValueHpEnemy = 0;
let numberItemInArr = 0

let presentLocation = 'Холм';


// стартовые переменные
// переменные навмгации (ById, ByClassName)
const buttonPersonChange = document.getElementById('button-person-change');
const buttonPersonReplay = document.getElementById('button-person-replay');

const hpToSet = document.getElementById('person-hp');

const nameCurrentLocation = document.getElementById('name-of-the-current-location');
const journalEntries = document.getElementById('journal-entries');

const buttonDitch = document.getElementById('location-ditch');
const buttonGates = document.getElementById('location-gates');
const buttonYard = document.getElementById('location-yard');

const buttonsInsideJustHill = document.getElementsByClassName('button-location-hill');
const buttonsInsideJustTheGates = document.getElementsByClassName('location-gates');
const buttonDoctor = document.getElementById('location-doctor');
const buttonWeapons = document.getElementById('location-weapons');
const buttonStaircase = document.getElementById('location-staircase');

const buttonsInsideJustStaircase = document.getElementsByClassName('location-staircase-rooms');
const buttonBedroom = document.getElementById('location-bedroom');
const buttonBedroomBox = document.getElementById('bedroom-box');
const buttonThroneRoom = document.getElementById('location-throne-room');
const buttonDonjon = document.getElementById('location-donjon');

const buttonBarn = document.getElementById('location-barn');
const buttonStable = document.getElementById('location-stable');

const allButtonsInsideTheGates = document.getElementsByClassName('button-location-gates');
const allButtonsInsideTheYard = document.getElementsByClassName('button-location-yard');
const allButtons = document.getElementsByClassName('button');

const buttonAttack = document.getElementById('button-attack');
const buttonComeBack = document.getElementById('button-come-back');
const buttonUseItem = document.getElementById('button-use-item');

const containerWindowUseItem = document.getElementById('container-window-use-item');
const containerWindowWin = document.getElementById('container-window-win');
const containerWindowLossOfProgress = document.getElementById('container-window-loss-of-progress');

const buttonPlace = document.getElementById('button-place');
const buttonPlaceWin = document.getElementById('button-place-win');
const buttonExitFromTheBag = document.getElementById('button-exit-from-the-bag');

const buttonLossOfProgressYes = document.getElementById('loss-of-progress-yes');
const buttonLossOfProgressNo = document.getElementById('loss-of-progress-no');

const selectionPersonItems = document.getElementById('person-items');
const selectionlocation = document.getElementById('location-selection');

const buttonReplay = document.getElementById('button-replay');
const buttonReplayWin = document.getElementById('button-replay-win');

//стартовые настройки видимости
buttonReplay.style.display = "none";
containerWindowUseItem.style.display = "none";
containerWindowWin.style.display = "none";
containerWindowWin.style.display = "none";
containerWindowLossOfProgress.style.display = "none";

// переменные массивы и объекты
const personName = [
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

let gameItemPerson = [];
let nameItemPerson = [];
let startCharacteristics = {}

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
onOffButtons(allButtonsInsideTheGates, 0) //стартовые настройки видимости
onOffButtons(allButtonsInsideTheYard, 0)

function getNameItem(findName) { //поиск объектов массива предметов по имени
    for (let index = 0; index <= (gameItemPerson.length - 1); index++) {
        if (gameItemPerson[index].itemName === findName) {
            numberItemInArr = index
            return
        } else {
            numberItemInArr = 'не найден'
        }
    }
}


function createButtonNewItemInBag(nameButtonItem, findName, idButton) { //генерация кнопок предметов в сумке
    nameButtonItem.id = idButton;
    getNameItem(findName)
    nameButtonItem.textContent = `${gameItemPerson[numberItemInArr].itemName}`;
    buttonPlace.appendChild(nameButtonItem);
    nameButtonItem.classList.add('button', 'button-use-item');
}

function createArrNameItem() { //генерация списка предметов в сумке для области характеристик персонажа
    nameItemPerson = []
    for (obj of gameItemPerson) {
        nameItemPerson.push(obj.itemName)
    }
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
            strengthEnemy: 10,
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
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 Я ОТПРАВЛЮСЬ В ЖАБИЙ РАЙ, А ТВОЙ ПУТЬ ТОЛЬКО НАЧАЛСЯ! 🔊`;
                journalEntries.appendChild(newElementDiv);
            },
            attack: clickOnButtonAttack(0, 1, 1)
        },
        {
            nameEnemy: 'Дворовая сумасшедсшая',
            maxHpEnemy: 30,
            hpEnemy: 30,
            strengthEnemy: 15,
            status: 'undefeated',
            bonusWin() { return changeConstantlyAgility(3) },
            isUnderAttack: 0,
            winText() {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 Кххх...ВЕЛИКИЕ ДЕЛА - ВЕЛИКИЕ СТРАДАНИЯ, ${startCharacteristics.personName} ... Кххх... 🔊`;
                journalEntries.appendChild(newElementDiv);
            },
            attack: clickOnButtonAttack(1, 1, 0)
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
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 КОРМИ МОИХ ЛОШАДЕЙ БЕЗГЛЮТЕНОВЫМ ЗЕРНОМ 2 РАЗА В ДЕНЬ! 🔊`;
                journalEntries.appendChild(newElementDiv);
            },
            attack: clickOnButtonAttack(2, 1, 0)
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
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 МЫ НЕ ВЕШАЕМСЯ В ХОЛОДИЛЬНИКЕ БЕЗ ПРИЧИНЫ! 🔊`;
                journalEntries.appendChild(newElementDiv);
            },
            attack: clickOnButtonAttack(3, 1, 1)
        },
        {
            nameEnemy: 'Орк-охранник',
            maxHpEnemy: 60,
            hpEnemy: 60,
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
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 КАК БЫ НИ БЛИСТЕЛИ ТВОИ ДОСПЕХИ, ТЫ ПРОСТО ОБЫЧНЫЙ ВОР! 🔊`;
                journalEntries.appendChild(newElementDiv);
            },
            attack: clickOnButtonAttack(4, 1, 1)
        },
        {
            nameEnemy: 'Трехглавая собака',
            maxHpEnemy: 70,
            hpEnemy: 70,
            strengthEnemy: 30,
            status: 'undefeated',
            bonusWin() { return changeConstantlyHp(3) },
            isUnderAttack: 0,
            winText() {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 ВАВ...ВАв...вав...Иии...иии... 🔊`;
                journalEntries.appendChild(newElementDiv);
            },
            attack: clickOnButtonAttack(5, 1, 0)
        },
        {
            nameEnemy: 'Дракон',
            maxHpEnemy: 90,
            hpEnemy: 90,
            strengthEnemy: 20, 
            status: 'undefeated',
            bonusWin() { return },
            isUnderAttack: 0,
            winText() {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `🔊 ТЕПЕРЬ ЭТО ТВОЙ ЗАМОК, ${startCharacteristics.personName}! 🔊`;
                journalEntries.appendChild(newElementDiv);
                containerWindowWin.style.display = "flex";
                // buttonReplay.style.display = 'flex';
                buttonReplayWin.addEventListener('click', function (event) {
                    resetProgress();
                    setStartCharacteristics();
                });
            },
            attack: clickOnButtonAttack(6, 1, 0)
        }
    ]

    function setAllCharacteristics() { //установление базовых хар-к персонажа

        const raceToSet = document.getElementById('person-race');
        const characterRace = personCharacters[getRandomIntInclusive(0, (personCharacters.length - 1))];
        raceToSet.textContent = `Раса: ${characterRace.raceName}`;
        startCharacteristics.raceName = characterRace.raceName


        function setPersonName(arrName) {
            randomName = arrName[getRandomIntInclusive(0, 19)]
            const selectionName = document.getElementById('person-name');
            selectionName.textContent = `Имя героя: ${randomName}`;
            startCharacteristics.personName = randomName;
        }
        setPersonName(personName)

        function setValueMaxHp() {
            maxHp = characterRace.hp();
            lastValueHp = maxHp;
            hpToSet.textContent = `Здоровье: ${lastValueHp}/${maxHp}`;
            startCharacteristics.maxHp = maxHp;
        }
        setValueMaxHp();

        function setValueStrength() {
            valueStrength = characterRace.strength();
            const strengthToSet = document.getElementById('person-strength');
            strengthToSet.textContent = `Сила: ${valueStrength}`;
            startCharacteristics.valueStrength = valueStrength;
        }
        setValueStrength();

        function setValueAgility() {
            valueAgility = characterRace.agility();
            const agilityToSet = document.getElementById('person-agility');
            agilityToSet.textContent = `Ловкость: ${valueAgility}`;
            startCharacteristics.valueAgility = valueAgility;
        }
        setValueAgility();

        function setValueDefense() {
            valueDefense = characterRace.defense();
            const defenseToSet = document.getElementById('person-defense');
            defenseToSet.textContent = `Броня: ${valueDefense}`;
            startCharacteristics.valueDefense = valueDefense;
        }
        setValueDefense();

        function setPersonItems() {
            const numberrandomItem1 = getRandomIntInclusive(0, (gameItemStart.length - 1))
            const randomItem1 = gameItemStart[numberrandomItem1];
            startCharacteristics.randomItem1 = randomItem1;
            gameItemPerson.push(deepCopy(randomItem1));
            gameItemStart.splice(numberrandomItem1, 1) // чтобы второй предмет не дублировал 1й

            const randomItem2 = gameItemStart[getRandomIntInclusive(0, (gameItemStart.length - 1))];
            startCharacteristics.randomItem2 = randomItem2;
            gameItemPerson.push(deepCopy(randomItem2));
            createArrNameItem()
            gameItemStart.push(deepCopy(randomItem1));// чтобы вернуть 1й предмет в массив

            const newElementButton1 = document.createElement('button');
            const idButton1 = 'newElementButton1'

            createButtonNewItemInBag(newElementButton1, randomItem1.itemName, idButton1)
            const elementButton1 = document.getElementById(idButton1);
            clickOnButtonChooseItem(newElementButton1, elementButton1, randomItem1.itemName)


            const newElementButton2 = document.createElement('button');
            const idButton2 = 'newElementButton2'

            createButtonNewItemInBag(newElementButton2, randomItem2.itemName, idButton2)
            const elementButton2 = document.getElementById(idButton2);
            clickOnButtonChooseItem(newElementButton2, elementButton2, randomItem2.itemName)


            selectionPersonItems.textContent = `Предметы: ${nameItemPerson.join(', ')}`;
        }
        setPersonItems();
    }
    setAllCharacteristics()

    function resetProgress() { //обнуление прогресса игры
        onOffButtons(allButtons, 1);
        onOffButtons(allButtonsInsideTheGates, 0);
        onOffButtons(allButtonsInsideTheYard, 0);
        onOffButtons(buttonsInsideJustHill, 1);
        buttonReplay.style.display = "none";
        presentLocation = 'Холм';
        nameCurrentLocation.textContent = `Текущая локация: ${presentLocation}`;
        nameCurrentLocation.style.display = 'flex';
        for (obj of arrayOfEnemies) {
            obj.status = 'undefeated';
        }
        containerWindowWin.style.display = "none";
        buttonPlace.innerHTML = "";
        journalEntries.innerHTML = "Преветсвую, странник! Готов начать свой путь?";
    }

    function clickOnButtonReplay() { //кнопка "начать заново" при победе или смерти тем же персом
        buttonReplay.addEventListener('click', function (event) {
            resetProgress();
            setStartCharacteristics();
            buttonReplay.style.display = 'none';
        });
    }

    buttonLossOfProgressNo.addEventListener('click', function (event) { //кнопка несогласия перезапустить игру заново
        containerWindowLossOfProgress.style.display = "none";
    });

    buttonPersonChange.addEventListener('click', function (event) { //кнопка изменения персонажа
        containerWindowLossOfProgress.style.display = "flex";
        buttonLossOfProgressYes.addEventListener('click', function (event) {
            gameItemPerson = []
            resetProgress()
            setAllCharacteristics()
            containerWindowLossOfProgress.style.display = "none";
        }, { once: true });
    });

    buttonPersonReplay.addEventListener('click', function (event) { //кнопка начать заново (в любой момент игры) с модальным окном
        containerWindowLossOfProgress.style.display = "flex";
        buttonLossOfProgressYes.addEventListener('click', function (event) {
            resetProgress()
            setStartCharacteristics()
            containerWindowLossOfProgress.style.display = "none";
        }, { once: true });
    });

    function clickOnButtonExitFromTheBag() { // кнопка выйти из сумки
        buttonExitFromTheBag.addEventListener('click', function (event) {
            containerWindowUseItem.style.display = 'none'
        });
    }
    clickOnButtonExitFromTheBag()

    function setStartCharacteristics() {//запоминание/запись стартовых хар-к персонажа

        const raceToSet = document.getElementById('person-race');
        const characterRace = startCharacteristics.raceName;
        raceToSet.textContent = `Раса: ${characterRace}`;

        function setPersonName(arrName) {
            randomName = startCharacteristics.personName;
            const selectionName = document.getElementById('person-name');
            selectionName.textContent = `Имя героя: ${randomName}`;
        }
        setPersonName(personName)

        function setValueMaxHp() {
            maxHp = startCharacteristics.maxHp;
            lastValueHp = maxHp;
            hpToSet.textContent = `Здоровье: ${lastValueHp}/${maxHp}`;
        }
        setValueMaxHp();

        function setValueStrength() {
            valueStrength = startCharacteristics.valueStrength;
            const strengthToSet = document.getElementById('person-strength');
            strengthToSet.textContent = `Сила: ${valueStrength}`;
        }
        setValueStrength();

        function setValueAgility() {
            valueAgility = startCharacteristics.valueAgility;
            const agilityToSet = document.getElementById('person-agility');
            agilityToSet.textContent = `Ловкость: ${valueAgility}`;
        }
        setValueAgility();

        function setValueDefense() {
            valueDefense = startCharacteristics.valueDefense;
            const defenseToSet = document.getElementById('person-defense');
            defenseToSet.textContent = `Броня: ${valueDefense}`;
        }
        setValueDefense();

        gameItemPerson = []

        function setPersonItems() {
            const randomItem1 = startCharacteristics.randomItem1;
            const randomItem2 = startCharacteristics.randomItem2;
            gameItemPerson.push(deepCopy(randomItem1));
            gameItemPerson.push(deepCopy(randomItem2));
            createArrNameItem()

            const newElementButton1 = document.createElement('button');

            createButtonNewItemInBag(newElementButton1, randomItem1.itemName)
            newElementButton1.id = "newElementButton1";
            const elementButton1 = document.getElementById('newElementButton1');

            clickOnButtonChooseItem(newElementButton1, elementButton1, randomItem1.itemName)

            const newElementButton2 = document.createElement('button');
            createButtonNewItemInBag(newElementButton2, randomItem2.itemName)
            newElementButton2.id = "newElementButton2";
            const elementButton2 = document.getElementById('newElementButton2');
            clickOnButtonChooseItem(newElementButton2, elementButton2, randomItem2.itemName)

            selectionPersonItems.textContent = `Предметы: ${nameItemPerson.join(', ')}`;
        }
        setPersonItems();

        journalEntries.innerHTML = "";
        const newElementDivReplay = document.createElement('div');
        newElementDivReplay.textContent = `Преветсвую, странник! Готов начать свой путь?`;
        journalEntries.appendChild(newElementDivReplay);
    }

    function personDeath() { //ф-ия сценария при смерти перса
        const allButtons = document.getElementsByClassName('button');
        onOffButtons(allButtons, 0);
        nameCurrentLocation.style.display = 'none';
        buttonReplay.style.display = 'flex';
        clickOnButtonReplay();
    }

    function getPresentItem(numberItem, nameButton, idButtonPresent) { //ф-ия добавления предмета в сумку в процессе игры
        gameItemPerson.push(gameItemPresent[numberItem]);
        createArrNameItem()

        createButtonNewItemInBag(nameButton, gameItemPresent[numberItem].itemName, idButtonPresent)
        const NameElementButton = document.getElementById(idButtonPresent);
        clickOnButtonChooseItem(nameButton, NameElementButton, gameItemPresent[numberItem].itemName)

        selectionPersonItems.textContent = `Предметы: ${nameItemPerson.join(', ')}`;

        const newElementDiv = document.createElement('div');
        newElementDiv.textContent = `ПРЕДМЕТ: "${gameItemPresent[numberItem].itemName}" добавлен в сумку`;
        setTimeout(() => {
            journalEntries.appendChild(newElementDiv);
        }, 2000)
    }

    function setIsUnderAttackNull() { //выведение врага из атаки, чтобы он не переходил в др. локацию
        for (let index = 0; index <= (arrayOfEnemies.length - 1); index++) {
            arrayOfEnemies[index].isUnderAttack = 0
        }
    }

    function clickOnButtonAttack(numberEnemy, bonusWin, bonusItem) {//кнопка атаки и получения бонусов
        buttonAttack.addEventListener('click', function (event) {
            if (arrayOfEnemies[numberEnemy].isUnderAttack === 1) {
                if (arrayOfEnemies[numberEnemy].status === 'defeated') {
                    const newElementDivWin = document.createElement('div');
                    newElementDivWin.textContent = `**Все враги в локации побеждены!**`;
                    journalEntries.appendChild(newElementDivWin);
                } else {
                    let maxHpEnemy = arrayOfEnemies[numberEnemy].maxHpEnemy;
                    let strengthEnemy = arrayOfEnemies[numberEnemy].strengthEnemy;

                    let damageToEnemy = valueStrength + getRandomIntInclusive(0, valueAgility);
                    let newValueHpEnemy = lastValueHpEnemy - damageToEnemy;

                    // Урон по персонажу
                    let damageToPerson = strengthEnemy - valueDefense - getRandomIntInclusive(0, valueAgility);
                    if (damageToPerson < 0) {
                        damageToPerson = 0;
                    }

                    let newValueHp = lastValueHp - damageToPerson
                    lastValueHp = newValueHp

                    const newElementDivDamagePerson = document.createElement('div');
                    newElementDivDamagePerson.textContent = `• Ты получаешь: -${damageToPerson} HP`;
                    journalEntries.appendChild(newElementDivDamagePerson);

                    if (lastValueHp <= 0) {
                        lastValueHp = 0
                        const newElementDivDeathPerson = document.createElement('div');
                        newElementDivDeathPerson.textContent = `***ТЫ УМЕР В БОЮ*** Викинги могут тебе только позавидовать!`;
                        journalEntries.appendChild(newElementDivDeathPerson);

                        personDeath()
                    }
                    hpToSet.textContent = `Здоровье: ${lastValueHp}/${maxHp}`;

                    // Урон по врагу
                    if ((newValueHpEnemy > 0) && (newValueHpEnemy < arrayOfEnemies[numberEnemy].maxHpEnemy)) {
                        lastValueHpEnemy = newValueHpEnemy;
                        const newElementDiv = document.createElement('div');
                        newElementDiv.textContent = `${arrayOfEnemies[numberEnemy].nameEnemy}. HP: ${lastValueHpEnemy}/${maxHpEnemy} (Враг: -${damageToEnemy} HP)`;
                        journalEntries.appendChild(newElementDiv);
                    } else if (newValueHpEnemy >= maxHpEnemy) {
                        lastValueHpEnemy = maxHpEnemy
                    } else {
                        if (damageToEnemy > lastValueHpEnemy) {
                            damageToEnemy = lastValueHpEnemy
                        }
                        lastValueHpEnemy = 0;
                        arrayOfEnemies[numberEnemy].hpEnemy = 0;
                        arrayOfEnemies[numberEnemy].status = 'defeated';
                        const newElementDiv1 = document.createElement('div');

                        newElementDiv1.textContent = `• Враг - ${arrayOfEnemies[numberEnemy].nameEnemy} побежден! (Враг: -${damageToEnemy} HP)`;
                        journalEntries.appendChild(newElementDiv1);
                        arrayOfEnemies[numberEnemy].winText()
                        if (bonusWin !== 0) {
                            arrayOfEnemies[numberEnemy].bonusWin()
                        }
                        if (bonusItem !== 0) {
                            arrayOfEnemies[numberEnemy].bonusItem()
                        }
                    }
                }
            }
        });
    }

    function clickOnButtonComeBack() { // кнопка "вернуться назад"
        buttonComeBack.addEventListener('click', function (event) {
            switch (presentLocation) {
                case 'Холм':
                    onOffButtons(buttonsInsideJustHill, 1);
                    onOffButtons(allButtonsInsideTheGates, 0)
                    onOffButtons(allButtonsInsideTheYard, 0)
                    break
                case 'Ров':
                case 'Ворота замка':
                case 'Двор':
                    onOffButtons(buttonsInsideJustHill, 1);
                    onOffButtons(allButtonsInsideTheYard, 0);
                    onOffButtons(buttonsInsideJustTheGates, 0);
                    presentLocation = 'Холм';
                    break
                case 'Амбар':
                case 'Конюшня':
                    onOffButtons(allButtonsInsideTheYard, 1);
                    onOffButtons(buttonsInsideJustHill, 0);
                    presentLocation = 'Двор';
                    break
                case 'Лекарь':
                case 'Камерная':
                case 'Лестница':
                    onOffButtons(buttonsInsideJustTheGates, 1);
                    onOffButtons(buttonsInsideJustHill, 0);
                    onOffButtons(buttonsInsideJustStaircase, 0);
                    presentLocation = 'Ворота замка';
                    break
                case 'Спальня':
                case 'Тронный зал':
                    buttonBedroomBox.style.display = "none";
                    buttonDonjon.style.display = "none";
                    onOffButtons(buttonsInsideJustStaircase, 1);
                    onOffButtons(buttonsInsideJustHill, 0);
                    onOffButtons(buttonsInsideJustTheGates, 0);
                    presentLocation = 'Лестница';
                    break
                case 'Главная башня':
                    buttonDonjon.style.display = "flex";
                    onOffButtons(buttonsInsideJustHill, 0);
                    onOffButtons(buttonsInsideJustTheGates, 0);
                    onOffButtons(buttonsInsideJustStaircase, 0);
                    presentLocation = 'Тронный зал';
                    break
            }
            nameCurrentLocation.textContent = `Текущая локация: ${presentLocation}`;
            journalEntries.innerHTML = `Продолжай свой путь`
            setIsUnderAttackNull()
        });
    }
    clickOnButtonComeBack()

    function clickOnButtonChooseItem(itemButton, elementButton, findName) { // кнопки выбора предмета в сумке
        itemButton.addEventListener('click', function (event) {
            const newElementDiv = document.createElement('div');

            getNameItem(findName)

            newElementDiv.textContent = `★ Ты использовал предмет: ${gameItemPerson[numberItemInArr].itemName}. 
            ${gameItemPerson[numberItemInArr].message} ★`;
            journalEntries.appendChild(newElementDiv);
            if (gameItemPerson[numberItemInArr].hp) {
                gameItemPerson[numberItemInArr].hp()
            }
            if (gameItemPerson[numberItemInArr].strength) {
                gameItemPerson[numberItemInArr].strength()
            }
            if (gameItemPerson[numberItemInArr].agility) {
                gameItemPerson[numberItemInArr].agility()
            }
            if (gameItemPerson[numberItemInArr].defense) {
                gameItemPerson[numberItemInArr].defense()
            }
            elementButton.remove()
            gameItemPerson[numberItemInArr]
            gameItemPerson.splice(numberItemInArr, 1);

            createArrNameItem()

            let itemText = `Предметы: ${nameItemPerson.join(', ')}`
            if (nameItemPerson.length === 0) {
                itemText = `Предметы: пусто`
            }
            selectionPersonItems.textContent = `${itemText}`;

            containerWindowUseItem.style.display = "none";
            createArrNameItem()
        });
    }

    function clickOnButtonUseItem() { // кнопка "использовать предмет"
        buttonUseItem.addEventListener('click', function (event) {
            containerWindowUseItem.style.display = "flex";
        });
    }
    clickOnButtonUseItem()


    function changeVariableHp(bonusHp) { //ф-ия меняет переменное (не макс) значение здоровья на заданное кол-во 
        let newValueHp = lastValueHp + bonusHp;
        bonusValue = bonusHp;
        console.log(newValueHp)
        if ((0 <= newValueHp) && (newValueHp < maxHp)) {
            lastValueHp = newValueHp;
            console.log(lastValueHp)
        } else if (newValueHp >= maxHp) {
            lastValueHp = maxHp
        } else {
            lastValueHp = 0;
        }
        hpToSet.textContent = `Здоровье: ${lastValueHp}/${maxHp}`;

        const newElementDiv = document.createElement('div');
        newElementDiv.textContent = `БОНУС: подлечился на +${bonusHp} HP`;
        setTimeout(() => {
            journalEntries.appendChild(newElementDiv);
        }, 1000)
    }

    function changeConstantlyHp(bonusHp) { //ф-ия меняет постоянное (макс.) значение здоровья на заданное кол-во
        const newMaxValueHp = maxHp + bonusHp;
        maxHp = newMaxValueHp;
        hpToSet.textContent = `Здоровье: ${lastValueHp}/${maxHp}`;

        const newElementDiv = document.createElement('div');
        newElementDiv.textContent = `БОНУС: +${bonusHp} к максимальному значению здоровья`;
        setTimeout(() => {
            journalEntries.appendChild(newElementDiv);
        }, 1000)
    }

    function changeConstantlyStrength(bonusStrength) { //ф-ия меняет постоянное значение силы на заданное кол-во
        const strengthToChange = document.getElementById('person-strength');
        const lastValueStrength = valueStrength + bonusStrength;
        valueStrength = lastValueStrength
        strengthToChange.textContent = `Сила: ${lastValueStrength}`;

        const newElementDiv = document.createElement('div');
        newElementDiv.textContent = `БОНУС: +${bonusStrength} к силе`;
        setTimeout(() => {
            journalEntries.appendChild(newElementDiv);
        }, 1000)
    }

    function changeConstantlyAgility(bonusAgility) { //ф-ия меняет постоянное значение ловкости на заданное кол-во
        const agilityToChange = document.getElementById('person-agility');
        const lastValueAgility = valueAgility + bonusAgility;
        valueAgility = lastValueAgility;
        agilityToChange.textContent = `Ловкость: ${lastValueAgility}`;

        const newElementDiv = document.createElement('div');
        if (bonusAgility > 0) {
            newElementDiv.textContent = `БОНУС: +${bonusAgility} к ловкости`;
        } else if (bonusAgility < 0) {
            newElementDiv.textContent = `Расплата: ${bonusAgility} к ловкости`;
        }
        setTimeout(() => {
            journalEntries.appendChild(newElementDiv);
        }, 1000)

    }

    function changeConstantlyDefense(bonusDefense) { //ф-ия меняет постоянное значение брони на заданное кол-во
        const defenseToChange = document.getElementById('person-defense');
        const lastValueDefense = valueDefense + bonusDefense;
        valueDefense = lastValueDefense;
        defenseToChange.textContent = `Броня: ${lastValueDefense}`;

        const newElementDiv = document.createElement('div');
        newElementDiv.textContent = `БОНУС: +${bonusDefense} к броне`;
        setTimeout(() => {
            journalEntries.appendChild(newElementDiv);
        }, 1000)
    }

    function clickOnLocationDitch() { // кнопка "Ров"

        buttonDitch.addEventListener('click', function (event) {
            onOffButtons(buttonsInsideJustHill, 0)
            setIsUnderAttackNull()
            arrayOfEnemies[0].isUnderAttack = 1;
            nameCurrentLocation.textContent = `Текущая локация: Ров`;
            presentLocation = 'Ров'
            if (arrayOfEnemies[0].status === 'undefeated') {
                journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[0].nameEnemy}. HP: ${arrayOfEnemies[0].maxHpEnemy}/${arrayOfEnemies[0].maxHpEnemy}`;
                lastValueHpEnemy = arrayOfEnemies[0].hpEnemy
                arrayOfEnemies[0].attack
            } else {
                journalEntries.innerHTML = `Продолжай свой путь`
            }
        });
    }
    clickOnLocationDitch();

    function clickOnLocationYard() {  // кнопка "Двор"
        buttonYard.addEventListener('click', function (event) {
            onOffButtons(buttonsInsideJustHill, 0)
            nameCurrentLocation.textContent = `Текущая локация: Двор`;
            presentLocation = 'Двор';
            onOffButtons(allButtonsInsideTheYard, 1)
            setIsUnderAttackNull()
            arrayOfEnemies[1].isUnderAttack = 1;
            if (arrayOfEnemies[1].status === 'undefeated') {
                journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[1].nameEnemy}. HP: ${arrayOfEnemies[1].maxHpEnemy}/${arrayOfEnemies[1].maxHpEnemy}`;
                lastValueHpEnemy = arrayOfEnemies[1].hpEnemy
                arrayOfEnemies[1].attack
            } else {
                journalEntries.innerHTML = `Продолжай свой путь`
            }
        });
    }
    clickOnLocationYard()

    function clickOnLocationBarn() { // кнопка "Амбар"
        buttonBarn.addEventListener('click', function (event) {
            if (arrayOfEnemies[1].status === 'defeated') {
                nameCurrentLocation.textContent = `Текущая локация: Амбар`;
                presentLocation = 'Амбар';
                onOffButtons(allButtonsInsideTheYard, 0)
                setIsUnderAttackNull()
                arrayOfEnemies[3].isUnderAttack = 1;
                if (arrayOfEnemies[3].status === 'undefeated') {
                    journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[3].nameEnemy}. HP: ${arrayOfEnemies[3].maxHpEnemy}/${arrayOfEnemies[3].maxHpEnemy}`;
                    lastValueHpEnemy = arrayOfEnemies[3].hpEnemy
                    arrayOfEnemies[3].attack
                } else {
                    journalEntries.innerHTML = `Продолжай свой путь`
                }
            } else {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `Чтобы пройти дальше победите врага ${arrayOfEnemies[1].nameEnemy} в локации Двор!`;
                journalEntries.appendChild(newElementDiv);
            }
        });
    }
    clickOnLocationBarn()

    function clickOnLocationStable() { // кнопка "Конюшня"
        buttonStable.addEventListener('click', function (event) {
            if (arrayOfEnemies[1].status === 'defeated') {
                nameCurrentLocation.textContent = `Текущая локация: Конюшня`;
                presentLocation = 'Конюшня';
                onOffButtons(allButtonsInsideTheYard, 0)
                setIsUnderAttackNull()
                arrayOfEnemies[2].isUnderAttack = 1;
                if (arrayOfEnemies[2].status === 'undefeated') {
                    journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[2].nameEnemy}. HP: ${arrayOfEnemies[2].maxHpEnemy}/${arrayOfEnemies[2].maxHpEnemy}`;
                    lastValueHpEnemy = arrayOfEnemies[2].hpEnemy
                    arrayOfEnemies[2].attack
                } else {
                    journalEntries.innerHTML = `Продолжай свой путь`
                }
            } else {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `ЧТОБЫ ПРОЙТИ ДАЛЬШЕ победите врага ${arrayOfEnemies[1].nameEnemy} в локации Двор!`;
                journalEntries.appendChild(newElementDiv);
            }
        });
    }
    clickOnLocationStable()

    function clickOnLocationGates() { // кнопка "Ворота замка"
        buttonGates.addEventListener('click', function (event) {
            onOffButtons(buttonsInsideJustHill, 0)
            nameCurrentLocation.textContent = `Текущая локация: Ворота замка`;
            presentLocation = 'Ворота замка';
            onOffButtons(buttonsInsideJustTheGates, 1)
        });
    }
    clickOnLocationGates()

    function clickOnLocationDoctor() { // кнопка "Лекарь"
        buttonDoctor.addEventListener('click', function (event) {
            nameCurrentLocation.textContent = `Текущая локация: Лекарь`;
            presentLocation = 'Лекарь';
            onOffButtons(allButtonsInsideTheGates, 0);
            journalEntries.innerHTML = `${randomName}, отдохни немного и залечи свои раны прохладным Элем!`
            changeVariableHp(10);
            setTimeout(() => {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `+${bonusValue} к здоровью`;
                journalEntries.appendChild(newElementDiv);
            }, 1000);
        });
    }
    clickOnLocationDoctor()

    function clickOnLocationWeapons() { // кнопка "Камерная"
        buttonWeapons.addEventListener('click', function (event) {
            nameCurrentLocation.textContent = `Текущая локация: Камерная`;
            presentLocation = 'Камерная';
            onOffButtons(buttonsInsideJustTheGates, 0)
            setIsUnderAttackNull()
            arrayOfEnemies[4].isUnderAttack = 1;
            if (arrayOfEnemies[4].status === 'undefeated') {
                journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[4].nameEnemy}. HP: ${arrayOfEnemies[4].maxHpEnemy}/${arrayOfEnemies[4].maxHpEnemy}`;
                lastValueHpEnemy = arrayOfEnemies[4].hpEnemy
                arrayOfEnemies[4].attack
            } else {
                journalEntries.innerHTML = `Продолжай свой путь`
            }
        });
    }
    clickOnLocationWeapons()

    function clickOnLocationStaircase() { // кнопка "Лестница"
        buttonStaircase.addEventListener('click', function (event) {
            nameCurrentLocation.textContent = `Текущая локация: Лестница`;
            presentLocation = 'Лестница';
            onOffButtons(buttonsInsideJustTheGates, 0)
            onOffButtons(buttonsInsideJustStaircase, 1)
            journalEntries.innerHTML = `Странно... Лестница совершенно пуста, ни охраны, ни вонючей крысы, что-то тут не так!`
        });

    }
    clickOnLocationStaircase()

    function clickOnLocationBedroom() { // кнопка "Спальня"
        buttonBedroom.addEventListener('click', function (event) {
            nameCurrentLocation.textContent = `Текущая локация: Спальня`;
            presentLocation = 'Спальня';
            onOffButtons(buttonsInsideJustStaircase, 0)
            journalEntries.innerHTML = `Старый сундук... посмотрим!`;
            buttonBedroomBox.style.display = 'flex';
        });
    }
    clickOnLocationBedroom()

    function clickOnLocationBedroomBox() { // кнопка "Сундук" в спальне
        buttonBedroomBox.addEventListener('click', function (event) {

            buttonBedroomBox.style.display = 'none';
            journalEntries.innerHTML = `• Награда за смелость...3...2...1...`

            function bonusItem() {
                const enchantedRobe = document.createElement('button');
                const idButtonPresent = 'newElementButtonPresentEnchantedRobe';
                getPresentItem(3, enchantedRobe, idButtonPresent);
                return
            }
            bonusItem()
        }, { once: true });
    }
    clickOnLocationBedroomBox()


    function clickOnLocationThroneRoom() { // кнопка "Тронный зал"
        buttonThroneRoom.addEventListener('click', function (event) {
            nameCurrentLocation.textContent = `Текущая локация: Тронный зал`;
            presentLocation = 'Тронный зал';
            onOffButtons(buttonsInsideJustStaircase, 0)
            buttonDonjon.style.display = 'flex';
            setIsUnderAttackNull()
            arrayOfEnemies[5].isUnderAttack = 1;
            if (arrayOfEnemies[5].status === 'undefeated') {
                journalEntries.innerHTML = `Перед тобой возникает враг: ${arrayOfEnemies[5].nameEnemy}. HP: ${arrayOfEnemies[5].maxHpEnemy}/${arrayOfEnemies[5].maxHpEnemy}`;
                lastValueHpEnemy = arrayOfEnemies[5].hpEnemy
                arrayOfEnemies[5].attack
            } else {
                journalEntries.innerHTML = `Главная башня! Цель многих рыцарей, говорят именно там храняться несметные богатства и таится древнее зло... `
            }
        });
    }
    clickOnLocationThroneRoom()

    function clickOnLocationDonjon() { // кнопка "Главная башня"
        buttonDonjon.addEventListener('click', function (event) {
            if (arrayOfEnemies[5].status === 'defeated') {
                nameCurrentLocation.textContent = `Текущая локация: Главная башня`;
                presentLocation = 'Главная башня';
                buttonDonjon.style.display = 'none';
                setIsUnderAttackNull()
                arrayOfEnemies[6].isUnderAttack = 1;
                if (arrayOfEnemies[6].status === 'undefeated') {
                    journalEntries.innerHTML = `Вот и оно, древнее зло... ${arrayOfEnemies[6].nameEnemy}. HP: ${arrayOfEnemies[6].maxHpEnemy}/${arrayOfEnemies[6].maxHpEnemy}`;
                    lastValueHpEnemy = arrayOfEnemies[6].hpEnemy
                    arrayOfEnemies[6].attack
                } else {
                    journalEntries.innerHTML = `Можешь гордиться собой, воин! Ты победил всех врагов!`
                }
            } else {
                const newElementDiv = document.createElement('div');
                newElementDiv.textContent = `ЧТОБЫ ПРОЙТИ ДАЛЬШЕ победите врага ${arrayOfEnemies[5].nameEnemy} в локации Тронный зал!`;
                journalEntries.appendChild(newElementDiv);
            }
        });
    }
    clickOnLocationDonjon()
}
mainGame()
