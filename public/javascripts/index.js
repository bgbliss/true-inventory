$(document).ready(function(){

    var inputarr = [];
    $(".main-background").hide()
    $(".clear-btn").hide()
    $("#submit").on("click", function(event){
        event.preventDefault();

    checkform = () => {
        var vaild = true;
        $(".form-control").each(function() {
            if ($(this).val() === ""){
                vaild = false;
            }
            if ($(this).val().match(/[a-z]/i)){
                vaild = false;
                $(".alert-box").empty();
                $(".alert-box").addClass("text-danger font-weight-bold");
                $(".alert-box").append(`<h5>${$(this).val()} is not a productID</h5>`);
            }
        })
        return vaild;
    }

    if(checkform()) {
        $(".alert-box").empty();
        let id = $("#productID").val().trim()
        var userInput = {
            productid: id
        }

        if(!inputarr.includes(id)){
            inputarr.push(id)
            console.log(inputarr)
            $.post("/api/test", userInput, (data)=> {
                let values = (Object.values(data[0])).reverse()

                for(i=0; i < values.length; i++){
                    let div = $("<div class = 'col-4 item'>");
                    let results = values[i];
                    let p = $("<p>").text(results);
                    div.prepend(p)

                    $(".main-content").prepend(div)
                    $(".main-background").show()   
                    $(".clear-btn").show()
                }
            })
        }
    }
    })

    $("#clear").on("click", function(event){
        event.preventDefault();

        inputarr = [];
        $(".main-content").empty();
        $(".main-background").hide()
        $(".clear-btn").hide()
    })
});