// НЕДОРАБОТКИ

// Сохранение задач в localStorage (+счетчика id)
// запрос к API, получение списка от него и показывание этих задач


//БАГИ:

//НЕ ЗАБЫТЬ:
// localStorage должно передаваться значение applicationState.counters.valueCounterTaskId
// Удалить всратые комменты
// рендеринг


//ВОЗМОЖНЫЕ ДОРАБОТКИ:
// setTaskBody пока не используется, поменять задачу нельзя
// когда все задачи удалены (нет задач) - скрываются кнопки фильтра и выводится текст "Нет активных задач, можно отдохнуть"
// Модальное окно с сообщением об окончании таймера
// Когда задача выполнена - кнопка уведомления скрывается


class Task {
    timeoutId = null;
    timerOn = false;

    constructor(taskBody, taskId, status = 'unfulfilled') {
        this.taskBody = taskBody;
        this.taskId = taskId;
        this.status = status;
    }

    getTaskId() {
        return this.taskId;
    }

    getTaskBody() {
        return this.taskBody;
    }
    setTaskBody(value) {
        if (!validationInputText()) {
            this.taskBody = taskBody;
        } else {
            this.taskBody = value;
        }
    }

    getStatus() {
        return this.status;
    }
    setStatus(value) {
        if (value === 'unfulfilled' || value === 'fulfilled') {
            this.status = value;
        } else {
            console.log('Некорректный статус объекта')
        }
    }

    addTaskInTheList() { // создаем задачу в html
        const containerTask = document.createElement('div');
        containerTask.className = 'container-task';
        containerTask.id = `container-task${this.taskId}`;
        containerTask.innerHTML = `<div class="task">
                            <div class="task-content">
                                <div id="task-text-and-checkbox${this.taskId}" class="task-text-and-checkbox">
                                    <input id="task-checkbox${this.taskId}" class="task-checkbox" type="checkbox">
                                    <label for="task-checkbox${this.taskId}" class="task-body">${this.taskBody}</label>
                                </div>
                                <div class="notification">
                                    <button id="button-notification${this.taskId}" class="button-notification">
                                        <img class="notification-icon" src="icon/notification_icon.png"
                                            alt="Уведомление">
                                    </button>
                                </div>
                            </div>
                            <button id="button-delete-task${this.taskId}" class="button button-delete-task"> Удалить </button>
                        </div>`;
        applicationState.navigation.tasks.prepend(containerTask);
    }
    deleteTaskInTheList() { // удаляем html задачи
        const taskHtml = document.getElementById(`container-task${this.taskId}`);
        taskHtml.remove();
    }

    setNotification(notification) {
        this.timerOn = true;
        this.timeoutId = setTimeout(() => { 
            alert('Пора выполнить задачу');
            this.timerOn = false;
        }, notification * 1000)
    }
    removeNotification() {
        clearTimeout(this.timeoutId);
        this.timerOn = false;
    }
}

class TasksList {
    recordsTasks = [];
    addRecord(task) {
        this.recordsTasks.push(task)
    }
}


const applicationState = { // глобальные переменные
    globalVariables: {
        arrRecordsTasks: new TasksList,
        activeTaskId: null,
        activeTaskIndex: null
    },

    counters: {
        valueCounterTaskId: 25300,
        timeCounter: 5
    },
    counterTaskId() {
        return applicationState.counters.valueCounterTaskId++
    },

    navigation: {
        inputAddTextTask: document.getElementById('input-add-text-task'),
        buttonAddTask: document.getElementById('button-add-task'),
        tasks: document.getElementById('tasks'),

        buttonShowAllTasks: document.getElementById('button-show-all-tasks'),
        buttonShowFulfilledTasks: document.getElementById('button-show-fulfilled-tasks'),
        buttonShowUnfulfilledTasks: document.getElementById('button-show-unfulfilled-tasks'),

        buttonMinusSec: document.getElementById('button-minus-sec'),
        timeNotification: document.getElementById('time-notification'),
        buttonPlusSec: document.getElementById('button-plus-sec'),

        containerWindowSetNotification: document.getElementById('container-window-set-notification'),
        buttonSetNotification: document.getElementById('button-set-notification'),
        buttonExitFromSetNotification: document.getElementById('button-exit-from-set-notification'),

        containerWindowDisableNotification: document.getElementById('container-window-disable-notification'),
        buttonDisableNotificationYes: document.getElementById('button-disable-notification-yes'),
        buttonDisableNotificationNo: document.getElementById('button-disable-notification-no'),


        containerTaskClassName: document.getElementsByClassName('container-task'),
    }
}

//стартовые настройки видимости
applicationState.navigation.containerWindowSetNotification.style.display = "none";
applicationState.navigation.containerWindowDisableNotification.style.display = "none";


