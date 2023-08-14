import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const CategoryEdit = () => {

    const [name, setName] = useState('');
    const { id } = useParams();
    const { data, pending, error } = useFetch(`http://localhost:8000/category/${id}`);
    // setName(data.name);
    console.log(data)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/category', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name })
            });
            if (!response.ok) {
                throw new Error('Data could not be saved!');
            }
            navigate('/category');
        } catch (error) {
            navigate('/notfound');
        }
    }
    return (
        <section className="flex-container">
            <h2>Edit Category</h2>
            <form className="create" onSubmit={handleSubmit}>
                <label htmlFor="text">Category Name: </label>
                <input type="text" name="name" id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
                <button type="submit">Create</button>
            </form>
        </section>
    );
}

export default CategoryEdit;