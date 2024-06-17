import React, { useEffect, useState } from 'react'
import './edit-products.scss';
import axios from 'axios';
import { baseUrl } from '../../constants/url.constants';
import { IProduct } from '../../types/global.typing';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const EditProduct: React.FC = () => {

    const [product, setProduct] = useState<Partial<IProduct>>({ title: '', brand: '' });

    const redirect = useNavigate();
    const { id } = useParams();

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        axios.get<IProduct>(`${baseUrl}/${id}`)
            .then((response) => setProduct({
                title: response.data.title,
                brand: response.data.brand,
            })
        );
    }, []);
    const handleSaveBtnClick = () => {
        if (product.title === '' || product.brand === '') {
            alert("Enter Values");
            return;
        }

        const data: Partial<IProduct> = {
            brand: product.brand,
            title: product.title
        };
        axios.put(`${baseUrl}/${id}`, data)
            .then((response) => redirect('/products', { state: { message: "Product Updated Successfully" } }))
            .catch((error) => alert("An error occured"))
    }

    const handleBackBtnClick = () => {
        redirect('/products');
    }

    return (
        <div className='edit-product'>
            <h1>Edit Product</h1>
            <TextField autoComplete='off' label='Brand' name='brand' variant='outlined' value={product.brand} onChange={changeHandler} />
            <TextField autoComplete='off' label='Title' name='title' variant='outlined' value={product.title} onChange={changeHandler} />
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

export default EditProduct