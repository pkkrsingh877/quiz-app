import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Question from './components/Question';
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
import Category from './components/Category';
import CategoryCreate from './components/CategoryCreate';
import CategoryEdit from './components/CategoryEdit';
import QuestionUpdate from './components/QuestionUpdate';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={< Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/category" element={<Category />} /> 
            <Route path="/category/create" element={<CategoryCreate />} />
            <Route path="/category/edit/:id" element={<CategoryEdit />} />
            <Route path="/question" element={<Question />} />
            <Route path="/question/create" element={<QuestionCreate />} />
            <Route path="/question/edit/:id" element={<QuestionUpdate />} />
            <Route path="/quiz" element={<Quiz />} />
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
