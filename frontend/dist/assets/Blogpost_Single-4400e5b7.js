import{d as p,u as d,a as h,b as x,j as s}from"./index-f1edd733.js";import{S as m,p as j,a as g}from"./ShareButtons-2e5ab23e.js";import u from"./SideNav-bf1517f2.js";import{p as v,r as b}from"./functions-804fb0d9.js";const S=()=>{const{id:o}=p();d(),h();const t=x(e=>e.blogposts.allBlogposts.find(a=>a.id.toString()===o));if(!t)return null;const{homePic:i,bannerPic:r,contentPic:c}=v(t),n=e=>{const a=/%% banner picture goes here %%/g,l=/%% content picture goes here %%/g;return r&&(e=e.replace(a,`<div><img src="${r.awsPicURL}" style="height: 240px; width: 100%; object-fit: contain;" /></div>`)),c&&(e=e.replace(l,`<img src="${c.awsPicURL}" style="height: 240px; width: 180px; object-fit: contain;" />`)),e=j.sanitize(e),g(e)};return s.jsxs("div",{children:[s.jsxs("div",{className:"post-grid",children:[s.jsx("div",{className:"post-info",children:s.jsx(u,{})}),s.jsxs("div",{className:"post-content",children:[s.jsxs("div",{className:"post-title-div",children:[s.jsxs("span",{className:"post-date",children:["Date: ",b(t.publishedAt)]}),s.jsx("h1",{children:t.title}),i?s.jsxs(s.Fragment,{children:[s.jsx("img",{src:i.awsPicURL,className:"post-title-div-picture"}),s.jsx("div",{className:"picture-caption",children:i.picCaption})]}):"",s.jsx("h2",{style:{fontWeight:400},children:t.subtitle}),s.jsx(m,{})]}),s.jsx("br",{}),s.jsx("br",{}),s.jsx("div",{className:"post-content",children:n(t.content)})]})]}),s.jsx("hr",{})]})};export{S as default};