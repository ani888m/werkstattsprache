// DOM-Referenzen
let draggableObjects;
let dropPoints;
const startButton = document.getElementById("start");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const dragContainer = document.querySelector(".draggable-objects");
const dropContainer = document.querySelector(".drop-points");

// Datenstruktur mit Artikeln
const data = [
  { word: "Trockenhaube", article: "die" },
  { word: "Climazon", article: "der" },
  { word: "Kamm", article: "der" },
  { word: "Haarschneideschere", article: "die" },
  { word: "Haarschneidemaschine", article: "die" },
  { word: "Effilierer", article: "der" },
  { word: "Föhn", article: "der" }
];

let deviceType = "";
let initialX = 0, initialY = 0;
let currentElement = "";
let moveElement = false;
let count = 0;

// Touch-Erkennung
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

// Zufällige Wörter auswählen
const randomWords = () => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const stopGame = () => {
  controls.classList.remove("hide");
  startButton.classList.remove("hide");
};

// Drag-Start
function dragStart(e) {
  if (isTouchDevice() && e.touches) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    moveElement = true;
    currentElement = e.target;
  } else {
    e.dataTransfer.setData("text", e.target.id);
  }
}

function dragOver(e) {
  e.preventDefault();
}

// Touch-Move
const touchMove = (e) => {
  if (moveElement && e.touches) {
    e.preventDefault();
    let newX = e.touches[0].clientX;
    let newY = e.touches[0].clientY;
    let el = document.getElementById(e.target.id);
    if (el && el.parentElement) {
      el.parentElement.style.top =
        el.parentElement.offsetTop - (initialY - newY) + "px";
      el.parentElement.style.left =
        el.parentElement.offsetLeft - (initialX - newX) + "px";
    }
    initialX = newX;
    initialY = newY;
  }
};

// Drop-Logik
const drop = (e) => {
  e.preventDefault();
  let draggedArticle, dropArticle;

  if (isTouchDevice()) {
    moveElement = false;
    if (!currentElement) return;

    draggedArticle = currentElement.parentElement.getAttribute("data-article");

    // Drop-Ziel anhand der Koordinaten erkennen
    dropPoints.forEach((dropTarget) => {
      const bounds = dropTarget.getBoundingClientRect();
      if (
        initialX >= bounds.left &&
        initialX <= bounds.right &&
        initialY >= bounds.top &&
        initialY <= bounds.bottom &&
        !dropTarget.classList.contains("dropped")
      ) {
        dropArticle = dropTarget.getAttribute("data-article");
        if (draggedArticle === dropArticle) {
          currentElement.classList.add("hide");
          dropTarget.innerHTML = `<img src="${draggedArticle}.png">`;
          dropTarget.classList.add("dropped");
          count++;
        }
      }
    });
  } else {
    const draggedId = e.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedId);
    if (!draggedElement) return;

    draggedArticle = draggedElement.parentElement.getAttribute("data-article");
    dropArticle = e.target.getAttribute("data-article");

    if (
      draggedArticle === dropArticle &&
      !e.target.classList.contains("dropped")
    ) {
      draggedElement.classList.add("hide");
      draggedElement.setAttribute("draggable", "false");
      e.target.innerHTML = `<img src="${draggedArticle}.png">`;
      e.target.classList.add("dropped");
      count++;
    }
  }

  if (count === 3) {
    result.innerText = `Prima! Sie haben gewonnen!`;
    stopGame();
  }
};

// Spiel-Elemente erzeugen
const creator = () => {
  dragContainer.innerHTML = "";
  dropContainer.innerHTML = "";
  const selectedWords = randomWords();

  // Draggable (Artikel)
  selectedWords.forEach((item, index) => {
    const dragDiv = document.createElement("div");
    dragDiv.classList.add("draggable-image");
    dragDiv.setAttribute("draggable", true);
    dragDiv.setAttribute("data-article", item.article);
    if (isTouchDevice()) dragDiv.style.position = "absolute";
    dragDiv.innerHTML = `<img src="${item.article}.png" id="${item.article}-${index}">`;
    dragContainer.appendChild(dragDiv);
  });

  // Drop-Ziele (Wörter)
  const shuffled = [...selectedWords].sort(() => 0.5 - Math.random());
  shuffled.forEach((item) => {
    const dropDiv = document.createElement("div");
    dropDiv.innerHTML = `<div class='countries drop-target' data-article="${item.article}">${item.word}</div>`;
    dropContainer.appendChild(dropDiv);
  });
};

// Start
startButton.addEventListener(
  "click",
  (startGame = async () => {
    currentElement = "";
    controls.classList.add("hide");
    startButton.classList.add("hide");
    await creator();
    count = 0;
    dropPoints = document.querySelectorAll(".countries");
    draggableObjects = document.querySelectorAll(".draggable-image");

    draggableObjects.forEach((el) => {
      el.addEventListener("dragstart", dragStart);
      el.addEventListener("touchstart", dragStart);
      el.addEventListener("touchend", drop);
      el.addEventListener("touchmove", touchMove);
    });

    dropPoints.forEach((el) => {
      el.addEventListener("dragover", dragOver);
      el.addEventListener("drop", drop);
    });
  })
);
