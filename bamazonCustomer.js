var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    allProducts();
})

function allProducts () {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
          }
          console.log("-----------------------------------");
          inquirer
            .prompt([
            {
                name: "items",
                type: "input",
                message: "Which product ID would you like to buy?"
            },
            {
                name: "units",
                type: "input",
                message: "How many units would you like to buy?"
            }
            ])
            .then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (answer.items === res[i].item_id) {
                    console.log("So " + answer.units + " of " + answer.items);
                }
            }});
    });
};

// function productID(res) {
//     let tableItems = res;
//     inquirer
//         .prompt([
//             {
//                 name: "ID",
//                 type: "input",
//                 message: "Which product ID would you like to buy?"
//             },
//             {
//                 name: "units",
//                 type: "input",
//                 message: "How many units would you like to buy?"
//             }
//         ])
//         .then(function(answer) {
//             for (var i = 0; i < tableItems.length; i++) {
//                 if (answer.ID === tableItems[i].item_id) {
//                     console.log("working on it");
//                 }
//         }});
    
// }