
// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  rectMode(CENTER)

  coolBackground();
 
  let stemDrum = map(drum,0,100,15,200); //stem height affected by drums
  let stemBass = map(bass,0,100,10,100); //stem height affected by bass

  //lotus(x coord,  y coord,  petal Width,  effects petals, effects stem)
  //lilyPad(x coord, y coord, lily width, slit size);

  lilyPad(490,400,80,15,other);
  lilyPad(950,675,200,0,other);
  lilyPad(700,700,150,0,other);
  lilyPad(775,625,80,0,other);
  lilyPad(300,300,100,0,other);
  lilyPad(80,300,90,0,other);
  lilyPad(200,825,190,0,other);
  lilyPad(950,250,50,0,other);
  lilyPad(700,350,100,0,other);
  lilyPad(850,275,100,0,other);
  lilyPad(650,150,60,0,other);
  lilyPad(700,160,40,0,other);

  lotus(350,150,25,vocal,stemBass);
  lotus(150,300,50,vocal,stemDrum);
  lotus(900,250,40,vocal,stemDrum);
  lotus(550,400,60,vocal,stemBass);

  lilyPad(500,800,300,0,other);
  lilyPad(230,400,150,0,other);
  lilyPad(125,920,500,30,other);

  lotus(250,900,130,vocal,stemDrum);
  lotus(800,650,90,vocal,stemBass);

  extra(125,920,500,180,other); //for the lilypad where a flower reflection overlaps
 
  lotus(1000,1300,200,vocal,stemBass); //big blurry lotus

  light(); //light beams
 
}

function coolBackground(){
  //base colour
  push();
  noStroke();
  //gradient
  let top = drawingContext.createLinearGradient(500,100,500,1000);
  top.addColorStop(0,color(30,50,75)); //top
  top.addColorStop(1,color(170,270,250)); //bottom
  drawingContext.fillStyle = top;
  rect(0,0,2000,2000); //actual shape
  pop();

  //blurred shapes
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
  fill(235,255,235,100); //white-ish
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
  flower(x,y,pw,vocal,stem,true); //true = reflection
  flower(x,y,pw,vocal,stem,false); //false = flower
}

