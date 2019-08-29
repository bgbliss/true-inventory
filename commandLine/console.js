//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';
const commands = require('./print')

var inventory_onShelf = []
var unshipped_products = []
var repeatNames = []


const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret
  });

start = (products) => {
    // created to resolve the promises made 
    let test =
    orders(products).then((results) => {
        //returning results
        return results
    })
    //returning results to external files
    return test
}


 orders = (products) => {
     // empty 2 arrays so it doesnt stack up
     //for the server 
    repeatNames = [];
    unshipped_products = [];

    let ordered_products =
    //api call to get all the customers orders that arn't fully fullfilled
    shopify.order
    .list({})
    .then((order) =>{
        order.forEach(element => {
            element.line_items.forEach(data => {
                if(parseInt(products) === data.product_id){
                    let object  ={
                        title: data.title,
                        unshipped_amount: data.fulfillable_quantity
                    }
                    if(repeatNames.includes(object.title)){
                        unshipped_products.forEach(element => {
                            if(element.title === object.title){
                              // total amount of products ordered  
                              element.unshipped_amount += object.unshipped_amount
                            }
                          });
                    }
                    else{
                        //push total amount of orders into unshispped products
                        unshipped_products.push(object)
                        //push repeated names into repeatNames 
                        //for no dupilcate objects
                        repeatNames.push(object.title)
                    }
                }
            }) 
        })
        return current_inventory(products)
    })
    //returns to start()
    return ordered_products
}

current_inventory = (products) => {
    //emptying inventory_onShelf on shelf so it doesn't increase when running server
    inventory_onShelf = []

    let shelf_inventory =
    //api call to get the products of the users input
    shopify.product
    .list({ids: products})
    .then((results) => {
        results.forEach(data => {
            unshipped_products.forEach(inv => {
                if(inv.title === data.title){
                    //taking a products total inventory and
                    //adding total unfulfilled product amount
                    let onShelf = data.variants[0]["inventory_quantity"] + inv.unshipped_amount
                    let object = {
                        title: data.title,
                        onShelf: onShelf
                    }
                    //pusing amount of inventory on shelf
                    //into inventory_onShelf
                    inventory_onShelf.push(object)
                }
            })
        })
        return merge()
    })
    //returns to orders()
    return shelf_inventory
}

merge = () =>{

    //empty merged so no duplicate arrays when retured to server 
    let merged = []
    //merging two arrays of object based on keys
     merged = inventory_onShelf.map(itm => ({
          ...unshipped_products.find((item) => (item.title === itm.title) && item),
          ...itm
      }))
      if(merged == '' || merged == undefined){
        console.log("\n======================================\n")
        console.log("Please enter a correct product number")
        console.log("\n======================================")
        // return("Please enter a correct product number")
      }
      else{
        //returns to current inventory()
        console.log(merged)
        return merged
      }
    }


if(process.argv[2] == null){  
    console.log(commands.print)
  } 
  else{
    let query = process.argv[2]
    start(query)
  }

module.exports = start