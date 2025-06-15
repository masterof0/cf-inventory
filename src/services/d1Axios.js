import axios from 'axios'

export default {
	getProducts() {
		return axios.get('/api/products')
	},

	addProduct(p) {
		return axios.post('/api/product', p)
	},

	editProduct(p) {
		return axios.put('/api/product', p)
	},

	deleteProduct(id) {
		return axios.delete(`/api/product/${id}`)
	},

	updateProductQty(name, qty) {
		return axios.patch(`/api/product?${name}=${qty}`)
	},

	getLogs() {
		return axios.get('/api/logs')
	},

	addLog(l) {
		return axios.post('/api/log', l)
	},

	getLog(id) {
		return axios.get(`/api/log/${id}`)
	},

	updateLog(l) {
		return axios.put(`/api/log/${l.ID}`, l)
	},
}
