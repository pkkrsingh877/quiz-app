import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizCreate = () => {

    const [ title, setTitle ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ questions, setQuestions ] = useState('');
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    // Some change
    const handleSubmit = async (e) => {
        e.preventDefault();
        const quiz = { title, category, questions };
        try {
            setIsPending(true);
            const response = await fetch('localhost:8000/quizcreate',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(quiz)
            });
            if(!response.ok){
                throw new Error('Data could not be saved!');
            }
            setIsPending(false);
            navigate('/');
        } catch (error) {
            setIsPending(false);
            setError(error);
            navigate('/error');
        } 
    }

    return ( <div className="class">
        <form className='create' onSubmit={handleSubmit}>
            <h2>Add Quiz</h2>
            {/* Title */}
            <label>Title:</label>
            <input type="text" 
            value={title} 
            onChange = {(e) => setTitle(e.target.value)}
             />
            {/* Category */}
            <label>Category:</label>
            <textarea 
            value={category} 
            onChange = {(e) => setCategory(e.target.value)}
            ></textarea>
            {/* Author */}
            <label>Questions:</label>
            <input type="text" 
            value={questions}
            onChange = {(e) => setQuestions(e.target.value)}
            />
            {!isPending && <button type="submit">Create
            </button>}
            {!error && isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </form>
    </div> 
    );
}
 
export default QuizCreate;