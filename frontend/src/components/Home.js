import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
    return ( 
        <div className="container">
            <Link to="/login" className="container-link">Go to Login page</Link>
            <Link to="/signup" className="container-link">Go to Signup page</Link>
            <Link to="/quiz" className="container-link">Go to quiz page</Link>
            <Link to="/quizplay" className="container-link">Go to quizplay page</Link>
            <Link to="/quizresult" className="container-link">Go to quizresult page</Link>
            <Link to="/quizcreate" className="container-link">Go to quizcreate page</Link>
            <Link to="/userprofile" className="container-link">Go to userprofile page</Link>
            <Link to="/userprofileupdate" className="container-link">Go to userprofileupdate page</Link>
            <Link to="/userdatavisualization" className="container-link">Go to userdatavisualization page</Link>
        </div>
     );
}
 
export default Home;