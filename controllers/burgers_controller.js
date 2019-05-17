var express = require("express");

var router = express.Router();
var db = require("../models");
var path = require("path");

// var burger = require("../models/burger.js");


// create home route redering the index file
router.get("/", function (req, res) {
    db.burger.findAll({}).then(function (dbburger) {
        var hbsObject = {
            burgers: dbburger
        };
        
        
        res.render("index", hbsObject);
        // res.sendFile(path.join(__dirname, "../views/index"));
        // res.render("index", dbburger)
        console.log("info passed " + JSON.stringify(hbsObject));
        // res.sendFile(path.join(__dirname, "index", dbburger));
        // res.render("index", hbsObject);
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
// router.get("/api/burgers", function (req, res) {
//     Burger.selectAll(function (data) {
//         var hbsObject = {
//             burgers: data
//         };

//        res.json(hbsObject)
//     });
// })

// put route for adding a burger

router.put("/api/burgers", function (req, res) {
    db.burger.create({
        burger_name: req.body.burger_name,
        devoured: false
    }).then(function (dbburger) {
        res.json(dbburger);
    })
});
// router.put("/api/burgers", function (req, res) {
//     burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
//         res.json({ id: result.insertId });
//     });
// });

// put route for devouring a burger

router.put("/api/burgers/:id", function (req, res) {
    
    db.burger.update(
        {
            // burger_name: req.body.burger_name,
            devoured: req.body.devoured
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbburger) {
            res.json(dbburger);
        });
});
// router.put("/api/burgers/:id", function (req, res) {
//     var condition = "id = " + req.params.id;
//     burger.updateOne(
//           {
//             devoured: req.body.devoured 
//         },
//         condition,  
//         function (result) {
//             if (result.changedRows === 0) {

//                 return res.status(404).end();
//             }
//             res.json(result);
//         }  
//     );
// });

// delete route for clearing all burgers

router.delete("/api/burgers", function (req, res) {
    db.burger.destroy({
        where: {},
        truncate: true
    }).then( function (dbburger) {
        res.json(dbburger)
    });
   
});
// router.delete("/api/burgers", function (req, res) 
// {
//     db.burger.delete(function(data)
//     {
//         res.status(200).end();
//     });
// })

// Export routes for server.js to use.
module.exports = router;