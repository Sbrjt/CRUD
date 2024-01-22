import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

const db = new sqlite3.Database('./models/data.db')

async function login(req, res) {
	const { usr, pwd } = req.body

	if (!usr || !pwd) {
		return res.send('Username and password are required.')
	}

	db.get(
		'SELECT * FROM users WHERE usr = ?',
		usr,
		async (err, foundUser) => {
			if (err) {
				return res.send('Error checking user')
			}

			if (foundUser) {
				const passwordMatch = await bcrypt.compare(pwd, foundUser.pwd)

				if (passwordMatch) {
					req.session.authenticated = true
					// return res.redirect('/dashboard');
					return res.send(`Welcome, ${usr}! Explore the dashboard.`)
				}
			}

			res.send("Username or password didn't match. Try again")
		}
	)
}

async function register(req, res) {
	let { usr, pwd } = req.body

	if (!usr || !pwd) {
		return res.send('Username and password are required.')
	}

	db.get(
		'SELECT * FROM users WHERE usr = ?',
		usr,
		async (err, existingUser) => {
			if (err) {
				return res.send('Error checking existing user')
			}

			if (existingUser) {
				return res.send('Username already taken :(')
			}

			const hashedPassword = await bcrypt.hash(pwd, 10)

			db.run(
				'INSERT INTO users (usr, pwd) VALUES (?, ?)',
				usr,
				hashedPassword,
				err => {
					if (err) {
						return res.send('Error registering user')
					}

					res.send('Registration successful. Please login.')
				}
			)
		}
	)
}

export { login, register }
