import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import GlobalStyle from './globalStyles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NewLobby from './NewLobby';
import WaitingRoom from './WaitingRoom';
import io from "socket.io-client"
import JoinLobby from './JoinLobby';
import DraftPage from './DraftPage';



const socket = io.connect("http://localhost:4986")

const App = () => {
  return (
    <>
    <GlobalStyle />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/NewLobby" element={<NewLobby socket={socket}/>} />
        <Route path="/JoinLobby" element={<JoinLobby socket={socket}/>} />
        <Route path="/waitingroom" element={<WaitingRoom socket={socket}/>} />
        <Route path="/DraftPage" element={<DraftPage socket={socket}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
