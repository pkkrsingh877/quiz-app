import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import useFetch from './useFetch';

const initialState = { count: 0 }; // Initial state

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_QUESTION':
            return { ...state, question: action.payload };
        case 'SET_TEXT':
            return { ...state, text: action.payload };
        case 'SET_OPTIONS':
            return { ...state, options: action.payload };
        case 'SET_EXPLANATIONS':
            return { ...state, explanations: action.payload };
        case 'SET_CORRECT_OPTION':
            return { ...state, correctOption: action.payload };
        case 'SET_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        default:
            return state;
    }
};

const QuestionUpdate = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count } = state;
    const { id } = useParams();
    const [question, setQuestion] = useState('');
    const [text, setText] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [explanations, setExplanations] = useState(['', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [categories, setCategories] = useState([]); // store data after pulling from db
    const [selectedCategory, setSelectedCategory] = useState(null); // select category from db data to set category in form
    const navigate = useNavigate();

    const { data, pending, error } = useFetch('http://localhost:8000/category');
    // this useEffect hook fires if data is populated
    useEffect(() => {
        try {
            setCategories(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/question/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data)
                setQuestion(data);
                setText(question.text || '');
                setSelectedCategory(question.category.text || '');
                question.options.map(option => (
                    setSelectedCategory(option.text)
                ));
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [question, id]); // Include data and id in the dependency array

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption._id);
    };

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

    const handleExplanationChange = (index, value) => {
        const newExplanations = [...explanations];
        newExplanations[index] = value;
        setExplanations(newExplanations);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const questionData = {
            text,
            options,
            correctOption,
            selectedCategory,
            explanations
        };

        try {
            const response = await fetch(`http://localhost:8000/question/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionData)
            });
            if (!response.ok) {
                throw new Error('Data could not be saved!');
            }
            navigate('/question');
        } catch (error) {
            navigate('/notfound');
        }
    };

    return (
        <div className="flex-container">
            <h2>Update Question</h2>
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
                            value={explanations[index]}
                            placeholder={`Explanation for Option ${index + 1}`}
                            onChange={(e) => handleExplanationChange(index, e.target.value)}
                        />
                        {options.length > 2 && index === options.length - 1 && (
                            <button type="button" style={{ backgroundColor: 'red', margin: '1rem 0' }} onClick={handleRemoveOption}>Remove Option</button>
                        )}
                    </div>
                ))}

                <button type="button" onClick={handleAddOption}>Add Option</button>

                <label>Category: </label>
                <Select
                    options={categories}
                    value={selectedCategory ? categories.find(category => category._id === selectedCategory._id) : ''}
                    onChange={handleCategoryChange}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                />

                <label>Correct Option: </label>
                <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                    <option value="">Select Correct Option</option>
                    {options.map((option, index) => (
                        <option key={index} value={index}>{option}</option>
                    ))}
                </select>
                <button type="submit">Edit</button>
            </form>
        </div>
    );
};

export default QuestionUpdate;
