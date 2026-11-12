'use strict';
// Standalone browser Gamepad API overlay. No Gamepad Viewer CSS selectors or iframe.
const W=1774,H=887;
const base={left:[538,274],right:[1050,441]};
const stickEls=[document.getElementById('left-stick'),document.getElementById('right-stick')];
const effects=document.getElementById('effects');
const buttons=[
  ['A',0,1206,357,100],['B',1,1292,273,100],['X',2,1116,276,100],['Y',3,1208,191,100],
  ['LB',4,480,105,190],['RB',5,1260,105,190],['LT',6,470,50,150],['RT',7,1260,50,150],
  ['View',8,767,274,72],['Menu',9,964,274,72],['L3',10,538,274,115],['R3',11,1050,441,115],
  ['DUp',12,677,396,90],['DDown',13,677,510,90],['DLeft',14,620,454,90],['DRight',15,734,454,90],
  ['Xbox',16,865,153,112]
];
const zones=buttons.map(([name,index,x,y,size])=>{
 const el=document.createElement('div');el.className='hit'+(name.startsWith('D')?' dpad':'');el.title=name;
 Object.assign(el.style,{left:x/W*100+'%',top:y/H*100+'%',width:size/W*100+'%',height:size/H*100+'%'});
 effects.append(el);return {index,el};
});
const params=new URLSearchParams(location.search);
if(params.has('debug')) document.body.classList.add('debug');
const deadzone=0.06;
function axis(v){v=Number(v)||0;return Math.abs(v)<deadzone?0:Math.max(-1,Math.min(1,v));}
function move(el,center,x,y){
 const range=25;el.style.left=((center[0]+axis(x)*range)/W*100)+'%';el.style.top=((center[1]+axis(y)*range)/H*100)+'%';
}
let lastPad=null;
window.addEventListener('gamepadconnected',()=>{});
function update(){
 const pads=navigator.getGamepads?navigator.getGamepads():[];
 let pad=Array.from(pads).find(p=>p&&/xbox|xinput|standard/i.test(p.id+' '+p.mapping))||Array.from(pads).find(Boolean);
 if(pad){
  document.body.classList.add('live');lastPad=pad;
  move(stickEls[0],base.left,pad.axes[0],pad.axes[1]);
  move(stickEls[1],base.right,pad.axes[2],pad.axes[3]);
  zones.forEach(({index,el})=>el.classList.toggle('on',!!pad.buttons[index]&&(pad.buttons[index].pressed||pad.buttons[index].value>.2)));
 }else{
  document.body.classList.remove('live');
  move(stickEls[0],base.left,0,0);move(stickEls[1],base.right,0,0);
  zones.forEach(({el})=>el.classList.remove('on'));
 }
 requestAnimationFrame(update);
}
// Debug mode keyboard preview: WASD left stick, arrows right stick, 1/2/3/4 ABXY.
const keys=new Set();
window.addEventListener('keydown',e=>{keys.add(e.key.toLowerCase());if(document.body.classList.contains('debug')) e.preventDefault()});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
if(params.has('debug')){
 const original=update;
 function preview(){const pads=navigator.getGamepads?navigator.getGamepads():[];if(!Array.from(pads).some(Boolean)){
  move(stickEls[0],base.left,(+keys.has('d'))-(+keys.has('a')),(+keys.has('s'))-(+keys.has('w')));
  move(stickEls[1],base.right,(+keys.has('arrowright'))-(+keys.has('arrowleft')),(+keys.has('arrowdown'))-(+keys.has('arrowup')));
  [0,1,2,3].forEach((i)=>zones[i].el.classList.toggle('on',keys.has(String(i+1))));
 }requestAnimationFrame(preview)}
 requestAnimationFrame(preview);
}
requestAnimationFrame(update);
