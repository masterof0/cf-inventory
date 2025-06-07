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
		return axios.delete(`/api/delete/${id}`)
	},

	updateProductQty(name, qty) {
		return axios.patch(`/api/products?${name}=${qty}`)
	},

	addLog(l) {
		return axios.post('/api/logs', l)
	},
}
