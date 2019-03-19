const {findTeams, addTeamToUser, getUserTeams} = require('../services/database');

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

dashboard = async ctx => {
    const userTeams = getUserTeams();
    await ctx.render('dashboard', {
        userTeams
    });
};

module.exports = {
    home,
    addTeam,
    dashboard
};