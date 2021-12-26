var xhr = new XMLHttpRequest();
var counter = 0;
var sum = 0;
var mycanvas = document.getElementsByClassName("offcanvas-col")[0];
var jsobj;
xhr.open("GET", "json/data.json");
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        jsobj = JSON.parse(xhr.response);
        displayData(jsobj);
        deletedata(jsobj);
        console.log(jsobj);
    }
}
 //page items
function displayData(jsobj) {
    for (var i = 0; i < jsobj.length; i++) {
        var row = document.getElementById("myrow");
        var boot =
            `<div class='col-lg-3 col-md-6 col-6 fonts3'>
                    <div class='minimizecol'>
                        <div class='imgdiv'>
                            <img class='newimg' src="json/${jsobj[i].image}" >
                        </div>
                        <p>${jsobj[i].name} </p>
                        <p> EGP ${jsobj[i].price} </p>
                        <button id='${jsobj[i].id}'data-bs-toggle="modal" data-bs-target="#exampleModal" class='addtocart'><i class='fas fa-cart-plus'></i>Add to cart</button>
                    </div>
                </div>`
        row.innerHTML += boot;

        //cart items
        let local = localStorage.getItem("product" + jsobj[i].id)
        if (local == jsobj[i].id) {
            sum += jsobj[i].price;
            var cartitem = `  
                        <div class="col-md-4 col-4 fonts rowcan">
                        <img src="json/${jsobj[i].image}" class="mt-3 ms-0">
                    </div>
                    <div class="col-md-6 col-6 rowcan">
                        <h5>${jsobj[i].name}</h5>
                        <h6 class='mb-4 text-primary'>${jsobj[i].designer}</h6>
                        <h6 >EGP ${jsobj[i].price}</h6>
                    </div>
                    <div class="col-md-2 col-2 rowcan">
                        <i class="fas fa-trash-alt" id="delete${jsobj[i].id}"  data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
                    </div>`
            mycanvas.innerHTML += cartitem;
            document.getElementById("sum").innerHTML = `<h5 class='d-inline-block'>EGP</h5>\t${sum}`;
            document.getElementById("sumvat").innerHTML = `<h5 class='d-inline-block'>EGP</h5>\t${sum*14/100}`;
            document.getElementById("sumtot").innerHTML = `<h5 class='d-inline-block'>EGP</h5>\t${sum+sum*14/100}`;
        }
    }
    //add to local storage
    for (var i = 0; i < jsobj.length; i++) {
        document.getElementById(jsobj[i].id).addEventListener("click", function () {
            localStorage.setItem("product" + this.id, this.id);
            counter = localStorage.length; //counter on cart
            document.getElementById("myspan").innerHTML = counter; //counter on cart
            setTimeout(function (){
                open("flower.html","_self");
                
            },1000);
        })
    }

}

//delete from cart
function deletedata(jsobj) {
    for (let key in jsobj) {
        let local1 = localStorage.getItem("product" + jsobj[key].id)
        if (local1 == jsobj[key].id) {
            var myid = `delete${jsobj[key].id}`
            document.getElementById(myid).addEventListener("click", function () {
                localStorage.removeItem("product" + jsobj[key].id)
                setTimeout(function (){
                    open("flower.html","_self");
                    
                },1000);

            })

        }
    }
}
xhr.send("");


//counter on cart
counter = localStorage.length;
function getcount() {
    if(counter==0){
        mycanvas.innerHTML = `<h3 style = "text-align: center;" class="my-5">sorry! your cart is empty continue shopping now </h3><hr>`;
        document.getElementById("sum").innerHTML = "0"
        document.getElementById("sumvat").innerHTML = "0"
        document.getElementById("sumtot").innerHTML = "0"
    }
    document.getElementById("myspan").innerHTML = counter;
}