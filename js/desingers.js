// designer page
let row = document.getElementById("rowItem"),
    xhr = new XMLHttpRequest();

xhr.open("GET", "json/designer.json");
xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        jsObj = JSON.parse(xhr.responseText);
        let desingers = jsObj["designers"];
        console.log(desingers);
        for (let key in desingers) {
            console.log(desingers[key]);
            var col =
                `  <div class="col-4 col-lg-3 mb-4">
                    <a href="desinger-inner.html?designer-id=${desingers[key]["designerId"]}">
                        <img class="designer-img " src="${desingers[key]["designerImage"]}" alt="">
                        <div class="h6 text-center designer-name">${desingers[key]["designerName"]}</div>
                    </a>
                </div>`
            row.innerHTML += col;


        }
    }
})
xhr.send();