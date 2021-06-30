const router = require('express').Router();
let ConferenceDetail = require('../Model/ConferenceDetails.model')



router.route('/').get((req, res) => {
    ConferenceDetail.find()
        .then(conferenceDetail => res.json(conferenceDetail))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const conferenceName = req.body.conferenceName;
    const venue = req.body.venue;
    const startDate = req.body.startDate;
    const description = req.body.description;


    const newConnerence = new ConferenceDetail({
        conferenceName,
        venue,
        startDate,
        description

    });

    newConnerence.save()
        .then(() => res.json(newConnerence))
        .catch(err => res.status(400).json('error' + err));
});


router.route('/:id').get((req, res) => {
    ConferenceDetail.findById(req.params.id)
        .then(conferenceDetail => res.json(conferenceDetail))
        .then(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    ConferenceDetail.findByIdAndDelete(req.params.id)
        .then(() => res.json('ConferenceDetail Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    ConferenceDetail.findById(req.params.id)
    .then(conferenceDetail =>{
        conferenceDetail.conferenceName = req.body.conferenceName;
        conferenceDetail.venue = req.body.venue;
        conferenceDetail.description = req.body.description;
        conferenceDetail.startDate =Date.parse(req.body.startDate);

        conferenceDetail.save()
        .then(()=> res.json('conferenceDetail updated!'))
        .catch(err=>res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;