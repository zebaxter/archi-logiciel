const express = require('express');

function createProfileRoutes(getProfile, updateProfile) {
    const router = express.Router();

    router.get('/', async (req, res, next) => {
        try {
            const user = await getProfile.execute(1);

            if (!user) {
                return res.status(404).json({ error: "Utilisateur introuvable" });
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    });

    router.post('/', async (req, res, next) => {
        try {
            const {firstname, lastname} = req.body;

            const user = await updateProfile.execute(
                1, firstname, lastname
            )

            if(!user){
                return res.status(404).json({ error: "Utilisateur introuvable" });
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    });

    return router;
}

module.exports = createProfileRoutes;