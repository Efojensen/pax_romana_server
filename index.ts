import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World from Bun & Express!');
});

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});
