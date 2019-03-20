class Team {
    constructor(teamObj){
        this.name = teamObj.name;
        this.id = teamObj.id;
        this.goals = 0;
    }

    addGoal(){
        this.goals++;
    }
}

module.exports = Team;