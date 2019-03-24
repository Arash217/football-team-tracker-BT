const webpush = require("web-push");
const MatchSimulator = require('../services/match-simulator');
const {findTeams, addTeamToUser, getUserTeams, getRandomTeam, getRandomUserTeam} = require('../services/database');

const home = async ctx => {
    const {search = ''} = ctx.query;
    let filteredTeams = [];

    if (search) {
        filteredTeams = findTeams(search);
    }

    await ctx.render('home', {
        teams: filteredTeams
    });
};

const addTeam = async ctx => {
    const {team} = ctx.request.body;

    try {
        addTeamToUser(team);
        ctx.redirect('/dashboard');
    } catch (e) {
        await ctx.render('error', {
            errorMessage: e.message
        });
    }
};

let gameMatch = null;
let team1 = null;
let team2 = null;

const dashboard = async ctx => {
    let userTeams = getUserTeams();

    if (!gameMatch) {
        team1 = getRandomUserTeam();
        team2 = getRandomTeam();
        gameMatch = new MatchSimulator(team1, team2);
        gameMatch.start();
    }

    userTeams = userTeams.map(userTeam => {
        const tempTeam = {...userTeam};
        if (tempTeam.id === gameMatch.team1.id || tempTeam.id === gameMatch.team2.id) {
            tempTeam.playing = true;
        }
        return tempTeam;
    });

    await ctx.render('dashboard', {
        userTeams
    });
};

const match = async ctx => {
    let {team} = ctx.params;
    team = Number(team);

    if (gameMatch && gameMatch.team1.id === team || gameMatch.team2.id === team) {
        return await ctx.render('match', {
            ...gameMatch.getData()
        });
    }

    await ctx.render('error', {
        errorMessage: 'Team is not playing'
    });
};

let subscription = null;

const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

const subscribe = async ctx => {
    subscription = ctx.request.body;

    ctx.status = 200;
    ctx.body = {};

    if (gameMatch) {
        const options = {
            updateWhenScored: true
        };

        gameMatch.simulate(data => {
            const bodyMessage = `${data.teams.team1.name} ${data.teams.team1.goals} - ${data.teams.team2.goals} ${data.teams.team2.name}`;

            const payload = JSON.stringify({
                title: "Goal!",
                body: bodyMessage
            });

            webpush
                .sendNotification(subscription, payload)
                .catch(err => console.error(err));
        }, options);
    }
};

const socketHandler = socket => {
    if (gameMatch) {
        gameMatch.simulate(data => {
            socket.emit('matchData', data);
        });
    }
};

module.exports = {
    home,
    addTeam,
    dashboard,
    match,
    subscribe,
    socketHandler
};