import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import { getCategories, getProducts } from './fetcher';
import Category from './components/category';

function App() {
  const [categories, setCategories] = useState({errorMessage: '', data: []});
  const [products, setProducts] = useState({errorMessage: '', data: []});

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
    
  }, [])

  //category click
  const handleCategoryClick = id => {
    const fetchData = async () => {
      const responseObject = await getProducts();
      setProducts(responseObject);
    }
    fetchData();

  }

  const renderCategories = () => {
    return categories.data.map(c => 
      <Category key={c.id} id={c.id} title={c.title} onCategoryClick={() => handleCategoryClick(c.id)} />
    );
  }

  const renderProducts = () => {
    return products.data.map(p => 
      <div>{p.title}</div>
    );
  }

 /* const renderCategories = () => {
    const categories = [];
    for (let i = 0; i < results.length; i++) {
      categories.push(<Category key={results[i].id} id={results[i].id} title={results[i].title} onCategoryClick={() => handleCategoryClick(results[i].id)} />)
    }
    return categories;
    
  }*/

  return (
    <React.Fragment>
    <header>Renish's Store</header>

    <section>
      <nav>
        {categories.errorMessage && <div>Error: {categories.errorMessage}</div>}
        {
          categories.data && renderCategories()
        }
      </nav>

      <article>
        {products.errorMessage && <div>Error: {products.errorMessage}</div>}
        <h1>Products</h1>
        {/* A conditioning output to check if the product exists*/}
        { products && renderProducts()}
      </article>
    </section>

    <footer>
      footer
    </footer>

    </React.Fragment>
  );
}

export default App;
