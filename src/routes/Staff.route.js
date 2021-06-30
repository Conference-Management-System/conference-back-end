const router = require('express').Router();
let Staff = require('../Model/staff')



router.route('/').get((req, res) => {
    Staff.find()
        .then(staffDetail => res.json(staffDetail))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;


    const newStaff = new Staff({
        username,
        email,
        password,
        type

    });

    newStaff.save()
        .then(() => res.json(newStaff))
        .catch(err => res.status(400).json('error' + err));
});


module.exports = router;