
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(140,200,220)
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);

  background1();
  
  let x = 500; //default x coord
  let y = 500; //default y coord
  let petalWidth = 100;
  let stemDrum = map(drum,0,100,15,200); //stem height dictated by drums 
  let stemBass = map(bass,0,100,10,100); //stem height dicatted by bass

  //lotus(x coord,  y coord,  petal Width,  effects petals, effects stem)
  //lilyPad(x coord, y coord, lily width, slit size);
  
  lilyPad(500,800,300,0);
  lilyPad(490,400,80,15);
  lilyPad(950,675,200,0);
  lilyPad(700,700,150,0);
  lilyPad(775,625,80,0);
  lilyPad(300,300,100,0);
  lilyPad(80,300,90,0);
  lilyPad(200,825,190,0);
  lilyPad(950,250,50,0);
  lilyPad(700,350,100,0);
  lilyPad(850,275,100,0);
  lilyPad(650,150,60,0);
  lilyPad(700,160,40,0);

  lotus(350,150,25,vocal,stemBass);
  lotus(150,300,50,vocal,stemDrum);
  lotus(900,250,40,other,stemDrum);
  lotus(550,400,60,other,stemBass);

  lilyPad(230,400,150,0);

  lotus(250,900,130,other,stemDrum);
  lotus(800,650,90,vocal,stemBass);

  lilyPad(125,920,500,30);
  
  push();
  drawingContext.filter = 'blur(10px)';
  lotus(1000,1300,200,other,stemBass);
  pop();
  
  //lotus(1000,1400,150,other,b);


}

function background1(){
  push();
  noStroke();
  let top = drawingContext.createLinearGradient(500,100,500,1000);
  top.addColorStop(0,color(30,50,75)); //top
  top.addColorStop(1,color(170,270,250)); //bottom
  drawingContext.fillStyle = top;
  rect(0,0,2000,2000);
  pop();

  push();
  drawingContext.filter = 'blur(20px)';
  noStroke();
  fill(50,80,100,100); //dark blue
  rect(-50,700,2100,50);
  rect(-50,650,2100,200);
  ellipse(650,1000,600,150);
  ellipse(100,350,500,150);
  ellipse(100,350,500,150);

  fill(100,260,255,100); //light blue
  ellipse(900,450,900,150);

  fill(235,255,235,100); //white
  ellipse(-100,800,1300,200);

  stroke("white");
  strokeWeight(10);
  line(300,225,1100,225);
  line(450,300,1100,300);
  line(600,960,1100,960);
  line(600,570,-100,570);
  line(700,800,1100,800);

  fill(40,40,60); //darker blue
  noStroke();
  rect(0,0,2000,200);
  pop();
}

function lotus(x,y,pw,vocal,stem){
  //false means not reflection
  flower(x,y,pw,vocal,stem,true);
  flower(x,y,pw,vocal,stem,false);
}

