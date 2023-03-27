let apiUrl = "http://localhost:30000/scoreboard"
let playerName = new URLSearchParams(window.location.search).get('playerName')
if (playerName == null) playerName = "Anonymous"
document.getElementById("title").innerHTML = "Hello " + playerName;
var score = 0; // Initialize the score variable
var color = "black"      
function checkWord() {
var input = document.getElementById("inputBox").value;
document.getElementById("inputBox").value = "";
if (input.toLowerCase() === color) {
    score += 1;
} else {
    score -= 1;
}
document.getElementById("score").innerHTML = score;
}
function generateWord() {
checkWord();
// Define an array of words
var words = ['red', 'blue', 'black', 'orange', 'green'];

// Generate a random index between 0 and the length of the array
var index = Math.floor(Math.random() * words.length);
var index2 = Math.floor(Math.random() * words.length);

// Get the word element and set its text and class
var wordElement = document.getElementById("word");
wordElement.innerHTML = words[index];
//wordElement.className = words[index];

// Alternatively, you can set the color using inline style:
color =words[index2];
wordElement.style.color = color;
}

// Get the input field
var input = document.getElementById("inputBox");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
// If the user presses the "Enter" key on the keyboard
if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("genButton").click();
}
});
    


var timeLimit = 30; // Set the time limit in seconds
var timerElement = document.getElementById("timer");

// Define the timer function
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var countdownInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
        clearInterval(countdownInterval);
        let result = "";
        if (score > 20) {
            result = "Your mental age is 20";
        } else if (score > 10 || score <= 20) {
            result = "Your mental age is 40";
        } else {
            result = "Your mental age is 60";
        }
        alert("Time's up!\n"+result);
        const data = {
            playername: playerName,
            score: score
          };
        // Make the HTTP POST request to the API endpoint
        fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = "scoreboard.html";
            // Score submitted successfully, do something here
            } else {
                alert("Failed to submit score");
                throw new Error('Failed to submit score');
            }
        })
        .catch(error => {
            console.error(error);
            // Handle the error here
        });
        
    }
    }, 1000);
}

// Call the timer function with the specified time limit and timer element
startTimer(timeLimit, timerElement);