//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss-dev.myshopify.com';
const commands = require('./print')

var inventory = []
var fulfill_inventory = []
var repeatNames = []

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret
  });

start = (products) => {
   shopify.order
    .list({})
    .then((order) =>{
        unfulfilled_orders(order, products)
    })
    .then(()=>{
        shopify.product
        .list({ids: products})
        .then((results) => {
            current_inventory(results)
        })
        .then(()=>{
          merge()
        })
    })
    .catch((err) => 
    console.error(err)
  )
}

current_inventory = (results) => {
    results.forEach(data => {
        fulfill_inventory.forEach(inv => {
            if(inv.title === data.title){
                let onShelf = data.variants[0]["inventory_quantity"] + inv.unshipped_amount
                let object = {
                    title: data.title,
                    onSelf: onShelf
                }
                inventory.push(object)
            }
        })
    });
}

unfulfilled_orders = (order, products) => {
    order.forEach(element => {
        element.line_items.forEach(data => {
            if(parseInt(products) === data.product_id){
                let object  ={
                    title: data.title,
                    unshipped_amount: data.fulfillable_quantity
                }
                if(repeatNames.includes(object.title)){
                    fulfill_inventory.forEach(element => {
                        if(element.title === object.title){
                          // total amount of products ordered  
                          element.unshipped_amount += object.unshipped_amount
                        }
                      });
                }
                else{
                    fulfill_inventory.push(object)
                    repeatNames.push(object.title)
                }
            }
        }) 
    });
}

merge = () =>{

    //merging two arrays of object based on keys
     let merged = inventory.map(itm => ({
          ...fulfill_inventory.find((item) => (item.title === itm.title) && item),
          ...itm
      }))
      if(merged == '' || merged == undefined){
        console.log("\n======================================\n")
        console.log("Please enter a correct product number")
        console.log("\n======================================")
      }
      else{
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