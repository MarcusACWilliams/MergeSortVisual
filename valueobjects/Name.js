export default class Name { 
    constructor(name) {
        //let letterNumber = /^[a-zA-Z]+$/g;
        let letterNumber = /^[a-zA-Z]+$/g;
        let whitespace = /\s+/g;

        if(name === null || name === undefined || name == '')
            throw 'User name cannot be null or undefined'
        
        let localName = name.trim();

        //if( (whitespace.test(localName)) ) 
            //throw 'User name cannot contain spaces'

        if(localName.match(/^[a-zA-Z]+$/i) == null )
            throw 'User name can only contain letters'
        
        
        this._name = localName;
    }

    get getName() {
        return this._name;
    }
}