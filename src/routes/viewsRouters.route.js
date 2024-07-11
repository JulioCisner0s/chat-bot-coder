import { Router } from "express";

const app = Router();

app.get('/', (req, res) => {
    req.send('home', {});
});

export default app;