// UTILS
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import checkLoggedIn from '../../libs/sessions-utils'; 
import getProducts, {deleteProduct, addProduct, updateProduct} from '../../libs/api-requests/product-request';
// COMPONENTS
import SideBar from "./SideBar";
import Modal from '../../public-components/Modal';
import Alert from '../../public-components/Alert';
import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'

function ManageProducts() {
    const navigate = useNavigate();
    const admin_key = localStorage.getItem('admin_key');

    const [products, setProducts] = useState([{id: 0}]);

    // MODAL CONTROLLERS
    const [selectedProductForUpdate, setSelectedProductForUpdate] = useState({});
    const [selectedProductForDelete, setSelectedProductForDelete] = useState(0);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [alertVisible, setAlertVisible]  = useState(false);

    const getProductsHandler = async () => {
        const response = await getProducts();
        setProducts(response);
    }

    useEffect(() => {
        if(!checkLoggedIn()) navigate('/chipottle-admin/login')
        getProductsHandler();
    }, [])

    return ( 
    <>
        <SideBar/>

        <AnimatePresence>
            {updateModalVisible && 
                <UpdateModal 
                    admin_key={admin_key} 
                    getProductsHandler={getProductsHandler} 
                    product={selectedProductForUpdate}
                    handleClose={() => setUpdateModalVisible(false)}
                />
            }
            {
                alertVisible && 
                <Alert
                    actionOnConfirm={() => 
                        deleteProduct(admin_key, selectedProductForDelete)
                            .then(getProductsHandler)
                            .then(setAlertVisible(false))
                    }
                    handleClose={() => setAlertVisible(false)} 
                    text={<h2>Are you sure you want to delete this product?</h2>}
                />
            }
        </AnimatePresence>

        <div className="container">
            <h1>Add products</h1>
            <ProductForm onSubmit={addProduct} getProductsHandler={getProductsHandler} admin_key={admin_key}/>
        </div>

        <table className="table table-striped table-responsive container">
            <thead>
                <tr className="text-center">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => 
                    <TableRow 
                        key={product.id}
                        product={product} 
                        onDelete={(id) => {
                            setSelectedProductForDelete(id)
                            setAlertVisible(true)
                        }}
                        onUpdate={product => {
                            setUpdateModalVisible(true)
                            setSelectedProductForUpdate(product)
                        }}
                    />
                )}
            </tbody>
        </table>

    </> 
    );
}

const TableRow = ({ product, onDelete, onUpdate }) => (
    <tr scope="row" className="text-center">
        <td style={{width: "30%"}}>{product.item_name}</td>
        <td>Q{product.item_price}</td>
        <td>{product.item_description}</td>
        <td>
            <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <button className="btn btn-success" onClick={() => onUpdate(product)}>
                <FontAwesomeIcon icon={faPen} />
            </button>
        </td>
    </tr>
)

const UpdateModal = ({ product, handleClose, getProductsHandler, admin_key }) => {
    return (
    <Modal handleClose={handleClose} style={{borderRadius: 5, height: 450}}>
        <h1 className="text-center mt-2">Update product</h1>
        <ProductForm 
            admin_key={admin_key} 
            onSubmit={updateProduct} 
            getProductsHandler={() => getProductsHandler().then(handleClose)} 
            product={product}
        />
    </Modal>
)}

const ProductForm = ({ onSubmit=addProduct, getProductsHandler, admin_key, product }) => {
    const [productName, setProductName] = useState(product? product.item_name :'');
    const [productPrice, setProductPrice] = useState(product? product.item_price :'');
    const [productDescription, setProductDescription] = useState(product? product.item_description :'');
    const [productImage, setProdudctImage] = useState('');

    return (
        <form className="form" onSubmit={e => {
            e.preventDefault()
            onSubmit(
                admin_key, 
                productName, 
                productPrice,
                productDescription, 
                productImage, 
                product? product.id : '')
            .then(getProductsHandler)
        }}>
            <div className="form-group">
                <input
                    value={productName}
                    type="text" 
                    placeholder="Product name" 
                    className="form-control" 
                    onChange={e =>{ 
                        setProductName(e.target.value)
                        console.log(productName)
                    }}
                />
            </div>
            <div className="form-group">
                <input 
                    value={productPrice} 
                    type="number" 
                    step="any" 
                    placeholder="Product price" 
                    className="form-control" 
                    onChange={e => setProductPrice(e.target.value)}
                />
            </div>
            <div className="form-group">
                <textarea 
                    value={productDescription} 
                    type="text" 
                    placeholder="Product description" 
                    rows="6" 
                    style={{resize: 'none'}} 
                    className="form-control" 
                    onChange={e => setProductDescription(e.target.value)}
                ></textarea>
            </div>
            <div className="form-group">
                <input 
                    type="file" 
                    placeholder="Product image" 
                    className="form-control" 
                    onChange={e => setProdudctImage(e.target.files[0])}
                />
            </div>
            <button type="submit" className="btn btn-success w-100">
                Submit
            </button>
        </form>
    )
}

export default ManageProducts;