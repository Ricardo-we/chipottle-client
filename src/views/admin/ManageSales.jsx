// UTILS
import checkLoggedIn from './../../libs/sessions-utils.js';
import getSales, { getTotalSales, deleteSale, addSale } from '../../libs/api-requests/sales-requests';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import getProducts from '../../libs/api-requests/product-request';
// COMPONENTS
import { AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import SideBar from './SideBar';
import Alert from '../../public-components/Alert';

function AdminSales() {
    const navigate = useNavigate();
    // ADMIN-KEY
    const admin_key = localStorage.getItem('admin_key');
    
    // SALES-DATA
    const [sales, setSales] = useState([{id:0, date: '12-01-2020T:400'}]);
    const [totalSales, setTotalSales] = useState(0);
    const [alertOpen, setAlertOpen] = useState(false);
    const [actualSaleId, setActualSaleId] = useState(0);
    //SALES-PRODUCT-DATA 
    const [products, setProducts] = useState([{id:0, item_name: 'hello'}])
    const [selectedProduct, setSelectedProduct] = useState(0);

    const getSalesHandler = async () => {
        const response = await getSales(admin_key);
        const totalSales = await getTotalSales(admin_key);
        const productsForOptions = await getProducts();

        setSales(response)
        setTotalSales(totalSales)
        setProducts(productsForOptions)
    }

    useEffect(() => {
        if(!checkLoggedIn()) navigate('/chipottle-admin/login')
        getSalesHandler();
    }, [])

    return ( 
    <>
        <SideBar/>
        <AnimatePresence initial={false} exitBeforeEnter={true}>
            {alertOpen && 
                <Alert 
                actionOnConfirm={() =>{
                    deleteSale(admin_key, actualSaleId, getSalesHandler)
                    .then(() => setAlertOpen(false))
                }}
                handleClose={() => setAlertOpen(false)}
                text={<h2>Are you sure you want to delete this item?</h2>}
                />
            }
        </AnimatePresence>

        <div className="container">
            <h1>Manage sales</h1>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                addSale(admin_key, selectedProduct).then(getSalesHandler)
            }}>
                <div className="form-control">
                    <select className="form-select" defaultValue="0" onChange={e => setSelectedProduct(e.target.value)}>
                        <option value="0" disabled>Select a product</option>
                        {products.map(product => <option value={product.id} key={product.id}>{product.item_name}</option>)}
                    </select>
                    <button type="submit" className="btn btn-success w-100">
                        add sale
                    </button>
                </div>
            </form>
        </div>

        <table className="table table-responsive table-striped container" style={{height: '300px'}}>
            <thead>
                <tr className="text-center">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Sale date</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => <TableRow 
                        key={sale.id}
                        sale={sale} 
                        onDeleteAction={(id) => {
                            setAlertOpen(true)
                            setActualSaleId(id)
                        }}
                    />
                )}
                <tr>
                    <td colSpan="4">
                        <h3>Total sales: Q{totalSales}</h3>
                    </td>
                </tr>
            </tbody>
        </table>
    </>
    );
}

const TableRow = ({ sale, onDeleteAction }) => (
    <tr scope="row" className="text-center">
        <td style={{width: "30%"}}>{sale.product}</td>
        <td>Q{sale.product_price}</td>
        <td>
            <strong>{sale.date.split('T')[0]}</strong>
            <br />
            <span>{sale.date.split('T')[1].split('.')[0]}</span>
        </td>
        <td>
            <button className="btn btn-danger" onClick={() => onDeleteAction(sale.id)}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </td>
    </tr>
)

const Styles = {
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 300
    }
}

export default AdminSales;