function flower(x,y,pw,vocal,stem,reflection){
  let angle = map(vocal,0,100,1,30); //middle petal angle
  let angle2 = map(vocal,10,100,10,30); //back petal angle
  let angle3 = map(vocal,0,100,20,60); //outer petal angle
  let ph = pw*3; //petal height proportional to width
  let petH = map(vocal,0,100,pw*3,pw*2.5); //centre petal height
  let bud = map(vocal,0,100,pw*1.5,pw*4); //bud y coord and size
  let s = stem*pw*0.015; //stem height
  let stemW = pw/4 //stem width

  push();
  //blur depending on y position to create perspective
  if(y <= 500){
    drawingContext.filter = 'blur(3px)'
  } else if (y <= 800){
    drawingContext.filter = 'blur(2px)'
  } else if (y >= 1000){
    drawingContext.filter = 'blur(10px)';
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

  //reflection colours
  if(reflection){
    rotate(180);
    drawingContext.filter = 'blur(8px)'
    c1 = color(0,130,50); //light green stem
    c2 = color(0,90,50); //dark green stem
    c3 = color(185,145,160); //back petal light
    c4 = color(155,110,130); //back petal dark
    c5 = color(200,255,60,0); //bud inner
    c6 = color(200,255,0); //bud outer
    c7 = color(135,90,110); //middle petal dark
    c8 = color(185,145,160); //middle petal light
    c9 = color(180,160,180); //outer petal light
    c10 = color(135,90,110); //outer petal dark
  }

  //shadow
  push();
  noStroke();
  drawingContext.filter = 'blur(20px)';
  fill(c); //dark blue
  ellipse(0,0,pw*3.5,pw*0.75);
  pop();

  //stem
  stroke(0,70,0); //dark green 
  //gradient
  let stemColour = drawingContext.createLinearGradient(-s*0.25,0,0,-s*0.8);
  stemColour.addColorStop(0,c1); //light green
  stemColour.addColorStop(1,c2); //dark green
  drawingContext.fillStyle = stemColour;

  //stem shape
  beginShape();
  vertex(-stemW/2,0);
  bezierVertex(-stemW/2,stemW/4,  stemW/2,stemW/4,  stemW/2,0);
  bezierVertex(stemW/2,-s,  stemW/2,0,  stemW/2,-s);
  bezierVertex(-stemW/2,-s, stemW/s,-s, -stemW/2,-s);
  bezierVertex(-stemW/2,0,  -stemW/2,-s,  -stemW/2,0);
  endShape();

  push();
  translate(0,-s);

  //leaves
  push();
  let leaf = pw/2;

  //left leaf
  push();
  rotate(angle3);
  beginShape();
  vertex(-4*leaf/10,0);
  bezierVertex(-3*leaf/5,3*leaf/10, -3*leaf/5,3*leaf/5, -leaf/10,leaf);
  bezierVertex(-leaf/10,7*leaf/10,  2*leaf/5,leaf/2,  0,0);
  endShape();
  pop();

  //right leaf
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
  //gradient
  let petalColour = drawingContext.createRadialGradient(0,0,250,0,0,100);
  petalColour.addColorStop(0,c3); //outer
  petalColour.addColorStop(1,c4); //inner
  drawingContext.fillStyle = petalColour;

  //right back petal
  push();
  rotate(angle2);
  beginShape();
  vertex(0,-pw/10);
  bezierVertex(-pw/5,-pw/10,   0,-pw/10,  -pw/5,-pw/10);
  bezierVertex(-pw,-2*petH/5-pw/10,  -3*pw/5,-16*petH/25-pw/10,   0,-4*petH/5-pw/10);
  bezierVertex(3*pw/5,-16*petH/25-pw/10,    pw,-2*petH/5-pw/10,    pw/5,-pw/10);
  bezierVertex(0,-pw/10,   -pw/5,-pw/10,    0,-pw/10);
  endShape();
  pop();

  //left back petal
  push();
  rotate(360-angle2);
  beginShape();
  vertex(0,-pw/10);
  bezierVertex(-pw/5,-pw/10,   0,-pw/10,  -pw/5,-pw/10);
  bezierVertex(-pw,-2*petH/5-pw/10,   -3*pw/5,-16*petH/25-pw/10,  0,-4*petH/5-pw/10);
  bezierVertex(3*pw/5,-16*petH/25-pw/10,   pw,-2*petH/5-pw/10,    pw/5,-pw/10);
  bezierVertex(0,-pw/10,  -pw/5,-pw/10,   0,-pw/10);
  endShape();
  pop();

  //bud
  push();
  drawingContext.filter = 'blur(6px)'
  noStroke();
  //gradient
  let budG = drawingContext.createRadialGradient(0,-bud*1.25,bud*0.3, 0,-bud*1.25,bud*0.1);
  budG.addColorStop(0,c5); //outer
  budG.addColorStop(1,c6); //inner
  drawingContext.fillStyle = budG;
  circle(0,-bud*1.25,bud*0.7); //actual bud shape
  pop();

  //middle petals
  push();
  //gradient
  let petalColour2 = drawingContext.createLinearGradient(0,-45,0,-180);
  petalColour2.addColorStop(0,c7); //upper
  petalColour2.addColorStop(1,c8); //lower
  drawingContext.fillStyle = petalColour2;
 
  //right middle petal
  push();
  rotate(angle2);
  beginShape();
  vertex(0,0);
  bezierVertex(10*pw/9,-ph/3,   8*pw/5,-2*ph/3,   0,-ph);
  bezierVertex(pw/5,-2*ph/3,    pw/5,-2*ph/3,   0,0);
  endShape();
  pop();
 
  //left middle petal
  push();
  rotate(360-angle2);
  beginShape();
  vertex(0,0);
  bezierVertex(-10*pw/9,-ph/3,    -8*pw/5,-2*ph/3,    0,-ph);
  bezierVertex(-pw/5,-2*ph/3,   -pw/5,-2*ph/3,    0,0);
  endShape();
  pop();
  pop();

  //outer petals
  let petalColour3 = drawingContext.createRadialGradient(0,0,225,0,0,10);
  petalColour3.addColorStop(0,c9); //outer
  petalColour3.addColorStop(1,c10); //inner
  drawingContext.fillStyle = petalColour3;

  //right outer petal
  push();
  rotate(angle3);
  beginShape();
  vertex(0,0);
  bezierVertex(10*pw/9,-ph/3,   8*pw/5,-2*ph/3,   0,-ph);
  bezierVertex(pw/5,-2*ph/3,    pw/5,-2*ph/3,   0,0);
  endShape();
  pop();

  //left outer petal
  push();
  rotate(360-angle3);
  beginShape();
  vertex(0,0);
  bezierVertex(-10*pw/9,-ph/3,    -8*pw/5,-2*ph/3,    0,-ph);
  bezierVertex(-pw/5,-2*ph/3,   -pw/5,-2*ph/3,    0,0);
  endShape();
  pop();

  //front petal
  beginShape();
  vertex(0,0);
  bezierVertex(-pw/5,0,   0,0,    -pw/5,0);
  bezierVertex(-pw,-petH/2,   -3*pw/5,-4*petH/5,    0,-petH);
  bezierVertex(3*pw/5,-4*petH/5,    pw,-petH/2,   pw/5,0);
  bezierVertex(0,0,   -pw/5,0,    0,0);
  endShape();

  pop();

  pop();
}

let r = 1; //ripple radius
function lilyPad(x,y,w,s,drum){
  push();
  //blur depending on y position to create perspective
  if(y <= 500){
    drawingContext.filter = 'blur(2px)'
  } else if (y <= 800){
    drawingContext.filter = 'blur(1px)'
  }

  let h = map(y,1000,0,w/4,w/10) //lily height
  let bounce = map(drum,0,100,0,30); //bounce y coord

  //ripples
  if(r <= w*2){
    push();
    noFill();
    stroke(255,255,255,175-r*3); //reducing transparency as ripple expands
    strokeWeight(w/100); //ripple stroke prortional to flower size
    ellipse(x,y,w+r,h+r/10);
    pop();
    r += 1; //expanding
  } else {
    r = 10; //reset to start again
  }

  //gradient
  let lily = drawingContext.createLinearGradient(0,200,0,1000);
  lily.addColorStop(0,color(0,50,0)); //dark green
  lily.addColorStop(1,color(0,120,0)); //light green
  drawingContext.fillStyle = lily;

  if(s == 0){ //if no angle draw ellipse
    push(); //shadow
    noStroke();
    fill(50,80,100,100); //shadow grey
    ellipse(x,y+1,w,h);
    pop();
    ellipse(x,y-bounce*y/700,w,h); //whole pad
  }

  push(); //shadow
  noStroke();
  fill(50,80,100,100); //shadow grey
  arc(x,y+1,w,h,0,-s);
  pop();

  arc(x,y-bounce*y/700,w,h,0,-s); //segmented pad

  //lilypad lines
  push();
  strokeWeight(1);
  stroke(50,150,50); //light green
  line(x,y-bounce*y/700,x-w/4,y-bounce*y/700+h/3);
  line(x,y-bounce*y/700,x+w/3,y-bounce*y/700+h/5);
  line(x,y-bounce*y/700,x-w/4,y-bounce*y/700-h/3);
  line(x,y-bounce*y/700,x-w/2.5,y-bounce*y/700-h/10);
  line(x,y-bounce*y/700,x+w/6,y-bounce*y/700-h/2);
  line(x,y-bounce*y/700,x+w/10,y-bounce*y/700+h/3);
  pop();

  pop();
}

function extra(x,y,w,s,drum){
  push();

  fill(0,100,0); //green
  noStroke();
  let h = map(y,1000,0,w/4,w/10) //lily height
  let bounce = map(drum,0,100,0,30); //bounce y coord

  arc(x,y-bounce*y/700,w,h,0,-300); //segmented pad

  //lilypad lines
  push();
  strokeWeight(w/100);
  stroke(50,150,50,150); //light green
  line(x,y-bounce*y/700,x+w/3,y-bounce*y/700+h/5);
  line(x,y-bounce*y/700,x+w/10,y-bounce*y/700+h/3);
  pop();
  pop();
 
}

let c = 0; //light transparency
function light() {
  push();
  drawingContext.filter = 'blur(5px)';
  noStroke();
  c += 0.25
  if (c >= 200){
    c = 200; //transparncy doesn't go beyond 200
  }
 
  //gradient
  let beam = drawingContext.createLinearGradient(0,0,700,700);
  beam.addColorStop(0,color(255,255,200,c)); //light yellow
  beam.addColorStop(1,color(255,255,255,0)); //light white
  drawingContext.fillStyle = beam;

  //beams
  
  //main big beam
  beginShape();
  vertex(70,0);
  vertex(0,0);
  vertex(0,80);
  vertex(600,800);
  vertex(900,600);
  endShape();

  //second outer top beam
  beginShape();
  vertex(150,0);
  vertex(120,0);
  vertex(1000,400);
  vertex(1000,300);
  endShape();

  //mini inner beam
  beginShape();
  vertex(50,0);
  vertex(30,0);
  vertex(1000,800);
  vertex(1000,700);
  endShape();

  //bottom left beam
  beginShape();
  vertex(0,200);
  vertex(0,350);
  vertex(400,1000);
  vertex(500,1000);
  endShape();

  //top outer beam
  beginShape();
  vertex(250,0);
  vertex(350,0);
  vertex(1000,100);
  vertex(1000,200);
  endShape();

  //covering rectangle
  fill(255,255,200,c/10);
  rect(0,0,2000,2000);

  pop();
}
