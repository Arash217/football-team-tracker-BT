class Team {
    constructor(name){
        this.name = name;
        this.goals = 0;
    }

    addGoal(){
        this.goals++;
    }
}

module.exports = Team;