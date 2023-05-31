import express from 'express';
import morgan from 'morgan';
import MongoConnect from './config/MongoConnect.js';
import cookie from 'cookie-parser';
import route from './routes/index.js';
import cors from 'cors';
const app = express();



// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//TODO: catch all the error to return the response object

app.use(morgan('combined'));
app.use(cookie());

route(app);



// Start the server
app.listen(3000, async () => {
	await MongoConnect();

	console.log('Server started on port 3000');
});
