
let apiUrl = "http://localhost:30000/scoreboard"
fetch(apiUrl)
.then(response => response.json())
.then(scores => {
  // Sort the scores by score (descending)
  scores.sort((a, b) => b.score - a.score);

  // Display the top 10 scores
  let scoreboardBody = document.getElementById("scoreboardBody");
  for (let i = 0; i < Math.min(scores.length, 10); i++) {
      let row = document.createElement("tr");
      let rank = document.createElement("td");
      rank.textContent = i + 1;
      row.appendChild(rank);
      let name = document.createElement("td");
      name.textContent = scores[i].playername;
      row.appendChild(name);
      let score = document.createElement("td");
      score.textContent = scores[i].score;
      row.appendChild(score);
      scoreboardBody.appendChild(row);
  }
});

// Add a click event listener to the play again button
let playAgainButton = document.getElementById("playAgainButton");
playAgainButton.addEventListener("click", () => {
  window.location.href = "index.html";
});