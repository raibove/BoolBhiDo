'use strict';
let stars = [], elStroke, zoom = 1, halfW, halfH, back = false,temp = 1;
let flag=0;
let database;


// Targets all textareas with class "txta"
let textareas = document.querySelectorAll('.texta'),
    hiddenDiv = document.createElement('div'),
    content = null;

// Adds a class to all textareas
for (let j of textareas) {
  j.classList.add('txtstuff');
}

// Build the hidden div's attributes

// The line below is needed if you move the style lines to CSS
// hiddenDiv.classList.add('hiddendiv');

// Add the "txta" styles, which are common to both textarea and hiddendiv
// If you want, you can remove those from CSS and add them via JS
hiddenDiv.classList.add('txta');

// Add the styles for the hidden div
// These can be in the CSS, just remove these three lines and uncomment the CSS
hiddenDiv.style.display = 'none';
hiddenDiv.style.whiteSpace = 'pre-wrap';
hiddenDiv.style.wordWrap = 'break-word';

// Loop through all the textareas and add the event listener
for(let i of textareas) {
  (function(i) {
    // Note: Use 'keyup' instead of 'input'
    // if you want older IE support
    i.addEventListener('input', function() {
      
      // Append hiddendiv to parent of textarea, so the size is correct
      i.parentNode.appendChild(hiddenDiv);
      
      // Remove this if you want the user to be able to resize it in modern browsers
      i.style.resize = 'none';
      
      // This removes scrollbars
      i.style.overflow = 'hidden';

      // Every input/change, grab the content
      content = i.value;

      // Add the same content to the hidden div
      
      // This is for old IE
      content = content.replace(/\n/g, '<br>');
      
      // The <br ..> part is for old IE
      // This also fixes the jumpy way the textarea grows if line-height isn't included
      hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';

      // Briefly make the hidden div block but invisible
      // This is in order to read the height
      hiddenDiv.style.visibility = 'hidden';
      hiddenDiv.style.display = 'block';
      i.style.height = hiddenDiv.offsetHeight + 'px';

      // Make the hidden div display:none again
      hiddenDiv.style.visibility = 'visible';
      hiddenDiv.style.display = 'none';
    });
  })(i);
}


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  fill('#fff');
  strokeWeight(5);
  for(let i = 0; i < 200; i++) {
    stars.push({
      pos: [floor(random(-width / 2, width / 2)), floor(random(-width / 2, width / 2))],
      size: random(5),
      color: color(`hsl(${floor(random(200, 300))}, 100%, 90%)`)
    });
  }
  halfW = width / 2;
  halfH = height / 2;
    
      var firebaseConfig = {
    apiKey: "AIzaSyBPg-GIssXVYKtMc3QQvaKOSoKMLmy2a-M",
    authDomain: "boolbhido.firebaseapp.com",
    databaseURL: "https://boolbhido.firebaseio.com",
    projectId: "boolbhido",
    storageBucket: "boolbhido.appspot.com",
    messagingSenderId: "91218524314",
    appId: "1:91218524314:web:78f753cc4b14a6c431c723",
    measurementId: "G-VW2L2HJBPZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  database = firebase.database();
 }

function draw() {
  //clean canvas
  translate(halfW, halfH);
  background('rgba(0,0,0,0.2)');
  star();
  if(flag==0){
  blackholeAni();
  }
  else{
  resetHole();
  }
  
}

function star(){
   let i = 0;
  rotate(temp / 3);
  for(; i < stars.length; i++) {
    strokeWeight(stars[i].size);
    stroke(stars[i].color);
    point(stars[i].pos[0],stars[i].pos[1]);
  }
  temp += 0.02;
}

function blackholeAni(){
    //draw blockhole
   strokeWeight(0);
   fill('#fff');
   ellipse(0, 0, 250, 250);
}

function resetHole(){
  document.getElementById("send").className = "close";         document.getElementById("input").className = "close";
  scale(zoom);
  ellipse(0,0,250,250);
   zoom -= 0.02;
   if(zoom < -1) {
    flag=0;
    zoom=1;
    document.getElementById("input").value = ""; 
    document.getElementById("send").className = "open";           document.getElementById("input").className = "open";
  }
}

function releaseText(){
    let data = document.getElementById("input").value;
    var ref = database.ref('datas');
    ref.push(data);
    flag=1;
}
