svg = document.getElementById("scottie-loader");
    s = Snap(svg);
var eyelid = Snap.select('.eyelid');
var leftEar = Snap.select('.left-ear');
var rightEar = Snap.select('.right-ear');
blink();
twitchRightStart();
//twitchLeftStart();
function blink(){
  setTimeout(function () {
    eyelid.animate({ d: "M85.89 68.876l24.72-16.19 17.96 27.423-24.72 16.188z" }, 150, mina.easeinout, endBlink);
  }, 3000);
}
function endBlink(){
  eyelid.animate({ d: "M85.88 68.878l24.722-16.19 1.802 2.754-24.72 16.19z" }, 150, mina.easeinout, blink);
}

function twitchRightStart(){
  setTimeout(function () {
    rightEar.animate({ transform: 'r15,66,93' }, 300, mina.easein,  twitchRightEnd );
  }, 2500);
}

function twitchRightEnd(){
  setTimeout(function () {
    rightEar.animate({ transform: 'r0,66,93' }, 100, mina.elastic,  twitchRightStart );
  }, 50);
}
function twitchLeftStart(){
  setTimeout(function () {
    leftEar.animate({ transform: 'r-10,71,78' }, 300, mina.easein,  twitchLeftEnd );
  }, 2100);
}

function twitchLeftEnd(){
  setTimeout(function () {
    leftEar.animate({ transform: 'r0,71,78' }, 200, mina.elastic,  twitchLeftStart );
  }, 50);
}
