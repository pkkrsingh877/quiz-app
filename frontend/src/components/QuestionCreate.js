import React, { useState } from 'react';

const QuestionCreate = () => {
    const [text, setText] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [category, setCategory] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission and send data to the backend
        // Make sure to use the state variables (text, options, correctOption, category)
    };

    return (
        <div className="flex-container">
            <h2>Create A Question</h2>
            <form className="create" onSubmit={handleSubmit}>
                <label>Question: </label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <label>Options: </label>
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                ))}
                <label>Correct Option: </label>
                <input
                    type="text"
                    value={correctOption}
                    onChange={(e) => setCorrectOption(e.target.value)}
                />
                <label>Category: </label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default QuestionCreate;
