const gameContainer = document.getElementById('display');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    setTimeout(function(){
        newDiv.style.backgroundColor = `${color}`
        newDiv.style.color = `${color}`
        document.body.style.backgroundColor = 'grey'
            }, 5000)
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
function assignAnimals(divs){
    let animals = [
        "Zebra",
        "Zebra",
        "Giraffe",
        "Giraffe",
        "Elephant",
        "Elephant",
        "Dog",
        "Dog",
        "Cat",
        "Cat"
    ]
    const shuffledAnimals = shuffle(animals);

    for (i = 0; i< shuffledAnimals.length; i++){
        divs[i].innerText = shuffledAnimals[i];
        divs[i].setAttribute('data-animal', `${shuffledAnimals[i]}`)
    }

}
// TODO: Implement this function!
var chosenAnimal = '';
var chosenID = 99;
var winCounter = 0;
    function handleCardClick(event) {
        if (gameStart){
        // if no card chosen yet
        if (chosenAnimal == '' ){
            chosenID = event.target.getAttribute('data-ID')
            chosenAnimal = event.target.innerText;
            event.target.style.backgroundColor = 'white';
            event.target.style.color = 'black'
        }
        // if cards match
        else if (event.target.innerText == chosenAnimal && chosenID != event.target.getAttribute('data-ID')){
            winCounter ++;
            let cards = document.querySelectorAll(`div[data-animal="${chosenAnimal}"]`)
            for (let card of cards){
                card.style.borderColor = 'green';
                card.style.borderStyle = 'dashed'
            }
            gameStart = false;
            event.target.style.backgroundColor = 'white';
            event.target.style.color = 'black'
                setTimeout(function(){
                    for (let card of cards){
                    card.style.visibility  = 'hidden'; 
                    gameStart = true;
                        }
                chosenAnimal = '';
                chosenID = '';
                }, 1000)   
        }
        // if same card chosen twice
        else if (chosenID == event.target.getAttribute('data-ID')){
            chosenAnimal = event.target.innerText;
            chosenID = event.target.getAttribute('data-ID');
            event.target.style.backgroundColor = 'white';
            event.target.style.color = 'black'
        }
        // if cards dont match
        else{
            chosenAnimal = '';
            chosenID = '';
            event.target.style.backgroundColor = "white"
            event.target.style.color = 'black';
            gameStart = false;
            setTimeout(function(){
               resetDivs =  document.querySelectorAll('div')
               for (let div of resetDivs){
                div.style.backgroundColor = div.className;
                div.style.color = div.className;
                gameStart = true;
               }
            }, 1000)
            
        }

      
    }
    if (winCounter == 5){
        document.querySelector('h1').innerText = 'Congratulations!'
        const restarter = document.createElement("button")
        restarter.innerText = "Restart?"
        document.querySelector('h1').appendChild(restarter)
        restarter.addEventListener('click', function(){
            document.location.reload();
        })
    }
 
}


// when the DOM loads
var gameStart = false;
createDivsForColors(shuffledColors);
const colorDivs = document.querySelectorAll('div')
for (i = 0; i< colorDivs.length; i++){
    colorDivs[i].setAttribute('data-ID', i);
}
assignAnimals(colorDivs);


// start timer
function decrement_num(number){
    const interval = setInterval(function(){
        number --;
        
        if (number == 0){
            span.innerText = 'Go!'
            gameStart = true;
            setTimeout(function(){
                span.remove()
            }, 1000)
            clearInterval(interval);
        }
        else{
            span.innerText = number;
        }
        
    }, 1000)
}

let span = document.createElement('span')
span.innerText = 'Ready?'
document.querySelector('h1').appendChild(span);
decrement_num(5)

/* */