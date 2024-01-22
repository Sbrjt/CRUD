This is a simple Express.js application for creating a basic CRUD API with authentication. It is deployed on [Render](https://crud-83mz.onrender.com/) and follows the MVC model.

```
root
│
├── server.js 
│
├── models/
│   ├── usr.json            
│   ├── data.json
│
├── views/            
│   ├── auth.html
│   ├── dashboard.js
|
├── controllers/            
│   ├── authCtrl.js
│   ├── prodCtrl.js
|
...
```

### Installation
Clone/download the repo. Install dependencies (npm install). Start the server. (The server will be running at http://localhost:3000)

### End points:

Dashboard:
* GET /dashboard/product?id=xyz (Search for a product by ID)
* GET /dashboard/all (Retrieve all products)
* POST /dashboard/product?id=xyz (Add a new product)
* DELETE /dashboard/product?id=xyz (Delete a product by ID)

Authentication:
* POST /register
* POST /login