// глобальные функции

function validationInputText(value) { //валидация input
    let validationText = / {2,}/;

    if (validationText.test(value)) {
        alert('Текст задачи с избыточными пробелами');
        return false
    } else if (value.length < 2) {
        alert('Обязательное поле. Введите минимум 2 знака');
        return false
    } else {
        return true
    }
}

function findActiveTaskInArr() { // поиск задачи в массиве
    applicationState.globalVariables.activeTaskIndex = null
    applicationState.globalVariables.arrRecordsTasks.recordsTasks.forEach((elem, index) => {
        if (applicationState.globalVariables.arrRecordsTasks.recordsTasks[index].taskId === applicationState.globalVariables.activeTaskId) {
            applicationState.globalVariables.activeTaskIndex = index
            return
        }
    })
}

function onOffTasks(onTask, offTask) { //ф-ия вкл и выкл видимости элементов по КЛАССАМ
    for (let task of applicationState.navigation.containerTaskClassName) {
        if (onTask === true) {
            task.style.display = "flex";
        } else if (offTask === true) {
            task.style.display = "none";
        }
    }
}

// input и кнопка "Добавить задачу": функциональность и создание html
function clickOnButtonAddTask() {
    const taskText = applicationState.navigation.inputAddTextTask.value;
    if (!validationInputText(taskText)) {
        return
    }

    applicationState.counterTaskId();
    const task = new Task(taskText, applicationState.counters.valueCounterTaskId);
    applicationState.globalVariables.arrRecordsTasks.addRecord(task);
    task.addTaskInTheList()
    applicationState.navigation.inputAddTextTask.value = ''; // чистим поле ввода
}

applicationState.navigation.buttonAddTask.removeEventListener('click', clickOnButtonAddTask);
applicationState.navigation.buttonAddTask.addEventListener('click', clickOnButtonAddTask);

function checkCheckbox() {
    findActiveTaskInArr()

    if (this.checked) {
        applicationState.globalVariables.arrRecordsTasks.recordsTasks[applicationState.globalVariables.activeTaskIndex].setStatus('fulfilled');
    } else {
        applicationState.globalVariables.arrRecordsTasks.recordsTasks[applicationState.globalVariables.activeTaskIndex].setStatus('unfulfilled');
    }
}

function changeActiveCheckbox() {
    const elemId = `task-checkbox${applicationState.globalVariables.activeTaskId}`
    const activeCheckbox = document.getElementById(elemId);

    activeCheckbox.removeEventListener('change', checkCheckbox)
    activeCheckbox.addEventListener('change', checkCheckbox)
}

function deleteActiveTask() {// удаляем задачу
    findActiveTaskInArr();
    applicationState.globalVariables.arrRecordsTasks.recordsTasks[applicationState.globalVariables.activeTaskIndex].deleteTaskInTheList() // удаляем html задачи
    applicationState.globalVariables.arrRecordsTasks.recordsTasks.splice(applicationState.globalVariables.activeTaskIndex, 1) // удаляет задачу из массива
}

function buttonNotificationActiveTask() {// настройка уведомлений
    findActiveTaskInArr();

    if (applicationState.globalVariables.arrRecordsTasks.recordsTasks[applicationState.globalVariables.activeTaskIndex].timerOn === false) {
        applicationState.navigation.containerWindowSetNotification.style.display = "flex";
    } else {
        applicationState.navigation.containerWindowDisableNotification.style.display = "flex";
    }
}

function clickOnActiveTask(event) {// активация задачи по клику, далее по таргетам
    const target = event.target.closest('.container-task');
    applicationState.globalVariables.activeTaskId = Number(target.id.replace('container-task', ""));

    if (event.target.closest('.task-text-and-checkbox')) {
        changeActiveCheckbox()
    }

    else if (event.target.closest('.notification')) {
        buttonNotificationActiveTask()
    }

    else if (event.target.closest('.button-delete-task')) {
        deleteActiveTask()
    }
}

applicationState.navigation.tasks.removeEventListener('click', clickOnActiveTask);
applicationState.navigation.tasks.addEventListener('click', clickOnActiveTask);

// кнопки фильтрации задач
function clickOnButtonShowFulfilledTasks() {// кнопка "выполненные задачи"
    const adressArrTasks = applicationState.globalVariables.arrRecordsTasks;
    onOffTasks(false, true);//скрываем все контейнеры с тасками  

    adressArrTasks.recordsTasks.forEach((elem, index) => {
        if (adressArrTasks.recordsTasks[index].getStatus() === 'fulfilled') {
            let fulfilledTaskId = adressArrTasks.recordsTasks[index].getTaskId();
            let fulfilledTask = document.getElementById(`container-task${fulfilledTaskId}`);
            fulfilledTask.style.display = "flex";
        }
    })
}

