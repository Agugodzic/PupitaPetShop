let svg = document.getElementById("scottie-loader");
let s = Snap(svg);
var eyelid = Snap.select('.eyelid');
var leftEar = Snap.select('.left-ear');
var rightEar = Snap.select('.right-ear');

blink();
twitchRightStart();
//twitchLeftStart();
export class Loadder{
  blink(){
    setTimeout(function () {
      eyelid.animate({ d: "M85.89 68.876l24.72-16.19 17.96 27.423-24.72 16.188z" }, 150, mina.easeinout, endBlink);
    }, 3000);
  }
  endBlink(){
    eyelid.animate({ d: "M85.88 68.878l24.722-16.19 1.802 2.754-24.72 16.19z" }, 150, mina.easeinout, blink);
  }

  twitchRightStart(){
    setTimeout(function () {
      rightEar.animate({ transform: 'r15,66,93' }, 300, mina.easein,  twitchRightEnd );
    }, 2500);
  }

  twitchRightEnd(){
    setTimeout(function () {
      rightEar.animate({ transform: 'r0,66,93' }, 100, mina.elastic,  twitchRightStart );
    }, 50);
  }
  twitchLeftStart(){
    setTimeout(function () {
      leftEar.animate({ transform: 'r-10,71,78' }, 300, mina.easein,  twitchLeftEnd );
    }, 2100);
  }

  twitchLeftEnd(){
    setTimeout(function () {
      leftEar.animate({ transform: 'r0,71,78' }, 200, mina.elastic,  twitchLeftStart );
    }, 50);
  }

}

