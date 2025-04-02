import {makeAutoObservable} from "mobx";
import {HubConnection} from "@microsoft/signalr";

class LoginStore{
    connection: HubConnection | null = null;
    username: string = "";
    chatName: string = "";
    status: "idle" | "pending" | "done" | "error" = "idle";

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