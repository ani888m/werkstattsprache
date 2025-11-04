 // Once modules are supported by browsers, it will be better to store content in separate js file
// import { Content } from './content';

// fruit_pics from https://commons.wikimedia.org/
// sign language anigifs from http://lifeprint.com/asl101/gifs-animated/
// sound effects from Hollywood Premiere Edition licensed collection

/*============================================
                  CONTENT
============================================*/
const content = {
  fruit: [
    ["strawberry", "match1"],
    ["strawberry", "match1"],
    ["lemon", "match2"],
    ["lemon", "match2"],
    ["grapes", "match3"],
    ["grapes", "match3"],
    ["cherries", "match4"],
    ["cherries", "match4"],
    ["pear", "match5"],
    ["pear", "match5"],
    ["peach","match6" ],
    ["peach","match6" ],
    ["apple", "match7"],
    ["apple", "match7"],
    ["orange", "match8"],
    ["orange", "match8"]
  ],
  animals: [
    ["bird", "match1"],
    ["bird", "match1"],
    ["elephant", "match2"],
    ["elephant", "match2"],
    ["tiger", "match3"],
    ["tiger", "match3"],
    ["lion", "match4"],
    ["lion", "match4"],
    ["monkey", "match5"],
    ["monkey", "match5"],
    ["turkey","match6" ],
    ["turkey","match6" ],
    ["eagle", "match7"],
    ["eagle", "match7"],
    ["zebra", "match8"],
    ["zebra", "match8"]
  ],
  spanish: [
    ["hello", "match1"],
    ["hola", "match1"],
    ["goodby", "match2"],
    ["adio", "match2"],
    ["grapes", "match3"],
    ["uvas", "match3"],
    ["horse", "match4"],
    ["caballo", "match4"],
    ["car", "match5"],
    ["carro", "match5"],
    ["house","match6" ],
    ["casa","match6" ],
    ["apple", "match7"],
    ["manzana", "match7"],
    ["table", "match8"],
    ["mesa", "match8"]
  ],
  fruit_pics: [
    ["<img src='./images/strawberry.svg' />", "match1"],
    ["<img src='./images/strawberry.svg' />", "match1"],
    ["<img src='./images/lemon.svg' />", "match2"],
    ["<img src='./images/lemon.svg' />", "match2"],
    ["<img src='./images/grapes.svg' />", "match3"],
    ["<img src='./images/grapes.svg' />", "match3"],
    ["<img src='./images/cherries.svg' />", "match4"],
    ["<img src='./images/cherries.svg' />", "match4"],
    ["<img src='./images/pear.svg' />", "match5"],
    ["<img src='./images/pear.svg' />", "match5"],
    ["<img src='./images/peach.svg' />","match6" ],
    ["<img src='./images/peach.svg' />","match6" ],
    ["<img src='./images/apple.svg' />", "match7"],
    ["<img src='./images/apple.svg' />", "match7"],
    ["<img src='./images/orange.svg' />", "match8"],
    ["<img src='./images/orange.svg' />", "match8"]
  ],
  als_pics: [
    ["actor", "match1"],
    ["<img class='sign-lang-img' src='./images/asl_pics/actor.gif' />", "match1"],
    ["artist", "match2"],
    ["<img class='sign-lang-img' src='./images/asl_pics/artist.gif' />", "match2"],
    ["ball", "match3"],
    ["<img class='sign-lang-img' src='./images/asl_pics/ball.gif' />", "match3"],
    ["deaf", "match4"],
    ["<img class='sign-lang-img' src='./images/asl_pics/deaf.gif' />", "match4"],
    ["basketball", "match5"],
    ["<img class='sign-lang-img' src='./images/asl_pics/basketball.gif' />", "match5"],
    ["talk","match6" ],
    ["<img class='sign-lang-img' src='./images/asl_pics/talk.gif' />","match6" ],
    ["music", "match7"],
    ["<img class='sign-lang-img' src='./images/asl_pics/music.gif' />", "match7"],
    ["play", "match8"],
    ["<img class='sign-lang-img' src='./images/asl_pics/play.gif' />", "match8"]
  ],
  animal_sounds: [
    ["der Lockenstab", "match1"],
    ["<img id='' src='./images/audio_file.svg' />", "match1"],
    ["der Lockenwickler", "match2"],
    ["<img id='d' src='./images/audio_file.svg' />", "match2"],
    ["die Schere", "match3"],
    ["<img id='e' src='./images/audio_file.svg' />", "match3"],
    ["der Föhn", "match4"],
    ["<img id='g' src='./images/audio_file.svg' />", "match4"],
    ["das Climazon", "match5"],
    ["<img id='dog' src='./images/audio_file.svg' />", "match5"],
    ["die Haarschneide- <br> maschine","match6"],
    ["<img id='h' src='./images/audio_file.svg' />","match6" ],
    ["die Trockenhaube", "match7"],
    ["<img id='f' src='./images/audio_file.svg' />", "match7"],
    ["sheep", "match8"],
    ["<img id='sheep' src='./images/audio_file.svg' />", "match8"]
  ],
  animalPics_sounds: [
    ["<img src='./images/animal_pics/1.png' />", "match1"],
    ["-r Effelierer", "match1"],
    ["<img src='./images/animal_pics/2.png' />", "match2"],
    ["-r Effelierer <br> (mit Auge)", "match2"],
    ["<img src='./images/animal_pics/3.png' />", "match3"],
    ["-e Haarschneide- <br> maschine", "match3"],
    ["<img src='./images/animal_pics/4.png' />", "match4"],
    ["-e Trockenhaube", "match4"],
    ["<img src='./images/animal_pics/5.png' />", "match5"],
    ["-r Föhn", "match5"],
    ["<img src='./images/animal_pics/6.png' />","match6"],
    ["ujtnkl", "match6"],
    ["<img src='./images/animal_pics/7.png' />", "match7"],
    ["-s Climazon", "match7"],
    ["<img src='./images/animal_pics/8.png' />", "match8"],
    ["-e Haarschneide- <br> schere", "match8"],
  ],
};

