import { Router } from 'express';
const router = Router();

// Get
router.get('/', async (req, res) => {
    try {
        res.status(200).render('home', {
            script: 'index',
            style: 'index',
            title: 'Spazzio: Home',
            header: true,
        });
  
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    };
});

export default router;