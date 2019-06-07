//Генерация цветов
function generateColorsArray() {

    let array = [];
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        array = [...array, color, color];
        color = "#";

    }

    return array;

}

//Перемешивание массива
function shuffle(array) {

    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;

}

//Запуск таймера
function startWatch() {

    if (seconds === 60) { seconds = 0; minutes += 1; }
    if (minutes === 60) { minutes = 0; hours += 1; }

    secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    mins = (minutes < 10) ? ('0' + minutes + ': ') : (minutes + ': ');
    gethours = (hours < 10) ? ('0' + hours + ': ') : (hours + ': ');
    
    //Показываем часы
    let time = gethours + mins + secs;
    $('.container').find('.timer').html(time);
    seconds++;

    //Запускаем раз в 1 секунду
    clearTime = setTimeout("startWatch( )", 1000);

}

//Стартуем отсчет времени
function startTime() {

    if (seconds === 0 && minutes === 0 && hours === 0) {
        startWatch();
    }

}

//Останавливаем время
function stopTime() {
    
    //Не останавливаем время если время уже остановлено, мало ли что может произойти
    if (seconds !== 0 || minutes !== 0 || hours !== 0) {

        const time = gethours + mins + secs;
        $('.container').find('.timer').html(time);
        clearTimeout(clearTime);

    }

}

//Закрываем карты
function flipBack() {

    $('.card').filter($('.open')).css("background-color", "#2e3d49");
    $('.card').filter($('.open')).toggleClass('open');
    openedCards = [];
    movesCount = movesCount + 1;
    $('.moves').text(movesCount);

}

//Создаем массив с цветами и заполняем его
let cardsArray = generateColorsArray();

// Создаем массив открытых карт
let openedCards = [];

//Создаем перемешанный массив
let shuffleCards = [];

//Создаем счетчики ходов и перевернутых карт
let tilesFlipped = 0;
let movesCount = 0;

//Заполняем перемешанным массивом
shuffleCards = shuffle(cardsArray);

//Таймер
let clearTime;
let seconds = 0, minutes = 0, hours = 0;
let secs, mins, gethours;

//Создаем доску и карты
$('.container').append('<ul class="deck"></ul>');

for (let i = 0; i < cardsArray.length; i++) {
    $('.deck').prepend('<li class="card"></li>');
}

for (let i = 0; i < cardsArray.length; i++) {
    $('.card').eq(i).addClass(shuffleCards[i]);
    //$('.card').eq(i).css("background-color", shuffleCards[i]);
}

//Действия по клику
$('.deck').on('click', '.card', function (event) {

    //Стратуем время по клику
    startTime();

    if ($(this).attr('class').includes("card") && openedCards.length < 2) {

        //Получаем цвет которым будем окрашивать ячейку
        let newColor = $(this).attr('class').slice(5);

        //Открываем карту если нет других открытых карт и эта карта не открыта
        if (openedCards.length === 0) {

            $(this).css("background-color", newColor);
            $(this).toggleClass('open');
            openedCards.push(newColor);

        }

        //Если уже есть открытая карта
        else if (openedCards.length === 1) {

            $(this).css("background-color", newColor);
            $(this).toggleClass('open');
            openedCards.push(newColor);

            //Сравнение карт
            if (openedCards[0] === openedCards[1]) {

                $('.card').filter($('.open')).toggleClass('open match');

                //Пересчитываем счетчики
                tilesFlipped = tilesFlipped + 2;
                movesCount = movesCount + 1;
                $('.moves').text(movesCount);

                //Обнуляем массив открытых карт
                openedCards = [];

                if ($('.card').filter($('.match')).toArray().length === 16) {
                    alert("Вы выиграли!");
                    stopTime();
                }

            } else {

                //Совпадения нет, закрываем карты
                setTimeout(flipBack, 600);

            }
        }
    }
})

