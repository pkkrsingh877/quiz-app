import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const CreateCategory = () => {

    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http:localhost:8000/category/create',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name})
            });
            if(!response.ok){
                throw new Error('Data could not be saved!');
            }
            Navigate('/category');
        } catch (error) {
            Navigate('/notfound');
        } 
    }
    return ( 
        <section className="create-category">
            <form className="create" onSubmit={handleSubmit}>
                <label htmlFor="text">Category Name: </label>
                <input type="text" name="name" id="name" 
                value={name}
                onChange = {(e) => setName(e.target.value)}
                required />
                <button type="button">Create</button>
            </form>
        </section>
     );
}
 
export default CreateCategory;