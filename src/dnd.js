/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const div = document.createElement('div');

    div.classList.add('draggable-div');
    div.setAttribute('draggable', 'true');
    let divId = 'div' + Math.floor(Math.random() * 100);

    div.setAttribute('id', divId);
    div.style.border = '2px solid black';
    div.style.backgroundColor =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
    div.style.height = Math.floor(Math.random() * 300) + 'px';
    div.style.width = Math.floor(Math.random() * 300) + 'px';
    div.style.top = Math.floor(Math.random() * 100) + 'px';
    div.style.left = Math.floor(Math.random() * 500) + 'px';
    div.style.position = 'relative';

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

let dragSrcEl = null;
let dragSrcElStyle = {};

function addListeners(target) {
    let handlerDragStart = e => {
        e.target.style.opacity = '0.4';
        dragSrcEl = e.target;
        dragSrcElStyle = { ...dragSrcEl.style };
        e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text', e.target.innerHTML);
    };
    let handlerDragOver = e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    let handlerDragEnter = e => {
        e.target.style.border = '2px dashed black';
    };
    let handlerDragLeave = e => {
        e.target.style.border = '2px solid black';
    };
    let handlerDragEnd = e => {
        e.target.style.opacity = 1;
    };
    let handlerDrop = e => {
        e.stopPropagation();
        e.target.style.border = '2px solid black';
        if (dragSrcEl != e.target) {
            dragSrcEl.style.width = e.target.style.width;
            dragSrcEl.style.height = e.target.style.height;
            dragSrcEl.style.backgroundColor = e.target.style.backgroundColor;
            e.target.style.width = dragSrcElStyle.width;
            e.target.style.height = dragSrcElStyle.height;
            e.target.style.backgroundColor = dragSrcElStyle.backgroundColor;
            // e.target.innerHTML = e.dataTransfer.getData('text/html');
        }
    };

    target.addEventListener('dragstart', handlerDragStart, false);
    target.addEventListener('dragenter', handlerDragEnter, false);
    target.addEventListener('dragover', handlerDragOver, false);
    target.addEventListener('dragleave', handlerDragLeave, false);
    target.addEventListener('dragend', handlerDragEnd, false);
    target.addEventListener('drop', handlerDrop, false);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
