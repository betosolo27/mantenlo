const SUPABASE_REST='https://xmuvklfxcjdtnkhkzgmr.supabase.co/rest/v1';
const SUPABASE_KEY='sb_publishable_TJ0SzO33k9SypCv9tLksmA_eyTfvpyT';
const services=[['🚰','Plomería'],['⚡','Electricidad'],['🔥','Boiler'],['🔑','Cerrajería'],['❄️','Aire acondicionado'],['➕','Otro']];
const headers={'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'};
async function api(path,opts={}){const r=await fetch(SUPABASE_REST+'/'+path,{...opts,headers:{...headers,...(opts.headers||{})}});if(!r.ok){const t=await r.text();throw new Error(t||('HTTP '+r.status))}if(r.status===204)return null;const t=await r.text();return t?JSON.parse(t):null}
async function getRequests(){return api('service_requests?select=*,partners(name,rating,jobs_completed)&order=created_at.desc')}
async function getPartners(){return api('partners?select=*&order=name.asc')}
async function newRequest(service,problem){const body={customer_name:'Cliente demo',category:service,problem:problem||'Problema de mantenimiento',description:problem||'',urgency:'urgent',address:'Zapopan, Jalisco',status:'searching',visit_fee:199,total:199};const rows=await api('service_requests',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});return rows[0]}
async function updateRequest(id,patch){const rows=await api('service_requests?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify(patch)});return rows&&rows[0]}
async function getRequest(id){const rows=await api('service_requests?id=eq.'+encodeURIComponent(id)+'&select=*,partners(name,rating,jobs_completed)');return rows&&rows[0]}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function serviceOptions(){return services.map(s=>`<button class="service" onclick="chooseService('${s[1]}')"><span class="icon">${s[0]}</span><span><b>${s[1]}</b><small>Disponible ahora</small></span></button>`).join('')}
const statusLabel={searching:'Buscando socio',assigned:'Socio asignado',on_the_way:'En camino',arrived:'Llegó',quoted:'Cotización lista',authorized:'Autorizado',in_progress:'En proceso',completed:'Terminado',cancelled:'Cancelado'};
function money(n){return Number(n||0).toLocaleString('es-MX',{style:'currency',currency:'MXN'})}
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
