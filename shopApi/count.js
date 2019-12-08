//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret
  });

    //returns the amount of products and total amount of loops needed to do so
    async function product(param){
        let x = await
        shopify.product.count([])
        .then((results)=>{
            if(param === "loop"){
                return Math.ceil(results/250)
            }
            else if(param === "total"){
                return results
            }
        })
        return x
    }
    
    //returns the amount of orders and total amount of loops needed to do so
    async function order(param) {
        let x = await
        shopify.order.count([])
        .then((results)=> {
            if(param === "loop"){
                return Math.ceil(results/250)
            }
            else if(param === "total"){
                return results
            }
        })
        return x
    }

module.exports = {
    product: product,
    order: order
}