let ripple = 1;
function flower(x,y,pw,vocal,stem,reflection){
  let angle = map(vocal,0,100,1,30); //middle petal angle
  let angle2 = map(vocal,10,100,10,30); //back petal angle
  let angle3 = map(vocal,0,100,20,60); //outer petal angle
  let ph = pw*3; //petal height proportional to width
  let petH = map(vocal,0,100,pw*3,pw*2.5);
  let bud = map(vocal,0,100,pw*1.5,pw*4);
  let s = stem*pw*0.015; //stem height
  let stemW = pw/4 //stem width

  
  push();
  //blur depending on y position to create perspective
  if(y <= 500){
    drawingContext.filter = 'blur(3px)'
  } else if (y <= 800){
    drawingContext.filter = 'blur(2px)'
  }

  translate(x,y);

  let c = color(13,42,62,50); //shadow
  let c1 = color(0,130,0); //light green stem
  let c2 = color(0,90,0); //dark green stem
  let c3 = color(250,130,150); //back petal light
  let c4 = color(155,70,80); //back petal dark
  let c5 = color(250,250,0,0); //bud inner
  let c6 = color(250,250,50); //bud outer
  let c7 = color(175,60,70); //middle petal dark
  let c8 = color(250,150,150); //middle petal light
  let c9 = color(255,180,180); //outer petal light
  let c10 = color(175,60,70); //outer petal dark

  if(reflection){
    rotate(180);
    drawingContext.filter = 'blur(8px)'
    c1 = color(0,130,50); //light green stem
    c2 = color(0,90,50); //dark green stem
    c3 = color(185,145,160); //back petal light
    c4 = color(155,110,130); //back petal dark
    c5 = color(200,255,60,0); //bud inner
    c6 = color(200,255,0); //bud outer
    c7 = color(155,110,130); //middle petal dark
    c8 = color(185,145,160); //middle petal light
    c9 = color(180,160,180); //outer petal light
    c10 = color(135,90,110); //outer petal dark
  }

  
  push();
  drawingContext.filter = 'blur(2px)'
  if (ripple <= pw*3){
    noFill();
    strokeWeight(pw/40);
    stroke(220,220,250,255-ripple*0.5);
    ellipse(0,0,ripple,ripple/5);
    ellipse(0,0,ripple/2,ripple/10);
    ripple += 1;
  } else {
    ripple = 1;
  }

  pop();
  

  //shadow
  push();
  noStroke();
  drawingContext.filter = 'blur(20px)';
  fill(c); //dark blue
  ellipse(0,0,pw*2,pw/3);
  ellipse(0,0,pw*3.5,3*pw/4);
  pop();

  //stem
  stroke(0,70,0); //dark green
  let stemColour = drawingContext.createLinearGradient(-s/4,0,0,-4*s/5);
  stemColour.addColorStop(0,c1); //light green
  stemColour.addColorStop(1,c2); //dark green
  drawingContext.fillStyle = stemColour;


  beginShape();
  vertex(-stemW/2,0);
  bezierVertex(-stemW/2,stemW/4,stemW/2,stemW/4,stemW/2,0);
  bezierVertex(stemW/2,-s,stemW/2,0,stemW/2,-s);
  bezierVertex(-stemW/2,-s,stemW/s,-s,-stemW/2,-s);
  bezierVertex(-stemW/2,0,-stemW/2,-s,-stemW/2,0);
  endShape();

  //leaves
  push();
  let leaf = pw/2;
  translate(0,-s);

  push();
  rotate(angle3);
  beginShape();
  vertex(-4*leaf/10,0);
  bezierVertex(-3*leaf/5,3*leaf/10, -3*leaf/5,3*leaf/5, -leaf/10,leaf);
  bezierVertex(-leaf/10,7*leaf/10,  2*leaf/5,leaf/2,  0,0);
  endShape();
  pop();

  push();
  rotate(360-angle3);
  beginShape();
  vertex(4*leaf/10,0);
  bezierVertex(3*leaf/5,3*leaf/10,  3*leaf/5,3*leaf/5, leaf/10,leaf);
  bezierVertex(leaf/10,7*leaf/10,  -2*leaf/5,leaf/2,  0,0);
  endShape();
  pop();

  pop();

  stroke(175,60,70); //petal lining


  //back petals
  let petalColour = drawingContext.createRadialGradient(0,0,250,0,0,100);
  petalColour.addColorStop(0,c3); //outer
  petalColour.addColorStop(1,c4); //inner
  drawingContext.fillStyle = petalColour;

  push();
  translate(0,-s);
  rotate(angle2);
  beginShape();
  vertex(0,0-pw/10);
  bezierVertex(-pw/5,0-pw/10  ,0,0-pw/10, -pw/5,0-pw/10);
  bezierVertex(-pw,0.8*-petH/2-pw/10, -3*pw/5,0.8*-4*petH/5-pw/10 ,0,0.8*-petH-pw/10);
  bezierVertex(3*pw/5,0.8*-4*petH/5-pw/10,  pw,0.8*-petH/2-pw/10,  pw/5,0-pw/10);
  bezierVertex(0,0-pw/10, -pw/5,0-pw/10,  0,0-pw/10);
  endShape();
  pop();

  push();
  translate(0,-s);
  rotate(360-angle2);
  beginShape();
  vertex(0,0-pw/10);
  bezierVertex(-pw/5,0-pw/10  ,0,0-pw/10, -pw/5,0-pw/10);
  bezierVertex(-pw,0.8*-petH/2-pw/10, -3*pw/5,0.8*-4*petH/5-pw/10 ,0,0.8*-petH-pw/10);
  bezierVertex(3*pw/5,0.8*-4*petH/5-pw/10,  pw,0.8*-petH/2-pw/10,  pw/5,0-pw/10);
  bezierVertex(0,0-pw/10, -pw/5,0-pw/10,  0,0-pw/10);
  endShape();
  pop();

  
  //bud
  push();
  drawingContext.filter = 'blur(6px)'
  translate(0,-s);
  noStroke();
  let budG = drawingContext.createRadialGradient(0,-bud*1.25,bud*0.3, 0,-bud*1.25,bud*0.1);
  budG.addColorStop(0,c5); //outer
  budG.addColorStop(1,c6); //inner
  drawingContext.fillStyle = budG;
  circle(0,-bud*1.25,bud*0.7);

  pop();


  //inner outer petals
  push();
  translate(0,-s);
  
  let petalColour2 = drawingContext.createLinearGradient(0,-45,0,-180);
  petalColour2.addColorStop(0,c7); //upper
  petalColour2.addColorStop(1,c8); //lower
  drawingContext.fillStyle = petalColour2;
  
  push();
  rotate(angle2);
  beginShape();
  vertex(0,0);
  bezierVertex(10*pw/9,-ph/3,8*pw/5,-2*ph/3,0,-ph);
  bezierVertex(pw/5,-2*ph/3,pw/5,-2*ph/3,0,0);
  endShape();
  pop();
  
  push();
  rotate(360-angle2);
  beginShape();
  vertex(0,0);
  bezierVertex(-10*pw/9,-ph/3,-8*pw/5,-2*ph/3,0,-ph);
  bezierVertex(-pw/5,-2*ph/3,-pw/5,-2*ph/3,0,0);
  endShape();
  pop();
  pop();


  //outer petals
  push();
  translate(0,-s);

  let petalColour3 = drawingContext.createRadialGradient(0,0,225,0,0,10);
  petalColour3.addColorStop(0,c9); //outer
  petalColour3.addColorStop(1,c10); //inner
  drawingContext.fillStyle = petalColour3;

  push();
  rotate(angle3);
  beginShape();
  vertex(0,0);
  bezierVertex(10*pw/9,-ph/3,8*pw/5,-2*ph/3,0,-ph);
  bezierVertex(pw/5,-2*ph/3,pw/5,-2*ph/3,0,0);
  endShape();
  pop();

  push();
  rotate(360-angle3);
  beginShape();
  vertex(0,0);
  bezierVertex(-10*pw/9,-ph/3,-8*pw/5,-2*ph/3,0,-ph);
  bezierVertex(-pw/5,-2*ph/3,-pw/5,-2*ph/3,0,0);
  endShape();
  pop();

  //front petal
  beginShape();
  vertex(0,0);
  bezierVertex(-pw/5,0,0,0,-pw/5,0);
  bezierVertex(-pw,-petH/2,-3*pw/5,-4*petH/5,0,-petH);
  bezierVertex(3*pw/5,-4*petH/5,pw,-petH/2,pw/5,0);
  bezierVertex(0,0,-pw/5,0,0,0);
  endShape();

  pop();

  pop();
}

function lilyPad(x,y,w,s){
  push();
  push();
  //blur depending on y position to create perspective
  if(y <= 500){
    drawingContext.filter = 'blur(2px)'
  } else if (y <= 800){
    drawingContext.filter = 'blur(1px)'
  }
  fill(0,130,0);

  let lily = drawingContext.createLinearGradient(0,200,0,1000);
  lily.addColorStop(0,color(0,50,0)); //dark green
  lily.addColorStop(1,color(0,120,0)); //light green
  drawingContext.fillStyle = lily;

  h = map(y,1000,0,w/4,w/10) //lily height

  if(s == 0){
    ellipse(x,y,w,h);
  }

  arc(x,y,w,h,0,-s);
  pop();
  
}