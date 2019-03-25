const faker = require('faker');
const FifoArray = require('fifo-array');
const Team = require('../models/team');
const GameTime = require('../models/game-time');

class MatchSimulator {
    constructor(team1, team2) {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        this.gameTime = new GameTime();
        this.timeline = new FifoArray(3);
        this.gameStarted = false;
        this.scored = false;
        this.observers = [];
    }

    start() {
        this.gameStarted = true;

        setInterval(() => {
            this.randomGoal();
            if (this.observers.length > 0){
                this.observers.forEach(observer => observer(this.getData()));
            }
        }, 1000);
    }

    simulate(observer) {
        this.observers.push(observer);
        !this.gameStarted && this.start();
    }

    randomGoal() {
        if (MatchSimulator.chance(5)) {
            let scoringTeam = null;
            let opponentTeam = null;
            if (MatchSimulator.chance(50)) {
                scoringTeam = this.team1;
                opponentTeam = this.team2;
            } else {
                scoringTeam = this.team2;
                opponentTeam = this.team1;
            }
            scoringTeam.addGoal();
            this.addToTimeline(scoringTeam, opponentTeam);
            this.scored = true;
            return;
        }
        this.scored = false;
    }

    static chance(percentage) {
        return Math.ceil(Math.random() * 100) <= percentage;
    }

    addToTimeline(scoringTeam, opponentTeam) {
        this.timeline.unshift({
            scoreTime: this.gameTime.getElapsedTime(),
            player: faker.name.findName(),
            scoringTeam: {...scoringTeam},
            opponentTeam: {...opponentTeam}
        })
    }

    getData() {
        return {
            gameTime: this.gameTime.getElapsedTime(),
            teams: {
                team1: this.team1,
                team2: this.team2
            },
            timeline: this.timeline,
            scored: this.scored
        }
    }
}

module.exports = MatchSimulator;