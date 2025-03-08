require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { router: signupRoute } = require('./routes/signup');
const { router: loginRoute } = require('./routes/login');
const { router: profileRoute } = require('./routes/profile')
const { setUserCollection } = require('./models/user');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_CLIENT_ID;


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express.json());

const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1 }
});

const connectdb = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
        const database = client.db('ai-project');
        const collection = database.collection('users');

        setUserCollection(collection);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
connectdb();

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the AI Project API' });
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/auth', profileRoute);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit(0);
});
