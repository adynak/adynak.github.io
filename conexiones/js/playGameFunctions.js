// Unselect all active squares
function deselectAll() {
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            button.classList.toggle('active');
        }
    });
    // toggleOffByOneDiv();
    activeCount = 0;
};

// Make guess with 4 toggled squares
function makeGuess() {
    if (activeCount == 4 && !guessInProgress && guesses > 0) {

        guessInProgress = true;

        (async () => {

            await hopActiveButtons();
            const activeButtons = document.querySelectorAll('.square.active');
            const firstGroup = activeButtons[0].getAttribute('group');
            let correct = true;

            let guessColors = [];

            let guessGroups = "";
            for (let i = 0; i < activeButtons.length; i++) {
                switch (activeButtons[i].getAttribute('group')) {
                    case ("easy"):
                        guessGroups += ("🟨");
                        guessColors.push("yellow");
                        break;
                    case ("medium"):
                        guessGroups += ("🟩");
                        guessColors.push("green");
                        break;
                    case ("harder"):
                        guessGroups += ("🟦");
                        guessColors.push("blue");
                        break;
                    case ("difficult"):
                        guessGroups += ("🟪");
                        guessColors.push("pink");
                        break;
                }

                if (activeButtons[i].getAttribute('group') !== firstGroup) {
                    correct = false;
                }
            }

            gameRecord.push(guessGroups);

            if (correct) {
                moveSolvedToNextRow(activeButtons, firstGroup, true);
            } else { // On incorrect guess
                didWeGetThreeCorrect(guessColors);
                shakeActiveButtons();
                guesses--;
                updateGuesses();
                if (guesses == 0) {
                    // console.log('guesses used up');
                    // toggleOffByOneDiv();
                    solvePuzzle();
                }
            }

            guessInProgress = false;

        })();

    }
}

function didWeGetThreeCorrect(guessColors){
    var count = {};
    var offByOne = false ;
    guessColors.forEach(function(i) { count[i] = (count[i]||0) + 1;});

    if (count.yellow == 3) {
        offByOne = true;
    }
    if (count.green == 3) {
        offByOne = true;
    }
    if (count.blue == 3) {
        offByOne = true;
    }
    if (count.pink == 3) {
        offByOne = true;
    }

    if (offByOne) {
        var x = document.getElementById("toast");
        x.innerHTML = "¡Sólo una suposición es incorrecta!";
        x.className = "show";
        setTimeout(function(){x.className = x.className.replace("show", "hide");}, 2000);
    }

}

// function showHint() {
//     var hint = [thisGame.easy[0],thisGame.medium[0],thisGame.harder[0],thisGame.difficult[0]] ;
//     hint = hint.join("<br>");

//     var x = document.getElementById("toast");
//     x.innerHTML = hint;
//     x.className = "show";
//     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
// };

// Updates guess counter for UI
function updateGuesses() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        if (index < guesses) {
            circle.classList.remove('hidden');
        } else {
            circle.classList.add('hidden');
        }
    });
}


// Move solved squares to next available row
async function moveSolvedToNextRow(activeButtons, difficulty, user) {
    ordering = thisGame[difficulty][1]; //ordering of category
    startRowIndex = (nextRow - 1) * 4 + 1;

    buttonsInRow = document.querySelectorAll(`
     .square[position="${startRowIndex}"],
     .square[position="${startRowIndex + 1}"], 
     .square[position="${startRowIndex + 2}"], 
     .square[position="${startRowIndex + 3}"]
    `);

    for (let i = 0; i < 4; i++) {
        swapButtons(activeButtons[i], buttonsInRow[i]);
        buttonsInRow[i].classList.add(`solved-${difficulty}`);
        buttonsInRow[i].disabled = true;
        buttonsInRow[i].classList.remove('unsolved');
    }

    levelSolved(difficulty);

    nextRow++;
    if (nextRow == 5 && user) {
        await delay(100);
        openModal(1);
    } else if (nextRow == 5) {
        await delay(100);
        openModal(0);
    }
    deselectAll();
}


