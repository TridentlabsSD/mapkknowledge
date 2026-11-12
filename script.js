'use strict';
const W=1774,H=887,centers=[[538,270],[1053,451]];
const sticks=[document.getElementById('left-stick'),document.getElementById('right-stick')],effects=document.getElementById('effects'),status=document.getElementById('status');
const params=new URLSearchParams(location.search),debug=params.has('debug');document.body.classList.toggle('debug',debug);
// Standard Gamepad API button indices; coordinates only position visual highlights.
const layout=[['A',0,1206,357,100],['B',1,1292,273,100],['X',2,1116,276,100],['Y',3,1208,191,100],['LB',4,480,105,190],['RB',5,1260,105,190],['LT',6,470,50,150],['RT',7,1260,50,150],['View',8,767,274,72],['Menu',9,964,274,72],['L3',10,538,274,115],['R3',11,1050,441,115],['DUp',12,677,396,90],['DDown',13,677,510,90],['DLeft',14,620,454,90],['DRight',15,734,454,90],['Home',16,865,153,112]];
const zones=layout.map(([name,index,x,y,size])=>{const el=document.createElement('div');el.className='hit'+(name.startsWith('D')?' dpad':'');el.title=name;Object.assign(el.style,{left:x/W*100+'%',top:y/H*100+'%',width:size/W*100+'%',height:size/H*100+'%'});effects.append(el);return {name,index,el};});
const keys=new Set();window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(debug&&k.startsWith('arrow'))e.preventDefault();keys.add(k)});window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>keys.clear());
const clamp=(v,min,max)=>Math.min(max,Math.max(min,Number.isFinite(v)?v:0));
const axis=v=>{const n=clamp(Number(v),-1,1);return Math.abs(n)<.06?0:n};
function move(el,c,x,y){let dx=axis(x),dy=axis(y);const len=Math.hypot(dx,dy),scale=len>1?1/len:1;el.style.left=(c[0]+dx*scale*25)/W*100+'%';el.style.top=(c[1]+dy*scale*25)/H*100+'%';el.classList.toggle('moving',len>.08)}
function buttonValue(pad,i){const b=pad.buttons?.[i];return b?clamp(Math.max(Number(b.value)||0,b.pressed?1:0),0,1):0}
function getPad(){if(!navigator.getGamepads)return null;const pads=Array.from(navigator.getGamepads());const requested=params.get('pad');if(requested!==null&&Number.isInteger(Number(requested))&&pads[Number(requested)])return pads[Number(requested)];return pads.find(p=>p&&p.connected!==false&&p.mapping==='standard')||pads.find(p=>p&&p.connected!==false)||null}
let previous='';function message(s){if(s!==previous){status.textContent=s;previous=s}}
const diagnostics=debug?document.createElement('pre'):null;if(diagnostics){diagnostics.id='diagnostics';document.body.append(diagnostics)}
function render(){let pad=null;try{pad=getPad()}catch(e){message('Gamepad API error: '+e.message)}
 document.body.classList.toggle('live',!!pad);
 const axes=pad?Array.from(pad.axes||[],axis):[];
 const values=pad?layout.map(([,i])=>buttonValue(pad,i)):layout.map(([,i])=>debug&&i<4&&keys.has(String(i+1))?1:0);
 move(sticks[0],centers[0],pad?axes[0]:debug?Number(keys.has('d'))-Number(keys.has('a')):0,pad?axes[1]:debug?Number(keys.has('s'))-Number(keys.has('w')):0);
 move(sticks[1],centers[1],pad?axes[2]:debug?Number(keys.has('arrowright'))-Number(keys.has('arrowleft')):0,pad?axes[3]:debug?Number(keys.has('arrowdown'))-Number(keys.has('arrowup')):0);
 zones.forEach(({index,el})=>{const v=values[index]||0;el.classList.toggle('on',v>.08);el.style.opacity=v>.08?String(Math.max(.18,v)):''});
 if(pad)message('Connected: '+pad.id+(pad.mapping!=='standard'?' (nonstandard mapping: verify inputs)':''));
 else message(navigator.getGamepads?'Connect controller and press a button':'Gamepad API unavailable');
 if(diagnostics)diagnostics.textContent=(pad?'Controller: '+pad.id+' | Mapping: '+(pad.mapping||'none')+' | Index: '+pad.index:'NO CONTROLLER — WASD/arrows move sticks; 1–4 simulate A/B/X/Y')+'\n'+axes.map((v,i)=>'Axis '+i+': '+v.toFixed(2)).join(' | ')+'\n'+layout.map(([name],i)=>name+': '+Math.round((values[i]||0)*100)+'%').join(' | ');
 requestAnimationFrame(render)}
window.addEventListener('gamepadconnected',e=>message('Connected: '+e.gamepad.id));window.addEventListener('gamepaddisconnected',()=>message('Controller disconnected'));requestAnimationFrame(render);
