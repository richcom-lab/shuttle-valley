export function previousMonth(m){const [y,n]=m.split('-').map(Number);return n===1?`${y-1}-12`:`${y}-${String(n-1).padStart(2,'0')}`}
export function debtLive(date,today){const m=today.slice(0,7);return date.slice(0,7)>=previousMonth(m)&&date.slice(0,7)<=m}
export function calendarIds(d){return d.actualIds?.length?[...d.actualIds]:Object.keys(d.availability||{}).filter(k=>d.availability[k])}
function legacyBalances(attendance,expenses,payments){const b={};const add=(id,n)=>b[id]=(b[id]||0)+n;const ids=Object.keys(attendance).sort();const byPayer={};for(const e of expenses){if(e.allocations){for(const [owner,share] of Object.entries(e.allocations)){if(owner!==e.payer){add(owner,-share);add(e.payer,share)}}}else if(ids.length)byPayer[e.payer]=(byPayer[e.payer]||0)+e.amount;}for(const [payer,total] of Object.entries(byPayer)){const shares={};ids.forEach((id,i)=>{const owner=attendance[id];shares[owner]=(shares[owner]||0)+Math.floor(total/ids.length)+(i<total%ids.length?1:0)});for(const [owner,share] of Object.entries(shares)){if(owner===payer)continue;const n=Math.ceil(share/1000)*1000;add(owner,-n);add(payer,n)}}payments.filter(p=>p.confirmed).forEach(p=>{add(p.from,p.amount);add(p.to,-p.amount)});return b}
export function ranking(matches){const r={};const get=id=>r[id]??=( {id,elo:1500,sets:0,wins:0});for(const m of matches){const a=m.a.map(get),b=m.b.map(get);const avg=x=>x.reduce((s,p)=>s+p.elo,0)/x.length;const delta=32*((m.sa>m.sb?1:0)-1/(1+10**((avg(b)-avg(a))/400)));for(const [team,change,win] of [[a,delta,m.sa>m.sb],[b,-delta,m.sb>m.sa]])for(const p of team){p.elo+=change;p.sets++;p.wins+=+win}}return Object.values(r).sort((a,b)=>b.elo-a.elo||b.sets-a.sets||a.id.localeCompare(b.id))}

export function allocation(ids,values,owners,total){if(!Number.isSafeInteger(total)||total<=0||!ids.length||ids.length!==values.length||new Set(ids).size!==ids.length||values.some(v=>!Number.isSafeInteger(v)||v<0)||values.reduce((a,b)=>a+b,0)!==total)throw Error('Tổng phân bổ phải bằng chi phí');let out={};ids.forEach((id,i)=>{let owner=owners[id];if(!owner)throw Error('Thiếu người chịu trách nhiệm');out[owner]=(out[owner]||0)+values[i]});return out}

export function balances(attendance,expenses,payments){
 const b=legacyBalances(attendance,expenses.filter(e=>e.rounding!=='daily-v1'),payments);
 const add=(id,n)=>b[id]=(b[id]||0)+n;
 const debts=new Map();
 for(const e of expenses.filter(e=>e.rounding==='daily-v1')){
  let shares=e.allocations;
  if(!shares){shares={};const ids=Object.keys(attendance).sort();ids.forEach((id,i)=>{let owner=attendance[id];shares[owner]=(shares[owner]||0)+Math.floor(e.amount/ids.length)+(i<e.amount%ids.length?1:0)})}
  for(const [owner,n] of Object.entries(shares)){if(owner===e.payer||!n)continue;if(e.splitMode==='custom'){add(owner,-n);add(e.payer,n);continue}if(!debts.has(owner))debts.set(owner,new Map());let m=debts.get(owner);m.set(e.payer,(m.get(e.payer)||0)+n)}
 }
 for(const [owner,m] of debts){let total=[...m.values()].reduce((a,b)=>a+b,0),extra=Math.ceil(total/1000)*1000-total;let rows=[...m].map(([payer,n])=>({payer,n,bonus:Math.floor(extra*n/total),rem:(extra*n)%total}));let left=extra-rows.reduce((a,r)=>a+r.bonus,0);rows.sort((a,b)=>b.rem-a.rem||a.payer.localeCompare(b.payer));for(let r of rows){let n=r.n+r.bonus+(left-->0?1:0);add(owner,-n);add(r.payer,n)}}return b;
}

// Gross responsibility: same rounding as balances, before payments or netting.
export function monthlyCost(attendance,expenses,id){
 let cost=0,modern=0;const legacy=new Map(),ids=Object.keys(attendance).sort();
 for(const e of expenses){
  if(e.rounding!=='daily-v1'&&!e.allocations){legacy.set(e.payer,(legacy.get(e.payer)||0)+e.amount);continue}
  let share=e.allocations?.[id]||0;
  if(!e.allocations)ids.forEach((person,i)=>{if(attendance[person]===id)share+=Math.floor(e.amount/ids.length)+(i<e.amount%ids.length?1:0)});
  if(e.rounding==='daily-v1'&&e.splitMode!=='custom'&&e.payer!==id)modern+=share;else cost+=share;
 }
 for(const [payer,total] of legacy){let share=0;ids.forEach((person,i)=>{if(attendance[person]===id)share+=Math.floor(total/ids.length)+(i<total%ids.length?1:0)});cost+=payer===id?share:Math.ceil(share/1000)*1000}
 return cost+Math.ceil(modern/1000)*1000;
}
