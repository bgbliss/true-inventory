let unshipped_products = [];
let repeat_product_id = [];
let inventory_onShelf = [];

getAllOrders = (data, collection) =>{

    repeat_product_id = []
    data.forEach(element => {
        if(repeat_product_id.includes(element.id)){
            unshipped_products.forEach(data => {
                if(data.id === element.id){
                    data.unshipped += element.unshipped;
                }
            });
        }
        else{
            unshipped_products.push(element)
            repeat_product_id.push(element.id)
        }
    });

    return product_cal(collection);
}

product_cal = (product) =>{
    product.forEach(data => {
        // console.log(data)
        unshipped_products.forEach(inv => {
            if(parseInt(inv.id) === parseInt(data.id)){
                //taking a products total inventory and
                //adding total unfulfilled product amount
                let onShelf = data.unshipped_amount + inv.unshipped
                let object = {
                    id: data.id,
                    onShelf: onShelf,
                    title: inv.title,
                }
                inventory_onShelf.push(object)
            }
        })
    // if all-orders doesn't include product just push product into array
        let contains = contians_Obj(inventory_onShelf, data.id)
        if(!contains){
            let object = {
                    id: data.id,
                    onShelf: data.unshipped_amount,
                    title: data.title,
                    unshipped_products: 0,
            }
            inventory_onShelf.push(object)
        }
    })
    return merge();
}

contians_Obj = (a, id) =>{
    var i = a.length;
    while (i--) {
       if (a[i].id === id) {
           return true;
       }
    }
    return false;
}

merge = () =>{
    let merged = []
    //merging two arrays of object based on keys
    merged = inventory_onShelf.map(itm => ({
        ...unshipped_products.find((item) => (item.id === itm.id) && item),
        ...itm
    }))
    
    return merged
}


module.exports = getAllOrders;