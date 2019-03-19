class Simulator {
    static matches = [];
    gameTime = 0;

    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }

    static registerMatch(match) {
        Simulator.matches.push(match);
    }

    start(){
        setInterval(() => {
            this.gameTime += 1;
            this.cb(this.gameTime);
        }, 1000);
    }

    simulate(cb) {
        this.cb = cb;
    }
}

module.exports = Simulator;