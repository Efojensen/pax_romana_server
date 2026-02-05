import cors from 'cors'
import express from 'express';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env['SERVER_PORT'];

const allowedOrigins = [`http://localhost:${port}`, 'https://pax-romana-knust.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Enable credentials (cookies, etc.) if needed
}))

app.get('/', (req, res) => {
    res.send('Hello World from Bun & Express!');
});

app.listen(port, () => {
    console.log(`Pax Romana Server is live on http://localhost:${port}`);
});
