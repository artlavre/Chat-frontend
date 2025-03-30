import {CssBaseline} from "@mui/material";
import {ChatPage} from "./pages/ChatPage.tsx";
import loginStore from "./stores/loginStore.ts";
import {JoinChatPage} from "./pages/JoinChatPage.tsx";
import {observer} from "mobx-react-lite";

export const App = observer(() => {

  return (
    <>
        <CssBaseline/>
        {loginStore.connection !== null ? <ChatPage/> : <JoinChatPage/>}
    </>
  )
})
