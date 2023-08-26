import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { Link } from 'react-router-dom';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const { data, pending, error } = useFetch('http://localhost:8000/question');

    useEffect(() => {
        if (data) {
            setQuestions(data);
            console.log(questions);
        }
    }, [data, questions]);

    return (
        <div>
            <h1>Create New Question</h1>
            <h1>All Questions</h1>
            <section className="questions">
                {
                    questions && questions.map(question => (
                        <article className="question">
                            {question.text}
                            <Link to={`/question/edit/${question._id}`}>Edit</Link>
                        </article>
                    ))
                }
            </section>
        </div>
    );
}

export default Question;