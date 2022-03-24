import '../../css/SideBar.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function SideBar() {
    const [sideBarVisible, setSideBarVisible] = useState(false);

    return (
        <>
            <button className="open-sidebar-btn" onClick={() => setSideBarVisible(true)}>
                <FontAwesomeIcon icon={faBars}/>
            </button>
            <nav className={sideBarVisible?"sidebar sidebar-visible" : "sidebar"}>
                <button className="close-sidebar-btn" onClick={() => setSideBarVisible(false)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <Link className="sidebar-link mt-4" to="/">Home</Link>
                <Link className="sidebar-link" to="/chipottle-admin/admins">Admins</Link>
                <Link className="sidebar-link" to="/chipottle-admin/sales">Sales</Link>
                <Link className="sidebar-link" to="/chipottle-admin/products">Products</Link>
                <Link className="sidebar-link" to="/chipottle-admin/events">Events</Link>
            </nav>
        </> 
    );
}

export default SideBar;