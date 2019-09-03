const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const User = require("../models/user");

//------------------------------------------------------------------------------------------------
//  If no User is 
//------------------------------------------------------------------------------------------------

router.get('/', function(req, res) {

    User.find().exec().then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:userName', (req, res) => {
    const name = req.params.userName;

    console.log("User Route Taken");
    User.findOne({firstName: name})
        .exec()
        .then(doc => {
            if(doc) {
                //let obj = JSON.parse(doc);
                //console.log(obj.name);

                res.status(200).json(doc);
                //console.log(obj);
            }
            else {
                throw new Error('No user found'); 
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

});

//User Login Route
//TODO- 1) This needs proper callbacks attached to do useful work once the user is 
//      validated.
//      2) Also need to implement password encryption for security(see Bcrypt...)
//      3) Need to either make usernames unique or use no unique usernames with an email.
//  TLDR- The login validation Logic is in its most basic form and needs to be revamed for prouction. 
//        The interface should remain standard username/email and password setup.
//-------------------------------------------------------------------------------------
router.post('/:userName/:pass', (req, res) => {
    const name = req.params.userName;
    const pass = req.params.pass;

    User.find({name: name}).exec()
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




//---Register New User---
// 
router.post('/Register', (req, res) => {

    //Model: User.js
    var user = new User ({
        //_id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        id: req.body.id, 
        orders: req.body.orders,
        email: req.body.email
        //pass: req.body.pass,
        //visits: 0 

    });

    //Remove in Production
    console.log(req.body.firstName);

    user.save().then(result => {
        console.log(result);
    
    res.status(200).json({
        message: 'Adding New user to database',
        createdUser: user
    });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });

});

module.exports = router;
