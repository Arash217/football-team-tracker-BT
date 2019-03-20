const Team = require('../models/team');
const GameTime = require('../models/game-time');

class MatchSimulator {
    constructor(team1, team2) {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        this.gameTime = new GameTime();
        this.recentGoal = null;
        this.goals = []
    }

    start(options = {}) {
        setInterval(() => {
            const scored = this.randomGoal();

            if (options.updateWhenScored) {
                if (scored){

                    this.cb && this.cb(this.getData());
                }
            } else {
                this.cb && this.cb(this.getData());
            }

        }, 1000);
    }

    simulate(cb, options = {}) {
        this.cb = cb;
        this.start(options);
    }

    randomGoal() {
        if (MatchSimulator.chance(10)) {
            if (MatchSimulator.chance(50)) {
                this.team1.addGoal();
            } else {
                this.team2.addGoal();
            }
            return true;
        }

        return false;
    }

    static chance(percentage) {
        return Math.ceil(Math.random() * 100) <= percentage;
    }

    getData() {
        return {
            gameTime: this.gameTime.getElapsedTime(),
            teams: {
                team1: this.team1,
                team2: this.team2
            },
            recentGoal: this.recentGoal
        }
    }
}

module.exports = MatchSimulator;