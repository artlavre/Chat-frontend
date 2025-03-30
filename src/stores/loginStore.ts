import {makeAutoObservable} from "mobx";

class LoginStore{
    connection: any | null = null;
    username: string = "";
    chatName: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    setConnection(connection: any | null){
        this.connection = connection;
    }

    setUsername(username: string){
        this.username = username;
    }

    setChatName(chatName: string){
        this.chatName = chatName;
    }
}

const loginStore = new LoginStore();

export default loginStore;