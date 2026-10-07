import {initializeApp} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import * as fs from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import * as au from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
// Public web config (safe to expose). Real protection = firestore.rules + App Check + API key restrictions.
const app=initializeApp({apiKey:"AIzaSyChCJxtVlunBF8y6ZJtNFAR_tNlSt6-0Lo",authDomain:"topper-ki-tayari.firebaseapp.com",projectId:"topper-ki-tayari",storageBucket:"topper-ki-tayari.firebasestorage.app",messagingSenderId:"1011695141399",appId:"1:1011695141399:web:1049d00fbafd5714b6d252"});
export const db=fs.getFirestore(app),auth=au.getAuth(app),provider=new au.GoogleAuthProvider();
export {fs,au};
// Safe DOM builder: text is always set via textContent, never innerHTML (blocks XSS).
export const h=(t,a={},...c)=>{const e=document.createElement(t);for(const[k,v]of Object.entries(a)){if(k==='on')for(const[n,f]of Object.entries(v))e.addEventListener(n,f);else if(k==='class')e.className=v;else if(v!==false&&v!=null)e.setAttribute(k,v)}e.append(...c.flat().filter(x=>x!=null));return e};
export const $=id=>document.getElementById(id);
export const put=(el,...c)=>{el.replaceChildren(...c.flat().filter(x=>x!=null));return el};
export const safeUrl=s=>{try{const u=new URL(s);return u.protocol==='https:'?u.href:''}catch{return''}};
export const CLASSES=['5','6','7','8','9','10','11','12'];
export const authErr=e=>({'auth/too-many-requests':'Too many attempts. Wait a minute and try again.','auth/email-already-in-use':'This email is already registered. Try logging in.','auth/weak-password':'Use a password with at least 8 characters.','auth/popup-closed-by-user':'Sign-in window was closed.'}[e.code]||'Email or password is incorrect.');
