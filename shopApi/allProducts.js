//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';
const Count = require('./count');
require('events').EventEmitter.prototype._maxListeners = 100;

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 4, interval: 1000, bucketSize: 80 }
  });

let arry = [];

AllProducts = (i, letter) => {
    let products = 
        shopify.product
        .list({limit:250, page:i})
        .then((results) => {
            results.forEach(data => {
            if(data.title.startsWith(letter.toUpperCase())){
                object  ={
                    title: data.title,
                    unshipped_amount: data.variants[0]["inventory_quantity"]
                }
                arry.push(object)
            }
            })
            return arry
        })
        .catch((err) =>{
            console.log(err)
        })
    return products
}

const productForLoop = async (letter) => {
    let totalLoops = await Count.product('loop').then((results)=>{return results});
    let totalProducts = await Count.product('total').then((results)=>{return results});
    console.log(totalProducts)
    console.log(totalLoops)

    for(var i=1; i < totalLoops+1; i++){
        let products = await AllProducts(i, letter)
        console.log(i)
        if(i === totalLoops){
            let send = Array.from(arry)
            products.length = 0;
            arry.length = 0;
            return send
        }
    }
}

const start = (letter) => {
    if(typeof arry !== 'undefined'){
        if(arry.length > 1){
            arry.length = 0;
        }
    }
    if(typeof products !== 'undefined'){
        if(products.length > 1){
            arry.length = 0
        }
    }
    return productForLoop(letter)
}

module.exports = {
    all: start
}