var socket = io();

var gameTime = document.querySelector('.game-time');
var team1Goals = document.querySelector('.team1-goals');
var team2Goals = document.querySelector('.team2-goals');

socket.on('matchData', function(data) {
    gameTime.innerText = data.gameTime;
    team1Goals.innerText = data.teams.team1.goals;
    team2Goals.innerText = data.teams.team2.goals;
});