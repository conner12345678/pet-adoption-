# Pet Adoption Website
A pet adoption website where users can sign up, log in, and view pets available for adoption. The site allows for users to add new pets, update pet information, and leave comments about the pets. The backend is built using Node.js with Express and MongoDB, and integrates with Cloudinary for image hosting.

## Features
- Sign up / Login: Users can create an account and log in using their credentials.
- Pet Listings: View available pets for adoption, along with their details (name, breed, age, etc.).
- Add New Pet: Users can submit details of new pets available for adoption, including uploading pet images via Cloudinary.
- Comments: Users can leave comments on individual pet pages.
- Admin Control: Admin can update pet details, including changing pet information.
## Technologies Used
- Node.js: JavaScript runtime environment.
- Express: Web framework for Node.js to handle HTTP requests.
- MongoDB: NoSQL database for storing user and pet data.
- Mongoose: ODM (Object Data Modeling) library for MongoDB.
- Cloudinary: Cloud-based image storage and delivery service for uploading pet images.
- EJS: Templating engine to render dynamic views.
- Multer: Middleware for handling file uploads.
## Project Structure
```bash
/public
    /sign_in.html           # Sign in page
    /sign_up.html           # Sign up page
    /newPet.html            # New pet submission page
/views
    /pets.ejs               # Pet listings view
    /animal.ejs             # Individual pet detail view
    /admin.ejs              # Pet admin control page
/models
    User.js                 # User schema
    Pet.js                  # Pet schema
/controllers
    adopt.js                # Controller functions for user and pet operations
/db
    connect.js              # MongoDB connection setup
/routes
    users.js                # Routes for user and pet operations
/middleware
    async.js                # Async wrapper to handle async errors
    not-found.js            # Middleware for handling 404 errors
    error-handler.js        # Custom error handler
```
## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/conner12345678/pet-adoption-.git
cd pet-adoption
```
2. Install dependencies:

Make sure you have Node.js installed, then install the required npm packages:
```bash
npm i cloudinary dotenv ejs express mongoose multer multer-storage-cloudinary
npm i nodemon --save-dev
```
3. Configure environment variables:

Create a .env file in the root directory and add the following:
```bash
MONGOURI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
4. Start the application
```bash
npm run dev
```

## API Endpoints
### Users
POST /api/v1/adopt/signup: Create a new user
POST /api/v1/adopt/login: Login with username and password
### Pets
GET /pets: Fetch all pets available for adoption
GET /pet/:id: Fetch details of a specific pet
GET /pet/admin/:id: Admin page for a specific pet
POST /pets/new: Add a new pet
PUT /pet/update/:id: Update a pet's details
POST /pet/:id/comments: Add a new comment on a pet's page
DELETE /pet/:id: Delete a pet
Error Handling
The application uses middleware to handle errors:

404 errors: not-found.js
General errors: error-handler.js
## Notes
MongoDB and Cloudinary are required for full functionality.
Multer is used to handle file uploads, but Cloudinary is used to store images.
## License
MIT License.
