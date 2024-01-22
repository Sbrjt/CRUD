import express from 'express'
import session from 'express-session'
import { config } from 'dotenv'
import * as authCtrl from './controllers/authCtrl.js'
import * as prodCtrl from './controllers/prodCtrl.js'
Object.assign(globalThis, authCtrl, prodCtrl)
config()

const app = express()

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
)

app.use(express.json())
app.use(express.static('./views'))

app.get('/', (req, res) => {
	res.redirect('/login')
})

app.get('/login', (req, res) => {
	res.sendFile('views/auth.html', { root: '.' })
})

app.post('/login', login)

app.post('/register', register)

// middleware for authentication
function ensureAuthenticated(req, res, next) {
	if (req.session.authenticated) {
		next()
	} else {
		res.send('Login required.')
	}
}

app.use('/dashboard', ensureAuthenticated)

app.get('/dashboard', (req, res) => {
	res.sendFile('views/dashboard.html', { root: '.' })
})

app.get('/dashboard/all', getAllProducts)

app
	.route('/dashboard/product')
	.get(getProductById)
	.post(addProduct)
	.delete(deleteProduct)

// 404 page
app.get('/*', (req, res) => {
	res.status(404).sendFile('views/404.html', { root: '.' })
})

app.listen(process.env.PORT, () => {
	console.log(`Running on http://localhost:${process.env.PORT}`)
})
