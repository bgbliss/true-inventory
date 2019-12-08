$(document).ready(function(){

    $("#submit").on("click", (event) => {
        event.preventDefault();
        checkform = () =>{
            var vaild = true;
            $(".form-control").each(function() {
                if ($(this).val() === ""){
                    vaild = false;
                }
            })
            return vaild;
        }

        if(checkform()){
            let username = $("#username").val().trim();
            let password = $("#password").val().trim();
            var userinput = {
                user: username,
                password: password
            }
            $.post("/api/login", userinput, (data)=> {
                window.location.href = data
            })
        }
    })
})