applicationState.navigation.buttonShowFulfilledTasks.removeEventListener('click', clickOnButtonShowFulfilledTasks);
applicationState.navigation.buttonShowFulfilledTasks.addEventListener('click', clickOnButtonShowFulfilledTasks);


function clickOnButtonShowUnfulfilledTasks() {// кнопка "НЕвыполненные задачи"
    const adressArrTasks = applicationState.globalVariables.arrRecordsTasks;
    onOffTasks(false, true);//скрываем все контейнеры с тасками  

    adressArrTasks.recordsTasks.forEach((elem, index) => {
        if (adressArrTasks.recordsTasks[index].getStatus() === 'unfulfilled') {
            let fulfilledTaskId = adressArrTasks.recordsTasks[index].getTaskId();
            let fulfilledTask = document.getElementById(`container-task${fulfilledTaskId}`);
            fulfilledTask.style.display = "flex";
        }
    })
}

applicationState.navigation.buttonShowUnfulfilledTasks.removeEventListener('click', clickOnButtonShowUnfulfilledTasks);
applicationState.navigation.buttonShowUnfulfilledTasks.addEventListener('click', clickOnButtonShowUnfulfilledTasks);

function clickOnButtonShowAllTasks() {// кнопка "НЕвыполненные задачи"
    onOffTasks(true, false);//высвечиваем все контейнеры с тасками  
}

applicationState.navigation.buttonShowAllTasks.removeEventListener('click', clickOnButtonShowAllTasks);
applicationState.navigation.buttonShowAllTasks.addEventListener('click', clickOnButtonShowAllTasks);

function setTimeCounter(plus) {
    if (plus === true && applicationState.counters.timeCounter >= 5) {
        applicationState.counters.timeCounter += 5;
    } else if (plus === false && applicationState.counters.timeCounter > 5) {
        applicationState.counters.timeCounter -= 5;
    }
}

// кнопки установки уведомления
function clickOnButtonMinusSec() {
    setTimeCounter(false);
    applicationState.navigation.timeNotification.innerHTML = `${applicationState.counters.timeCounter} сек`
}

applicationState.navigation.buttonMinusSec.removeEventListener('click', clickOnButtonMinusSec);
applicationState.navigation.buttonMinusSec.addEventListener('click', clickOnButtonMinusSec);

function clickOnButtonPlusSec() {
    setTimeCounter(true);
    applicationState.navigation.timeNotification.innerHTML = `${applicationState.counters.timeCounter} сек`
}

applicationState.navigation.buttonPlusSec.removeEventListener('click', clickOnButtonPlusSec);
applicationState.navigation.buttonPlusSec.addEventListener('click', clickOnButtonPlusSec);

function clickOnButtonSetNotification() {
    applicationState.globalVariables.arrRecordsTasks.recordsTasks[applicationState.globalVariables.activeTaskIndex].setNotification((applicationState.counters.timeCounter))
    applicationState.counters.timeCounter = 5;
    applicationState.navigation.timeNotification.innerHTML = `${applicationState.counters.timeCounter} сек`
    applicationState.navigation.containerWindowSetNotification.style.display = "none";
}

applicationState.navigation.buttonSetNotification.removeEventListener('click', clickOnButtonSetNotification);
applicationState.navigation.buttonSetNotification.addEventListener('click', clickOnButtonSetNotification);

function clickOnButtonExitFromSetNotification() {
    applicationState.navigation.containerWindowSetNotification.style.display = "none";
}

applicationState.navigation.buttonExitFromSetNotification.removeEventListener('click', clickOnButtonExitFromSetNotification);
applicationState.navigation.buttonExitFromSetNotification.addEventListener('click', clickOnButtonExitFromSetNotification);

// кнопки сброса уведомления
function clickOnButtonDisableNotificationYes() {
    applicationState.globalVariables.arrRecordsTasks.recordsTasks[applicationState.globalVariables.activeTaskIndex].removeNotification()
    applicationState.navigation.containerWindowDisableNotification.style.display = "none";
}

applicationState.navigation.buttonDisableNotificationYes.removeEventListener('click', clickOnButtonDisableNotificationYes);
applicationState.navigation.buttonDisableNotificationYes.addEventListener('click', clickOnButtonDisableNotificationYes);


function clickOnButtonDisableNotificationNo() {
    applicationState.navigation.containerWindowDisableNotification.style.display = "none";
}

applicationState.navigation.buttonDisableNotificationNo.removeEventListener('click', clickOnButtonDisableNotificationNo);
applicationState.navigation.buttonDisableNotificationNo.addEventListener('click', clickOnButtonDisableNotificationNo);


