//import {EventEmitter} from "eventemitter3";

export const EventEmitter = {
    events: {}, //The events property is an empty object that will store the event callbacks.
    dispatch: function (event, data){
        if(!this.events[event]) return
        this.events[event].forEach(callback => callback(data))
    }, //The dispatch method is used to trigger an event by providing the event name and data as arguments. 
       //It checks if there are any callbacks registered for the given event and then iterates over each callback, invoking it with the provided data.
    subscribe: function (event, callback) {
        if(!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    },
    unsubscribe: function (event){
        if (!this.events[event]){
            return;
        }
        else{
            this.events[event] = null;
        } 

    } 
    //The subscribe method is used to add a callback function to a specific event.
    //It checks if the event already exists in the events object and if not, initializes it as an empty array.
    //Then, it pushes the provided callback function into the array of callbacks for that event.
}