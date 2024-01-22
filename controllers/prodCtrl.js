import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./models/data.db')

function getAllProducts(req, res) {
	db.all('SELECT * FROM products', (err, products) => {
		if (err) {
			return res.send('Error retrieving data')
		}
		res.json(products)
	})
}

function getProductById(req, res) {
	const id = req.query.id
	db.get('SELECT * FROM products WHERE id = ?', id, (err, product) => {
		if (err) {
			return res.send('Error retrieving data')
		}

		if (!product) {
			return res.send('Not Found')
		}

		res.send(product.item)
	})
}

function addProduct(req, res) {
	const { id, item } = req.body

	db.get(
		'SELECT * FROM products WHERE id = ?',
		id,
		(err, existingProduct) => {
			if (err) {
				return res.send('Error checking for existing product')
			}

			if (existingProduct) {
				return res.send('ID should be unique')
			}

			db.run(
				'INSERT INTO products (id, item) VALUES (?, ?)',
				id,
				item,
				err => {
					if (err) {
						return res.send('Error adding product')
					}

					res.send(`Record added: ${id}, ${item}`)
				}
			)
		}
	)
}

function deleteProduct(req, res) {
	const id = req.query.id

	db.run('DELETE FROM products WHERE id = ?', id, function (err) {
		if (err) {
			return res.send('Error deleting product')
		}

		if (this.changes === 0) {
			return res.send('Not found')
		}

		res.send('Record deleted')
	})
}

export { getAllProducts, getProductById, addProduct, deleteProduct }