/*============================================
              Global Variables
============================================*/
let menuSelection;

let timer;
let centiseconds = 00;
let seconds = 0;
let minutes = 0;
let timerGoing = true;
let bestTimes = [];

let score = 0;
let strikes = 0;
let cardPicks = [];


/*============================================
          Audio - Sound effects
============================================*/
const gameAudio = {
    clickCard: new Audio('audio/click.mp3'),
    rightAnswer: new Audio('audio/right.mp3'),
    wrongAnswer: new Audio('audio/wrong.mp3'),
    aboutToLose: new Audio('audio/last_wrong.mp3'),
    winningSound: new Audio('audio/winner.mp3'),
    losingSound: new Audio('audio/loser.mp3'),
    animals: {
      chicken: new Audio('audio/er_Foehn.mp3'),
      c: new Audio('audio/Lockenstab.mp3'),
      d: new Audio('audio/der_Lockenwickler.mp3'),
      e: new Audio('audio/die_Schere.mp3'),
      g: new Audio('audio/der_Foehn.mp3'),
      dog: new Audio('audio/animals/dog.mp3'),
      h: new Audio('audio/die_Haarschneidemaschine.mp3'),
      f: new Audio('audio/die_Trockenhaube.mp3'),
      sheep: new Audio('audio/animals/sheep.mp3'),
      wolf: new Audio('audio/animals.wolf.mp3'),
    }
};

const playClickCard = () => gameAudio.clickCard.play();
const playRightAnswer = () => gameAudio.rightAnswer.play();
const playWrongAnswer = () => strikes != 9 ? gameAudio.wrongAnswer.play() : gameAudio.aboutToLose.play();
const playWinnerSound = () => gameAudio.winningSound.play();
const playLoserSound = () => gameAudio.losingSound.play();
const handleAudio = (event) => {
  (event === undefined || event === "") ?
    gameAudio.clickCard.play()
    :
    gameAudio.animals[`${event}`].play()
}


/*============================================
          Select Menu for Content
============================================*/
$('#menu').on("change", function(event) {
  menuSelection = content[event.target.value];
});


