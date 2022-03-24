// UTILS
import { useState, useEffect } from 'react';
import { getCartItems, removeCartItem} from '../../libs/sessions-utils';
import { addSales } from '../../libs/api-requests/sales-requests';
// COMPONENTS
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Cart() {
    const [cartItems, setCartItems] = useState(getCartItems());
    let total = 0;
    for(let item of cartItems){
        total += item.item_price;
    }
    return ( 
        <>
            <NavBar/>
            
            <div className="table-responsive">
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th colSpan="2">Producto</th>
                            <th>Eliminar</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.key}>
                                <td style={{minWidth: 60, width: 150, height: 150}}>
                                    <img src={item.item_image} alt={item.item_name} style={Styles.tableImage}/>
                                </td>
                                <td>
                                    <h3>{item.item_name}</h3>
                                    <strong>Q{item.item_price}</strong>
                                    <p style={{width: '100%'}}>
                                        {item.item_description}
                                    </p>
                                </td>
                                <td className="text-center">
                                    <button className="btn btn-outline-danger mt-5" onClick={() => {
                                        removeCartItem(item)
                                        setCartItems(getCartItems)
                                    }}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Subtotal Q{total.toFixed(2)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <h1 className='container'>Total: Q{total.toFixed(2)}</h1>
                                    <button className="btn w-100 btn-success mb-5" onClick={() => {
                                        addSales(cartItems)
                                        .then(() => window.location.href = "https://wa.link/wnszjw")
                                    }}>
                                        <FontAwesomeIcon icon={faWhatsapp} />Comprar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </>
    );
}

const Styles = {
    tableImage: {
        minWidth:20,
        width: '100%',
        minHeight: 20,
        height: '100%',
        objectFit: 'cover',
    },
    productData: {
        minWidth: 190,
        width: 270,
        padding: 30
    }
}

export default Cart;