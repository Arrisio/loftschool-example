/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    let divElt = document.createElement('div');

    divElt.innerText = text;

    return divElt;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    where.prepend(what)
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов, следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let pElts = where.getElementsByTagName('P');
    let pSiblings = [];

    for (let pElt of pElts) {
        // pSiblings.push(pElt.previousSibling);
        let siblingCandidate = pElt.previousSibling;

        if (siblingCandidate !== null) {
            pSiblings.push(siblingCandidate);
        }
    }

    return pSiblings;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов.
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    for (let node of where.childNodes) {
        if (node.nodeType === 3) {
            node.remove();
        }
    }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    let gatherTextNodesRecursive = (where) => {
        let localTextNodes = [];

        for (let node of where.childNodes) {
            if (node.nodeType === 3) {
                localTextNodes.push(node);
            } else if (node.hasChildNodes()) {
                localTextNodes = [...localTextNodes, ...gatherTextNodesRecursive(node)]
            }
        }

        return localTextNodes;
    }

    for (let textNode of gatherTextNodesRecursive(where)) {
        textNode.remove();
    }

}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {
    var fillNaNum = (x) => x ? x : 0;
    var fillNaObj = (x) => x ? x : {};
    var incrementCounter = (x) => x ? ++x: 1;

    var calcArrayStats = (array) => {
        let resultObj = {};

        array.forEach((el) => {
            resultObj[el] = incrementCounter(resultObj[el])
        });

        return resultObj;
    }

    var combineObjects = (obj1, obj2) => {
        let allKeys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
        let resObj = {}

        allKeys.forEach((key) => {
            if (typeof (obj1[key]) != typeof (obj1[key]) && obj1[key] !== undefined && obj2[key] !== undefined) {
                throw new Error('Несовпадение типов комбинируемых элементов')
            } else if (Number.isInteger(obj1[key]) || Number.isInteger(obj2[key])) {
                resObj[key] = fillNaNum(obj1[key]) + fillNaNum(obj2[key])
            } else if (obj1[key] instanceof Object || obj2[key] instanceof Object) {
                resObj[key] = combineObjects(fillNaObj(obj1[key]), fillNaObj(obj2[key]))
            } else {
                throw new Error('тип данных не поддерживается при суммировании объектов')
            }
        })

        return resObj
    };

    let stat = { tags: {}, classes: {}, texts: 0 };

    for (let node of root.childNodes) {
        if (node.nodeType === 3) {
            stat.texts += 1;
        }

        if (node.classList != null && typeof node.classList[Symbol.iterator] === 'function') {
            stat.classes = combineObjects(stat.classes, calcArrayStats(node.classList))
        }

        if (node.tagName) {
            stat.tags[node.tagName] = incrementCounter(stat.tags[node.tagName]);
        }

        if (node.hasChildNodes()) {
            stat = combineObjects(stat, collectDOMStat(node));
        }
    }

    return stat;
}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {

    let fnArg = {
        nodes: [],
    };

    let observer = new MutationObserver( (mutationRecords) => {

        mutationRecords.forEach((mutationRecord) => {

            if (mutationRecord.addedNodes.length) {
                fnArg.type = 'insert';
                mutationRecord.addedNodes.forEach((node) => {
                    fnArg.nodes.push(node)
                });
            } else if (mutationRecord.removedNodes.length) {
                fnArg.type = 'remove';
                mutationRecord.removedNodes.forEach((node) => {
                    fnArg.nodes.push(node)
                });
            }

            fn(fnArg);
        })
    });

    observer.observe(where, {
        childList: true,
        subtree: true,
        characterDataOldValue: false,
        characterData: false
    });
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};