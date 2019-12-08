$(document).ready(function(){
    var objCondition = [];
    var allProducts = [];
    var unshipped_amount = []
    var singleProduct = [];
    var repeatNames = [];
    var fullOrders = [];
    var allOrders = [];
    var repeat_product_id = [];
    var inventory_onShelf = []
    var unshipped_products = [];
    //arr to store csv format 
    var csv = []

    //collection for for products; products ordered alphabetically 
    let collection = {
        "A": 150137929779,
        "B": 12597568,
        "C": 12597588,
        "D": 12601636,
        "E": 12601646,
        "F": 12601654,
        "G": 12601656,
        "H": 12601660,
        "I": 12601670,
        "J": 152442667059,
        "K": 12601686,
        "L": 12601688,
        "M": 12601700,
        "N": 12601702,
        "O": 12601710,
        "P": 12601716,
        "Q": 12601722,
        "R": 12601726,
        "S": 12601734,
        "T": 12601750,
        "U": 12601756,
        "V": 12601760,
        "W": 12601764,
        "X": 12601770,
        "Y": 12601778,
        "Z": 12601784,
        "numbers": 153352470579,
        "symbols": 153352306739
      }
    //arr to store inputed fields; not getting repeat products 
    var inputArr = [];

    // hide content when nothing theres display
    hiding = () =>{
        //clears inputed values when clearing page
        inputArr = [];
        //clears csv file when clearing page
        csv = [];
        $(".loader").hide()
        $(".main-content").empty();
        $(".main-background").hide()
        $(".clear-btn").hide()
        $(".download-btn").hide()
        $(".alert-box").empty();
        //clear input field
        $('.placeholder').val('')
    }

    hiding()
    //changes the input fields id depending on which tab clicked
    //changes the id of input field to search for productID
    $(".product-search").on("click", function(event){
        hiding()
        $("#symbolID").attr("id", "productID")
        $(".placeholder").attr('placeholder','ProductID ex: 3847188349006');
        $(".page-title").text("Products")
    })
    //changes the id of input field to search for symbols
    $(".symbol-search").on("click", function(event){
        hiding()
        $("#productID").attr("id", "symbolID");
        $(".placeholder").attr('placeholder','Symbol or letter ex: A-Z !@#$%^*()');
        $(".page-title").text("Symbols")
    })
    //main function
    $("#submit").on("click", function(event){
        event.preventDefault();

    //checks if form is empty or invaild
    checkform = () => {
        var vaild = '';
        $(".form-control").each(function() {
            //checks if the form id = productID
            if($(".placeholder:first").is("#productID")){
                vaild = 'product'
                //makes sure that value entered is not a letter
                if ($(this).val().match(/[a-z]/i)){
                    //if its a letter form is false and displays alert
                    vaild = false;
                    $(".alert-box").empty();
                    $(".alert-box").addClass("text-danger font-weight-bold");
                    $(".alert-box").append(`<h5>${$(this).val()} is not a productID</h5>`);
                }
            }
            else{
                vaild = 'symbol'
                //checks if input is only length of 1
                if ($(this).val().length > 1){
                    vaild = false;
                    $(".alert-box").empty();
                    $(".alert-box").addClass("text-danger font-weight-bold");
                    $(".alert-box").append(`<h5>${$(this).val()} Enter 1 symbol or letter </h5>`);
                }
            }
            //if no value do not search
            if ($(this).val() === ""){
                vaild = false;
            }
        })
        return vaild;
    }

    //checks if form is true
    if(checkform()) {
        var id = '';
        if(checkform() === 'symbol'){
            id = $("#symbolID").val().trim()
        }
        else if(checkform() === 'product'){
            id = $("#productID").val().trim()
        }
        //product id value depends on value of checkform()

        $(".alert-box").empty();

        //hide the main content if its symbol search
        if($(".main-content".display !== "none") && checkform() === 'symbol'){
            $(".main-content").empty();
            $(".main-background").hide()
            $(".clear-btn").hide()
            $(".download-btn").hide()
        }
        
        if($(".main-content".display === "none")){
            $(".loader").show()
        }
        
        //if input field already entered do not enter again
        if(!inputArr.includes(id)){
             //pushes vaild fields into inputArr
            inputArr.push(id)
            //if all orders is not organized then api call.
            //console.log(collection)
            if(unshipped_products.length < 1){
                $.get('/api/allOrders', (data)=>{
                    getAllOrders(data, id)
                })
            }
            else{
                getProducts(id)
            }
        }

        getAllOrders = (data, id) =>{
            // repeatNames = []
            unshipped_products = []
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
            // allOrders = unshipped_products;
            // console.log(unshipped_products)
            getProducts(id)
        }

        getProducts = (id) => {
            let userInput = {
                productid: id
            }
            if(id.length === 1){
                let symbol = "!@#$%^&*()_+<>?/*-+{}|"
                let collectionID = ""
                if(Number.isInteger(id)){
                    collectionID = collection.numbers
                }else if(symbol.includes(id)){
                    collectionID = collection.symbols
                }
                else{
                    collectionID = id.toUpperCase()
                }
                let userInput = {
                    collection: collection[collectionID],
                    letter: collectionID
                }
                $.post('/api/collection', userInput, (results) => {
                    // allProducts = results
                    //console.log(results)
                    product_cal(results, id);
                })
            }
            else{
                $.post('/api/product', userInput, (results)=> {
                    product_cal(results, id);
                })
            }
        }

        product_cal = (product, id) =>{
            inventory_onShelf = [];
            product.forEach(data => {
                // console.log(data)
                unshipped_products.forEach(inv => {
                    if(parseInt(inv.id) === parseInt(data.id)){
                        //taking a products total inventory and
                        //adding total unfulfilled product amount
                        let onShelf = data.unshipped_amount + inv.unshipped
                        let object = {
                            id: data.id,
                            title: inv.title,
                            onShelf: onShelf
                        }
                        inventory_onShelf.push(object)
                    }
                })
            // if all-orders doesn't include product just push product into array
                let contains = contians_Obj(inventory_onShelf, data.id)
                if(!contains){
                    let object = {
                            id: data.id,
                            title: data.title,
                            unshipped_products: 0,
                            onShelf: data.unshipped_amount
                    }
                    inventory_onShelf.push(object)
                }
            })
            // console.log(inventory_onShelf)
            merge(id);
        }
        
        //if array contains id return true
        contians_Obj = (a, id) =>{
            var i = a.length;
            while (i--) {
               if (a[i].id === id) {
                   return true;
               }
            }
            return false;
        }

        merge = (id) => {
            //empty merged so no duplicate arrays when retured to server 
            allOrders.length = 0
            if(id.length > 1){
                unshipped_products.forEach(element =>{
                    if(parseInt(element.id) === parseInt(id)){
                        allOrders.push(element)
                    }
                })
            }else{
                unshipped_products.forEach(element => {
                    if(element.title.startsWith(id.toUpperCase())){
                        allOrders.push(element)
                    }
                    else if(element.title.startsWith("The " + id.toUpperCase())){
                        allOrders.push(element)
                    }
                });
            }

            // console.log(inventory_onShelf)
            //console.log(allOrders)
            let merged = []
            //merging two arrays of object based on keys
            merged = inventory_onShelf.map(itm => ({
                ...allOrders.find((item) => (item.id === itm.id) && item),
                ...itm
            }))
            allOrders = []
            if(merged == '' || merged == undefined){
                // console.log('error')
            }
            else{
                //returns to current inventory()
                console.log(merged)
                display(merged);
            }
        }

        display = (data) =>{
            // console.log(data)
            if(checkform() === 'product' && data.length === 1){
                let values = (Object.values(data[0])).reverse()
                displayValues(values)
                //converts returned data from api call to csv format
                csv = arrayToCSV(data)
            }
            else{
                let values = []
                //loops though data and object values 
                // console.log(data)
                for(i=0; i<data.length; i ++){
                    values = (Object.values(data[i])).reverse()
                    displayValues(values)
                    //converts returned data from api call to csv format
                    csv = arrayToCSV(data)
                }
            }
        }

        //function to convert values to csv format
        function arrayToCSV(objArray) {
            const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
       
            return array.reduce((str, next) => {
                str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
                return str;
               }, str);
        }

        displayValues = (values) =>{
            values.pop()
            //loops though object values and appends them on page
            for(j=0; j < values.length; j++){
                let div = $("<div class = 'col-4 item'>");
                let results = values[j];
                let p = $("<p>").text(results);
                div.prepend(p)
                $(".loader").hide();
                $(".main-content").prepend(div)
                $(".main-content").addClass("testForInfo");
                $(".main-background").show()   
                $(".clear-btn").show()
                if(checkform() === 'symbol'){
                    $(".download-btn").show()
                }
            }
        }
    }
    })

    //click to download csv file
    $('#download').on("click", function(event){
        event.preventDefault();

        var blob = new Blob([csv]);
        if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
            window.navigator.msSaveBlob(blob, "filename.csv");
        else
            {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
            a.download = "filename.csv";
            document.body.appendChild(a);
            a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a);
            }
    })

    $("#clear").on("click", function(event){
        event.preventDefault();
        hiding();
    })

    $("#refresh").on("click", function(event){
        event.preventDefault();
        hiding();
        allProducts.empty();
        unshipped_products.length = 0;
    })
});