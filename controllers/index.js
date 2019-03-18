const {getAllTeams, findTeams, addTeamToUser} = require('../services/database');

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

const dashboard = async ctx => {
    const {team} = ctx.request.body;

    addTeamToUser(team);

    await ctx.render('dashboard');
};

module.exports = {
    home,
    dashboard
};