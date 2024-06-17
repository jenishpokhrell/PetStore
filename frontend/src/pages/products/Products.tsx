import React from 'react'
import './products.scss'
import { useState, useEffect } from 'react'
import { IProduct } from '../../types/global.typing'
import axios from 'axios'
import { baseUrl } from '../../constants/url.constants'
import { Button } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import moment from 'moment'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'

const Products: React.FC = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const location = useLocation()
    const redirect = useNavigate()

    const fetchProductsList = async () => {
        try {
            const response = await axios.get<IProduct[]>(baseUrl);
            setProducts(response.data);
            if(location?.state){
                Swal.fire({
                    icon:'success',
                    title: location?.state?.message
                })
                redirect(location.pathname,{replace: true})
            }
        } catch (error) {
            alert("An error happened")
        }
    };

    useEffect(() => {
        fetchProductsList();
    }, []);

    console.log(products);

    const redirectToEdit = (id: string) => {
        redirect(`/products/edit/${id}`);
    };


    const handleDelete = (id: string) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "Once, You delete you can't recover data!!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed){
            fetch(`${baseUrl}/${id}`, {method: 'DELETE'})
            .then(response => response.status)
            .then(data => {
              console.log('Success:', data);
              setProducts(products.filter(product => product.id !== id));
              Swal.fire({
                title: 'Deleted!',
                text: 'Your data has been deleted.',
                icon: 'success'
            });
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          }
        })
    }

    return (
        <div className="products">
            <h1>Products List</h1>
            {
                products.length === 0 ? (<h1>No Products</h1>) : (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Brand</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.title}</td>
                                            <td>{product.brand}</td>
                                            <td>{moment(product.createdAt).fromNow()}</td>
                                            <td>{moment(product.updatedAt).fromNow()}</td>
                                            <td>
                                                <Button variant='outlined' color='warning' sx={{ mx: 2 }} onClick={() => redirectToEdit(product.id)}>
                                                    <Edit />
                                                </Button>
                                                <Button variant='outlined' color='error' onClick={() => handleDelete(product.id)}>
                                                    <Delete />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default Products