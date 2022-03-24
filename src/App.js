import 'bootswatch/dist/united/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/admin/Login'
import ManageSales from './views/admin/ManageSales'
import ManageProducts from './views/admin/ManageProducts';
import ManageEvents from './views/admin/ManageEvents';
import ManageAdmins from './views/admin/ManageAdmins';
import Homepage from './views/shop/Homepage';
import Shop from './views/shop/Shop';
import ProductDetails from './views/shop/ProductDetails';
import Cart from './views/shop/Cart';
import Events from './views/shop/Events';

function App() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path="chipottle-admin/login" element={<Login/>}/>
			<Route path="chipottle-admin/sales" element={<ManageSales/>}/>
			<Route path="chipottle-admin/products" element={<ManageProducts/>}/>
			<Route path="chipottle-admin/events" element={<ManageEvents/>}/>
			<Route path="chipottle-admin/admins" element={<ManageAdmins/>}/>
			<Route path="" element={<Homepage/>}/>
			<Route path="shop/:page" element={<Shop/>}/>
			<Route path="product-details/:product_id" element={<ProductDetails/>}/>
			<Route path="cart" element={<Cart/>}/>
			<Route path="events" element={<Events/>}/>
		</Routes>
	</BrowserRouter>
  );
}
export default App;
export const BASE_URL = 'http://localhost:8000'
