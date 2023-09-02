import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import useFetch from './useFetch';

const initialState = {
    question: '',
    text: '',
    options: ['', ''],
    explanations: ['', ''],
    correctOption: '',
    categories: [],
    selectedCategory: null,
};

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
    const { question, text, options, explanations, correctOption, categories, selectedCategory } = state;
    const { id } = useParams();
    const navigate = useNavigate();
  
    const { data, pending, error } = useFetch('http://localhost:8000/category');
  
    // Use useEffect to populate the state when data is available
    useEffect(() => {
      if (!pending && !error) {
        dispatch({ type: 'SET_CATEGORIES', payload: data });
      }
    }, [data, pending, error]);
  
    // Use another useEffect to fetch question data and set state
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/question/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const questionData = await response.json();
  
          dispatch({ type: 'SET_QUESTION', payload: questionData });
          dispatch({ type: 'SET_TEXT', payload: questionData.text });
          dispatch({ type: 'SET_SELECTED_CATEGORY', payload: questionData.category.text });
  
          questionData.options.forEach((option, index) => {
            dispatch({ type: 'SET_OPTIONS', payload: option.text });
            dispatch({ type: 'SET_EXPLANATIONS', payload: option.text }); // Assuming explanations match options
          });
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [id]);

    const handleTextChange = (newTextValue) => {
      dispatch({ type: 'SET_TEXT', payload: newTextValue });
    };
  
    const handleCategoryChange = (selectedOption) => {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: selectedOption._id });
    };
  
    const handleOptionChange = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      dispatch({ type: 'SET_OPTIONS', payload: newOptions });
    };
  
    const handleAddOption = () => {
      const newOptions = [...options, ''];
      dispatch({ type: 'SET_OPTIONS', payload: newOptions });
    };
  
    const handleRemoveOption = () => {
      if (options.length > 2) {
        const newOptions = options.slice(0, -1);
        dispatch({ type: 'SET_OPTIONS', payload: newOptions });
      }
    };
  
    const handleExplanationChange = (index, value) => {
      const newExplanations = [...explanations];
      newExplanations[index] = value;
      dispatch({ type: 'SET_EXPLANATIONS', payload: newExplanations });
    };

    const handleCorrectOption = (newValue) => {
      dispatch({ type: 'SET_CORRECT_OPTION', payload: newValue });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const questionData = {
        text,
        options,
        correctOption,
        selectedCategory,
        explanations,
      };
  
      try {
        const response = await fetch(`http://localhost:8000/question/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(questionData),
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
                <input type="text" value={state.text} onChange={(e) => handleTextChange(e.target.value)} />

                <label>Options: </label>
                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={state.option}
                            placeholder={'option ' + (index + 1)}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <textarea
                            value={state.explanations[index]}
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
                    options={state.categories}
                    value={selectedCategory ? state.categories.find(category => category._id === selectedCategory._id) : ''}
                    onChange={handleCategoryChange}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                />

                <label>Correct Option: </label>
                <select value={state.correctOption} onChange={(e) => handleCorrectOption(e.target.value)}>
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