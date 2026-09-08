(function(){
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const frame=(body,w=520,h=280)=>`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Math diagram" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="${w-2}" height="${h-2}" rx="14" fill="#fbfdff" stroke="#d5dfec"/>${body}</svg>`;
function grid(points=[],opts={}){
 const w=420,h=300,cx=210,cy=150,M=Math.max(5,...points.flatMap(p=>[Math.abs(+p[0]||0),Math.abs(+p[1]||0)])),max=Math.ceil(M),min=-max,step=110/max;let s='';
 for(let k=min;k<=max;k++){let x=cx+k*step,y=cy-k*step;s+=`<line x1="${x}" y1="25" x2="${x}" y2="275" stroke="${k===0?'#17365d':'#e5ebf3'}" stroke-width="${k===0?2:1}"/><line x1="85" y1="${y}" x2="335" y2="${y}" stroke="${k===0?'#17365d':'#e5ebf3'}" stroke-width="${k===0?2:1}"/>`;if(k!==0){s+=`<text x="${x}" y="${cy+17}" text-anchor="middle" font-size="10" fill="#667085">${k}</text><text x="${cx-11}" y="${y+4}" text-anchor="end" font-size="10" fill="#667085">${k}</text>`}}
 s+=`<text x="343" y="154" font-size="13" font-weight="700" fill="#17365d">x</text><text x="214" y="20" font-size="13" font-weight="700" fill="#17365d">y</text>`;
 points.forEach((p,i)=>{let x=cx+p[0]*step,y=cy-p[1]*step;s+=`<circle cx="${x}" cy="${y}" r="5" fill="#0b74de"/><text x="${x+8}" y="${y-8}" font-size="12" font-weight="700" fill="#17365d">${esc(p[2]||String.fromCharCode(65+i))}</text>`});
 if(opts.axis==='y')s+=`<line x1="210" y1="25" x2="210" y2="275" stroke="#e05252" stroke-width="4" stroke-dasharray="7 5" opacity=".75"/>`;
 if(opts.axis==='x')s+=`<line x1="85" y1="150" x2="335" y2="150" stroke="#e05252" stroke-width="4" stroke-dasharray="7 5" opacity=".75"/>`;
 if(opts.arrow){s+=`<path d="M 340 130 L 390 130" stroke="#0f8f83" stroke-width="4"/><path d="M 390 130 l-12 -8 v16 z" fill="#0f8f83"/><text x="365" y="112" text-anchor="middle" font-size="12" fill="#0f8f83" font-weight="700">${esc(opts.arrow)}</text>`}
 return frame(s,420,300)
}
function parsePairs(q){let pts=[];for(const m of q.matchAll(/\((-?\d+)\s*,\s*(-?\d+)\)/g)){pts.push([+m[1],+m[2]])}return pts.slice(0,4)}
function bars(labels,vals,title='Frequency'){
 const w=500,h=280,left=58,base=225,max=Math.max(...vals,1),bw=Math.min(58,300/vals.length),gap=26;let s=`<text x="250" y="27" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">${esc(title)}</text>`;
 for(let i=0;i<=4;i++){let y=base-i*42;s+=`<line x1="${left}" y1="${y}" x2="460" y2="${y}" stroke="#e5ebf3"/><text x="48" y="${y+4}" text-anchor="end" font-size="10" fill="#667085">${Math.round(max*i/4)}</text>`}
 s+=`<line x1="${left}" y1="45" x2="${left}" y2="${base}" stroke="#17365d" stroke-width="2"/><line x1="${left}" y1="${base}" x2="460" y2="${base}" stroke="#17365d" stroke-width="2"/>`;
 labels.forEach((l,i)=>{let x=85+i*(bw+gap),bh=vals[i]/max*160;s+=`<rect x="${x}" y="${base-bh}" width="${bw}" height="${bh}" rx="4" fill="#2b79c2"/><text x="${x+bw/2}" y="${base+20}" text-anchor="middle" font-size="11" fill="#344054">${esc(l)}</text>`});return frame(s,w,h)
}
function dotplot(){let vals=[1,2,2,2,3,3,4,4,4,4,5,5],counts={};vals.forEach(v=>counts[v]=(counts[v]||0)+1);let s=`<text x="260" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Dot Plot</text><line x1="70" y1="220" x2="450" y2="220" stroke="#17365d" stroke-width="2"/>`;[1,2,3,4,5].forEach((v,i)=>{let x=100+i*78;s+=`<text x="${x}" y="242" text-anchor="middle" font-size="12" fill="#344054">${v}</text>`;for(let j=0;j<(counts[v]||0);j++)s+=`<circle cx="${x}" cy="${200-j*28}" r="8" fill="#2b79c2"/>`});return frame(s)}
function stemleaf(){return frame(`<text x="260" y="35" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Stem-and-Leaf Plot</text><line x1="245" y1="55" x2="245" y2="225" stroke="#17365d" stroke-width="2"/><text x="205" y="80" text-anchor="end" font-size="16">3</text><text x="265" y="80" font-size="16">2 5 8</text><text x="205" y="120" text-anchor="end" font-size="16">4</text><text x="265" y="120" font-size="16">1 4 7</text><text x="205" y="160" text-anchor="end" font-size="16">5</text><text x="265" y="160" font-size="16">0 2</text><text x="260" y="205" text-anchor="middle" font-size="12" fill="#667085">Key: 4 | 7 = 47</text>`)}
function spinner(n=4){let cx=260,cy=145,r=85,s=`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Equal Sections</text>`;for(let i=0;i<n;i++){let a1=-Math.PI/2+i*2*Math.PI/n,a2=-Math.PI/2+(i+1)*2*Math.PI/n,x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1),x2=cx+r*Math.cos(a2),y2=cy+r*Math.sin(a2),large=(2*Math.PI/n)>Math.PI?1:0;s+=`<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${i%2?'#d9ecfb':'#b8dcf5'}" stroke="#17365d"/>`;}s+=`<circle cx="${cx}" cy="${cy}" r="5" fill="#17365d"/><path d="M260 48 l-8 18 h16 z" fill="#e05252"/>`;return frame(s)}
function rectangle(q=''){
 let nums=[...q.matchAll(/(\d+(?:\.\d+)?)\s*(?:cm|m)?/g)].map(m=>m[1]);let a=nums[0]||'?',b=nums[1]||'?';return frame(`<text x="260" y="35" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Rectangle</text><rect x="135" y="85" width="250" height="125" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><text x="260" y="235" text-anchor="middle" font-size="14" font-weight="700" fill="#17365d">${esc(a)} units</text><text x="405" y="152" font-size="14" font-weight="700" fill="#17365d">${esc(b)} units</text>`)}
function parallelogram(q=''){
 let nums=[...q.matchAll(/(\d+(?:\.\d+)?)\s*(?:cm|m)?/g)].map(m=>m[1]);let b=nums[nums.length>1?1:0]||'?',h=nums[nums.length>2?2:1]||'?';return frame(`<text x="260" y="32" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Parallelogram</text><polygon points="130,205 360,205 405,80 175,80" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><line x1="360" y1="205" x2="360" y2="80" stroke="#e05252" stroke-width="2" stroke-dasharray="7 5"/><path d="M350 195 h10 v-10" fill="none" stroke="#17365d"/><text x="245" y="230" text-anchor="middle" font-size="14" font-weight="700">base ${esc(b)}</text><text x="370" y="150" font-size="14" font-weight="700">h ${esc(h)}</text>`)}
function triangle(q=''){
 let nums=[...q.matchAll(/(\d+(?:\.\d+)?)\s*(?:cm|m)?/g)].map(m=>m[1]);let b=nums[0]||'?',h=nums[1]||'?';return frame(`<text x="260" y="32" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Triangle</text><polygon points="110,215 410,215 295,70" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><line x1="295" y1="70" x2="295" y2="215" stroke="#e05252" stroke-width="2" stroke-dasharray="7 5"/><path d="M295 205 h10 v10" fill="none" stroke="#17365d"/><text x="260" y="242" text-anchor="middle" font-size="14" font-weight="700">base ${esc(b)}</text><text x="307" y="150" font-size="14" font-weight="700">h ${esc(h)}</text>`)}
function composite(){return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Composite Figure</text><path d="M110 75 H370 V150 H430 V225 H110 Z" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><line x1="370" y1="75" x2="370" y2="225" stroke="#9aa8ba" stroke-dasharray="6 5"/><text x="235" y="120" text-anchor="middle" font-size="13" font-weight="700">Rectangle A</text><text x="400" y="190" text-anchor="middle" font-size="13" font-weight="700">Rectangle B</text>`)}
function prism(q=''){
 let nums=[...q.matchAll(/(\d+(?:\.\d+)?)\s*(?:cm|m)?/g)].map(m=>m[1]);return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Right Rectangular Prism</text><polygon points="145,100 330,100 395,65 210,65" fill="#f7fbff" stroke="#17365d"/><polygon points="330,100 395,65 395,190 330,225" fill="#dbeaf6" stroke="#17365d"/><rect x="145" y="100" width="185" height="125" fill="#eef6fc" stroke="#17365d"/><line x1="145" y1="100" x2="210" y2="65" stroke="#17365d"/><line x1="210" y1="65" x2="210" y2="190" stroke="#17365d"/><line x1="210" y1="190" x2="395" y2="190" stroke="#17365d"/>${nums[0]?`<text x="238" y="247" text-anchor="middle" font-size="13" font-weight="700">${esc(nums[0])}</text>`:''}${nums[1]?`<text x="405" y="150" font-size="13" font-weight="700">${esc(nums[1])}</text>`:''}${nums[2]?`<text x="365" y="78" font-size="13" font-weight="700">${esc(nums[2])}</text>`:''}`)}
