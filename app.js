const ctx = new (window.AudioContext || window.webkitAudioContext)();
let playing = false;
let step = 0;
let pattern = Array(16).fill(false);

const seq = document.getElementById("seq");

for(let i=0;i<16;i++){
  const div = document.createElement("div");
  div.className="step";
  div.onclick=()=>{pattern[i]=!pattern[i];div.classList.toggle("active")};
  seq.appendChild(div);
}

function playSound(){
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type="sawtooth";
  osc.frequency.value=200;

  gain.gain.value=0.1;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime+0.1);
}

function tick(){
  if(!playing) return;

  if(pattern[step]) playSound();

  const steps = document.querySelectorAll(".step");
  steps.forEach(s=>s.style.outline="none");
  steps[step].style.outline="2px solid red";

  step = (step+1)%16;

  const bpm = document.getElementById("bpm").value;
  setTimeout(tick, 60000/bpm/4);
}

document.getElementById("play").onclick=()=>{
  playing=!playing;
  if(playing){
    ctx.resume();
    tick();
  }
};

const canvas = document.getElementById("viz");
const c = canvas.getContext("2d");

function draw(){
  c.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<50;i++){
    c.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,2,2);
  }
  requestAnimationFrame(draw);
}
draw();
