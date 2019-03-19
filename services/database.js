const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.resolve(__dirname, '../data/db.json'));
const db = low(adapter);

const getAllTeams = () => {
    return db.get('teams').value();
};

const findTeams = search => {
    return getAllTeams().filter(team => team.name.toLowerCase().includes(search.toLowerCase()));
};

const getUserTeams = () => {
    const userTeamsIds = db.get('userTeams').value();
    return getAllTeams().filter(team => userTeamsIds.some(userTeam => userTeam.id === team.id))
};

const addTeamToUser = teamId => {
    teamId = Number(teamId);

    if (!db.get('teams').find({id: teamId}).value()) {
        throw Error('Team does not exists');
    }

    if (db.get('userTeams').find({id: teamId}).value()){
        throw Error('Team is already added');
    }

    db.get('userTeams').push({ id: teamId}).write();
};

module.exports = {
    findTeams,
    addTeamToUser,
    getUserTeams
};