/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
// import initializerWarningHelper from '@babel/runtime/helpers/esm/initializerWarningHelper';

const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    fillTable();
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let cookieName = addNameInput.value,
        cookieValue = addValueInput.value;

    if (!cookieName) {
        alert('Некорректное имя добавляемой cookie');

        return;
    }

    document.cookie = `${cookieName}=${cookieValue}`;
    fillTable();
    // cookieName.value = '';
    // addValueInput.value = '';
}
)
;

const filterFn = (filterPattern, filteredVal) => filteredVal.toLowerCase().includes(filterPattern.toLowerCase()) ;

const getFilteredCookies = () => {
    const cookies = getCookies();
    const filterVal = filterNameInput.value;

    return Object.keys(cookies).reduce((obj, key ) => {
        if (filterFn(filterVal, key) || filterFn(filterVal, cookies[key]) ) {
            obj[key] = cookies[key];
        }

        return obj;
    }, {});
};

let removeCookie = e => {
    document.cookie = `${e.target.dataset.cookie}=; max-age=-1`;
    fillTable();
};

const fillTable = () => {
    const fragment = document.createDocumentFragment();
    const cookies = getFilteredCookies();

    listTable.innerHTML ='';

    // eslint-disable-next-line guard-for-in
    for (let cookie in cookies) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const tdValue = document.createElement('td');
        const tdDel = document.createElement('button');

        tdName.innerText = cookie;
        tdValue.innerText = cookies[cookie];
        tdDel.innerText = 'Удалить';
        tdDel.dataset.cookie = cookie;
        tdDel.addEventListener('click', removeCookie);

        tr.appendChild(tdName);
        tr.appendChild(tdValue);
        tr.appendChild(tdDel);

        fragment.appendChild(tr);
    }

    listTable.appendChild(fragment);
};

window.addEventListener('load', () => {
    fillTable();
});

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}