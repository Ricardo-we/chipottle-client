// UTILS
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProduct } from "../../libs/api-requests/product-request";
import { addToCart } from "../../libs/sessions-utils";
// COMPONENTS
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getTotal } from './../../libs/sessions-utils';

function ProductDetails() {
    const { product_id } = useParams();

    const [product, setProduct] = useState({item_price:0});
    const [cartTotal, setCartTotal] = useState(getTotal);

    const getProductHandler = async () => {
        const response = await getProduct(product_id);
        setProduct(response)
    }

    useEffect(() => {
        getProductHandler();
    }, [])

    return ( 
        <>
            <NavBar cartTotals={cartTotal}/>
            <div className="container-xxl d-flex flex-wrap align-items-center justify-content-around mt-5">
                <img src={product.item_image} alt="" style={Styles.productImage}/>
                <div className="d-flex flex-column align-items-start justify-content-center me-auto">
                    <h1>Q{product.item_price}</h1>
                    <h2>{product.item_name}</h2>
                    <p>{product.item_description}</p>
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <button className="btn btn-primary" onClick={() => {
                            addToCart(product)
                            setCartTotal(getTotal())
                        }}>
                            Agrega al carrito
                        </button>
                        <a target="_blank" href="https://wa.link/wnszjw" className="btn btn-success ms-2">
                            <FontAwesomeIcon icon={faWhatsapp}/>
                        </a>
                    </div>
                </div>
            </div> 
        </>
    );
}

const Styles = {
    productImage: {
        minWidth: 250,
        height: '60vh',
        width: 600,
        marginRight: '40px',
        objectFit: 'cover',
        margin: '0 auto',
    }
}

export default ProductDetails;