var socket = io();

var gameTime = document.querySelector('.game-time');
var team1Goals = document.querySelector('.team1-goals');
var team2Goals = document.querySelector('.team2-goals');

var source = document.getElementById("match-timeline-template").innerHTML;
var target = document.querySelector(".match-timeline");
var template = Handlebars.compile(source);

socket.on('matchData', function (data) {
    gameTime.innerText = data.gameTime;
    team1Goals.innerText = data.teams.team1.goals;
    team2Goals.innerText = data.teams.team2.goals;

    var html = template({timeline: data.timeline});
    removeChildren(target);
    target.insertAdjacentHTML('afterbegin', html);
});

function removeChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}