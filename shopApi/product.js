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

singleProduct = async (query)=>{
    if(typeof arry !== "undefined"){
        arry.length = 0
    }
    let product = await
        shopify.product
        .list({ids: query})
        .then((data) => {
            data.forEach(element => {
                let object = {
                    id: element.id,
                    title: element.title,
                    unshipped_amount: element.variants[0]["inventory_quantity"]
                }
                arry.push(object)
            });
            return arry
        })
    return product
}
// singleProduct(1439320997939)
module.exports = singleProduct