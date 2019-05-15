var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


// create home route redering the index file
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

// create a burgers api route
router.get("/api/burgers", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
   
       res.json(hbsObject)
    });
})

// put route for adding a burger
router.put("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
        res.json({ id: result.insertId });
    });
});

// put route for devouring a burger
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    burger.updateOne(
          {
            devoured: req.body.devoured 
        },
        condition,  
        function (result) {
            if (result.changedRows === 0) {
                
                return res.status(404).end();
            }
            res.json(result);
        }  
    );
});

// delete route for clearing all burgers
router.delete("/api/burgers", function (req, res) 
{
    burger.delete(function(data)
    {
        res.status(200).end();
    });
})

// Export routes for server.js to use.
module.exports = router;