var posts = ["hello-world"]

function ahah(url) {
	var targetElement = document.body;
       
	var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState != 4) { //not "OK" status
			return;
		}
		if (request.status != 200 && request.status != 304) {
			console.log = "ahah error:\n" + request.statusText;
			return;
		}
		//targetElement.innerHTML += request.responseText;
		document.getElementById(request.responseText.split("<article id=\"")[1].split("\">")[0]).innerHTML=request.responseText
		
	}
	request.open("GET", url, true);
	request.send();
}
var numOfPosts;
function loadPosts() {
	numOfPosts = posts.length;
	while(numOfPosts--) {
		document.body.innerHTML+="<div id=\"" + posts[numOfPosts] + "\"></div>"
		ahah("posts/" + posts[numOfPosts] + ".html");
	}
}
var url;
function checkURL() {
	url = window.location.href.split("?")[1]
	if ((url != undefined) && (posts.indexOf(url) != -1)) {
		console.log(url);
		document.querySelector("article#" + url).className = "fs";
		document.querySelector("article#" + url + " a.readMore").innerText = "Go Back";
		console.log("Expanded Article")
	}
}

window.onload = function() {
    document.addEventListener('click', function(evt) {
        console.log(evt.target.parentNode);
        console.log(evt.target.innerText);
        console.log(evt.target.tagName)
        console.log(evt.target.parentNode.id)
        if((evt.target.tagName == "A") && (evt.target.innerText == "Read more")) {
            evt.preventDefault();
            evt.target.parentNode.className = "fs";
            evt.target.innerText = "Go back"
            history.pushState({}, evt.target.parentNode.id + ".html", window.location.href + "/?" + evt.target.parentNode.id);
        } else if((evt.target.tagName == "A") && (evt.target.innerText == "Go back")) {
            history.pushState({}, "Blog", "http://picoknow.github.io/amicum/blog");
            evt.preventDefault();
            evt.target.parentNode.className = "";
            evt.target.innerText = "Read more";
        }
    }, false);
    loadPosts();
    setTimeout(checkURL,500);
}
