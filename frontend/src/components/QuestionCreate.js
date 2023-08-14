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

    const handleAddOption = () => {
        setOptions([...options, '']);
    }

    const handleRemoveOption = () => {
        if (options.length > 2) {
            setOptions(options.slice(0, -1));
        }
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
                    <div key={index}>
                        <input
                            type="text"
                            value={option}
                            placeholder={'option ' + (index + 1)}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <textarea
                            value={option.explanation}
                            placeholder={`Explanation for Option ${index + 1}`}
                            onChange={(e) => handleOptionChange(index, 'explanation', e.target.value)}
                        />
                        {options.length > 2 && index === options.length - 1 && (
                            <button type="button" style={{ backgroundColor: 'red', margin: '1rem 0' }}onClick={handleRemoveOption}>Remove Option</button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddOption}>Add Option</button>

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
