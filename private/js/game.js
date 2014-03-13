// The server-side game

// Requires
var GameManager = require('./game_manager');

var gameManager = new GameManager(2);
var scores = []; // Array of objects which include {date, score}. In sorted descending order
var isRestarting = false;

// External API
module.exports = {

  // Game move
  move: function (direction) {
    gameManager.move(direction);
  },

  // Gets the game state data
  getGameData: function () {
    return gameManager.getGameData();
  },

  // Resets the game
  restart: function (callback) {
    // Add score once
    var score = gameManager.getGameData().score;
    if (!isRestarting) {
      isRestarting = true;
      addScore(score);
      // Restart the game after a short duration
      setTimeout(function () {
        isRestarting = false;
        gameManager.restart();
        callback();
      }, 4000);
    }
  }
};

// Add a score to the high score list
function addScore (score) {
  scores.push({
    date: new Date(),
    score: score
  });

  // Keep scores sorted
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
}