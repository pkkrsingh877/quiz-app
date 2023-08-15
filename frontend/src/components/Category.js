import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useNavigate, Link } from 'react-router-dom';

const Category = () => {

    const { data, pending, error } = useFetch('http://localhost:8000/category');
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    console.log(categories)
    // Set the categories state after data is received
    useEffect(() => {
        if (data) {
            setCategories(data);
        }
    }, [data]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/category/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Data could not be deleted!');
            }
            setCategories(categories.filter(category => category._id !== id));
            navigate('/category');
        } catch (error) {
            navigate('/notfound');
        }
    }

    return (
        <section className="flex-container">
            <h2>Categories</h2>
            <Link to='/category/create'>Create New Category</Link>
            <article className="categories">
                {categories.map((category) => (
                    category._id && <section className="category" key={category._id}>
                        <div>{category.name}</div>
                        <Link to={`/category/edit/${category._id}`}>Edit</Link>
                        <button type="button" onClick={() => handleDelete(category._id)}>Delete</button>
                    </section>
                )
                )}
            </article>
        </section>
    );
}

export default Category;