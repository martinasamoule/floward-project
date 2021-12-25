// designer-inner page

// get the query string in the URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

let UrlID = params["designer-id"],
    row = document.getElementById("rowItem"),
    bannerImg = document.getElementById("bannerImg"),
    xhr = new XMLHttpRequest();

//ajax
xhr.open("GET", "json/designer.json");
xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        jsObj = JSON.parse(xhr.responseText);
        let desingers = jsObj["designers"];

        for (let desinger in desingers) {

            if (desingers[desinger]["designerId"] == UrlID) {
                let FoundDesingerId = desingers[desinger]
                let Desingerproducts = FoundDesingerId["designerProducts"];
                bannerImg.style.backgroundImage = `url(${FoundDesingerId["designerBannerImg"]})`

                //loop to get desinger products
                for (const Product in Desingerproducts) {
                    let col =
                        `<div class="col-sm-6 col-md-3 mb-4 product">
                        <a href="#" class="text-black-50">
                            <div class="card product-card">
                                <div class="img">
                                    <img src="${Desingerproducts[Product]["image"]}" class="product-img card-img-top rounded-3" alt="${Desingerproducts[Product]["image"]}">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title text-center">${Desingerproducts[Product]["productName"]}</h5>
                                    <p class="card-text text-center">EGP ${Desingerproducts[Product]["productPrice"]}</p>
                                    
                                </div>
                            </div>
                        </a>
                    </div>`
                    console.log(Desingerproducts[Product]);
                    row.innerHTML += col;
                }
            }
        }
    }
})
xhr.send(); 