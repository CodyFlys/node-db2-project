const express = require('express')

const router = express.Router();

const db = require('../dbConfig')

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.status(200).json(cars)
    })
})

router.post('/', (req, res) => {
    let newCar = {
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        transmission: req.body.transmission,
        title_status: req.body.title_status
    }
    db('cars').insert(newCar)
    .then(car => {
        res.status(200).json(car)
    })
})

module.exports = router;