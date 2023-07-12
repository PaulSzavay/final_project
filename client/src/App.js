import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import GlobalStyle from './globalStyles';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NewLobby from './NewLobby';
import WaitingRoom from './WaitingRoom';
import JoinLobby from './JoinLobby';
import DraftPage from './DraftPage';
import EndLobby from './EndLobby';
import Profile from './Profile';
import ReviewDraft from './ReviewDraft';






const App = () => {
  return (
    <>
    <GlobalStyle />
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/NewLobby" element={<NewLobby />} />
        <Route path="/JoinLobby" element={<JoinLobby />} />
        <Route path="/waitingroom" element={<WaitingRoom />} />
        <Route path="/DraftPage" element={<DraftPage />} />
        <Route path="/EndLobby/:lobby_id" element={<EndLobby />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Draft/:lobby_id" element={<ReviewDraft />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
