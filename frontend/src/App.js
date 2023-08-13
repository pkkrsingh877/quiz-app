import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Quiz from './components/Quiz';
import QuizPlay from './components/QuizPlay';
import QuizResult from './components/QuizResult';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import UserProfileUpdate from './components/UserProfileUpdate';
import UserDataVisualization from './components/UserDataVisualization';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={< Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quizplay" element={<QuizPlay />} />
            <Route path="/quizresult" element={<QuizResult />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/userprofileupdate" element={<UserProfileUpdate />} />
            <Route path="/userdatavisualization" element={<UserDataVisualization />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
    </div>
  );
}

export default App;
