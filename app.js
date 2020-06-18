const cardColors = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "brown",
  "brown",
  "yellow",
  "yellow",
  "gray",
  "gray",
  "cadetblue",
  "cadetblue",
  "violet",
  "violet",
  "lightgreen",
  "lightgreen",
];

let cards = document.querySelectorAll("div");

cards = [...cards]; //zamiana NodeList na tablice

const startTime = new Date().getTime();

let activeCard = ""; //kliknięta karta
const activeCardsPair = []; //aktywna para kart kliknięta

const gamePairs = cards.length / 2; //9 par w grze
let gameResult = 0;

function clickCard() {
  activeCard = this;

  if (activeCard == activeCardsPair[0]) {
    //kliknięcie drugi raz w ten sam element nic nie powoduje
    return;
  }

  activeCard.classList.remove("hidden");

  //czy to jest 1 kliknięcie
  if (activeCardsPair.length == 0) {
    activeCardsPair[0] = activeCard;
    return;
  }
  //drugie kliknięcie
  else {
    cards.forEach((card) => {
      card.removeEventListener("click", clickCard);
    });
    activeCardsPair[1] = activeCard;

    setTimeout(function () {
      //funkcja sprawdza czy są takie same klasy (kolory) i dopiero po 1 sekundzie daje klasę off lub hidden
      if (activeCardsPair[0].className === activeCardsPair[1].className) {
        activeCardsPair.forEach((activeCard) =>
          activeCard.classList.add("off")
        );
        gameResult++;
        cards = cards.filter(
          (activeCard) => !activeCard.classList.contains("off") //wyrzuca z cards pary, które odsłoniliśmy
        );

        if (gameResult == gamePairs) {
          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime) / 1000;
          alert(`Wygrałeś! Twój czas to ${gameTime} sekund`);
          location.reload(); //odświeżenie strony
        }
      } else {
        activeCardsPair.forEach((activeCard) =>
          activeCard.classList.add("hidden")
        );
      }
      activeCard = "";
      activeCardsPair.length = 0;
      cards.forEach((card) => card.addEventListener("click", clickCard));
    }, 1000);
  }
}

const init = () => {
  cards.forEach((card) => {
    const positionInCardColors = Math.floor(Math.random() * cardColors.length);
    card.classList.add(cardColors[positionInCardColors]);
    cardColors.splice(positionInCardColors, 1); //usunięcie z tablicy cardsColor jednego wylosowanego elementu(indexu)
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.add("hidden");

      card.addEventListener("click", clickCard);
    });
  }, 2000);
};

init();
