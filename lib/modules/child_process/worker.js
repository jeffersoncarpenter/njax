var NJaxWorker = function(options){
    this.events = {};
    _.extend(options, this);
    process.on('message', this.onMessage);
}
NJaxWorker.prototype.onMessage = function(m) {

    //Look for events
    var data = JSON.parse(m);
    var event = null;
    if(data._event){
        //Trigger some events
        event = data._event;
    }else{
        event = 'message';
    }
    this.trigger(event, data);

}
NJaxWorker.prototype.trigger = function(event, callback){
    if(!this.events[event]){
        return false;
    }
    for(var i in this.events[event]){
        this.events[event][i].(event, data, this);
    }
}
NJaxWorker.prototype.on = function(event, callback){
    if(!this.events[event]){
        this.events[event] = [];
    }
    this.events[event].push(callback);
}
NJaxWorker.prototype.send = function(command, data){
    if(!data){
        data = {};
    }
    data._command = command;
    process.send(data);
}
module.exports = NJaxWorker;