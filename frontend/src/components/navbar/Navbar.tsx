import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'
import './navbar.scss'

const Navbar: React.FC = () => {
  return (
    <div className='navbar'>
        <div className="brand">
            Pet Store
        </div>
        <div className="hamburger">
            <MenuIcon/>
        </div>
        <div className="menu">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/products/add-products">Add Product</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar;