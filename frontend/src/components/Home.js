import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return ( 
        <div className="container">
            <Link to="/login" className="container-link">Go to Login page</Link>
            <Link to="/signup" className="container-link">Go to Signup page</Link>
            <Link to="/question" className="container-link">Questions</Link>
            <Link to="/question/create" className="container-link">Create Questions</Link>
            <Link to="/quiz" className="container-link">Go to quiz page</Link>
            <Link to="/quiz/play" className="container-link">Go to quizplay page</Link>
            <Link to="/quiz/result" className="container-link">Go to quizresult page</Link>
            <Link to="/quiz/create" className="container-link">Go to quizcreate page</Link>
            <Link to="/user/profile" className="container-link">Go to userprofile page</Link>
            <Link to="/user/profileupdate" className="container-link">Go to userprofileupdate page</Link>
            <Link to="/user/datavisualization" className="container-link">Go to userdatavisualization page</Link>
        </div>
     );
}
 
export default Home;