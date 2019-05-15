var connection = require("../config/connection.js");



// Helper function to convert object pairs to mysql syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push to arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
           
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    // select all function to use for printing data to site
    selectAll: function (tableSelect, cb) {
        var queryString = "SELECT * FROM " + tableSelect + ";"
        connection.query(queryString, function (err, result) {
            if (err) throw (err);
            cb(result);
        });
    },

    // insert function for adding new burgers created by user input
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
       
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (?, ?) ";

        connection.query(queryString, vals, function (err, result) {
            if (err) throw (err);
            cb(result);
        })
    },

    // update function for updating burger data once devoured
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // delete function to clear the whole burger list
    delete: function (table, cb) {
        var queryString = "DELETE FROM " + table + ";"
        connection.query(queryString, function (err, result) {
            if (err) throw (err);
            cb(result);
        })
    }, 
};

module.exports = orm;