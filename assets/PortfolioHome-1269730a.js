import{c as r,a as l,b as n,j as e,d as s,$ as a,a0 as c}from"./index-64ac5149.js";import{P as d}from"./PortfolioNav-3167f463.js";const h=()=>{const o=r(i=>i.auth);l();const t=n();return o?e.jsxs("div",{className:"portfolio-grid",children:[e.jsx(d,{}),e.jsxs("div",{className:"portfolio-home-div",children:[e.jsxs("div",{className:"portfolio-home-div-inner",children:["Hey, ",o.firstName,". We're glad you're here."]}),o.username=="jimbo"&&o.lastName=="Del Balzo"&&e.jsxs("div",{style:{textAlign:"center"},children:["And because you're a fake account, you can"," ",e.jsx(s,{to:"/portfolio/dashboard",style:{textDecoration:"underline"},children:"click here"})," ","to see your dashboard."]})]}),e.jsxs("div",{className:"portfolio-grid-container",children:[e.jsx("img",{src:a.src,alt:a.alt,className:"portfolio-image"}),e.jsxs("main",{style:{margin:"2rem auto",width:"80%",fontSize:"24px",textAlign:"center"},children:["We've added you to our mailing list! You'll be regularly informed about updates and changes, especially as new features become available. We're excited to have you here.",e.jsx("br",{}),e.jsx("br",{}),"Let's get you and your business the financing you've earned!",e.jsx(s,{to:"/",className:"portfolio-submit-button",children:"Home"}),e.jsx(s,{to:"/",className:"portfolio-submit-button",onClick:()=>t(c()),id:"logout",children:"Logout"})]})]})]}):null};export{h as default};
