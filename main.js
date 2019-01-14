/**
 * Created by user on 1/14/2019.
 */
/**
 * Created by user on 12/12/2018.
 */

var xhr = new XMLHttpRequest();

var i = 1; //Start point
var images = [];
// Setup our listener to process completed requests
xhr.onload = function () {
    var myObj , imgContainer = "";
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
        // What do when the request is successful
        myObj = JSON.parse(this.responseText);
        images = myObj;
        for (x in images) {
            var urlForImg = images[x].thumbnailUrl;
            imgContainer += "<span><img onclick='openModal(this.src)' class='sliderImg' src="+ urlForImg +"></span>";
        }
        document.getElementById("slideshow").innerHTML = imgContainer;

    } else {
        // What do when the request fails
        console.log('The request failed!');
    }
};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/photos?_start=0&_limit=10');
xhr.send();

var lastImages = images.length -1;

//Go to next img
function nextImg() {
    if (i < images.length -1){
        i++;
    }else{
        i = 0;
    }
    document.mySlidesModal.src = images[i].thumbnailUrl;
}

//Go to previous img
function prevImg() {
    if(i = i){
        i--;
    }else{
        lastImages = images.length -1;
        i = lastImages--;
    }
    document.mySlidesModal.src = images[i].thumbnailUrl;
}

//Open modal
var modal = document.getElementById('myModal');
var imgModal = document.getElementById('mySlidesModal');

function openModal(src) {
    modal.style.display = 'block';
    imgModal.src = src;
}

//Close modal
function closeModal() {
    modal.style.display = "none";
}

//Touch for mobile
var startX = null;
deltaX = null;

document.getElementById('myModal').addEventListener('touchstart' , function (e) {
    var touch = false;
    console.log(touch , 'touch izvan uslova');
    var touchMoveFn = function (e) {
        if (!touch) {
            deltaX = e.targetTouches[0].pageX - startX;
            if (Math.abs(deltaX)>=140){
                touch = true;
                console.log(touch , 'touch unutar uslova');

                if(deltaX > 0){
                    nextImg();

                }else{
                    prevImg();
                }
            }
            e.preventDefault();
        }

    };
    startX =e.targetTouches[0].pageX;
    this.addEventListener('touchmove' , touchMoveFn, false);

});

//Keyboard commands
document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37:
            //left
            e.preventDefault();
            prevImg();
            break;
        case 39:
            //right
            e.preventDefault();
            nextImg();
            break;
        case 27:
            //right
            e.preventDefault();
            closeModal();
            break;
    }
};
