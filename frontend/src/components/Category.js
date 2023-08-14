import { useState } from 'react';
import useFetch from './useFetch';

const Category = () => {

    const [categories, setCategories] = useState([]);
    const { data, pending, error } = useFetch('https://localhost:8000/category');
    setCategories(data);

    return ( 
        <section className="categories">
            {categories.map((category) => {
                <div className="category">{category.name}</div>
            })}
        </section>
     );
}
 
export default Category;