'use strict';

let csv = require("csvtojson");

let ingredientsDataName = "ingredients";
let transactionsDataName = "transactions";
let favoritesDataName = "favorites";
let defaultLanguage = "sv";
let fs1 = require('fs');

fs1.watch("./data/", (event_type, file_name) => {
  console.log("Deleting Require cache for " + file_name);
  delete require.cache[ require.resolve("./data/" + file_name)];
});

// Store data in an object to keep the global namespace clean
function Data() {
  this.data = {};
  this.orders = {};
  this.currentOrderNumber = 0;
}

Data.prototype.getUILabels = function (lang) {
  var ui = require("./data/ui_" + (lang || defaultLanguage) + ".json");
  return ui;
};

Data.prototype.getFavBurgers = function () {
  var d = this.data;
  var favorites = d[favoritesDataName];
  var ingredients = d[ingredientsDataName];
  var chosenBurgers = [];
  for(var j = 0; j<favorites.length;j++){
    var price = 0;
    var filter = {
      ingredient1: favorites[j].ingredient1,
      ingredient2: favorites[j].ingredient2,
      ingredient3: favorites[j].ingredient3
    };
    var chosenIngredients = ingredients.filter(function(ingredient){
      for (var key in filter) {
        if (ingredient.ingredient_id === filter[key])
        return true;
      }
      return false;
    }
  );
  for(var i = 0;i<chosenIngredients.length;i++){
    price = price + chosenIngredients[i].selling_price;
  }
  let burger = {
    name: favorites[j].burger_name,
    url: favorites[j].url,
    ingredients: chosenIngredients,
    price: price
  };
  chosenBurgers.push(burger);
}
return chosenBurgers;
};
/*
Returns a JSON object array of ingredients with the fields from
the CSV file, plus a calculated amount in stock, based on
transactions.
*/
Data.prototype.getIngredients = function () {
  var d = this.data;
  return d[ingredientsDataName].map(function (obj) {
    obj.stock = d[transactionsDataName].reduce(function (sum, trans) {
      if (trans.ingredient_id === obj.ingredient_id) {
        return sum + trans.change;
      } else {
        return sum;
      }
    }, 0);
    return obj;
  });
};

/*
Function to load initial data from CSV files into the object
*/
Data.prototype.initializeTable = function (table) {
  csv({checkType: true})
  .fromFile("./data/" + table + ".csv")
  .then((jsonObj) => {
    // console.log("JSON object", jsonObj, "done");
    this.data[table] = jsonObj;
  });
};

Data.prototype.initializeData = function() {
  console.log("Starting to build data tables");
  // Load initial ingredients. If you want to add columns, do it in the CSV file.
  this.initializeTable(ingredientsDataName);
  // Load initial stock. Make alterations in the CSV file.
  this.initializeTable(transactionsDataName);
  //ladda in favoriterna
  this.initializeTable(favoritesDataName);
}
/*
Adds an order to to the queue and makes an withdrawal from the
stock. If you have time, you should think a bit about whether
this is the right moment to do this.
*/

Data.prototype.getOrderNumber = function () {
  this.currentOrderNumber += 1;
  return this.currentOrderNumber;
}

Data.prototype.addOrder = function (order) {
  var orderId = this.getOrderNumber();
  this.orders[orderId] = order;
  console.log(order);
  this.orders[orderId].orderId = orderId;
  this.orders[orderId].status = "not-started";
  var transactions = this.data[transactionsDataName],
  //find out the currently highest transaction id
  transId =  transactions[transactions.length - 1].transaction_id, i = order.menus, j, k;


  /*Här tar vi ut alla menyer ur en order*/
  for(j=0;j < i.length;j++){
    /*Här går vi igenom alla ingredienser, en meny i taget*/
    for(k=0;k<i[j].ingredients.length;k++){
      transId += 1;
      transactions.push({transaction_id: transId,
        ingredient_id: i[j].ingredients[k].ingredient_id,
        /*Vi måste ta hänsyn till antalet hamburgare också*/
        change: - 1*i[j].units});
      }
    }
    return orderId;
  };
  Data.prototype.changeFavorites = function(info){
    return info;

  }
  /*Var används denna??? */
  Data.prototype.changeStock = function (item, saldo) {
    var transactions = this.data[transactionsDataName]
    var transId = transactions[transactions.length - 1].transaction_id
    transactions.push({transaction_id: transId,
      ingredient_id: item.ingredient.ingredient_id,
      change: saldo - item.ingredient.stock});
    };

    Data.prototype.getAllOrders = function () {
      return this.orders;
    };

    Data.prototype.markOrderDone = function (orderId) {
      this.orders[orderId].status = "done";
    };

    Data.prototype.markOrderStarted = function (orderId) {
      this.orders[orderId].status = "started";
    };

    Data.prototype.markOrderCanceled = function (orderId) {
      this.orders[orderId].status = 'cancel';
      this.currentOrderNumber -= 1;
    };

    Data.prototype.markOrderNotStarted = function (orderId) {
      this.orders[orderId].status = "not-started";
    };

    Data.prototype.markOrderSentOut = function (orderId) {
      this.orders[orderId].status = "sentOut";
    };

    Data.prototype.getTransactions = function(){
      return this.data[transactionsDataName];
    };



    module.exports = Data;
