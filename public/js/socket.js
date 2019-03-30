var socket = io();

var gameTime;
var team1Goals;
var team2Goals;
var source;
var target;

if ('querySelector' in document){
    gameTime = document.querySelector('.game-time');
    team1Goals = document.querySelector('.team1-goals');
    team2Goals = document.querySelector('.team2-goals');

    source = document.querySelector("#match-timeline-template").innerHTML;
    target = document.querySelector(".match-timeline");
} else {
    gameTime = document.getElementsByClassName('.game-time')[0];
    team1Goals = document.getElementsByClassName('.team1-goals')[0];
    team2Goals = document.getElementsByClassName('.team2-goals')[0];

    source = document.getElementById("match-timeline-template").innerHTML;
    target = document.getElementsByClassName(".match-timeline")[0];
}

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