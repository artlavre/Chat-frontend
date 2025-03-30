import {
    Container,
    Paper,
    List,
    Typography,
    ListItem,
    TextField,
    ListItemText,
    IconButton
} from "@mui/material";
import chatStore from "../stores/chatStore.ts";
import {observer} from "mobx-react-lite";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import loginStore from "../stores/loginStore.ts";

export const ChatPage = observer(() => {

    const closeChat = () => {
        loginStore.setConnection(null);
    }

    const sendMessage = (message: string) =>{
        if(chatStore.message.trim() !== ""){
            chatStore.pushMessage(message);
            chatStore.setMessage("");
        }
    }

    return (
        <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={4} style={{ padding: '20px', borderRadius: '16px', width: '100%', maxHeight: '80vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="xl" sx={{minHeight: "50px", display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
                        Chat
                    </Typography>

                    <IconButton onClick={() => {closeChat(); console.log("closing")}}>
                        <CloseIcon/>
                    </IconButton>
                </Container>

                <List style={{ flexGrow: 1, overflowY: 'auto', minHeight: '50vh', maxHeight: '50vh' }}>
                    {chatStore.messages.map((message: string, index: number) => (
                        <Paper elevation={1} sx={{width: "fit-content"}}>
                            <ListItem
                                key={index}
                                sx={{
                                    p: 1,
                                    mb: "10px",
                                    backgroundColor: "#f2f2f2",
                                    borderRadius:"4px",
                                }}
                            >
                                <ListItemText  primary={`${message}`}/>
                            </ListItem>
                        </Paper>
                    ))}
                </List>

                <Container sx={{ display: 'inline-flex', marginTop: '10px', justifyContent: 'space-between'}}>
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        value={chatStore.message}
                        onChange={(e) => chatStore.setMessage(e.target.value)}
                        style={{ marginTop: '10px' }}
                    />
                    <IconButton onClick={() => {sendMessage(chatStore.message)}}>
                        <SendIcon/>
                    </IconButton>
                </Container>
            </Paper>
        </Container>
    );
})