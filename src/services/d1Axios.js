import axios from 'axios'

export default {
	getProducts() {
		return axios.get('/api/products')
	},

	// split between post and put
	addEditProduct(p) {
		return axios.put('/api/product', p)
	},

	deleteProduct(id) {
		return axios.delete(`/api/product/${id}`)
	},

	updateProductQty(name, qty) {
		return axios.patch(`/api/product?${name}=${qty}`)
	},

	addLog(l) {
		return axios.post('/api/log', l)
	},
}
