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
        currentScore0 = 0;
        currentScoreEl0.textContent = currentScore0;
    } else {
        currentScore1 = 0;
        currentScoreEl1.textContent = currentScore1
    };
};


//функция сложения счета кубика к счету активного игрока
let addCurrentScore = function(){
    if (activePlayer === 0) {
        currentScore0 += randomNum;
        currentScoreEl0.textContent = currentScore0;

    } else {
        currentScore1 += randomNum;
        currentScoreEl1.textContent = currentScore1;
    };
};

//функция сохранения счета hold score
let holdScore = function(){
    if (activePlayer === 0) {
        score0 += currentScore0;
        scoreEl0.textContent = score0;
    } else {
        score1 += currentScore1;
        scoreEl1.textContent = score1;
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
    currentScore0 = 0;
    currentScore1 = 0;
    currentScoreEl0.textContent = currentScore0;
    currentScoreEl1.textContent = currentScore1;
    score0 = 0;
    score1 = 0;
    scoreEl0.textContent = score0;
    scoreEl1.textContent = score1;

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
const newGameBtn = document.querySelector('.btn--new');

//  функция случайного числа для кубика
let randomNum = 0;
let randomNumFunc = function() {
    return Math.trunc(Math.random() * 6 + 1);
};

//начальный счет игроков должен быть равен 0
let score0 = 0;
let score1 = 0;
scoreEl0.textContent = score0;
scoreEl1.textContent = score1;

//спрятать кубик добавив ему класс .hidden 
dice.classList.add('hidden');


//сохранить текущий счет в переменной
const currentScoreEl0 = document.getElementById('current--0');
const currentScoreEl1 = document.getElementById('current--1');
let currentScore0 = 0;
let currentScore1 = 0;


//сохранить кто сейчас activePlayer, который начинает игру
let activePlayer = 0;
randomPlayer();

//начало игры
//случайным образом выбираем кто ничнает


/////// END начало ///////////



//////// ФУНКЦИОНАЛ /////////

//при нажатии на кнопку "бросить кубик"
//  генерируется случайное число для кубика от 1 до 6
//  показываем кубик с этим числом
roll.addEventListener('click', function () {
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
});

//при нажатии на hold currentScore записывается в score
//  currentScore при этом сбрасывается до 0
//  ход переходит другому игроку
hold.addEventListener('click', function(){
    holdScore();
    resetActivePlayerCurrentScore();
    switchPlayer();
});

newGameBtn.addEventListener('click', function() {
    newGame();
});

/////////// END ФУНКЦИОНАЛ ////////////


