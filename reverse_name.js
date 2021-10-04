
//----------------------------Readline--------------------------//

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

//establishing random number function that will be used in asynchronous code to generate computer's secret number
function randomNum(min, max) {
    let range = max - min + 1

    return Math.floor(Math.random() * range) + min
}

//---------------------Asynchronous Code Start Questions------------------------//
start();

async function start() {

    console.log("Let's play a game where I(computer) choose a number and you (human) try to guess it!")

    let maxNumber = await ask("Please start by picking a maximum number. What is your Max number?\n");

    //asynchronous function that takes in user input to record their setting for the maximum number in the game
    console.log('You entered: ' + maxNumber);

    //---------------------Establishing Max and Min------------------------//


    //here, I set the minimum and declare the max as the user-generated maxNumber
    let min = 0;
    let max = maxNumber;

    //---------------------Generating the Computer's Secret Number------------------------//


    //variable compNumber uses a function that generates a random number taking in a min and  max value (the max that was generated by the user), then declaring a variable range that takes the difference between min and max and adds one to it. the function returns the range as a random number using Math.random and uses Math.floor to round it down and adding the minimum to it.

    let compNumber = randomNum(min, max);//calling random number function established earlier and passing in min and max as parameters to generate computer's secret number

    //asynchronous function that takes in the user's guess computer's secret number
    let guess = await ask("It's time to guess my number. Please go ahead and type in your guess!\n");


    //asynchronous variable that takes in user input to the console to  input to confirm their guess
    let confirm =

        await ask(`You entered ${guess}. Is this correct? Type "y" for Yes and "n" for No.`);

    if (confirm !== 'y') {
        console.log("Please enter your number again");

        guess = await ask("It's time to guess my number. Please go ahead and type in your guess!\n");
    };


    //---------------------Comparing Computer Guess to User's Input------------------------//


    //computer prompts user to adjust their guess higher or lower:

    let count = 0;//I am declaring count here and setting it equal to zero. I will use this to keep track of how many tries it takes user to guess the number

    while (guess !== compNumber) {

        guess = parseInt(guess);
        //The user input is a string due to the readline function. The computer number is generated using the Math.random() so it is a number not a string. The two cannot be compared in the if statement unless they are the same type, so I'm converting the user input to a number for comparison using parse.Int().

        if (guess < compNumber) {
            guess = await ask("Your guess is too low--Please type in a new guess!\n")
            count = count + 1;//I'm adding 1 to the count each time this function loops. This will allow me to track how many times the user guessed too low
        }
        else if (guess > compNumber) {
            guess = await ask("Your guess is too high--Please type in a new guess!\n");
            count = count + 1;//I'm adding 1 to the count each time this function loops. This will allow me to track how many times the user guessed too low
        }
    }



    //user guess is successful:
    if (guess === compNumber) {
        console.log(`Yay, you guessed my number correctly and it took you ${count} tries!!`);//here I call the count variable to tell the user how many tries it took (how many times user guessed low plus how many times user guessed high which was tracked by count = count +1)


        //------------Play Again---------//
        //this code asks the user if they would like to play again with asynchronous code, if they do it restarts the program with start() otherwise it exits with process.exit()
        //asynchronous function that takes in user input if they would like to play again or exit
        let playAgain = await ask(`Would you like to play again? Type yes or y to play, no or n to exit.`);

        console.log('You entered: ' + playAgain);

        //if statement with conditional for yes to play again and start()
        if (playAgain === "yes" || playAgain === "y") {
            console.log("Awesome, let's go!");

            start();
        }

        //elseif statement with conditional for no further play says goodbye to user and process.exit()
        else if (playAgain === "no" || playAgain === "n") {

            console.log("Goodbye!");

            process.exit();
        }
    }
}
