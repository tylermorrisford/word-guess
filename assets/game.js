        // ARRAYS AND VARIABLES --------------------------------------------|||||||||
        // create an array with words that users must guess - If you say "and" you probably need to write a new statement on a new line!
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
        let wins = 0;
        // capture key that user presses as their guess |||  BEGINS GAME LOOP  ||| (for better or worse)
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
            console.log(word);
        }
        window.onload = function() {
            // starting the game-------------
            chooseWord();
            console.log("line 88");
        }

        function gameReset() {
            currentWord = [];
            guessesList = [];
            userEntry.textContent = guessesList.join(" ");
            chooseWord();

        }
        // GAME PLAY
        document.onkeyup = function(event) {
            userChoice = event.key.toLowerCase();
            // log users guess on the page, and add it to the array guessesList
            guessesList.push(userChoice);
            userEntry.textContent = guessesList.join(" ");
            // decrement the remaining guesses
            g--;
            chances.textContent = g;
            // check users guess against the current array index:
            // if users guess exists in the object,
            if (word.includes(userChoice)) {
                //  replace underscore with that letter            
                for (j = 0; j < word.length; j++) {
                    // if the user's choice is equal to an index of the random word
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
            // if user runs out of chances
            if (g === 0 && word !== currentWord.join("")) {
                alert("GAME OVER, YOU REBEL SCUM! You can try another word, but I'm going to take one of your wins!");  // Need to update this message once wins can go up and down
                wins--;
                winNum.textContent = wins;
                gameReset();
                // if user guesses all letters before running out of guesses, increment wins #, show congratulations alert
            } else if (word === currentWord.join("") && g > 0) {
                wins++;
                winNum.textContent = wins;
                confirm("Great job kid, that shot was one in a million!");
                gameReset();
                // and move to the next word - re-initialize the game with a function? NEED SOME GUIDANCE ON THIS OPERATION
            }
        }