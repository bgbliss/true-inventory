# true-inventory

An inventory system for shopify.

On the webpage:

    For product search enter in product_id 
    example: 1658546421811
    
    For symbol search enter a letter/number or sysmbol
    example: 0
    example: A
    example: @

AllOrders.js: 
    Grabs all the orders

Collection.js:
    
    start[CollectionID, Letter/symbol]
    
    example:
            start(150137929779, "A")

single product.js:
    returns a single products inventory.

Test:
    Is done by mocha, chai and nightmare
    to run test in the terminal:

    mocha test
