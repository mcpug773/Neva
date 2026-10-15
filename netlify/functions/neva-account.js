'use strict';
// This code MUST execute as a Netlify Function, never as public client JS.
// Requires Netlify environment variables SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
// No email is requested from the user. An internal, non-deliverable alias is used
// by Supabase Auth to support true username+password sign-in, with no recovery.
const crypto=require('node:crypto');
const json=(status,obj)=>({statusCode:status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'},body:JSON.stringify(obj)});
exports.handler=async(event)=>{
 if(event.httpMethod!=='POST')return json(405,{error:'POST only.'});
 if((event.body||'').length>10000)return json(413,{error:'Request is too large.'});
 const supabaseUrl=(process.env.SUPABASE_URL||'').replace(/\/$/,'');
 const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(supabaseUrl)||!serviceKey||!process.env.NEVA_SIGNUP_SALT)return json(503,{error:'Neva account server not configured. Set the Supabase server secrets in Netlify.'});
 let body;try{body=JSON.parse(event.body||'{}');}catch{return json(400,{error:'Invalid request.'});}
 const name=(body.username||'').trim();const password=body.password;
 if(!/^[a-zA-Z0-9_]{3,24}$/.test(name))return json(400,{error:'Use a username with 3–24 letters, numbers or underscores.'});
 if(typeof password!=='string'||password.length<10||password.length>128)return json(400,{error:'Password must be 10–128 characters.'});
 // Use only a stable internal alias, never a real user email or third-party domain.
 const internalEmail=name.toLowerCase()+'@accounts.neva.invalid';
 const headers={'apikey':serviceKey,'authorization':'Bearer '+serviceKey,'content-type':'application/json'};
 async function api(path,method='GET',data=null,overrideHeaders=null){
   const response=await fetch(supabaseUrl+path,{method,headers:overrideHeaders||headers,body:data===null?undefined:JSON.stringify(data)});
   const payload=await response.json().catch(()=>({}));
   if(!response.ok)throw Object.assign(new Error(payload.msg||payload.message||payload.error_description||payload.error||`Supabase error (${response.status})`),{status:response.status});
   return payload;
 }
 try{
   const ip=(event.headers['x-nf-client-connection-ip']||event.headers['x-forwarded-for']||'unknown').split(',')[0].trim().slice(0,80);
   const clientHash=crypto.createHash('sha256').update(ip+process.env.NEVA_SIGNUP_SALT).digest('hex');
   await api('/rest/v1/rpc/neva_registration_guard','POST',{p_client_hash:clientHash});
   // Check existing public username before creating the auth user.
   const old=await api('/rest/v1/neva_profiles?select=user_id,username&username=ilike.'+encodeURIComponent(name));
   const token=(event.headers.authorization||'').replace(/^Bearer\s+/i,'').trim();
   let current=null;
   if(token){
     try{
       const user=await api('/auth/v1/user','GET',null,{'apikey':serviceKey,'authorization':'Bearer '+token});
       if(user?.id && user.is_anonymous===true)current=user;
     }catch{/* An expired guest token simply cannot be upgraded. */}
   }
   // Preserve old guest videos/friend IDs ONLY if this username belongs to that guest.
   if(current){
     if(!old.some(x=>x.user_id===current.id&&x.username.toLowerCase()===name.toLowerCase()))
       return json(409,{error:'To keep your guest uploads, use the same username as your current guest profile. Or sign out and create a separate account.'});
     await api('/auth/v1/admin/users/'+encodeURIComponent(current.id),'PUT',{
       email:internalEmail,password,email_confirm:true
     });
     return json(200,{ok:true,upgraded:true});
   }
   if(old.length)return json(409,{error:'That username is already taken. Try signing in or choose another.'});
   const created=await api('/auth/v1/admin/users','POST',{
     email:internalEmail,password,email_confirm:true,
     user_metadata:{display_name:name}
   });
   const id=created.id||created.user?.id;
   if(!id)return json(502,{error:'Account created but the server did not return a user ID. Contact the site owner.'});
   try{
     await api('/rest/v1/neva_profiles','POST',{user_id:id,username:name});
   }catch(error){
     await api('/auth/v1/admin/users/'+encodeURIComponent(id),'DELETE').catch(()=>{});
     throw error;
   }
   return json(200,{ok:true});
 }catch(error){
   const detail=String(error.message||'Could not create account.').slice(0,220);
   return json([400,401,403,409,422,429].includes(error.status)?error.status:502,{error:detail});
 }
};
