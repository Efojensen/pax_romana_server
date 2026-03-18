import cors from 'cors'
import express from 'express';
import adminRoutes from './routes/admin.routes'
import generalRoutes from './routes/general.routes'
import citizenRoutes from './routes/citizens.routes'

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
    credentials: true
}))

app.use('/admins', adminRoutes)
app.use('/general', generalRoutes)
app.use('/citizens', citizenRoutes)

app.get('/', (_, res) => {
    res.send('Hello World from Bun & Express!');
});

app.listen(port, () => {
    console.log(`Pax Romana Server is live on http://localhost:${port}`);
});
