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
      </Routes>
    </Router>
    </>
  );
}

export default App;
