//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';
const Count = require('./count');
require('events').EventEmitter.prototype._maxListeners = 100;

// shopify.on('callLimits', (limits) => console.log(limits));
const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 4, interval: 1000, bucketSize: 80 }
  });

let arry = [];

AllOrders = async (i) => {
    let orders = await
        shopify.order
        .list({limit:250, page:i})
        .then((results) => {
            // arry.push(results)
                results.forEach(element => {
                    //for each products ordered, put it into an object and push
                    //to array
                    element.line_items.forEach(data =>{
                        let object = {
                            id: data.product_id,
                            title: data.title,
                            unshipped: data.fulfillable_quantity
                        }
                        arry.push(object);
                    })
                });
            return arry
        })
        .catch((err) => {
            console.log(err)
        }) 
    return orders
}

const OrderforLoop = async _ => {
    //get the total amount of loops needed to get all the orders from shopify
    let totalLoops = await Count.order('loop').then((results)=>{return results});
    //let totalOrders = await Count.order('total').then((results)=>{return results});
    let count = 0
    for(let i=1; i < totalLoops+1; i++){
        count += 1
        //each orders gets loops it pushes the new pages of orders to the array
        let orders = await AllOrders(count)
        console.log(orders.length)
        if(count === totalLoops){
            // deep copy the array from orders
            results = Array.from(orders)
            //empty arry and orders
            arry.length = 0 
            orders.length = 0
            console.log(results.length)
            return results
        }
    }
}

const start = () => {
    if(typeof arry !== 'undefined'){
        if(arry.length > 1){
            arry.length = 0;
        }
    }
    if(typeof orders !== 'undefined'){
        if(orders.length > 1){
            arry.length = 0
        }
    }
    return OrderforLoop()
}

// start();

module.exports = {
    all: start
}