function swapButtons(button1, button2) {
    // Get button positions
    const rect1 = button1.getBoundingClientRect();
    const rect2 = button2.getBoundingClientRect();

    // Calculate the distance to swap
    const deltaX = rect2.left - rect1.left;
    const deltaY = rect2.top - rect1.top;

    // Apply transform to animate the swap
    button1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    button2.style.transform = `translate(-${deltaX}px, -${deltaY}px)`;

    //const tempPos = button1.getAttribute('position');
    const tempGroup = button1.getAttribute('group');
    const tempText = button1.textContent;
    const tempFontSize = button1.style.fontSize;

    // Add animate-swap class to trigger the transition
    button1.classList.add('animate-swap');
    button2.classList.add('animate-swap');

    // Swap attributes after animation
    // setTimeout(() => {
    //Swap position attributes (1-indexed)
    //button1.setAttribute('position', button2.getAttribute('position'));
    //button2.setAttribute('position', tempPos);

    // Swap group attributes
    button1.setAttribute('group', button2.getAttribute('group'));
    button2.setAttribute('group', tempGroup);

    // Swap text content
    button1.textContent = button2.textContent;
    button2.textContent = tempText;

    // Swap font size attributes
    button1.style.fontSize = button2.style.fontSize;
    button2.style.fontSize = tempFontSize;

    // Reset transforms
    button1.style.transform = '';
    button2.style.transform = '';

    // Remove the animate-swap class
    button1.classList.remove('animate-swap');
    button2.classList.remove('animate-swap');

    // }, 1);

}

// Shake squares animation (on incorrect guess)
function shakeActiveButtons() {
    const activeButtons = document.querySelectorAll('.square.active');
    let completed = 0;
    activeButtons.forEach(button => {
        button.classList.add('shake');
        button.addEventListener('animationend', function removeShakeClass() {
            button.classList.remove('shake');
            button.removeEventListener('animationend', removeShakeClass);
            if (++completed === activeButtons.length) {
                // deselectAll();
            }
        });
    });

}

// Hopping buttons animation (async: must finish before evaluating guess)
async function hopActiveButtons() {
    const activeButtons = document.querySelectorAll('.square.active');

    activeButtons.forEach((button, index) => {

        setTimeout(() => {
            button.classList.add('hop');
        }, index * 200);

        button.addEventListener('transitionend', function removeHopClass() {
            button.classList.remove('hop');
            button.removeEventListener('transitionend', removeHopClass);
        });
    });
    const totalDelay = activeButtons.length * 300 + 300;
    await delay(totalDelay);
}

// Returns promise for timeout of specified duration
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function newGame() {
    // console.log("old  gamePointers = ", gamePointers);
    // console.log("playing this game:",gameID);
    // let gameIndex = gamePointers.indexOf(gameID);
    // console.log("gameIndex = ", gameIndex);
    // console.log("remove ", gameID, " from ", gamePointers);
    // gamePointers.splice(gameIndex, 1); 
    // console.log("new gamePointers = ", gamePointers);
    // gameID = randomIntFromInterval(0, gamePointers.length - 1);
    // thisGame = json[0];
    // updateGuesses();

    // debugger;
    location.reload();
}

// Solves the remainder of puzzle once guesses made exceeds 4
async function solvePuzzle() {
    while (nextRow < 5) {
        await delay(1700);
        difficultyToSolve = ''
        const buttonsList = document.querySelectorAll('.square.unsolved');
        const buttons = Array.from(buttonsList);
        const difficultyOrder = Object.keys(thisGame);
        // console.log(difficultyOrder);

        for (let difficulty of difficultyOrder) {
            const found = buttons.find(button => button.getAttribute('group') === difficulty);
            if (found) {
                difficultyToSolve = difficulty;
                break;
            }
        }

        //buttons in the easiest yet unsolved group
        const solvedCategory = buttons.filter(button => button.getAttribute('group') === difficultyToSolve);
        moveSolvedToNextRow(solvedCategory, difficultyToSolve, false);
    }
}

function keepTrackOfActiveCells(buttons) {

    let buttonIndex = buttons.length
    let activeButtons = Array();

    for (i = 0; i < buttonIndex; i++) {
        if (buttons[i].classList.contains('active')) {
            activeButtons.push(buttons[i].textContent.toUpperCase());
        }
    }

    return activeButtons;
}

// Shuffle squares into random order
function shuffle() {
    const buttons = document.querySelectorAll('.square.unsolved');
    let buttonIndex = buttons.length,
        t, i;

    selectedButtons = keepTrackOfActiveCells(buttons);

    // While there remain elements to shuffle…
    while (buttonIndex) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * buttonIndex--);

        // And swap it with the current element.
        currentButton = buttons[buttonIndex];

        movingFromClassList = currentButton.classList;
        movingToClassList = buttons[i].classList;

        swapButtons(currentButton, buttons[i]);
        buttons[i] = currentButton;

    }

    toggleActive(buttons, selectedButtons);
}

function toggleActive(buttons, activeButtons) {
    buttons.forEach(button => {
        if (button.classList.contains('active')) {
            button.classList.toggle('active');
        }
    });
    let buttonIndex = buttons.length
    for (i = 0; i < buttonIndex; i++) {
        buttonText = buttons[i].textContent.toUpperCase();
        if (activeButtons.includes(buttonText)) {
            buttons[i].classList.toggle('active');
        }
    }
}

