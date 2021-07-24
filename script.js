'use strict';

///// НАБОР ФУНКЦИЙ /////////////

//функция переключения игроков
let switchPlayer = function(){
    if(activePlayer === 0) {
        activePlayer = 1;
        document.querySelector('.player--1').classList.add('player--active');
        document.querySelector('.player--0').classList.remove('player--active');
    } else {
        activePlayer = 0;
        document.querySelector('.player--0').classList.add('player--active');
        document.querySelector('.player--1').classList.remove('player--active');
    };
};

 //функция сборса счета акивного игрока
let resetActivePlayerCurrentScore = function() {
    if (activePlayer === 0) {
        currentScore[0] = 0;
        currentScoreEl0.textContent = currentScore[0];
    } else {
        currentScore[1] = 0;
        currentScoreEl1.textContent = currentScore[1]
    };
};


//функция сложения счета кубика к счету активного игрока
let addCurrentScore = function(){
    if (activePlayer === 0) {
        currentScore[0] += randomNum;
        currentScoreEl0.textContent = currentScore[0];

    } else {
        currentScore[1] += randomNum;
        currentScoreEl1.textContent = currentScore[1];
    };
};

//функция сохранения счета hold score
let holdScore = function(){
    if (activePlayer === 0) {
        score[0] += currentScore[0];
        scoreEl0.textContent = score[0];
    } else {
        score[1] += currentScore[1];
        scoreEl1.textContent = score[1];
    };
};

//функция определения случайного игрока
let randomPlayer = function() {
    activePlayer = Math.trunc(Math.random() * 2);
        if(activePlayer === 0) {
            document.querySelector('.player--0').classList.add('player--active');
            document.querySelector('.player--1').classList.remove('player--active');
        } else {
            document.querySelector('.player--1').classList.add('player--active');
            document.querySelector('.player--0').classList.remove('player--active');
        };
    };


//функция начала новой игры
let newGame = function() {
    currentScore = [0, 0];
    currentScoreEl0.textContent = currentScore[0];
    currentScoreEl1.textContent = currentScore[1];
    score = [0,0];
    scoreEl0.textContent = score[0];
    scoreEl1.textContent = score[1];
    if (document.querySelector('.player--winner')) {
        document.querySelector('.player--winner').classList.remove('player--winner')
    };
    dice.classList.add('hidden');
    randomPlayer();
}

///// END НАБОР ФУНКЦИЙ /////////////






///////// начало /////////
//выбрать все элементы:
//  счет игрока0 и счет игрока1
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');

//  кубик
const dice = document.querySelector('.dice');

//  кнопки
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
let holdBtnCounter = 0; // счетчик нажатий кнопки hold
const newGameBtn = document.querySelector('.btn--new');

//  функция случайного числа для кубика
let randomNum = 0;
let randomNumFunc = function() {
    return Math.trunc(Math.random() * 6 + 1);
};

//начальный счет игроков должен быть равен 0
let score = [0, 0];

scoreEl0.textContent = score[0];
scoreEl1.textContent = score[1];

//спрятать кубик добавив ему класс .hidden 
dice.classList.add('hidden');


//сохранить текущий счет в переменной
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');
let currentScore = [0,0];


//сохранить кто сейчас activePlayer, который начинает игру
let activePlayer = 0;
randomPlayer();

//до скольки играть
const playUntill = 100;


/////// END начало ///////////



//////// ФУНКЦИОНАЛ /////////

//при нажатии на кнопку "бросить кубик"
//  генерируется случайное число для кубика от 1 до 6
//  показываем кубик с этим числом
roll.addEventListener('click', function () {
    if (!document.querySelector('.player--winner')) { //проверили что нет победителя
        holdBtnCounter = 0; //сбрасываем счетчик кнопки hold
        randomNum = randomNumFunc();
        dice.src = `dice-${randomNum}.png`;
        dice.classList.remove('hidden');

        //  проверяем если число равно 1 ? 
        //      ? сбросить счет активного игрока
        //      переключить на другого игрока : 
        //          
        //      : приплюсовать число к счету игрока
            if (randomNum === 1) {
                resetActivePlayerCurrentScore();
                switchPlayer();

            } else {
                addCurrentScore();
            };
    }; // !.player--winner'
});

//при нажатии на hold currentScore записывается в score
//  currentScore при этом сбрасывается до 0
//  ход переходит другому игроку
hold.addEventListener('click', function(){
    holdScore();
    if (score[activePlayer] >= playUntill) {
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        resetActivePlayerCurrentScore();
    } else {
        resetActivePlayerCurrentScore();
        if(holdBtnCounter < 1) { //если кнопка hold нажата менее 1 раза
            holdBtnCounter ++; //фиксируем нажатие кнопки hold
            switchPlayer();
        };
    };
});

newGameBtn.addEventListener('click', function() {
    newGame();
});

/////////// END ФУНКЦИОНАЛ ////////////


