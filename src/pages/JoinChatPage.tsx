import { Container, TextField, Button, Paper, Typography } from '@mui/material';
import loginStore from "../stores/loginStore.ts";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {observer} from "mobx-react-lite";
import chatStore from "../stores/chatStore.ts";

export const JoinChatPage = observer(() =>  {

    const handleLogin = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5213/chat")
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveMessage", (userName, message) => {
            console.log(message);
            console.log(userName);
            chatStore.pushMessage(message);
        })

        try{
            await connection.start();
            await connection.invoke("JoinChat", {userName: loginStore.username, chatName: loginStore.chatName });
            console.log("Connected");

            loginStore.setConnection(connection);
            console.log(loginStore.connection);
        }catch(e){
            console.log("Something went wrong");
        }
    }

    return (
        <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={4} style={{ padding: '40px', borderRadius: '16px' }}>
                <Typography variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>Join Chat</Typography>
                <TextField
                    required
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={loginStore.username}
                    onChange={(e) => loginStore.setUsername(e.target.value)}
                />
                <TextField
                    required
                    label="Chat name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={loginStore.chatName}
                    onChange={(e) => loginStore.setChatName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleLogin}
                    style={{ marginTop: '20px', padding: '12px 0' }}
                >
                    Join chat
                </Button>
            </Paper>
        </Container>
    );
})
