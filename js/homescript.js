var javaobj = [];
var counter = 0;
var sum = 0;
var mycanvas = document.getElementsByClassName("offcanvas-col")[0];
var mydiv = document.getElementById("rowitem");
var xhr = new XMLHttpRequest();
xhr.open("GET", "json/data.json");
xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        javaobj = JSON.parse(xhr.responseText);
        console.log(javaobj);
        getdata(javaobj);
        deletedata(javaobj);
        addtolocal(javaobj);
    }
});

function getdata(javaobj) {
    for (let key in javaobj) {
        //arrangment items
        if (javaobj[key].id < 13) {
            var arrangment =
                `<div class='col-lg-3 col-md-6 col-6 fonts3'>
                        <div class='minimizecol'>
                        <div class='imgdiv'>
                            <img class='newimg' src="json/${javaobj[key].image}">
                        </div>
                        <p>${javaobj[key].name} </p>
                        <p>EGP ${javaobj[key].price} </p>
                        <button class='addtocart' id=${javaobj[key].id} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class='fas fa-cart-plus'></i>Add to cart</button>
                        </div>
                    </div>`
            mydiv.innerHTML += arrangment;
        }

        //cart items
        let local = localStorage.getItem("product" + javaobj[key].id)
        if (local == javaobj[key].id) {
            sum += javaobj[key].price;
            var cartitem = `  
                        <div class="col-md-4 col-4 fonts rowcan">
                        <img src="json/${javaobj[key].image}" class="mt-3">
                    </div>
                    <div class="col-md-6 col-6 rowcan">
                        <h5>${javaobj[key].name}</h5>
                        <h6 class='mb-4 text-primary'>${javaobj[key].designer}</h6>
                        <h6 >EGP ${javaobj[key].price}</h6>
                    </div>
                    <div class="col-md-2 col-2 rowcan">
                        <i class="fas fa-trash-alt" id="delete${javaobj[key].id}"  data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
                    </div>`
            mycanvas.innerHTML += cartitem;
            document.getElementById("sum").innerHTML = `<h5 class='d-inline-block'>EGP</h5>\t${sum}`;
            document.getElementById("sumvat").innerHTML = `<h5 class='d-inline-block'>EGP</h5>\t${sum*14/100}`;
            document.getElementById("sumtot").innerHTML = `<h5 class='d-inline-block'>EGP</h5>\t${sum+sum*14/100}`;
        }
    }
}




//delete from cart
function deletedata(javaobj) {
    for (let key in javaobj) {
        let local1 = localStorage.getItem("product" + javaobj[key].id)
        if (local1 == javaobj[key].id) {
            var myid = `delete${javaobj[key].id}`
            document.getElementById(myid).addEventListener("click", function () {
                localStorage.removeItem("product" + javaobj[key].id)

            })

        }
    }
}

//add to localstorage
function addtolocal(javaobj) {
    for (let key in javaobj) {
        var add = javaobj[key].id;
        document.getElementById(add).addEventListener("click", function () {
            localStorage.setItem("product" + this.id, this.id);
            counter = localStorage.length; //counter on cart
            document.getElementById("myspan").innerHTML = counter; //counter on cart
        })
    }
}


xhr.send();


//counter on cart
counter = localStorage.length;
function getcount() {
    if(counter==0){
        mycanvas.innerHTML = `<h3 class="m-5">your Cart is empty</h3><hr>`;
        document.getElementById("sum").innerHTML = "0"
        document.getElementById("sumvat").innerHTML = "0"
        document.getElementById("sumtot").innerHTML = "0"
    }
    document.getElementById("myspan").innerHTML = counter;
}