const SUPABASE_REST='https://xmuvklfxcjdtnkhkzgmr.supabase.co/rest/v1';
const SUPABASE_KEY='sb_publishable_TJ0SzO33k9SypCv9tLksmA_eyTfvpyT';
const services=[['🚰','Plomería'],['⚡','Electricidad'],['🔥','Boiler'],['🔑','Cerrajería'],['❄️','Aire acondicionado'],['➕','Otro']];
const headers={'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json'};
const SUPABASE_BASE='https://xmuvklfxcjdtnkhkzgmr.supabase.co';
async function uploadServiceMedia(requestId,file){
  const ext=(file.name.split('.').pop()||'bin').toLowerCase().replace(/[^a-z0-9]/g,'');
  const safe=(file.name.replace(/\.[^.]+$/,'').replace(/[^a-zA-Z0-9_-]+/g,'-').slice(0,45)||'archivo');
  const path=`${requestId}/${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safe}.${ext}`;
  const r=await fetch(`${SUPABASE_BASE}/storage/v1/object/service-media/${encodeURI(path)}`,{
    method:'POST',
    headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':file.type||'application/octet-stream','x-upsert':'false'},
    body:file
  });
  if(!r.ok)throw new Error(await r.text()||'No se pudo subir el archivo');
  return `${SUPABASE_BASE}/storage/v1/object/public/service-media/${encodeURI(path)}`;
}
async function saveServiceMedia(requestId,file,url){
  const type=file.type.startsWith('video/')?'video':'image';
  const rows=await api('service_media',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify({request_id:requestId,media_type:type,file_url:url,file_name:file.name})});
  return rows&&rows[0];
}
async function getServiceMedia(requestId){return api('service_media?request_id=eq.'+encodeURIComponent(requestId)+'&select=*&order=created_at.asc')}
async function getServiceMessages(requestId){return api('service_messages?request_id=eq.'+encodeURIComponent(requestId)+'&select=*&order=created_at.asc')}
async function sendServiceMessage(requestId,senderType,message){const rows=await api('service_messages',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify({request_id:requestId,sender_type:senderType,message:String(message||'').trim()})});return rows&&rows[0]}


async function api(path,opts={}){const r=await fetch(SUPABASE_REST+'/'+path,{...opts,headers:{...headers,...(opts.headers||{})}});if(!r.ok){const t=await r.text();throw new Error(t||('HTTP '+r.status))}if(r.status===204)return null;const t=await r.text();return t?JSON.parse(t):null}
async function getRequests(){return api('service_requests?select=*,partners(id,name,rating,jobs_completed,photo_url,years_experience,services_completed,specialty,certifications,verified)&order=created_at.desc')}
async function getPartners(){return api('partners?select=*&order=name.asc')}
async function newRequest(service,problem){const body={customer_name:'Cliente demo',category:service,problem:problem||'Problema de mantenimiento',description:problem||'',urgency:'urgent',address:'Zapopan, Jalisco',status:'searching',visit_fee:199,total:199};const rows=await api('service_requests',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});return rows[0]}
async function updateRequest(id,patch){const rows=await api('service_requests?id=eq.'+encodeURIComponent(id),{method:'PATCH',headers:{'Prefer':'return=representation'},body:JSON.stringify(patch)});return rows&&rows[0]}
async function getRequest(id){const rows=await api('service_requests?id=eq.'+encodeURIComponent(id)+'&select=*,partners(id,name,rating,jobs_completed,photo_url,years_experience,services_completed,specialty,certifications,verified)');return rows&&rows[0]}
async function createRating(requestId,partnerId,rating,comment=''){const body={request_id:requestId,partner_id:partnerId,rating:Number(rating),punctuality:Number(rating),quality:Number(rating),would_reuse:Number(rating)>=4,comment:String(comment||'').trim()};const rows=await api('ratings',{method:'POST',headers:{'Prefer':'return=representation'},body:JSON.stringify(body)});return rows&&rows[0]}
async function refreshPartnerRating(partnerId){try{const rows=await api('ratings?partner_id=eq.'+encodeURIComponent(partnerId)+'&select=rating');if(!rows||!rows.length)return null;const avg=rows.reduce((a,x)=>a+Number(x.rating||0),0)/rows.length;await api('partners?id=eq.'+encodeURIComponent(partnerId),{method:'PATCH',headers:{'Prefer':'return=minimal'},body:JSON.stringify({rating:Number(avg.toFixed(1))})});return avg}catch(e){console.warn('La calificación se guardó, pero no se pudo actualizar el promedio del socio:',e);return null}}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function serviceOptions(){return services.map(s=>`<button class="service" onclick="chooseService('${s[1]}')"><span class="icon">${s[0]}</span><span><b>${s[1]}</b><small>Disponible ahora</small></span></button>`).join('')}
const statusLabel={searching:'Buscando socio',assigned:'Socio asignado',on_the_way:'En camino',arrived:'Llegó',quoted:'Cotización lista',authorized:'Autorizado',in_progress:'En proceso',completed:'Terminado',cancelled:'Cancelado'};
function money(n){return Number(n||0).toLocaleString('es-MX',{style:'currency',currency:'MXN'})}
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
