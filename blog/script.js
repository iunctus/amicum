var posts = ["helloWorld"]

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
		targetElement.innerHTML += request.responseText;
	}
	request.open("GET", url, true);
	request.send();
}

var numOfPosts;
function loadPosts() {
	numOfPosts = posts.length;
	while(numOfPosts--) {
		ahah("posts/" + posts[numOfPosts] + ".html");
	}
}

window.onload = function() {
    document.addEventListener('click', function(evt) {
        if((evt.target.tagName == "A") && (evt.target.innerText == "Read more")) {
            evt.preventDefault();
            evt.target.parentNode.className = "fs";
            evt.target.innerText = "Go back"
        } else if((evt.target.tagName == "A") && (evt.target.innerText == "Go back")) {
            evt.preventDefault();
            evt.target.parentNode.className = "";
            evt.target.innerText = "Read more";
        }
    }, false);
    loadPosts()
}
