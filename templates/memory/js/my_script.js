 // Once modules are supported by browsers, it will be better to store content in separate js file
// import { Content } from './content';

// fruit_pics from https://commons.wikimedia.org/
// sign language anigifs from http://lifeprint.com/asl101/gifs-animated/
// sound effects from Hollywood Premiere Edition licensed collection

/*============================================
                  CONTENT
============================================*/
const content = {
  
  A_W: [
    ["der Lockenstab", "match1"],
    ["<img id='LS' src='./images/audio_file.svg' />", "match1"],
    ["der Lockenwickler", "match2"],
    ["<img id='LW' src='./images/audio_file.svg' />", "match2"],
    ["die Schere", "match3"],
    ["<img id='Sch' src='./images/audio_file.svg' />", "match3"],
    ["der Föhn", "match4"],
    ["<img id='F' src='./images/audio_file.svg' />", "match4"],
    ["das Climazon", "match5"],
    ["<img id='C' src='./images/audio_file.svg' />", "match5"],
    ["die Haarschneide- <br> maschine","match6"],
    ["<img id='HM' src='./images/audio_file.svg' />","match6" ],
    ["die Trockenhaube", "match7"],
    ["<img id='TH' src='./images/audio_file.svg' />", "match7"],
    ["der Effilierer", "match8"],
    ["<img id='E' src='./images/audio_file.svg' />", "match8"]
  ],
  B_W: [
    ["<img src='./images/1.png' />", "match1"],
    ["-r Effelierer", "match1"],
    ["<img src='./images/2.png' />", "match2"],
    ["-r Kamm", "match2"],
    ["<img src='./images/3.png' />", "match3"],
    ["-e Haarschneide- <br> maschine", "match3"],
    ["<img src='./images/4.png' />", "match4"],
    ["-e Trockenhaube", "match4"],
    ["<img src='./images/5.png' />", "match5"],
    ["-r Föhn", "match5"],
    ["<img src='./images/6.png' />","match6"],
    ["-r Lockenstab", "match6"],
    ["<img src='./images/7.png' />", "match7"],
    ["-s Climazon", "match7"],
    ["<img src='./images/8.png' />", "match8"],
    ["-e Haarschneide- <br> schere", "match8"],
  ],

   B_A: [
  ["<img id='E' src='./images/audio_file.svg' />", "match1"],
  ["<img src='./images/animal_pics/1.png' />", "match1"],
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
      LS: new Audio('audio/Lockenstab.mp3'),
      LW: new Audio('audio/Lockenwickler.mp3'),
      Sch: new Audio('audio/Schere.mp3'),
      F: new Audio('audio/Foehn.mp3'),
      C: new Audio('audio/Climazon.mp3'),
      HM: new Audio('audio/Haarschneidemaschine.mp3'),
      TH: new Audio('audio/Trockenhaube.mp3'),
      E: new Audio('audio/Effilierer.mp3'),
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
