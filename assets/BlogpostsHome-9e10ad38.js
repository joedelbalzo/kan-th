import{r as o,_ as N,u as L,a as B,b as C,c as j,j as e,L as f,F as D,d as n,p as R,e as k,R as b,f as E}from"./index-5e1333bd.js";import{B as v,p as S,a as A}from"./BackButton-2521ff9f.js";o.lazy(()=>N(()=>import("./SubNav-d7da1b27.js"),["assets/SubNav-d7da1b27.js","assets/index-5e1333bd.js","assets/index-cb9e2984.css"]));const I=o.lazy(()=>N(()=>import("./index-5e1333bd.js").then(d=>d.aa),["assets/index-5e1333bd.js","assets/index-cb9e2984.css"])),z=()=>{L(),B();const d=C(),[$,y]=o.useState(!0),c=j(s=>s.tags),[T,x]=o.useState(1234);let t=j(s=>s.blogposts.allBlogposts);const[_,m]=o.useState(t);if(o.useEffect(()=>{if(t)y(!1),m(t);else return e.jsx(f,{})},[t]),!t||!t[0])return null;let i=t.find(s=>s.title=="What Is Your Valuation and Why Does It Matter?"),r;if(i.images)for(let s of i.images)s.position==="home"&&(r=s);else return;const g=(s,a)=>(s=S.sanitize(s),s=s.split(". ").splice(0,2).join(". ")+".",A(s)),h={id:1234,name:"All Posts"};c.some(s=>s.id===h.id&&s.name===h.name)||c.unshift(h);const P=s=>{if(s==="1234")m(t),x(1234);else{const a=t.filter(l=>l.tags.some(p=>p.id===s));m(a),x(s)}},u=s=>{console.log("attempt",s),d(E(s))};return e.jsx(D,{children:t.length<1?e.jsx("div",{children:e.jsx(f,{})}):e.jsxs("div",{children:[e.jsx("div",{className:"post-headliner",children:e.jsxs("div",{className:"post-container",children:[r!=null?e.jsx("img",{src:r.awsPicURL,alt:r.altText,className:"post-headline-div-picture"}):"",e.jsxs("div",{className:"post-title-div",children:[e.jsx(n,{to:`/blog/posts/${i.id}`,onClick:()=>u(i.id),style:{textDecoration:"none",color:"inherit"},children:e.jsx("h2",{children:i.title})}),e.jsxs("div",{className:"post-body",children:[g(i.content)," "]}),e.jsxs(n,{to:`/blog/posts/${i.id}`,id:"read-more",children:["read more ",e.jsx(v,{facingRight:!0,strokeColor:"whitesmoke"})]})]})]})},i.id),e.jsxs("div",{className:"post-grid",children:[e.jsxs("div",{className:"post-info",style:{marginTop:"2rem"},children:[e.jsx(I,{}),e.jsxs("div",{className:"tag-styles-container",style:{marginTop:"2rem",marginBottom:"0"},children:["sort by tags:",e.jsx("select",{className:"tag-styles",value:T,onChange:s=>P(s.target.value),children:c.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))})]})]}),_.filter(s=>s!==i).map(s=>{let{homePic:a}=R(s);return e.jsxs("div",{className:"post-content",children:[e.jsxs("div",{className:"post-container",children:[a!=null?e.jsx("img",{src:a.awsPicURL,alt:a.altText,className:"post-div-picture"}):"",e.jsxs("div",{className:"post-title-div",children:[e.jsx(n,{to:`/blog/posts/${s.id}`,onClick:()=>u(s.id),style:{textDecoration:"none",color:"inherit"},children:e.jsx("h2",{children:s.title})}),e.jsx("h3",{style:{fontWeight:350},children:s.subtitle}),e.jsxs("div",{className:"post-tags",style:{marginTop:"1rem"},children:[e.jsxs("span",{className:"post-date",children:["Date: ",k(s.publishedAt)," "]}),"|| Tags:",s.tags.map((l,p)=>e.jsxs(b.Fragment,{children:[p>0&&", ",e.jsx(n,{to:`/blog/tags/${l.id}`,style:{marginLeft:4},children:l.name})]},l.id))]}),e.jsxs("div",{className:"post-body",children:[g(s.content),e.jsxs(n,{to:`./blog/posts/${s.id}`,children:["read more",e.jsx(v,{height:"16px",facingRight:!0,strokeColor:"#183333"})]})]})]})]}),e.jsx("div",{className:"post-bottom-border",children:" "})]},s.id)})]})]})})};export{z as default};
