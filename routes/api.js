var express = require('express');
var router = express.Router();
const path = require('path');
var Orders = require('../shopApi/allOrders')
// var Products = require('../shopApi/allProducts')
var singleProduct = require('../shopApi/product')
var Collection = require('../shopApi/collection')
/* GET users listing. */

router.get('/allOrders', function(req, res){
  Orders.all().then((results)=>{
    res.json(results)
  })
})

// router.post('/allProducts', function(req, res){
//   Products.all(req.body.productid).then((results)=> {
//     res.json(results)
//   })
// })

router.post('/collection', function(req, res){
  // console.log(req.body.collection)
  let collectionID = req.body.collection
  let letter = req.body.letter
  Collection(collectionID, letter).then((results)=> {
    res.json(results)
  })
})

router.post('/product', function(req, res){
  singleProduct(req.body.productid).then((results)=> {
    console.log(results)
    res.json(results)
  })
})

router.post('/login', function(req, res, next) {
  let user = req.body.user;
  let pass = req.body.password;

  if(user === "bgb" && pass == "games1221"){
    res.send('/data/windows/relocation/inventory/system')
    }
  else{
    res.send(false)
  }
})

module.exports = router;
