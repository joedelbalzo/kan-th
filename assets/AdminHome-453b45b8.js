import{a as j,b as p,r as c,c as e,j as s,d as a,h as v,i as b}from"./index-cc4eeadf.js";import{A as N}from"./AdminNav-87261620.js";/* empty css                    */const A=()=>{j();const n=p(),[r,t]=c.useState(0),[o,d]=c.useState(0),h=e(i=>i.auth),m=e(i=>i.blogposts.allBlogposts),u=e(i=>i.blogposts.draftedBlogposts);if(!h.id)return null;const l=i=>{console.log("Hidden"),n(v(i))},x=i=>{n(b(i))};return s.jsxs("div",{children:[s.jsx(N,{}),s.jsxs("div",{className:"admin-grid",children:[s.jsxs("div",{className:"admin-grid-published",children:[s.jsx("h2",{children:"Published Posts"}),m.map(i=>s.jsx("div",{className:"admin-blogpost",children:s.jsxs("ul",{children:[s.jsxs("li",{children:["Title: ",i.title]}),s.jsxs("li",{children:["Subtitle: ",i.subtitle]}),s.jsxs("div",{className:"admin-blogpost-options",children:[r===i.id?s.jsxs(s.Fragment,{children:[s.jsx("button",{className:"admin-confirm",onClick:()=>l(i),children:"Confirm Hide"}),s.jsx("button",{className:"admin-cancel",onClick:()=>t(0),children:"Cancel Hide"})]}):s.jsx("button",{onClick:()=>t(i.id),children:"Hide"}),s.jsx("button",{children:s.jsx(a,{to:"/admin/posts",state:{post:i,type:"edit"},children:"Edit"})})]})]})},i.id))]}),s.jsxs("div",{className:"admin-grid-drafted",children:[s.jsx("h2",{children:"Drafted Posts"}),u.map(i=>s.jsx("div",{className:"admin-blogpost",children:s.jsxs("ul",{children:[s.jsxs("li",{children:["Title: ",i.title]}),s.jsxs("li",{children:["Subtitle: ",i.subtitle]}),s.jsxs("div",{className:"admin-blogpost-options",children:[o?s.jsxs(s.Fragment,{children:[s.jsx("button",{className:"admin-confirm",onClick:()=>l(i),children:"Confirm Archive"}),s.jsx("button",{className:"admin-cancel",onClick:()=>d(0),children:"Cancel Archive"})]}):s.jsx("button",{onClick:()=>d(i.id),children:"Archive"}),s.jsx("button",{children:s.jsx(a,{to:"/admin/posts",state:{post:i,type:"edit"},children:"Edit"})}),s.jsx("button",{onClick:()=>x(i),children:"Publish!"})]})]})},i.id))]})]})]})};export{A as default};
