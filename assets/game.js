        // ARRAYS AND VARIABLES -----------
        let levelOne = [
            "stormtrooper",
            "leia",
            "wookiee",
            "alderaan",
            "lightsaber",
            "tatooine",
            "vader",
            "skywalker",
            "kenobi",
            "jabba",
            "carbonite"];
        let theWord = document.getElementById("theWord");
        let userEntry = document.getElementById("yourGuesses");
        let chances = document.getElementById("chancesLeft");
        let winNum = document.getElementById("winNumber");
        let currentWord = [];
        let guessesList = [];
        var g;
        let word;
        var userChoice;
        let timeoutID;
        let wins = 0;
        let userName = prompt("Welcome to the Rebellion, what's your name?");
        var modal = document.getElementById("myModal");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];
        // audio
        var chewbacca = new Audio("wookie.wav");
        var r2d2 = new Audio("R2D2.wav");
        var lightspeed = new Audio("lightspeed.mp3");
        var lightsaber = new Audio("lightsaber-on.wav");   
        // Functions ------------------
        function chooseWord() {
            word = levelOne[Math.floor(Math.random() * levelOne.length)];
            // use word.length to display the number of underscores as blank spots
            for (i = 0; i < word.length; i++) {
                currentWord[i] = "_";
            } 
            g = (word.length + 6);
            console.log(word, g);
            chances.textContent = g;
            theWord.textContent = currentWord.join(" ");
        }
        // game begins on load
        window.onload = function() {
            chooseWord();
        }

        function gameReset() {
            currentWord = [];
            guessesList = [];
            userEntry.textContent = guessesList.join(" ");
            chooseWord();
        }

        function completeLoss() {
            alert("Wow " + userName + ", you're bad at this. So bad that we'll take care of refreshing the page for you. Give it another shot!");
            location.reload();
        }
        
        function vaderModal() {
            modal.style.display = "block";
            span.onclick = function() {
              modal.style.display = "none";
            }
            window.onclick = function(event) {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            }
            
        }
        
        // Delayed Alerts
        function delayedAlertWin() {
            timeoutID = window.setTimeout(window.alert, 100, "Great job " + userName + ", that shot was one in a million!");
        }

        function delayedAlertLoss() {
            timeoutID = window.setTimeout(window.alert, 300, "These aren't the letters you're looking for. You'd like to give back one of your wins. Move along " + userName + ". Move along.");
        }


        // Main game play
        document.onkeyup = function(event) {
            userChoice = event.key.toLowerCase();
            // log users guess on the page, and add it to the array guessesList
            guessesList.push(userChoice);
            userEntry.textContent = guessesList.join(" ");
            // decrement the remaining guesses
            g--;
            chances.textContent = g;
            // check users guess against the current array index; if users guess exists in the object,
            if (word.includes(userChoice)) {
                //  replace underscore with that letter            
                for (j = 0; j < word.length; j++) {
                    if (userChoice === word[j]) {
                        // then match the index of the hidden word to the the index of the random word 
                        currentWord[j] = word[j];
                    }
                    // the array of spaces will add user's chosen letter into the index of the hidden word
                    theWord.textContent = currentWord.join(" ");
                    console.log(word);
                }
                // if users guess does not exist in the string, console.log an error message as many times as word.length
            } else {
                console.log(userChoice + " does not appear in the word.");
            }
            // if user runs out of chances and has zero wins
             if ( g === 0 && wins === 0 ) {
                alert("Well " + userName + ", it looks like the empire has won again. We'll take care of refreshing the page for you. Give it another shot!");
                location.reload();
            } 
            // shows a gif 
            if ( g === 4 && wins === 0 ) {
                vaderModal();
            }
            if (g === 0 && wins >=0 && word !== currentWord.join("")) {
                wins--;
                winNum.textContent = wins;
                delayedAlertLoss() 
                gameReset();
                // if user guesses all letters before running out of guesses, increment wins #, show congratulations alert
            } else if (word === currentWord.join("") && g > 0) {
                wins++;
                winNum.textContent = wins;
                delayedAlertWin();
                gameReset();
            }
            if (wins === 1) {
                lightsaber.play();
            }
            if (wins === 3) {
                lightspeed.play();
            }
        }



