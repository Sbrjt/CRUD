import { readFileSync, writeFileSync } from 'fs'

let data = JSON.parse(readFileSync('./models/data.json'))

function save() {
	writeFileSync('./models/data.json', JSON.stringify(data))
}

function getAllProducts(req, res) {
	res.json(data)
}

function getProductById(req, res) {
	const id = req.query.id
	const prod = data.find(i => i.id === id)

	if (!prod) {
		return res.send('Not Found')
	}
	res.send(prod.item)
}

function addProduct(req, res) {
	const { id, item } = req.body

	if (data.find(p => p.id === id)) {
		return res.send('ID should be unique')
	}

	data.push({ id, item })
	save()
	res.send(`Record added: ${id}, ${item}`)
}

function deleteProduct(req, res) {
	const id = req.query.id
	const len = data.length

	data = data.filter(i => i.id !== id)

	if (data.length === len) {
		return res.send('Not found')
	}
	save()
	res.send(`Record deleted`)
}

export { getAllProducts, getProductById, addProduct, deleteProduct }
