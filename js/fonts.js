document.body.innerHTML = document.body.innerHTML.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, "$1$3");

var fontsDemo = document.querySelector(".fontsDemo");
var p, p2, fontFamily, output, br, createTextNode, createTextNode2, xmlhttp;

//creating Ajax 
function ajaxCreate() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = font;
    xmlhttp.open("POST", "googleFonts/fontFamily.txt", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}
ajaxCreate();

function font(i = "") {
    //ajax response get
    if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
            processData(xmlhttp.responseText);
        } else {
            console.log("OOPSS! wrong something");
        }
}
}
font();
function processData(data) {
    var res = [];
    var split = data.split(";");
    var len = split.length;
    var regx = /\r\n|\n|r/;
    res = "[";
    for (let i = 0; i < len; i++) {
        if (split[i] !== "") {//if not any blank
            let arr = split[i].replace(regx, "").split(":");
            for (let j = 1; j < arr.length; j++) {
                res += ("{\"" + arr[0] + "\"" + ":" + "\"" + arr[1] + "\"" + "},");
            }
        }
    }
    res = res.substring(0, res.length - 1);
    res += "]";
    //json
    var json = JSON.parse(res);
//    console.log(json[1]["font-family"]);
    for (let k = 0; k < json.length; k++) {
        p = document.createElement("p");
        p2 = document.createElement("p");
        fontFamily = p.classList.add("font-family");
        output = p2.classList.add("output");
        br = document.createElement("br");
        createTextNode = document.createTextNode("font-family:" + json[k]["font-family"]+";");//this for font-family name
        createTextNode2 = document.createTextNode("A Quick Brown Fox, Jumps Over The Lazy Dog.");//this for font-family result
        p.appendChild(createTextNode);
        p2.appendChild(createTextNode2);
        p2.style = "font-family:" + json[k]["font-family"];
        fontsDemo.appendChild(p);
        fontsDemo.appendChild(p2);
        fontsDemo.appendChild(br);
        fontsDemo.appendChild(br);
    }
}
