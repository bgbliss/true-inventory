var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
const singleProducts = require('../shopApi/product')
const Collections = require('../shopApi/collection')
const AllOrders = require('../shopApi/allOrders')
const MergeOrders = require('./newArray')

const Nightmare = require('nightmare')
const nightmare = Nightmare({ openDevTools: {mode: 'detach'}, show: true, waitTimeout: 100000 })

let results = []
let allorders = []
let query = 218509437
let broswerTest = []
let collection = []

describe('product.js', function(){
    this.timeout(1000);
    it('should return a single array containing an object', async () =>{
        const product = await singleProducts(query)
        results.push(product[0])
            results[0].should.be.an('object')
    })

    it('object id should match with query', function(){
        expect(results[0].id).to.equal(query)
    })
})
// describe('collections.js')
describe('collection.js', function(){
    this.timeout(25000);
    it('should return an array of objects', async function(){
        this.timeout(25000)
        collection = await Collections(150137929779, 'A')
        expect(collection).to.be.an('array') &&
        expect(collection[0]).should.be.an('object')
    })
})

describe('allOrders.js', function(){
    this.timeout(25000);
    it('should return an array', async function(){
        this.timeout(25000)
        let orders = await AllOrders.all()
        allorders = MergeOrders(orders, collection)
        expect(allorders).to.be.an('array') &&
        expect(allorders).should.be.an('object')
    })
})

describe('csv file', function(){
    it('should return true if the array matches the one displayed on the broswer', function(){
    nightmare
        .on('console', (log, msg) => {
        broswerTest = msg
        })
        .goto('http://localhost:3000/data/windows/relocation/inventory/system#')
        .click('.symbol-search')
        .type('#symbolID', 'a')
        .click('#submit')
        .wait('div.testForInfo')
        .end()
        .then(()=> {
            expect(broswerTest).to.eql(allorders)
        })
        .catch(function(error){
        console.log(error)
        })
    })
})

