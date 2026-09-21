const KEY='mant-enlo-demo-v1';
const services=[['🚰','Plomería'],['⚡','Electricidad'],['🔥','Boiler'],['🔑','Cerrajería'],['❄️','Aire acondicionado'],['➕','Otro']];
function load(){return JSON.parse(localStorage.getItem(KEY)||'null')||{requests:[]}}
function save(db){localStorage.setItem(KEY,JSON.stringify(db))}
function seed(){let db=load();if(!db.requests.length){db.requests=[{id:'MNT-001',service:'Plomería',problem:'Fuga de agua debajo del lavabo',customer:'María González',zone:'Zapopan',status:'En camino',tech:'Carlos Hernández',amount:199,created:new Date().toISOString()}];save(db)}return db}
function newRequest(service,problem){const db=load();const id='MNT-'+String(db.requests.length+1).padStart(3,'0');db.requests.unshift({id,service,problem,customer:'Cliente demo',zone:'Zapopan',status:'Buscando socio',tech:null,amount:199,created:new Date().toISOString()});save(db);return id}
function setRequestStatus(id,status,tech=null,amount=null){const db=load();const r=db.requests.find(x=>x.id===id);if(r){r.status=status;if(tech)r.tech=tech;if(amount!==null)r.amount=amount}save(db)}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function serviceOptions(){return services.map(s=>`<button class="service" onclick="chooseService('${s[1]}' )"><span class="icon">${s[0]}</span>${s[1]}<span class="pill">Disponible ahora</span></button>`).join('')}
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
