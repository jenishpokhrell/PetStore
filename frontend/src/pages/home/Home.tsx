// import React from 'react'
import './home.scss'
import { Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import animals from '../../images/1.png';

const home = () => {

  const redirect = useNavigate();
  return (
    <div className='home'>
        <h1>Welcome to Pet Store</h1>
        <img src={animals} alt="cats&dogs" />
        <Button variant='outlined' color='primary' 
          onClick={() => redirect("/products")}>
          View Products
        </Button>
    </div>
  )
}

export default home