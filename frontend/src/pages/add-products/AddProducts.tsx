import React from 'react'
import { useState } from 'react'
import './addProducts.scss'
import { TextField, Button } from '@mui/material'
import { IProduct } from '../../types/global.typing'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../constants/url.constants'

const AddProducts: React.FC = () => {

    const [product, setProduct] = useState<Partial<IProduct>>({ title: '', brand: '' });

    const redirect = useNavigate();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    }

    const handleSaveBtnClick = () => {
        if(product.title === '' || product.brand === ''){
            alert("Enter Values");
            return;
        }

        const data: Partial<IProduct> = {
            brand: product.brand,
            title: product.title
        };
        axios.post(baseUrl,data)
        .then((response) => redirect('/products',{state: {message: "Product Created Successfully"}}))
        .catch((error) => alert("An error occured"))
    }

    const handleBackBtnClick = () => {
        redirect('/products');
    }

    return (
        <div className='add-product'>
            <h1>Add New Products</h1>
            <TextField autoComplete='off' label='Brand' name='brand' variant='outlined' value={product.brand} onChange={changeHandler}/>
            <TextField autoComplete='off' label='Title' name='title' variant='outlined' value={product.title} onChange={changeHandler}/>
            <div>
                <Button variant='outlined' color='primary' onClick={handleSaveBtnClick}>
                    Save
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleBackBtnClick}>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default AddProducts