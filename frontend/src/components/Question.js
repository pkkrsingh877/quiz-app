import { useState, useEffect } from 'react';
import useFetch from './useFetch';

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
                        </article>
                    ))
                }
            </section>
        </div>
    );
}

export default Question;