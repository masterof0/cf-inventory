import axios from 'axios'


export default {
    getProducts() {
        return axios.get('/api/products')
    },

    addEditProduct(p) {
        return axios.post('/api/product', p)
    }, 

    deleteProduct(id) {
        return axios.delete(`/api/delete/${id}`)
    },

    updateProducts(name, qty) {
        return axios.put(`/api/products?${name}=${qty}`)
    } 
}