import{c as l,a as c,b as r,j as a,J as d,a7 as g}from"./index-cc4eeadf.js";const h=({id:u})=>{const t=l(s=>s.tags),i=c(),n=r();if(!t)return null;const e={id:1234,name:"All Posts"};t.some(s=>s.id===e.id&&s.name===e.name)||t.unshift(e);const o=async s=>{s==="1234"?i("/blog/"):(await n(g(s)),i(`/blog/tags/${s}`))};return a.jsxs("div",{children:[a.jsx(d,{}),a.jsxs("div",{className:"tag-styles-container",children:["sort by tags:",a.jsx("select",{className:"tag-styles",onChange:s=>o(s.target.value),children:t.map(s=>a.jsx("option",{value:s.id,children:s.name},s.id))})]})]})};export{h as default};
