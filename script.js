'use strict';
const W=1774,H=887;
const centers=[[538,274],[1050,441]];
const sticks=[document.getElementById('left-stick'),document.getElementById('right-stick')];
const effects=document.getElementById('effects');
const status=document.getElementById('status');
const params=new URLSearchParams(location.search);
const debug=params.has('debug');
document.body.classList.toggle('debug',debug);
const buttons=[
 ['A',0,1206,357,100],['B',1,1292,273,100],['X',2,1116,276,100],['Y',3,1208,191,100],
 ['LB',4,480,105,190],['RB',5,1260,105,190],['LT',6,470,50,150],['RT',7,1260,50,150],
 ['View',8,767,274,72],['Menu',9,964,274,72],['L3',10,538,274,115],['R3',11,1050,441,115],
 ['DUp',12,677,396,90],['DDown',13,677,510,90],['DLeft',14,620,454,90],['DRight',15,734,454,90],['Xbox',16,865,153,112]
];
const zones=buttons.map(([name,index,x,y,size])=>{
 const el=document.createElement('div');
 el.className='hit'+(name.startsWith('D')?' dpad':'');
 el.title=name;
 Object.assign(el.style,{left:(x/W*100)+'%',top:(y/H*100)+'%',width:(size/W*100)+'%',height:(size/H*100)+'%'});
 effects.appendChild(el);return {name,index,el};
});
const keys=new Set();
const keyMap={a:0,b:1,x:2,y:3};
const keyButtons={'1':0,'2':1,'3':2,'4':3};
window.addEventListener('keydown',e=>{if(debug&&['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase()))e.preventDefault();keys.add(e.key.toLowerCase());});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
window.addEventListener('blur',()=>keys.clear());
function axis(v){v=Number(v)||0;return Math.abs(v)<.06?0:Math.max(-1,Math.min(1,v));}
function move(el,center,x,y){
 const range=25;
 el.style.left=((center[0]+axis(x)*range)/W*100)+'%';
 el.style.top=((center[1]+axis(y)*range)/H*100)+'%';
 el.classList.toggle('moving',Math.hypot(axis(x),axis(y))>.08);
}
function active(pad,i){const b=pad.buttons?.[i];return !!b&&(b.pressed||b.value>.25);}
function getPad(){
 if(!navigator.getGamepads)return null;
 const pads=Array.from(navigator.getGamepads()).filter(Boolean);
 return pads.find(p=>p.mapping==='standard')||pads.find(p=>/xbox|xinput/i.test(p.id))||pads[0]||null;
}
let previousStatus='';
function setStatus(message){
 if(message!==previousStatus){status.textContent=message;previousStatus=message;}
}
function frame(){
 const pad=getPad();
 document.body.classList.toggle('live',!!pad);
 if(pad){
  move(sticks[0],centers[0],pad.axes?.[0],pad.axes?.[1]);
  move(sticks[1],centers[1],pad.axes?.[2],pad.axes?.[3]);
  zones.forEach(({index,el})=>el.classList.toggle('on',active(pad,index)));
  setStatus('Connected: '+(pad.id||'Gamepad')+(pad.mapping!=='standard'?' (nonstandard mapping)':''));
 }else if(debug){
  move(sticks[0],centers[0],Number(keys.has('d'))-Number(keys.has('a')),Number(keys.has('s'))-Number(keys.has('w')));
  move(sticks[1],centers[1],Number(keys.has('arrowright'))-Number(keys.has('arrowleft')),Number(keys.has('arrowdown'))-Number(keys.has('arrowup')));
  zones.forEach(({index,el})=>el.classList.toggle('on',Object.keys(keyButtons).some(k=>keyButtons[k]===index&&keys.has(k))));
  setStatus('DEBUG PREVIEW — WASD / arrows / 1–4; connect a controller for real input');
 }else{
  move(sticks[0],centers[0],0,0);move(sticks[1],centers[1],0,0);
  zones.forEach(({el})=>el.classList.remove('on'));
  setStatus(navigator.getGamepads?'Connect controller and press any button':'Gamepad API unavailable in this browser');
 }
 requestAnimationFrame(frame);
}
window.addEventListener('gamepadconnected',()=>{});
window.addEventListener('gamepaddisconnected',()=>{});
requestAnimationFrame(frame);
