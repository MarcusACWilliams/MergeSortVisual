export default class DateObj {
    constructor(date = null) {

        if(date === undefined || date ==' ')
            throw 'Date cannot be Empty'
        else
            if(date == null)
                this._utcDate = Date.now();
        else {
                this._utcDate = new Date(date);
        }
        


        
        this._utcDate;
        this._time;
        this._timeZone;
        this._localTime;

    }
}