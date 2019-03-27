const moment = require('moment');

class GameTime {
    constructor() {
        this.initialTime = moment();
    }

    getFormattedTime() {
        const timeNow = moment();
        const duration = moment.duration(timeNow.diff(this.initialTime));

        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return `${GameTime.pad(minutes)}:${GameTime.pad(seconds)}`;
    }

    getTime(){
        const timeNow = moment();
        const duration = moment.duration(timeNow.diff(this.initialTime));
        return duration.seconds();
    }

    static pad(time) {
        time = Math.abs(time);
        return time < 10 ? `0${time}` : time;
    }
}

module.exports = GameTime;