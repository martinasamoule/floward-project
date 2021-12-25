var xhr = new XMLHttpRequest();
        var jsobj;
        xhr.open("GET", "json/data.json");
        xhr.onreadystatechange = function () 
        {
            if (xhr.readyState == 4 && xhr.status == 200) 
            {
                jsobj= JSON.parse(xhr.response);
                displayData(jsobj);
                console.log(jsobj)
            }
        }
        
        function displayData(jsobj) 
        {
            for (var i = 0; i < jsobj.length; i++) 
            {
                if(jsobj[i].clebrate=="Happy Birthday")
                {
                    var row = document.getElementById("myrow");
                    var boot =
                    `<div class='col-lg-3 col-md-6 col-6 fonts3'>
                        <div class='minimizecol'>
                            <div class='imgdiv'>
                                <img class='newimg' src="json/${jsobj[i].image}" >
                            </div>
                            <p>${jsobj[i].name} </p>
                            <p> EGP ${jsobj[i].price} </p>
                           
                        </div>
                    </div>`
                    row.innerHTML += boot;
                }
                
            }  
            for (var i = 0; i < jsobj.length-1; i++) 
            {
                document.getElementById(jsobj[i].id).addEventListener("click",function () {
                   localStorage.setItem("product"+this.id,this.id);
                }) 
            }
  
        }
    xhr.send("");
