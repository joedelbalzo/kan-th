import{r as l,_ as c,u as o,a as g,b as m,j as s,F as h,L as a,c as x}from"./index-4eff5fbb.js";import{S as n,p as j,a as p}from"./ShareButtons-f2ad007c.js";import{p as u,r as N}from"./functions-804fb0d9.js";const v=l.lazy(()=>c(()=>import("./SideNav-63abf612.js"),["assets/SideNav-63abf612.js","assets/index-4eff5fbb.js","assets/index-156be5a1.css"])),$=()=>{o(),g(),l.useState(!0);const t=m(e=>e.blogposts.allBlogposts);if(!t||!t[0])return null;const d=e=>(e=j.sanitize(e),e=e.split(" ").splice(0,25).join(" "),p(e));let i;for(let e of t[0].images)e.position==="home"&&(i=e);return s.jsx(h,{children:s.jsxs("div",{children:[s.jsx("div",{className:"post-headliner",children:s.jsxs("div",{className:"post-container",children:[i!=null?s.jsx("img",{src:i.awsPicURL,className:"post-headline-div-picture"}):"",s.jsxs("div",{className:"post-title-div",children:[s.jsx(a,{to:`/blog/posts/${t[0].id}`,style:{textDecoration:"none",color:"inherit"},children:s.jsx("h2",{children:t[0].title})}),s.jsx("h3",{style:{fontWeight:400},children:t[0].subtitle}),s.jsxs("div",{className:"post-tags",children:["Tags:",t[0].tags[0]?s.jsx(a,{to:`/blog/tags/${t[0].tags[0].id}`,style:{marginLeft:4},children:t[0].tags[0].tagName},t[0].tags[0].id):"",",",t[0].tags[1]?s.jsx(a,{to:`/blog/tags/${t[0].tags[1].id}`,style:{marginLeft:4},children:t[0].tags[1].tagName},t[0].tags[1].id):"",",",t[0].tags[2]?s.jsxs(a,{to:`/blog/tags/${t[0].tags[2].id}`,style:{marginLeft:4},children:[t[0].tags[2].tagName," "]},t[0].tags[2].id):""]}),s.jsx(n,{}),s.jsxs("div",{className:"post-body",children:[d(t[0].content)," ",s.jsx(a,{to:`/blog/posts/${t[0].id}`,children:"...read more"})]})]})]})},t[0].id),s.jsxs("div",{className:"post-grid",children:[s.jsx("div",{className:"post-info",children:s.jsx(l.Suspense,{fallback:s.jsxs("div",{children:[s.jsx(x,{}),"Loading Posts..."]}),children:s.jsx(v,{})})}),t.filter(e=>e!==t[0]).map(e=>{let{homePic:r}=u(e);return s.jsx("div",{className:"post-content",children:s.jsxs("div",{className:"post-container",children:[r!=null?s.jsx("img",{src:r.awsPicURL,className:"post-div-picture"}):"",s.jsxs("div",{className:"post-title-div",children:[s.jsxs("span",{className:"post-date",children:["Date: ",N(e.publishedAt)]}),s.jsx(a,{to:`/blog/posts/${e.id}`,style:{textDecoration:"none",color:"inherit"},children:s.jsx("h2",{children:e.title})}),s.jsx("h3",{style:{fontWeight:400},children:e.subtitle}),s.jsxs("div",{className:"post-tags",children:["Tags:",e.tags[0]?s.jsx(a,{to:`/blog/tags/${e.tags[0].id}`,style:{marginLeft:4},children:e.tags[0].tagName},e.tags[0].id):"",",",e.tags[1]?s.jsx(a,{to:`/blog/tags/${e.tags[1].id}`,style:{marginLeft:4},children:e.tags[1].tagName},e.tags[1].id):"",",",e.tags[2]?s.jsxs(a,{to:`/blog/tags/${e.tags[2].id}`,style:{marginLeft:4},children:[e.tags[2].tagName," "]},e.tags[2].id):""]}),s.jsx(n,{}),s.jsxs("div",{className:"post-body",children:[d(e.content)," ",s.jsx(a,{to:`./blog/posts/${e.id}`,children:"...read more"})]})]}),s.jsx("div",{className:"post-bottom-border"})]})},e.id)})]})]})})};export{$ as default};
//# sourceMappingURL=Blogposts-e915d0e5.js.map
