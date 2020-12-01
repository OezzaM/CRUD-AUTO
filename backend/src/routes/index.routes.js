import { Router } from "express";
const router = Router();


// Routes
router.get('/', (req, res) => {
    res.send('Para ver el API de autos localhost:5000/conductores');
});


export default router;