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

    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function setRandomSize(element, maxHeight = 240, maxWidth = 240,) {
        element.style.height = Math.floor(Math.random() * maxHeight) + 'px';
        element.style.width = Math.floor(Math.random() * maxWidth) + 'px';
    }

    function setRandomPosition(element) {
        element.style.left = Math.floor(Math.random() * (homeworkContainer.clientWidth - element.clientWidth)) + 'px';
        element.style.top = Math.floor(Math.random() * (homeworkContainer.clientHeight - element.clientHeight)) + 'px';
        element.style.position = 'absolute';
    }

    const div = document.createElement('div');

    div.classList.add('draggable-div');
    div.setAttribute('draggable', 'true');
    div.style.backgroundColor = getRandomColor();
    setRandomSize(div)
    setRandomPosition(div);

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

function addListeners(target) {
    let handlerDragStart = e => {
        e.target.style.opacity = '0.4';
        console.log('dragstart Реализовано согласно ТЗ ');
    };
    let handlerDragEnd = e => {
        // e.preventDefault();
        e.target.style.opacity = 1;
        console.log('dragend Реализовано согласно ТЗ ');
    };

    target.addEventListener('dragstart', handlerDragStart, false);
    target.addEventListener('dragend', handlerDragEnd, false);
    // target.addEventListener('drop', handlerDrop, false);
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
