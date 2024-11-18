# Liquide-Trade-APIs

## Prerequisites
- Node.js
- MongoDB
- npm or Yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/nikitsoni/liquide-trade-apis.git
cd liquide-trade-apis
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/your_database_name
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=10m
```

## Running the Project

```bash
npm run dev
```

## Project Structure
```
project-root/
│
├── config/         # Configuration files
├── controllers/    # Route handlers
├── middlewares/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # Express route definitions
└── app.js          # Main application file
```

## Environment Variables
- `MONGODB_URI`: Connection string for MongoDB
- `PORT`: Server port
- `JWT_SECRET`: Secret for JSON Web Token authentication
- `JWT_EXPIRATION`: Expiration Time for Access Token
