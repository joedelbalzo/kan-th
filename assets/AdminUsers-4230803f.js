import{a as v,b as A,r as a,c as C,j as e,d as w,L as U,e as B,Z as D}from"./index-4e6da72c.js";/* empty css                    */import{A as E}from"./AdminNav-a9b555ae.js";const R=()=>{v();const f=A(),[h,j]=a.useState([]),p=C(s=>s.auth),[m,y]=a.useState(!0);if(!p.id)return null;a.useEffect(()=>{async function s(){try{const r=await f(D());j(r.data),r.status==200&&y(!1)}catch{return null}}s()},[]),m==!1&&console.log("users loaded");const[u,x]=a.useState([]),[n,g]=a.useState("asc"),[N,b]=a.useState(null);a.useEffect(()=>{x(h)},[h]);const d=s=>{const r=[...u].sort((S,k)=>{let o=S[s]||"",c=k[s]||"";return s==="createdAt"&&(o=new Date(o).getTime(),c=new Date(c).getTime()),o<c?n==="asc"?-1:1:o>c?n==="asc"?1:-1:0});x(r),b(s),g(n==="asc"?"desc":"asc")},l=s=>N===s?n==="asc"?" ▲":" ▼":"",i=(s,r)=>s[r]||"No Input",t={header:{fontSize:"16px",borderBottom:"2px solid #183333",padding:10,borderRight:"1px solid gray"},fields:{fontSize:"14px",borderBottom:"1px solid grey",padding:10,borderRight:"1px solid gray",wordWrap:"normal"}};return e.jsxs("div",{style:{overflow:"auto"},children:[e.jsx(E,{}),e.jsxs(w,{to:"/admin",className:"image-upload-buttons",children:[" ","← Back"," "]}),e.jsx("h3",{className:"admin-header",children:"Here's the list of Users"}),e.jsx("div",{style:{width:"90%",margin:"0 auto"},children:e.jsxs("div",{style:{overflowX:"auto"},children:[m&&e.jsx(U,{}),e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsxs("th",{style:t.header,onClick:()=>d("username"),children:["Username ",l("username")]}),e.jsxs("th",{style:t.header,onClick:()=>d("firstName"),children:["First Name ",l("firstName")]}),e.jsxs("th",{style:t.header,onClick:()=>d("lastName"),children:["Last Name ",l("lastName")]}),e.jsxs("th",{style:t.header,onClick:()=>d("email"),children:["Email ",l("email")]}),e.jsxs("th",{style:t.header,onClick:()=>d("businessName"),children:["Business Name ",l("businessName")]}),e.jsxs("th",{style:{borderBottom:"2px solid black",padding:10},onClick:()=>d("createdAt"),children:["Created On ",l("createdAt")]})]})}),e.jsx("tbody",{children:u.map(s=>e.jsxs("tr",{children:[e.jsx("td",{style:t.fields,children:i(s,"username")}),e.jsx("td",{style:t.fields,children:i(s,"firstName")}),e.jsx("td",{style:t.fields,children:i(s,"lastName")}),e.jsx("td",{style:t.fields,children:i(s,"email")}),e.jsx("td",{style:t.fields,children:i(s,"businessName")}),e.jsx("td",{style:t.fields,children:B(i(s,"createdAt"))})]},s.id))})]})]})})]})};export{R as default};