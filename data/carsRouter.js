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

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const account = await db.select("*").from("cars").where("id", id)
    .first()
    .then(account => {
        if(account) {
            res.status(200).json(account)
        } else {
        res.status(404).json({"MESSAGE": "A car with that id does not exist"})
        }
    }).catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;