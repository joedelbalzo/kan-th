import{c as S,a as C,b as k,r as l,j as e,L as E,a1 as w,a2 as L}from"./index-888b763f.js";import{P as D}from"./PortfolioNav-7700e311.js";const F="/assets/pexels-tim-douglas-10ad722b.webp",U=()=>{const s=S(t=>t.auth),f=C(),p=k(),[d,r]=l.useState(!1),[m,u]=l.useState(!1),[P,h]=l.useState("");if(!s)return null;const[a,x]=l.useState({firstName:s&&s.firstName?s.firstName:"",lastName:s&&s.lastName?s.lastName:"",businessName:s&&s.businessName?s.businessName:"",email:s&&s.email?s.email:"",city:s&&s.city?s.city:"",state:s&&s.state?s.state:"",updates:s&&typeof s.updates=="boolean"?s.updates:!0}),[o,N]=l.useState({}),i=t=>{const{name:c,value:n,type:g,checked:v}=t.target,y=g==="checkbox"?v:n;x({...a,[c]:y})},b=()=>{const t={};return a.firstName.trim()||(t.firstName="First Name is required"),a.lastName.trim()||(t.lastName="Last Name is required"),a.email.trim()?/^\S+@\S+\.\S+$/.test(a.email)||(t.email="Invalid email format"):t.email="Email is required",N(t),Object.keys(t).length===0},j=t=>{if(t.preventDefault(),b()){async function c(){try{r(!0),await w.post("/api/auth/mailinglist",{email:a.email}),await p(L(a,s)).then(()=>{r(!1),u(!0),setTimeout(()=>{f("/portfolio/home"),u(!1)},2e3),console.log("Dispatch successful")})||r(!1)}catch(n){console.log(n),h("Could not change portfolio. We'll get right on it!")}}c()}};return e.jsx("div",{children:e.jsxs("div",{className:"portfolio-grid",children:[e.jsx(D,{}),e.jsx("div",{className:"portfolio-account-info-home-div",children:s.isNewUser?e.jsx("div",{className:"portfolio-account-info-home-div-inner",children:"Welcome! Let's personalize your experience."}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"portfolio-account-info-home-div-inner",children:"Edit Account Settings"})})}),e.jsxs("div",{className:"portfolio-account-info",children:[e.jsxs("form",{className:"portfolio-grid-form",onSubmit:j,children:[e.jsx("label",{children:"First Name:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"firstName",value:a.firstName,onChange:i}),o.firstName&&e.jsx("span",{className:"error",children:o.firstName}),e.jsx("label",{children:"Last Name:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"lastName",value:a.lastName,onChange:i}),o.lastName&&e.jsx("span",{className:"error",children:o.lastName}),e.jsx("label",{children:"Company:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"businessName",value:a.businessName,onChange:i}),e.jsx("label",{children:"Email:"}),e.jsx("input",{type:"email",className:"portfolio-form-input-fields",name:"email",value:a.email,onChange:i}),o.email&&e.jsx("span",{className:"error",children:o.email}),e.jsx("label",{children:"City:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"city",value:a.city,onChange:i}),e.jsx("label",{children:"State:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"state",value:a.state,onChange:i}),e.jsxs("div",{className:"checkbox",children:[e.jsx("label",{className:"checkbox-label",children:"Subscribe for Updates?"}),e.jsx("input",{type:"checkbox",className:"checkbox-input",name:"updates",checked:a.updates,onChange:i})]}),!m&&e.jsx("button",{type:"submit",className:"portfolio-account-info-submit-button",children:"Submit"}),d&&e.jsx(E,{height:"10px",width:"10px",borderWidth:"3px"}),m&&e.jsx("button",{type:"submit",style:{fontSize:"16px"},className:"portfolio-account-info-submit-button",disabled:!0,children:"Saved! Redirecting."})]}),e.jsx("img",{src:F,className:"portfolio-account-info-image"})]})]})})};export{U as default};
