const router = require('express').Router();
let Speaker = require('../Model/speaker')



router.route('/').get((req, res) => {
    Speaker.find()
        .then(speakerDetail => res.json(speakerDetail))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;


    const newSpeaker = new Speaker({
        name,
        email,
        address

    });

    newSpeaker.save()
        .then(() => res.json(newSpeaker))
        .catch(err => res.status(400).json('error' + err));
});


module.exports = router;