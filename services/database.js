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

const addTeamToUser = teamId => {
    db.get('userTeams').push({ id: teamId}).write()
};

module.exports = {
    getAllTeams,
    findTeams,
    addTeamToUser
};