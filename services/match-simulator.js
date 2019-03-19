const Team = require('../models/team');
const GameTime = require('../models/game-time');

class MatchSimulator {
    constructor(team1, team2) {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        this.gameTime = new GameTime();
    }

    start() {
        setInterval(() => {
            this.randomGoal();
            this.cb && this.cb(this.getData());
        }, 1000);
    }

    simulate(cb) {
        this.cb = cb;
        this.start();
    }

    randomGoal() {
        if (MatchSimulator.chance(1)) {
            if (MatchSimulator.chance(50)) {
                return this.team1.addGoal();
            }
            this.team2.addGoal();
        }
    }

    static chance(percentage){
        return Math.ceil(Math.random() * 100) <= percentage;
    }

    getData() {
        return {
            gameTime: this.gameTime.getElapsedTime(),
            teams: {
                team1: this.team1,
                team2: this.team2
            }
        }
    }
}

module.exports = MatchSimulator;