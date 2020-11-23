import { Router } from "express";
const router = Router();


// Routes
router.get('/', (req, res) => {
    res.send('Hola mundo');
});


export default router;