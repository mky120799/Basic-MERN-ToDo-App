const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/todo.route');


//PORT
dotenv.config();
const PORT = process.env.PORT || 5000;


//CORS
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// REQUEST PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request loggin middlewares
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  console.log(`req body -> ${req.body}`)
  next();
});

// home route 
app.get('/', (req, res) => {
    console.log('home routes called')
  res.status(200).send("Welcome to the home route");
});


//main routes
app.use('/api', routes);


// app running and DB connection 
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});