/*============================================
      Play / Reset to Shuffle Content
============================================*/
// Click Play Button to reset values and trigger Shuffle
$('.play-btn').on('click', (event) => {
    if (menuSelection == undefined) {
      alert('Wählen Sie bitte eine Option: Klicken Sie zuerst auf OPTION WÄHLEN und dann auf STARTEN.');
    } else {
      $('.play-btn').addClass('hide'); // hides Play button
      $('.reset-btn').removeClass('hide'); // shows Reset button
      resetGame();
      shuffle(menuSelection); // shuffles content, makes gameboard and starts timer
    }
});

$('.reset-btn').on('click', (event) => {
  $('.reset-btn').addClass('hide');
  $('.play-btn').removeClass('hide');
  resetGame(); // resets gameboard values BUT doesn't start Timer
});

// Click Play Again Button on Modal Window
$('.play-again-btn').on('click', (event) => {
  resetGame();
  shuffle(menuSelection);
});

// Using Fisher-Yates method
function shuffle(array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  makeGameBoard(array);
}


/*============================================
            Add Content to DOM
============================================*/
const makeGameBoard = (someContent) => {
    // Remove all contents from game board
    $('#gameboard').empty();
    // Populate game baord
    someContent.map((word, index) => {
      $('#gameboard').append(
        `<div class="square">
          <div class="card-cover"></div>
          <div class="${word[1]}"><span class="span-for-content">${word[0]}</span></div>
         </div>`);
    });
    // Start timer
    timeHandler();
};


/*============================================
                    TIMER
============================================*/
const timeHandler = () => {
  return timerGoing ? (
    timer = setInterval(timeCounter, 100)
  ) : (
    clearInterval(timer)
  );
};

const timeCounter = () => {
	let increment = centiseconds++;

    if (centiseconds > 9 && seconds >= 59) {
      minutes += 1;
      seconds = 0;
      centiseconds = 0;
    }
	  if (centiseconds > 9) {
      seconds += 1;
      centiseconds = 0;
    }
    return $('#time').html(`<span>${minutes}:${seconds}:${centiseconds}</span>`)
};

const stopTimer = () => {
  timerGoing = false;
  timeHandler();
};


/*============================================
              SCORE and STRIKES
============================================*/
// Event handler to catalog card picks in array 'cardPicks'
const handlePicks = (event) => {
  // console.log(event);
  // Long targeting needed for when game matches 'word' with 'sound'
  handleAudio(event.target.nextElementSibling.children[0].firstChild.id);

  $(event.target).addClass('card-show');
  let pick = $(event.target).siblings("div").attr('class');
  // Disable the card picked so it can't be clicked twice
  $(event.target).prop( "disabled", true );
  cardPicks.push(pick);

  if (cardPicks.length === 2) {
    setTimeout(decideMatch, 650, cardPicks);
  }
};

const changeScore = () => {
  score += 10;
  return $('#score').html(score);
};

const changeStrikes = () => {
  strikes += 1;
  return $('#strikes').html(strikes);
};

const hideCardsAgain = (cardPicksArr) => {
  $(`div.${cardPicksArr[0]}, div.${cardPicksArr[1]}`).siblings('div.card-cover').removeClass('card-show');
};

const makeCardsInactive = (cardPicksArr) => {
  $(`div.${cardPicksArr[0]}, div.${cardPicksArr[1]}`).siblings('div.card-cover').prop( "disabled", true );
};

const emptyCardPicks = arr => cardPicks.splice(0, cardPicks.length)

const decideMatch = (cardPicksArr) => {
    if (cardPicksArr[0] === cardPicksArr[1]) {
      makeCardsInactive(cardPicks);
      changeScore();
      score === 80 ? wonGame() : playRightAnswer(); // audio effect
      emptyCardPicks();
  } else {
    // Re-enable the cards picked so they're back in play again
     $('div.card-cover').prop( "disabled", false );
       changeStrikes();
       hideCardsAgain(cardPicks);
       strikes === 10 ? lostGame() : playWrongAnswer(); // audio effect
       emptyCardPicks();
  }
};

// Event listener to pick cards
$("#gameboard").on('click', 'div.card-cover', handlePicks);


