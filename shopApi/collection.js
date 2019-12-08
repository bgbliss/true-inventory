//shopify keys
const Shopify = require('shopify-api-node'); //npm shopify api
const dotenv = require('dotenv').config();
const apiKeyshop = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const storeName = 'boardgamebliss.myshopify.com';
//const Count = require('./count');
require('events').EventEmitter.prototype._maxListeners = 100;

const shopify = new Shopify({
    shopName: storeName,
    apiKey: apiKeyshop,
    password: apiSecret,
    autoLimit: { calls: 3, interval: 1500, bucketSize: 80 }
  });

let arry = []

//get the products in the collection
getProductCollection = async (i, collection) => {
    let collectionApi = await
    shopify.product
        .list({limit:250, page:i, collection_id:collection})
        .then((results) => {
            results.forEach(data => {
                //saves the results into an object and pushes needed info into array
                let object = {
                    id: data.id,
                    title: data.title,
                    unshipped_amount: data.variants[0].inventory_quantity 
                }
                arry.push(object)
            });
            return arry
        })
        .catch((err) => {
            console.log(err)
        })
    return collectionApi
}

//APi call to list the collection information
getProductAmount = async (collection) => {
    let results = await
    shopify.smartCollection
        .get(collection)
        .then(async (results) => {
            //save amount of products in the collection into amount
            let amount = results.products_count
            //awaits to get all collections and return it
            let test = await CollectionForLoop(collection, amount)
            return test
        })
        .catch((err) => {
            console.log(err)
        }) 
    //return arrays when finished
    return results
}

const CollectionForLoop = async (collection, amount)=> { 
    //total loops needed to get all products in the collection
    let totalLoops = Math.ceil(amount/250)
    //console.log(totalLoops)
    //loops and gets all products from collection; i = page num of collection
    for(var i=1; i < totalLoops+1; i++){
        let products = await getProductCollection(i, collection)
        //console.log(i)
        //i is equal to total loops return array
        if(i === totalLoops){
            let send = Array.from(arry)
            products.length = 0;
            arry.length = 0;
            return send
        }
    }
}

start = async (collection, letter) =>{
    checkArrays();
    let arry1 = await getProductAmount(collection)
    let arry2 = await getProductAmount(151811260467)
    let arry3 = findLetter(arry2, letter)

    if(arry3.length < 1){
        //console.log(arry1
        return arry1
    }
    else if(letter === "T"){
        //console.log('remove T')
        return removeLetters(arry1, arry2)
    }
    else{
        let newArray = [...arry1, ...arry3]
        // console.log(arry2)
        // console.log(newArray)
        //console.log('newarray')
        return newArray
    }
    //console.log(newArray)
}

checkArrays = () => {
    if(typeof arry1 !== 'undefined' || typeof arry2 !== 'undefined' || typeof newArray !== 'undefined'){
        if(arry1.length > 1 || arry2.length > 1|| newArray > 1){
            arry1.length = 0;
            arry2.length = 0;
            newArray.length = 0;
        }
    }
    if(typeof arry !== 'undefined'){
        if(arry.length > 1){
            arry.length = 0
        }
    }
}

removeLetters = (arry1, arry2) =>{
    //removes all products starting with The in "T" products
    for( var i=arry1.length - 1; i>=0; i--){
        for( var j=0; j<arry2.length; j++){
            //removes objects from array1 that is in arry 2
            if(arry1[i] && (arry1[i].id === arry2[j].id)){
                arry1.splice(i, 1);
            }
        }
    }
    return arry1
}

findLetter = (arry2, letter) => {
    let array = []
    arry2.forEach(element => {
        if(element.title.startsWith("The "+ letter)){
            array.push(element)
        }
    });
    return array
}
// start(150137929779, "A")

module.exports = start
