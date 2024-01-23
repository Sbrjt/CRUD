import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./models/data.db')

function getAllProducts(req, res) {
	db.all('SELECT * FROM products', (err, rows) => {
		if (err) return res.send('Error')

		res.json(rows)
	})
}

function getProductById(req, res) {
	const id = req.query.id

	db.get('SELECT * FROM products WHERE id = ?', id, (err, row) => {
		if (err) return res.send('Error')

		if (!row) {
			return res.send('Not Found')
		}

		res.send(row.item)
	})
}

function addProduct(req, res) {
	const { id, item } = req.body

	db.get('SELECT * FROM products WHERE id = ?', id, (err, row) => {
		if (err) return res.send('Error')

		if (row) {
			return res.send('ID should be unique')
		}

		db.run('INSERT INTO products VALUES (?, ?)', id, item, (err) => {
			if (err) return res.send('Error')

			res.send(`Record added: ${id}, ${item}`)
		})
	})
}

function deleteProduct(req, res) {
	const id = req.query.id

	db.run('DELETE FROM products WHERE id = ?', id, function (err) {
		if (err) return res.send('Error')

		if (this.changes === 0) {
			return res.send('Not found')
		}

		res.send('Record deleted')
	})
}

export { getAllProducts, getProductById, addProduct, deleteProduct }