/*============================================
              WINNING and LOSING
============================================*/
const wonGame = () => {
  stopTimer();
  playWinnerSound();
  // Disable game board
  $('#gameboard, div.card-cover').prop( "disabled", true );
  // show modal window with totals + Play Again button;
  judgeScore(seconds, centiseconds);
  showResults();
};

const showResults = () => {
  $('.results').addClass('show-results');
  $('#win-time').html(`Your Time: <span>${minutes} min. ${seconds}.${centiseconds} seconds</span>`);
  $('main').on('click', () => $('.results').removeClass('show-results'));
};

const lostGame = () => {
  playLoserSound();
  showLoserX();
  // Disable game board
  $('#gameboard, div.card-cover').prop( "disabled", true );
  stopTimer();
};

const showLoserX = () => {
  $('#loser-x').css('display', 'flex').fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeOut(500);
};


/*============================================
              TOP 5 WINNERS BOARD
============================================*/
const judgeScore = (seconds, centiseconds) => {
  let totalSeconds = (minutes * 60) + seconds;
  let time = parseFloat(`${totalSeconds}.${centiseconds}`);
  const sortTimes = (a, b) => a - b

  // Would be 'Null' if bestTimes hasn't been created in LocalStorage yet
  if (localStorage.getItem("bestTimes") == null) {
    bestTimes.push(time); // add to global array 'bestTimes'
    localStorage.setItem("bestTimes", JSON.stringify(bestTimes)); // add to LocalStorage
    displayTopTimes()
  } else if (localStorage.getItem("bestTimes")) {
    bestTimes = JSON.parse(localStorage.getItem("bestTimes"));
        if (bestTimes.length != 5) {
          bestTimes.push(time);
          bestTimes.sort(sortTimes); // Sorted fastest to slowest time
          localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
        } else if (bestTimes.length === 5 && time < bestTimes[bestTimes.length-1]) {
            bestTimes.splice(bestTimes.length-1, 1, time); // Replaces last array element
            bestTimes.sort(sortTimes);
            localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
        }
    displayTopTimes()
  }
};

const displayTopTimes = () => {
  console.log(bestTimes);
  const displayTimesArray = [];
  console.log(displayTimesArray);
  bestTimes.forEach(bestTime => {
    if (bestTime > 60) {
      let mins = Math.floor(bestTime / 60)
      let secs = (bestTime - 60).toFixed(1);
      let displayTime = `${mins} min. ${secs} seconds`;
      displayTimesArray.push(displayTime);
    } else {
      let displayTime = `${bestTime} seconds`;
      displayTimesArray.push(displayTime);
    }
  });
  switch(bestTimes.length) {
    case 2:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      break;
    case 3:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      $('#third').html(`<span>${displayTimesArray[2]}</span>`);
      break;
    case 4:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      $('#third').html(`<span>${displayTimesArray[2]}</span>`);
      $('#fourth').html(`<span>${displayTimesArray[3]}</span>`);
      break;
    case 5:
      $('#first').html(`<span>${displayTimesArray[0]}</span>`);
      $('#second').html(`<span>${displayTimesArray[1]}</span>`);
      $('#third').html(`<span>${displayTimesArray[2]}</span>`);
      $('#fourth').html(`<span>${displayTimesArray[3]}</span>`);
      $('#fifth').html(`<span>${displayTimesArray[4]}</span>`);
      break;
    default:
      $('#first').html(`<span>${displayTimesArray[0]}`);
      break;
  }
}


/*============================================
                  RESET GAME
============================================*/
const resetGame = () => {
  score = 0;
  strikes = 0;
  centiseconds = 0;
  seconds = 0;
  minutes =  0;
  timerGoing = true;

  // Clear Interval so when button is clicked, the time doesn't count twice as fast
  clearInterval(timer);
  // Reset DOM so time, score and strikes display 0s
  $('#time').html(`<span>${minutes}:${seconds}:${centiseconds}</span>`);
  $('#score').html(score);
  $('#strikes').html(strikes);
  // Removes Winner Modal window
  $('.results').removeClass('show-results');
  // Covers all uncovered cards
  $('.card-cover').removeClass('card-show');
};
