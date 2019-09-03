const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/order");

router.get('/', function(req, res) {

    Order.find().exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:ownerId', (req, res) => {
    const Id = req.params.ownerId;

    console.log("Route Taken");
    Order.find({ownerId: Id}).exec()
        .then(doc => {
            if(res) {
                console.log(doc);
                res.status(200).json(doc);
            }
            else {
                throw new Error('Order not found'); 
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

});

router.get('/:orderNumber', (req, res) => {
    const name = req.params.orderNumber;

    Order.find({name: name}).exec()
        .then(doc => {
            if(res) {
                console.log(doc);
                res.status(200).json(doc);
            }
            else {
                throw new Error('User Not Found');
            }
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});

//---Create New Order---
// 
router.post('/newOrder', (req, res) => {

    //Model: Order.js
    var order = new Order ({
        //_id: new mongoose.Types.ObjectId(),
        owner: req.body.owner,
        ownerId: req.body.ownerId,
        items: req.body.items,
        orderId: req.body.orderId,
        shippingAddress: req.body.shippingAddress,
        orderDate: req.body.orderDate,
        deliveryDate: req.body.deliveryDate,
        qty: req.body.qty


    });

    order.save().then(result => {
        console.log(result);
    
    res.status(200).json({
        message: 'Adding New order to database',
        createdOrder: order
    });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});

router.delete('/deleteOrder/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    Order.findOneAndRemove({
            orderId: orderId
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

module.exports = router;
