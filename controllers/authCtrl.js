import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

const db = new sqlite3.Database('./models/data.db')

async function login(req, res) {
	const { usr, pwd } = req.body

	if (!usr || !pwd) {
		return res.send('Username and password are required.')
	}

	db.get('SELECT * FROM users WHERE usr = ?', usr, async (err, foundUser) => {
		if (err) return res.send('Error')

		if (foundUser) {
			// check password
			if (await bcrypt.compare(pwd, foundUser.pwd)) {
				req.session.authenticated = true

				// check if user is admin
				if (foundUser.isadmin) {
					req.session.isAdmin = true
				}

				return res.send(`Welcome, ${usr}! Click on Go to Dashboard.`
				)
			}
		}

		res.send("Username or password didn't match. Try again")
	})
}

async function register(req, res) {
	const { usr, pwd } = req.body

	if (!usr || !pwd) {
		return res.send('Username and password are required.')
	}

	db.get('SELECT * FROM users WHERE usr = ?', usr, async (err, existingUser) => {
		if (err) return res.send('Error')

		if (existingUser) {
			return res.send('Username already taken :(')
		}

		const hashedPassword = await bcrypt.hash(pwd, 10)

		db.run('INSERT INTO users VALUES (?, ?, NULL)', usr, hashedPassword, (err) => {
			if (err) return res.send('Error')

			res.send('Registration successful. Please login.')
		})
	})
}

export { login, register }
