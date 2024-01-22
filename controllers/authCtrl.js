import bcrypt from 'bcrypt'
import { readFileSync, writeFileSync } from 'fs'

let data = JSON.parse(readFileSync('./models/usr.json'))

function save() {
	writeFileSync('./models/usr.json', JSON.stringify(data))
}

async function login(req, res) {
	const { usr, pwd } = req.body
	if (!usr || !pwd) {
		return res.send('Username and password are required.')
	}

	const foundUsr = data.find(i => i.usr === usr)

	if (foundUsr) {
		if (await bcrypt.compare(pwd, foundUsr.pwd)) {
			req.session.authenticated = true
			// return res.redirect('/dashboard')
			return res.send(`Welcome, ${usr}! Explore the dashboard.`)
		}
	}
	res.send("Username or password didn't match. Try again")
}

async function register(req, res) {
	let { usr, pwd } = req.body

	if (!usr || !pwd) {
		return res.send('Username and password are required.')
	}

	if (data.find(i => i.usr === usr)) {
		return res.send('Username already taken :(')
	}

	pwd = await bcrypt.hash(pwd, 10)
	data.push({ usr, pwd })
	save()
	res.send('Registration successful. Please login.')
}

export { login, register }
