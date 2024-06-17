import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import {Routes, Route} from 'react-router-dom'
import Products from './pages/products/Products'
import AddProducts from './pages/add-products/AddProducts'
import EditProduct from './pages/edit-products/EditProduct'
import DeleteProduct from './pages/delete-products/DeleteProduct'

const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <div className='wrapper'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/add-products' element={<AddProducts/>}/>
          <Route path='/products/edit/:id' element={<EditProduct/>}/>
          <Route path='products/delete/:id' element={<DeleteProduct/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App