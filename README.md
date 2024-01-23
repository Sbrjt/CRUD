This is a simple Express.js application for creating a basic CRUD API with user authentication and authorization. It follows the MVC model, incorporates session-based authentication and uses a sqlite database. It is deployed on [Render](https://crud-83mz.onrender.com/).

### End points

* GET /login: Displays the login page.
* POST /login: Processes user login.
* POST /register: Registers a new user.
* GET /dashboard/all: Retrieves all products.
* GET /dashboard/product: Retrieves a product by ID (with query parameter /dashboard/product?id=xyz).
* POST /dashboard/product: Adds a new product (requires admin rights).
* DELETE /dashboard/product: Deletes a product (requires admin rights).

For admin rights, use username *admin* and password *1234*.

### Project Structure

```
root
│
├── server.js 
│
├── models/           
│   ├── data.db
│
├── views/            
│   ├── auth.html
│   ├── dashboard.html
|
├── controllers/            
│   ├── authCtrl.js
│   ├── prodCtrl.js
|
...
```

### Installation
Clone/download the repo. Install dependencies (npm install). Start the server (on http://localhost:3000).