function polygon(n=6,sym=false){let cx=260,cy=145,r=90,pts=[];for(let i=0;i<n;i++){let a=-Math.PI/2+i*2*Math.PI/n;pts.push(`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`)}let s=`<polygon points="${pts.join(' ')}" fill="#eef6fc" stroke="#17365d" stroke-width="3"/>`;if(sym)s+=`<line x1="260" y1="45" x2="260" y2="245" stroke="#e05252" stroke-width="3" stroke-dasharray="7 5"/>`;return frame(s)}
function symmetry(type='square'){
 if(type==='leaf')return frame(`<path d="M260 55 C155 75 130 170 260 230 C390 170 365 75 260 55 Z" fill="#e9f6ee" stroke="#17365d" stroke-width="3"/><path d="M260 55 L260 230" stroke="#e05252" stroke-width="3" stroke-dasharray="7 5"/><path d="M260 120 C220 100 190 105 165 125 M260 150 C300 125 335 130 360 150" fill="none" stroke="#7aa98c" stroke-width="2"/>`);
 return frame(`<rect x="160" y="55" width="200" height="180" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><line x1="260" y1="45" x2="260" y2="245" stroke="#e05252" stroke-width="3" stroke-dasharray="7 5"/><text x="260" y="265" text-anchor="middle" font-size="12" fill="#667085">line of reflection</text>`)
}
function tessellation(){let s='';for(let r=0;r<4;r++)for(let c=0;c<7;c++){let x=70+c*55,y=40+r*55;s+=`<rect x="${x}" y="${y}" width="55" height="55" fill="${(r+c)%2?'#dcecf8':'#f5fafc'}" stroke="#17365d"/>`}return frame(s)}
function table(){return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Table of Values</text><rect x="145" y="55" width="230" height="165" fill="#fff" stroke="#17365d"/><line x1="260" y1="55" x2="260" y2="220" stroke="#17365d"/><line x1="145" y1="90" x2="375" y2="90" stroke="#17365d"/>${[1,2,3,4].map((v,i)=>`<line x1="145" y1="${90+(i+1)*32.5}" x2="375" y2="${90+(i+1)*32.5}" stroke="#d5dfec"/><text x="205" y="${112+i*32}" text-anchor="middle" font-size="13">${v}</text><text x="320" y="${112+i*32}" text-anchor="middle" font-size="13">${7+i*3}</text>`).join('')}<text x="205" y="79" text-anchor="middle" font-size="13" font-weight="700">x</text><text x="320" y="79" text-anchor="middle" font-size="13" font-weight="700">y</text>`)}

function coin(){return frame(`<text x="260" y="35" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Fair Coin</text><circle cx="260" cy="145" r="82" fill="#fff8dc" stroke="#17365d" stroke-width="4"/><text x="260" y="157" text-anchor="middle" font-size="54" font-weight="900" fill="#17365d">H</text><text x="260" y="245" text-anchor="middle" font-size="13" fill="#667085">Heads and tails are equally likely</text>`)}
function die(){let dots=[[0,0],[-28,-28],[28,28],[-28,28],[28,-28],[-28,0],[28,0]];let s=`<text x="260" y="32" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Fair Six-Sided Die</text><rect x="175" y="65" width="170" height="170" rx="24" fill="#fff" stroke="#17365d" stroke-width="4"/>`;[[-42,-42],[42,-42],[-42,0],[42,0],[-42,42],[42,42]].forEach(d=>s+=`<circle cx="${260+d[0]}" cy="${150+d[1]}" r="9" fill="#17365d"/>`);return frame(s)}
function bag(red=3,blue=1,green=0){let s=`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Bag of Counters</text><path d="M175 85 Q260 55 345 85 L365 225 Q260 260 155 225 Z" fill="#f7f1e8" stroke="#17365d" stroke-width="3"/>`;let cols=[];for(let i=0;i<red;i++)cols.push('#d9534f');for(let i=0;i<blue;i++)cols.push('#2b79c2');for(let i=0;i<green;i++)cols.push('#2f9e66');cols.forEach((c,i)=>{let x=205+(i%4)*38,y=135+Math.floor(i/4)*42;s+=`<circle cx="${x}" cy="${y}" r="14" fill="${c}" stroke="#17365d"/>`});return frame(s)}
function fractionStrip(parts=10,filled=4,label=''){parts=Math.max(2,Math.min(parts,20));filled=Math.max(0,Math.min(filled,parts));let x0=80,y=110,w=360,h=70,cw=w/parts,s=`<text x="260" y="45" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">${esc(label||'Relative Frequency')}</text>`;for(let i=0;i<parts;i++)s+=`<rect x="${x0+i*cw}" y="${y}" width="${cw}" height="${h}" fill="${i<filled?'#b8dcf5':'#fff'}" stroke="#17365d"/>`;s+=`<text x="260" y="215" text-anchor="middle" font-size="15" font-weight="700" fill="#17365d">${filled} of ${parts}</text>`;return frame(s)}
function twoSamples(){return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800" fill="#17365d">Experimental Results</text><text x="80" y="80" font-size="13" font-weight="700">10 trials</text><rect x="80" y="100" width="120" height="28" fill="#2b79c2"/><rect x="200" y="100" width="30" height="28" fill="#d9e2ec"/><text x="80" y="155" font-size="13" font-weight="700">100 trials</text><rect x="80" y="175" width="186" height="28" fill="#2b79c2"/><rect x="266" y="175" width="114" height="28" fill="#d9e2ec"/>`)}
function rotationArrow(n=6){let base=polygon(n,true);return base.replace('</svg>',`<path d="M380 80 A120 120 0 0 1 390 205" fill="none" stroke="#0f8f83" stroke-width="4"/><path d="M390 205 l-12 -10 l18 -2 z" fill="#0f8f83"/></svg>`)}
function congruentPair(n=4){let cx1=170,cy=145,cx2=350,r=65,pts1=[],pts2=[];for(let i=0;i<n;i++){let a=-Math.PI/2+i*2*Math.PI/n;pts1.push(`${cx1+r*Math.cos(a)},${cy+r*Math.sin(a)}`);pts2.push(`${cx2+r*Math.cos(a)},${cy+r*Math.sin(a)}`)}return frame(`<polygon points="${pts1.join(' ')}" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><polygon points="${pts2.join(' ')}" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><text x="260" y="255" text-anchor="middle" font-size="13" fill="#667085">same size • same shape</text>`)}


function coordPlane(points=[],opts={}){
 const xmin=opts.xmin??-6,xmax=opts.xmax??6,ymin=opts.ymin??-6,ymax=opts.ymax??6;
 const W=520,H=380,L=60,R=28,T=28,B=48, pw=W-L-R, ph=H-T-B;
 const sx=x=>L+(x-xmin)/(xmax-xmin)*pw, sy=y=>T+(ymax-y)/(ymax-ymin)*ph;
 let s=`<defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#0f8f83"/></marker></defs>`;
 for(let x=Math.ceil(xmin);x<=Math.floor(xmax);x++){let X=sx(x),axis=x===0;s+=`<line x1="${X}" y1="${T}" x2="${X}" y2="${H-B}" stroke="${axis?'#17365d':'#e3eaf2'}" stroke-width="${axis?2:1}"/>`;if(x!==0)s+=`<text x="${X}" y="${sy(0)+18}" text-anchor="middle" font-size="10" fill="#667085">${x}</text>`}
 for(let y=Math.ceil(ymin);y<=Math.floor(ymax);y++){let Y=sy(y),axis=y===0;s+=`<line x1="${L}" y1="${Y}" x2="${W-R}" y2="${Y}" stroke="${axis?'#17365d':'#e3eaf2'}" stroke-width="${axis?2:1}"/>`;if(y!==0)s+=`<text x="${sx(0)-10}" y="${Y+4}" text-anchor="end" font-size="10" fill="#667085">${y}</text>`}
 s+=`<text x="${W-R+8}" y="${sy(0)+4}" font-size="13" font-weight="800" fill="#17365d">x</text><text x="${sx(0)+6}" y="${T-8}" font-size="13" font-weight="800" fill="#17365d">y</text>`;
 if(opts.reflectAxis==='x')s+=`<line x1="${L}" y1="${sy(0)}" x2="${W-R}" y2="${sy(0)}" stroke="#d94c4c" stroke-width="4" stroke-dasharray="8 6" opacity=".65"/>`;
 if(opts.reflectAxis==='y')s+=`<line x1="${sx(0)}" y1="${T}" x2="${sx(0)}" y2="${H-B}" stroke="#d94c4c" stroke-width="4" stroke-dasharray="8 6" opacity=".65"/>`;
 if(opts.poly && opts.poly.length){s+=`<polygon points="${opts.poly.map(p=>`${sx(p[0])},${sy(p[1])}`).join(' ')}" fill="#dbeafe" fill-opacity=".55" stroke="#2563eb" stroke-width="3"/>`}
 if(opts.poly2 && opts.poly2.length){s+=`<polygon points="${opts.poly2.map(p=>`${sx(p[0])},${sy(p[1])}`).join(' ')}" fill="#d1fae5" fill-opacity=".55" stroke="#0f8f83" stroke-width="3"/>`}
 if(opts.arrow){let [a,b]=opts.arrow;s+=`<line x1="${sx(a[0])}" y1="${sy(a[1])}" x2="${sx(b[0])}" y2="${sy(b[1])}" stroke="#0f8f83" stroke-width="4" marker-end="url(#arr)"/>`}
 points.forEach((p,i)=>{let X=sx(p[0]),Y=sy(p[1]),col=p[3]||'#2563eb';s+=`<circle cx="${X}" cy="${Y}" r="5.5" fill="${col}" stroke="#fff" stroke-width="1.5"/><text x="${X+8}" y="${Y-9}" font-size="12" font-weight="800" fill="#17365d">${esc(p[2]||String.fromCharCode(65+i))}</text>`});
 if(opts.note)s+=`<text x="${W/2}" y="${H-12}" text-anchor="middle" font-size="12" font-weight="700" fill="#526075">${esc(opts.note)}</text>`;
 return frame(s,W,H)
}
function coordinateVisual(practice,index,q){
 const i=index;
 if(practice===66){
  if(i===0)return coordPlane([[3,2,'P']],{xmin:0,xmax:6,ymin:0,ymax:6,arrow:[[0,0],[3,2]],note:'3 right, 2 up'});
  if(i===1)return coordPlane([[5,1,'P']],{xmin:0,xmax:7,ymin:0,ymax:5,note:'First coordinate = horizontal position'});
  if(i===2)return coordPlane([[2,7,'P']],{xmin:0,xmax:6,ymin:0,ymax:9,note:'Second coordinate = vertical position'});
  if(i===3)return coordPlane([[0,0,'O']],{xmin:-2,xmax:4,ymin:-2,ymax:4,note:'Origin'});
  if(i===4)return coordPlane([[1,2,'Start'],[5,2,'End','#0f8f83']],{xmin:0,xmax:7,ymin:0,ymax:5,arrow:[[1,2],[5,2]],note:'Move right 4'});
  if(i===5)return coordPlane([[2,1,'Start'],[2,4,'End','#0f8f83']],{xmin:0,xmax:6,ymin:0,ymax:6,arrow:[[2,1],[2,4]],note:'Move up 3'});
  if(i===7)return coordPlane([[1,2,'A'],[4,2,'B','#0f8f83']],{xmin:0,xmax:6,ymin:0,ymax:5,arrow:[[1,2],[4,2]],note:'Horizontal movement'});
  if(i===8)return coordPlane([[2,1,'A'],[2,4,'B','#0f8f83']],{xmin:0,xmax:5,ymin:0,ymax:6,arrow:[[2,1],[2,4]],note:'Vertical movement'});
  if(i===9)return coordPlane([[4,0,'P']],{xmin:-1,xmax:6,ymin:-3,ymax:3,note:'Point lies on the horizontal axis'});
 }
 if(practice===67){
  if(i===0||i===1)return coordPlane([[0,0,'O']],{xmin:-5,xmax:5,ymin:-5,ymax:5,note:'The axes intersect at the origin'});
  if(i===2)return coordPlane([[3,0,'P']],{xmin:-5,xmax:5,ymin:-4,ymax:4,note:'Any point on x-axis has y = 0'});
  if(i===3)return coordPlane([[0,3,'P']],{xmin:-4,xmax:4,ymin:-5,ymax:5,note:'Any point on y-axis has x = 0'});
  if(i===4)return coordPlane([],{xmin:-5,xmax:5,ymin:-4,ymax:4,note:'Horizontal axis'});
  if(i===5)return coordPlane([],{xmin:-4,xmax:4,ymin:-5,ymax:5,note:'Vertical axis'});
  if(i===6)return coordPlane([[0,5,'P']],{xmin:-4,xmax:4,ymin:-1,ymax:7});
  if(i===7)return coordPlane([[6,0,'P']],{xmin:-1,xmax:8,ymin:-4,ymax:4});
  if(i===8)return coordPlane([[4,2,'P']],{xmin:0,xmax:7,ymin:0,ymax:6,note:'x = horizontal position'});
  if(i===9)return coordPlane([[4,2,'P']],{xmin:0,xmax:7,ymin:0,ymax:6,note:'y = vertical position'});
 }
 if(practice===68){
  if(i===0)return coordPlane([[1,1,'A'],[4,1,'B'],[4,3,'C'],[1,3,'D']],{xmin:0,xmax:6,ymin:0,ymax:5,poly:[[1,1],[4,1],[4,3],[1,3]]});
  if(i===1)return coordPlane([[1,1,'A'],[4,1,'B'],[2,4,'C']],{xmin:0,xmax:6,ymin:0,ymax:6,poly:[[1,1],[4,1],[2,4]],note:'3 vertices'});
  if(i===2)return coordPlane([[2,5,'P']],{xmin:0,xmax:6,ymin:0,ymax:7,arrow:[[0,0],[2,0]],note:'Move horizontally first, then vertically'});
  if(i===3)return coordPlane([[1,1,'A'],[5,1,'B'],[4,4,'C'],[2,4,'D']],{xmin:0,xmax:6,ymin:0,ymax:6,poly:[[1,1],[5,1],[4,4],[2,4]],note:'4 vertices'});
  if(i===4)return coordPlane([[3,6,'A'],[2,8,'B'],[8,2,'C'],[5,4,'D']],{xmin:0,xmax:10,ymin:0,ymax:10});
  if(i===5)return coordPlane([[1,9,'A'],[7,5,'B'],[3,8,'C'],[9,1,'D']],{xmin:0,xmax:10,ymin:0,ymax:10});
  if(i===6)return coordPlane([[1,1,'A'],[5,1,'B'],[4,4,'C'],[2,4,'D']],{xmin:0,xmax:6,ymin:0,ymax:6,poly:[[1,1],[5,1],[4,4],[2,4]],note:'Connect vertices in order'});
  if(i===7)return coordPlane([[0,0,'O']],{xmin:-3,xmax:5,ymin:-3,ymax:5});
  if(i===8)return coordPlane([[3,1,'A'],[3,4,'B']],{xmin:0,xmax:6,ymin:0,ymax:6,note:'Same x → vertical alignment'});
  if(i===9)return coordPlane([[1,3,'A'],[5,3,'B']],{xmin:0,xmax:6,ymin:0,ymax:6,note:'Same y → horizontal alignment'});
 }
 if(practice===69){
  if(i===0)return coordPlane([[1,2,'A'],[4,2,'B','#0f8f83']],{xmin:0,xmax:6,ymin:0,ymax:5,arrow:[[1,2],[4,2]],note:'3 units right'});
  if(i===1)return coordPlane([[3,1,'B'],[3,5,'C','#0f8f83']],{xmin:0,xmax:6,ymin:0,ymax:7,arrow:[[3,1],[3,5]],note:'4 units above'});
  if(i===2)return coordPlane([[2,2,'A'],[5,2,'B','#0f8f83']],{xmin:0,xmax:7,ymin:0,ymax:5,arrow:[[2,2],[5,2]]});
  if(i===3)return coordPlane([[3,4,'A'],[3,7,'B','#0f8f83']],{xmin:0,xmax:6,ymin:0,ymax:9,arrow:[[3,4],[3,7]]});
  if(i===4)return coordPlane([[1,3,'A'],[5,3,'B']],{xmin:0,xmax:6,ymin:0,ymax:6});
  if(i===5)return coordPlane([[3,1,'A'],[3,5,'B']],{xmin:0,xmax:6,ymin:0,ymax:6});
  if(i===6)return coordPlane([[2,5,'A'],[6,5,'B','#0f8f83']],{xmin:0,xmax:8,ymin:0,ymax:7,arrow:[[6,5],[2,5]],note:'4 units left'});
  if(i===7)return coordPlane([[7,6,'A'],[7,1,'B','#0f8f83']],{xmin:0,xmax:9,ymin:0,ymax:8,arrow:[[7,6],[7,1]],note:'5 units below'});
  if(i===9)return coordPlane([[1,1,'Start'],[4,5,'End','#0f8f83']],{xmin:0,xmax:6,ymin:0,ymax:7,arrow:[[1,1],[4,5]],note:'right 3, up 4'});
 }
 if(practice===70){const S=[[[2,3],[6,3],'right 4'],[[5,1],[5,4],'up 3'],[[4,6],[2,6],'left 2'],[[3,7],[3,2],'down 5'],[[1,1],[3,2],'right 2, up 1'],null,null,[[3,2],[0,2],'left 3'],[[2,5],[2,1],'down 4'],[[0,0],[5,0],'right 5']];let z=S[i];if(z)return coordPlane([[z[0][0],z[0][1],'Start'],[z[1][0],z[1][1],'Image','#0f8f83']],{xmin:-1,xmax:8,ymin:-1,ymax:9,arrow:[z[0],z[1]],note:z[2]});}
 if(practice===71){const S=[[[3,2],[3,-2],'x'],[[4,-1],[-4,-1],'y'],null,null,[[-2,5],[2,5],'y'],[[6,-3],[6,3],'x'],null,null,[[0,4],[0,4],'y'],null];let z=S[i];if(z)return coordPlane([[z[0][0],z[0][1],'P'],[z[1][0],z[1][1],"P′",'#0f8f83']],{xmin:-7,xmax:7,ymin:-6,ymax:6,reflectAxis:z[2],arrow:z[0][0]===z[1][0]&&z[0][1]===z[1][1]?null:[z[0],z[1]],note:`Reflection across ${z[2]}-axis`});if(i===2)return coordPlane([[3,2,'P'],[3,-2,"P′",'#0f8f83']],{reflectAxis:'x',xmin:-5,xmax:5,ymin:-5,ymax:5});if(i===3)return coordPlane([[3,2,'P'],[-3,2,"P′",'#0f8f83']],{reflectAxis:'y',xmin:-5,xmax:5,ymin:-5,ymax:5});if(i===7)return coordPlane([[4,0,'P']],{reflectAxis:'x',xmin:-6,xmax:6,ymin:-4,ymax:4,note:'A point on the mirror line stays fixed'});}
 if(practice===72){const S=[[[3,0],[0,3],'90° CCW'],[[2,1],[-2,-1],'180°'],null,null,[[3,1],[-3,-1],'180°'],[[0,4],[4,0],'90° CW'],[[0,5],[-5,0],'90° CCW'],null,null,null];let z=S[i];if(z)return coordPlane([[z[0][0],z[0][1],'P'],[z[1][0],z[1][1],"P′",'#0f8f83']],{xmin:-6,xmax:6,ymin:-6,ymax:6,arrow:[z[0],z[1]],note:`Rotation ${z[2]} about origin`});if(i===7)return coordPlane([[3,2,'P']],{xmin:-5,xmax:5,ymin:-5,ymax:5,note:'360° returns to the starting position'});}
 if(practice===73){const S=[[[2,2],[5,2],'right 3',null],[[3,4],[-3,4],'reflect y','y'],[[-2,5],[-2,-5],'reflect x','x'],[[4,-1],[-4,1],'180°',null],[[2,0],[0,2],'90° CCW',null],[[1,5],[5,3],'right 4, down 2',null],[[6,4],[4,4],'left 2',null],[[3,1],[3,6],'up 5',null],null,null];let z=S[i];if(z)return coordPlane([[z[0][0],z[0][1],'P'],[z[1][0],z[1][1],"P′",'#0f8f83']],{xmin:-7,xmax:8,ymin:-7,ymax:8,reflectAxis:z[3],arrow:[z[0],z[1]],note:z[2]});if(i===8)return coordPlane([[3,2,'P'],[-3,2,"P′",'#0f8f83']],{reflectAxis:'y',xmin:-5,xmax:5,ymin:-5,ymax:5,note:'x changes to its opposite'});if(i===9)return coordPlane([[3,2,'P'],[3,-2,"P′",'#0f8f83']],{reflectAxis:'x',xmin:-5,xmax:5,ymin:-5,ymax:5,note:'y changes to its opposite'});}
 if(practice===74){if(i===3)return coordPlane([[2,3,'P'],[-2,3,"P′",'#0f8f83']],{reflectAxis:'y',xmin:-5,xmax:5,ymin:-5,ymax:5});if(i===4)return coordPlane([[1,4,'P'],[6,4,"P′",'#0f8f83']],{xmin:0,xmax:8,ymin:0,ymax:7,arrow:[[1,4],[6,4]],note:'right 5'});if(i===5)return coordPlane([[3,2,'P'],[-3,-2,"P′",'#0f8f83']],{xmin:-5,xmax:5,ymin:-5,ymax:5,arrow:[[3,2],[-3,-2]],note:'180° about origin'});if(i===6)return coordPlane([[0,4,'P']],{xmin:-4,xmax:4,ymin:-1,ymax:6,note:'On y-axis, x = 0'});if(i===7)return coordPlane([[0,0,'O']],{xmin:-4,xmax:4,ymin:-4,ymax:4});if(i===8)return coordPlane([[1,3,'A'],[5,3,'B']],{xmin:0,xmax:6,ymin:0,ymax:6,note:'same y → horizontal alignment'});if(i===9)return coordPlane([[4,0,'P'],[0,4,"P′",'#0f8f83']],{xmin:-5,xmax:5,ymin:-5,ymax:5,arrow:[[4,0],[0,4]],note:'90° CCW about origin'});}
 return ''
}

function visual(practice,q,index){q=String(q);const pts=parsePairs(q);
 if(practice===36||practice===40) return grid(pts.length?pts:[[1,3,'A'],[2,5,'B'],[3,7,'C']],{});
 if(practice===59){if(index===6)return bars(['Cats','Dogs'],[8,5],'Pets Chosen');if(index===7)return bars(['A','B','C'],[2,4,6],'Scale by 2');if(index===8)return bars(['Value'],[12],'Read the Bar Height');return bars(['Reading','Sports','Gaming','Art'],[8,12,6,4],'Student Choices');}
 if(practice===60) return index%2?stemleaf():dotplot();
 if(practice===61){const specs=[[20,8],[20,8],[10,4],[50,15],[100,25],[4,3],[30,12],[10,6],[100,45],[5,1]];const [p,f]=specs[index]||[10,4];return fractionStrip(p,f,'Relative Frequency');}
 if(practice===62){if(index===0)return coin();if(index===1||index===7)return die();if(index===2)return spinner(4);if(index===6)return bag(3,1,0);if(index===8)return bars(['Heads','Tails'],[12,8],'20 Coin Tosses');return spinner(4);}
 if(practice===63){const vals=[[18,2],[2,18],[10,10],[14,6],[0,20],[20,0],[14,6],[6,14],[16,4],[4,16]];let v=vals[index]||[12,8];return bars(['Success','Other'],v,'Relative Frequency');}
 if(practice===64) return index%2===0?twoSamples():bars(['Small sample','Large sample'],[8,62],'Observed Successes');
 if(practice===65){if(index===2)return bars(['A','B','C'],[5,9,4],'Categories');if(index===3)return coin();if(index===4)return twoSamples();if(index===5)return stemleaf();if(index===8)return dotplot();return bars(['A','B','C','D'],[5,9,4,7],'Data');}
 if(practice>=66&&practice<=74)return coordinateVisual(practice,index,q);
 if(practice===75||practice===76||practice===77) return rectangle(q);
 if(practice===78) return parallelogram(q);
 if(practice===79) return triangle(q);
 if(practice===80) return composite();
 if(practice>=81&&practice<=84) return prism(q);
 if(practice===85){if(index===0)return frame(`<text x="80" y="45" font-size="14" font-weight="700">A</text><polygon points="110,70 190,70 190,150 110,150" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><text x="245" y="45" font-size="14" font-weight="700">B</text><rect x="275" y="80" width="130" height="70" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><text x="80" y="190" font-size="14" font-weight="700">C</text><polygon points="150,185 95,265 205,265" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><text x="245" y="190" font-size="14" font-weight="700">D</text><polygon points="340,185 385,210 385,260 340,285 295,260 295,210" fill="#eef6fc" stroke="#17365d" stroke-width="3"/>`);return '';} if(practice===86) return /3-D|cube|prism/i.test(q)?prism(q):symmetry();
 if(practice===87||practice===88) return rotationArrow(/triangle/i.test(q)?3:/hexagon/i.test(q)?6:/octagon/i.test(q)?8:4);
 if(practice===89||practice===90) return /reflect/i.test(q)?symmetry():rotationArrow(/triangle/i.test(q)?3:4);
 if(practice===91) return tessellation();
 if(practice===92) return /circle/i.test(q)?frame(`<circle cx="260" cy="145" r="90" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><line x1="170" y1="145" x2="350" y2="145" stroke="#e05252" stroke-dasharray="7 5"/><line x1="260" y1="55" x2="260" y2="235" stroke="#e05252" stroke-dasharray="7 5"/>`):polygon(/pentagon/i.test(q)?5:/octagon/i.test(q)?8:/hexagon/i.test(q)?6:6,true);
 if(practice===93||practice===94) return congruentPair(/triangle/i.test(q)?3:/pentagon/i.test(q)?5:4);
 if(practice===95) return /tessell/i.test(q)?tessellation():/circle/i.test(q)?frame(`<circle cx="260" cy="145" r="90" fill="#eef6fc" stroke="#17365d" stroke-width="3"/><line x1="260" y1="45" x2="260" y2="245" stroke="#e05252" stroke-dasharray="7 5"/>`):/congruent/i.test(q)?congruentPair(4):rotationArrow(/hexagon/i.test(q)?6:/pentagon/i.test(q)?5:4);
 if(practice===96) return /butterfly|leaf|nature/i.test(q)?symmetry('leaf'):/wampum|basket|bead|quilt/i.test(q)?tessellation():symmetry();
 return ''
}
function patB(index,q){const n=index+1;
 if(n===5||n===26)return table();
 if(n===6)return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800">Area = 72 cm²</text><rect x="70" y="75" width="75" height="150" fill="#eef6fc" stroke="#17365d"/><text x="107" y="245" text-anchor="middle" font-size="11">1 × 72</text><rect x="165" y="100" width="75" height="100" fill="#eef6fc" stroke="#17365d"/><text x="202" y="220" text-anchor="middle" font-size="11">2 × 36</text><rect x="260" y="115" width="110" height="70" fill="#eef6fc" stroke="#17365d"/><text x="315" y="205" text-anchor="middle" font-size="11">6 × 12</text><rect x="390" y="120" width="80" height="62" fill="#eef6fc" stroke="#17365d"/><text x="430" y="202" text-anchor="middle" font-size="11">8 × 9</text>`);
 if(n===7)return bars(['Reading','Sports','Gaming','Art'],[8,12,6,4],'Student Choices');
 if(n===8)return grid([[-3,4,'P']],{axis:'y'});
 if(n===9)return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800">Right Rectangular Prism</text><polygon points="145,100 330,100 395,65 210,65" fill="#f7fbff" stroke="#17365d"/><polygon points="330,100 395,65 395,190 330,225" fill="#dbeaf6" stroke="#17365d"/><rect x="145" y="100" width="185" height="125" fill="#eef6fc" stroke="#17365d"/><line x1="145" y1="100" x2="210" y2="65" stroke="#17365d"/><text x="235" y="245" text-anchor="middle" font-size="13" font-weight="700">base area = 24 cm²</text><text x="405" y="150" font-size="13" font-weight="700">h = 7 cm</text>`);
 if(n===10)return bag(5,3,2);
 if(n===16)return parallelogram('54 9 ?');
 if(n===17)return grid([[1,1,'A'],[4,1,'B'],[1,3,'C']],{arrow:'2 right, 4 up'});
 if(n===18)return rotationArrow(8);
 if(n===19)return bars(['Red','Blue','Green','Yellow'],[18,12,6,4],'Spinner Results');
 if(n===20)return twoSamples();
 if(n===23)return frame(`<text x="260" y="30" text-anchor="middle" font-size="16" font-weight="800">7 pizzas shared by 3 friends</text>${[0,1,2,3,4,5,6].map((i)=>`<circle cx="${105+(i%4)*100}" cy="${95+Math.floor(i/4)*105}" r="34" fill="#fff3c4" stroke="#17365d"/><line x1="${105+(i%4)*100}" y1="${61+Math.floor(i/4)*105}" x2="${105+(i%4)*100}" y2="${129+Math.floor(i/4)*105}" stroke="#17365d"/><line x1="${71+(i%4)*100}" y1="${95+Math.floor(i/4)*105}" x2="${139+(i%4)*100}" y2="${95+Math.floor(i/4)*105}" stroke="#17365d"/>`).join('')}`);
 if(n===27)return composite();
 if(n===28)return grid([[1,1,'A'],[4,1,'B'],[1,3,'C']],{arrow:'180° about A'});
 if(n===29)return symmetry('leaf');
 if(n===36)return triangle('14 9');
 if(n===37)return grid([[2,2,'P'],[5,2,'Q'],[2,4,'R']],{arrow:'90° CCW about P'});
 if(n===38)return rotationArrow(6);
 if(n===39)return bars(['1 book','2 books','3 books','4 books'],[2,5,3,2],'Books Read');
 if(n===40)return prism('10 6 ?');
 return ''}
window.ALRVisuals={render:visual,patB};
})();
