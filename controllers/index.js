const MatchSimulator = require('../services/match-simulator');
const {findTeams, addTeamToUser, getUserTeams, getRandomTeam} = require('../services/database');

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

const dashboard = async ctx => {
    const userTeams = getUserTeams();
    await ctx.render('dashboard', {
        userTeams
    });
};

let gameMatch = null;

const match = async ctx => {
    const {team} = ctx.params;

    if (!gameMatch) {
        gameMatch = new MatchSimulator(team, getRandomTeam().name);
        gameMatch.start();
    }

    await ctx.render('match', {
        ...gameMatch.getData()
    });
};

module.exports = {
    home,
    addTeam,
    dashboard,
    match
};