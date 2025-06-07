import axios from 'axios'

export default {
	getProducts() {
		return axios.get('/api/products')
	},

	addEditProduct(p) {
		return axios.put('/api/product', p)
	},

	deleteProduct(id) {
		return axios.delete(`/api/delete/${id}`)
	},

	updateProductQty(name, qty) {
		return axios.patch(`/api/products?${name}=${qty}`)
	},
}
