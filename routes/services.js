const express = require('express');
const router = express.Router();


router.post('/services', (req, res, next) => {
    console.log(req.body.service);
    res.sendStatus(200);
});


module.exports = router;