// Open notification modal
function openModal(result) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    modal.style.display = 'flex';

    let title = "";
    switch (gameRecord.length) {
        case 4:
            title = "¡Excelente!";
            break;
        case 5:
            title = "Bueno";
            break;
        case 6:
            title = "No malo";
            break;
        case 7:
            title = "¡Suerte!"
            break;
    }

    if (result == 1) {
        modalContent.innerHTML = `<h4>${title}</h4>
                                  <p>${gameRecord.map(row => row).join('<br>')}</p>
                                  <button class="modal-button" onclick="closeModal()">OK</button>`;
    } else if (result == -1) {
        var hint = [thisGame.easy[0],thisGame.medium[0],thisGame.harder[0],thisGame.difficult[0]] ;
        hint = hint.join("<br>");
        modalContent.innerHTML = `<div style="width: 300px;font-size: 20px;">
                                    <h4>Pistas</h4>
                                    <br>
                                    <div class="hintCat" style="background-color:rgb(227,228,65);">
                                        ${thisGame.easy[0]}
                                    </div>
                                    <div class="hintCat" style="background-color:rgb(116,191,45);">
                                        ${thisGame.medium[0]}
                                    </div>
                                    <div class="hintCat" style="background-color: rgb(78,149,254);">
                                        ${thisGame.harder[0]}
                                    </div>
                                    <div class="hintCat" style="background-color: rgb(167,77,251);">
                                        ${thisGame.difficult[0]}
                                    </div>
                                  
                                    <button class="modal-button" onclick="closeModal()">OK</button>
                                  </div>`;
    } else {
        modalContent.innerHTML = `<h4>¡Lo siento!</h4>
                                  <p>${gameRecord.map(row => row).join('<br>')}</p>
                                  <button class="modal-button" onclick="closeModal()">OK</button>`;
    }
}

function levelSolved(overlayLevel) {
    const buttons = document.querySelectorAll('.square');

    const button = buttons[(nextRow - 1) * 4]; //document.querySelector('.square');
    //const buttonRect = button.getBoundingClientRect();

    const updateOverlayPosition = () => {
        const buttonRect = button.getBoundingClientRect();
        overlay.style.top = `${buttonRect.top}px`;
        overlay.style.left = `${buttonRect.left}px`;
    }

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = `${overlayLevel}-overlay`;

    var categoryWords = thisGame[overlayLevel][1].map(word => word).join(', ').toUpperCase();

    overlay.innerHTML = `<h5>${thisGame[overlayLevel][0].toUpperCase()}</h5><h6>${categoryWords}</h6>`;
    overlay.style.textAlign = 'center';

    overlay.style.position = 'absolute';
    updateOverlayPosition();
    /*overlay.style.top = `${buttonRect.top}px`;
    overlay.style.left = `${buttonRect.left}px`;*/

    document.body.appendChild(overlay);
    overlay.style.display = 'block';
    window.addEventListener('resize', updateOverlayPosition);
}

// Closes notification modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function randomSelection(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// function toggleOffByOneDiv() {
//   var x = document.getElementById("almost");
//   x.style.display = "none";
// }

function toggleOnByOneDiv() {
  var x = document.getElementById("almost");
    x.style.display = "inline";
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var gamesArray = Array();
  var gameNumber = -1;
  var gameInde  = -1;
  var newCookieValue = "";
  let cookieGames = getCookie("gameNumbers");
  if (cookieGames == "") {
    gamesArray = Array.from(json.keys());
    gameNumber = gamesArray[Math.floor(Math.random()*gamesArray.length)];
    gameIndex = gamesArray.indexOf(gameNumber);
    gamesArray.splice(gameIndex, 1); 
    newCookieValue = gamesArray.toString();
    setCookie("gameNumbers",newCookieValue,30);
  } else {
    gamesArray = cookieGames.split(",");
    if (gamesArray.length == 1) {
        gameNumber = cookieGames;
        gamesArray = Array.from(json.keys());
        newCookieValue = gamesArray.toString();
        setCookie("gameNumbers",newCookieValue,30);
    } else {
        gameNumber = gamesArray[Math.floor(Math.random()*gamesArray.length)];
        gameIndex = gamesArray.indexOf(gameNumber);
        gamesArray.splice(gameIndex, 1); 
        newCookieValue = gamesArray.toString();
        setCookie("gameNumbers",newCookieValue,30);
    }
  }
  // gameNumber = gameNumber.replace(/\,/g,'');
  gameNumber = parseInt(gameNumber);
  return gameNumber;
}
