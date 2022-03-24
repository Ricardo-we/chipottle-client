// UTILS
import { useState, useEffect } from "react";
import getProducts from "../../libs/api-requests/product-request";
import { useParams } from "react-router-dom";
// CSS
import '../../css/Shop.css';
// COMPONENTS
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
    <Link className="card product-card" style={{width: '18rem', height: '21rem'}} to={`/product-details/${product.id}`}>
        <img src={product.item_image} className="product-image" alt="" />
        <div className="card-body">
            <h5 className="card-title">
                {product.item_name}
            </h5>
            <p className="card-text">
                Q{product.item_price}
            </p>
        </div>
    </Link>
)

function Shop() {
    const { page } = useParams();
    let actual_page = parseInt(page);

    const [products, setProducts] = useState({products:[{id:0, item_name:''}]});
    const [search, setSearch] = useState('');

    const getProductsHandler = async () => {
        const response = await getProducts(page)
        setProducts(response)
    }

    useEffect(() =>{
        getProductsHandler();
    },[])

    return ( 
    <>
        <NavBar/>
        <div className="container mb-5">
            <h3>Nuestros productos</h3>
            <input type="search" placeholder="Buscar productos"  className="form-control"  onChange={e => setSearch(e.target.value.toLowerCase())}/>
        </div>
        
        <div className="container d-flex align-items-center justify-content-around flex-wrap">
            {
            products.products
                .filter(product => product.item_name.toLowerCase().includes(search) || product.item_price.toString().includes(search))
                .map(product => <ProductCard product={product} key={product.id}/>)
            }
        
        </div>
        <nav className="container d-flex align-items-center justify-content-center mt-5" aria-label="Page navigation example">
            <ul className="pagination">
                <li className={products.has_previous?"page-item" : "page-item disabled"}>
                    <Link className="page-link" to={`/shop/${actual_page - 1}`}>Previous</Link>
                </li>
                <li className={products.has_previous?"page-item" : "page-item disabled"}>
                    <Link className="page-link" to={`/shop/${1}`}>1</Link>
                </li>
                <li className={products.has_next?"page-item" : "page-item disabled"}>
                    <Link className="page-link" to={`/shop/${products.last_page}`}>{products.last_page}</Link>
                </li>
                <li className={products.has_next?"page-item" : "page-item disabled"}>
                    <Link className="page-link" to={`/shop/${actual_page + 1}`}>Next</Link>
                </li>
            </ul>
        </nav>
    </> 
    );
}

export default Shop;