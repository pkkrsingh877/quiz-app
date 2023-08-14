import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import QuestionCreate from './components/QuestionCreate';
import Quiz from './components/Quiz';
import QuizPlay from './components/QuizPlay';
import QuizResult from './components/QuizResult';
import QuizCreate from './components/QuizCreate';
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
            <Route path="/question/create" element={<QuestionCreate />} />
            <Route path="/quiz/play" element={<QuizPlay />} />
            <Route path="/quiz/result" element={<QuizResult />} />
            <Route path="/quiz/create" element={<QuizCreate />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/profileupdate" element={<UserProfileUpdate />} />
            <Route path="/user/datavisualization" element={<UserDataVisualization />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
    </div>
  );
}

export default App;
