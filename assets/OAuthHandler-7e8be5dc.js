import{V as c,a as r,b as i,r as t,a0 as u,j as l}from"./index-f1ac2c87.js";function p(){const s=c(),a=r(),o=i(),e=new URLSearchParams(s.search).get("token"),[f,n]=t.useState(!1);return t.useEffect(()=>{e&&o(u(e)).then(()=>{n(!0),a("/portfolio")})},[e]),l.jsx("div",{children:"Success"})}export{p as default};
