import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom'
import './navbar.scss'
import { Close } from '@mui/icons-material';

const Navbar: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleNavbar = () => {
        if(window.innerWidth < 550){
            setOpen(!open)
        }
    }

    const menuStyle = open ? "menu open" : "menu"
  return (
    <div className='navbar'>
        <div className="brand">
            Pet Store
        </div>
        <div className="hamburger">
            <MenuIcon onClick = {toggleNavbar}/>
        </div>
        <div className={menuStyle}>
            <ul>
                <Close className='close' onClick={toggleNavbar} />
                <li onClick = {toggleNavbar}><Link to="/">Home</Link></li>
                <li onClick = {toggleNavbar}><Link to="/products">Products</Link></li>
                <li onClick = {toggleNavbar}><Link to="/products/add-products">Add Product</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar;