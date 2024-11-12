import{c as S,a as C,b as k,r as l,j as e,L as E,a3 as w}from"./index-cc4eeadf.js";import{P as L}from"./PortfolioNav-f4b1416a.js";const D="/assets/pexels-tim-douglas-10ad722b.webp",I=()=>{const s=S(a=>a.auth),f=C(),p=k(),[d,r]=l.useState(!1),[m,u]=l.useState(!1),[F,h]=l.useState("");if(!s)return null;const[t,x]=l.useState({firstName:s&&s.firstName?s.firstName:"",lastName:s&&s.lastName?s.lastName:"",businessName:s&&s.businessName?s.businessName:"",email:s&&s.email?s.email:"",city:s&&s.city?s.city:"",state:s&&s.state?s.state:"",updates:s&&typeof s.updates=="boolean"?s.updates:!0}),[o,N]=l.useState({}),i=a=>{const{name:c,value:n,type:g,checked:v}=a.target,y=g==="checkbox"?v:n;x({...t,[c]:y})},b=()=>{const a={};return t.firstName.trim()||(a.firstName="First Name is required"),t.lastName.trim()||(a.lastName="Last Name is required"),t.email.trim()?/^\S+@\S+\.\S+$/.test(t.email)||(a.email="Invalid email format"):a.email="Email is required",N(a),Object.keys(a).length===0},j=a=>{if(a.preventDefault(),b()){async function c(){try{r(!0),await p(w(t,s)).then(()=>{r(!1),u(!0),setTimeout(()=>{f("/portfolio/home"),u(!1)},2e3),console.log("Dispatch successful")})||r(!1)}catch(n){console.log(n),h("Could not change portfolio. We'll get right on it!")}}c()}};return e.jsx("div",{children:e.jsxs("div",{className:"portfolio-grid",children:[e.jsx(L,{}),e.jsx("div",{className:"portfolio-account-info-home-div",children:s.isNewUser?e.jsx("div",{className:"portfolio-account-info-home-div-inner",children:"Welcome! Let's personalize your experience."}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"portfolio-account-info-home-div-inner",children:"Edit Account Settings"})})}),e.jsxs("div",{className:"portfolio-account-info",children:[e.jsxs("form",{className:"portfolio-grid-form",onSubmit:j,children:[e.jsx("label",{children:"First Name:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"firstName",value:t.firstName,onChange:i}),o.firstName&&e.jsx("span",{className:"error",children:o.firstName}),e.jsx("label",{children:"Last Name:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"lastName",value:t.lastName,onChange:i}),o.lastName&&e.jsx("span",{className:"error",children:o.lastName}),e.jsx("label",{children:"Company:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"businessName",value:t.businessName,onChange:i}),e.jsx("label",{children:"Email:"}),e.jsx("input",{type:"email",className:"portfolio-form-input-fields",name:"email",value:t.email,onChange:i}),o.email&&e.jsx("span",{className:"error",children:o.email}),e.jsx("label",{children:"City:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"city",value:t.city,onChange:i}),e.jsx("label",{children:"State:"}),e.jsx("input",{type:"text",className:"portfolio-form-input-fields",name:"state",value:t.state,onChange:i}),e.jsxs("div",{className:"checkbox",children:[e.jsx("label",{className:"checkbox-label",children:"Subscribe for Updates?"}),e.jsx("input",{type:"checkbox",className:"checkbox-input",name:"updates",checked:t.updates,onChange:i})]}),!m&&e.jsx("button",{type:"submit",className:"portfolio-account-info-submit-button",children:"Submit"}),d&&e.jsx(E,{height:"10px",width:"10px",borderWidth:"3px"}),m&&e.jsx("button",{type:"submit",style:{fontSize:"16px"},className:"portfolio-account-info-submit-button",disabled:!0,children:"Saved! Redirecting."})]}),e.jsx("img",{src:D,className:"portfolio-account-info-image"})]})]})})};export{I as default};
