import {makeAutoObservable} from "mobx";

class ChatStore {
    message: string = "";
    messages: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setMessage(message: string){
        this.message = message;
    }

    pushMessage(message: string){
        this.messages.push(message);
    }
}

const chatStore = new ChatStore();

export default chatStore;