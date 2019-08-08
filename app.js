/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, 
    roundScore, 
    activePlayer, 
    dice,
    hide,
    gamePlaying;

let roll,
    previousRoll;

let rollLog = [];

init();

// dice = Math.floor(Math.random() * 6) + 1;

// take value from dice and put into box of current round points racked up.
// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<strong>' + dice + '</strong>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// function btn() {
//     // do something here

// }
// btn();
                                                    // callback function
// document.querySelector('.btn-roll').addEventListener('click', btn);

                                                    // anonymous function
                                                    // can't be used anywhere else

let diceDOM = document.querySelector('.dice');
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. random number when clicked
        dice = Math.floor(Math.random() * 6) + 1;
        // 2. display result
        diceDOM.style.display = 'block';
        diceDOM.src = './imgs/dice-' + dice + '.png';
    
    // 3. update round score IF the rolled number was NOT a 1.
        if (dice != 1) {
            // add score
            showDie();
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            if(dice == roll && roll == 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                roll = "BROKE";
                rollLog.unshift(roll);
                rollLogPanel();
                nextPlayer();
            }
            roll = dice;
            rollLog.unshift(roll);
            rollLogPanel();            
        } else {
            // Next Player
            roll = "BUST";
            rollLog.unshift(roll);
            rollLogPanel();
            nextPlayer();
        }
    }
});



// ***************
// Hold Button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;
        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if(scores[activePlayer] >= 100) {
            roundScore = 0;
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            // next player
            roll = 'HOLD';
            rollLog.unshift(roll);
            rollLogPanel();
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function rollLogPanel() {
    for(let i = 0; i < 10; i++) {
        document.querySelector('.roll-' + [i]).textContent = rollLog[i];
        
        // document.querySelector('.roll-' + [i]).src = './imgs/dice-' + rollLog[i] + '.png';
        
    }
}

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    // Score resets
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = roundScore;
    document.getElementById('current-1').textContent = roundScore;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDie();
}



function hideDie() {
    hide = setTimeout(function() {
        diceDOM.style.display = 'none';
    }, 1000);
}
    
function showDie() {
    clearTimeout(hide);
}