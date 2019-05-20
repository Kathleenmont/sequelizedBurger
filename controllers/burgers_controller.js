var express = require("express");

var router = express.Router();
var db = require("../models");




// create home route redering the index file
router.get("/", function (req, res) {
    db.burger.findAll({}).then(function (dbburger) {
        var hbsObject = {
            burgers: dbburger
        };
        
        res.render("index", hbsObject);
       
        console.log("info passed " + JSON.stringify(hbsObject));
        
    })
});

// create a burgers api route
router.get("/api/burgers", function (req, res) {
    db.burger.findAll({}).then(function (dbburger) {
        var hbsObject = {
            burgers: dbburger
        };

        res.json(hbsObject)
    });
});


// put route for adding a burger

router.put("/api/burgers", function (req, res) {
    db.burger.create({
        burger_name: req.body.burger_name,
        devoured: false
    }).then(function (dbburger) {
        res.json(dbburger);
    })
});


// put route for devouring a burger

router.put("/api/burgers/:id", function (req, res) {
    
    db.burger.update(
        {
            devoured: req.body.devoured
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbburger) {
            res.json(dbburger);
        });
});

// delete route for clearing all burgers

router.delete("/api/burgers", function (req, res) {
    db.burger.destroy({
        where: {},
        truncate: true
    }).then( function (dbburger) {
        res.json(dbburger)
    });
   
});


// Export routes for server.js to use.
module.exports = router;