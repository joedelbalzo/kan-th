import{j as s,u as j,g as u,a as k,b as N,c as y,p as v,d as h,e as f}from"./index-64ac5149.js";import{B as R,p as $,a as B}from"./BackButton-cf8011c7.js";import{F as x,L as w,T as g,E as b,R as p}from"./ShareIcons-3e4b6df8.js";const C=({fillColor:e,post:n,shareType:d=null})=>{if(d=="generic"){const t=c=>{if(c==="facebook")window.open("https://www.facebook.com/sharer/sharer.php?u=https://www.joinvali.com","_blank");else if(c==="linkedin")window.open("https://www.linkedin.com/sharing/share-offsite/?url=https://www.joinvali.com","_blank");else if(c==="twitter")window.open("https://twitter.com/intent/tweet?text=https://www.joinvali.com","_blank");else if(c==="email"){const r="Check out Vali: https://www.joinvali.com";window.open(`mailto:?subject=Check out Vali&body=${r}`,"_blank")}else c==="reddit"&&window.open("https://www.reddit.com/submit?url=https://www.joinvali.com","_blank")};return s.jsxs("div",{className:"share-buttons",children:[s.jsxs("button",{onClick:()=>t("facebook"),children:[s.jsx(x,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Facebook"})]}),s.jsxs("button",{onClick:()=>t("linkedin"),children:[s.jsx(w,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"LinkedIn"})]}),s.jsxs("button",{onClick:()=>t("twitter"),children:[s.jsx(g,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Twitter"})]}),s.jsxs("button",{onClick:()=>t("email"),children:[s.jsx(b,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Email"})]}),s.jsxs("button",{onClick:()=>t("reddit"),children:[s.jsx(p,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Reddit"})]})]})}const{title:a,subtitle:m,images:i}=n,o=window.location.href,l=(t,c)=>{if(t==="facebook")window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(o)}&t=${a}`,"_blank");else if(t==="linkedin")window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(o)}`,"_blank");else if(t==="twitter"){const r=a+" "+encodeURIComponent(o)+(imageUrl?" "+imageUrl:"");window.open(`https://twitter.com/intent/tweet?text=${r}`,"_blank")}else if(t==="email"){const r=`Check out this article on Vali: ${o} 

${c.title}`;window.open(`mailto:?subject=${a}&body=${encodeURIComponent(r)}`,"_blank")}else t==="reddit"&&window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(o)}&title=${a}`,"_blank")};return s.jsxs("div",{className:"share-buttons",children:["Share:",s.jsxs("button",{onClick:()=>l("facebook",n),children:[s.jsx(x,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Facebook"})]}),s.jsxs("button",{onClick:()=>l("linkedin",n),children:[s.jsx(w,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"LinkedIn"})]}),s.jsxs("button",{onClick:()=>l("twitter",n),children:[s.jsx(g,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Twitter"})]}),s.jsxs("button",{onClick:()=>l("email",n),children:[s.jsx(b,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Email"})]}),s.jsxs("button",{onClick:()=>l("reddit",n),children:[s.jsx(p,{fillColor:e})," ",s.jsx("span",{style:{margin:2},className:"share-buttons-text",children:"Reddit"})]})]})};const T=()=>{j(),u(),k(),N();const e=y(i=>i.blogposts.currentBlogpost);if(!e)return null;const{homePic:n,bannerPic:d,contentPic:a}=v(e),m=i=>{const o=/%% banner picture goes here %%/g,l=/%% content picture goes here %%/g;return d&&(i=i.replace(o,`<div><img src="${d.awsPicURL}" style="height: 240px; width: 100%; object-fit: contain;" /></div>`)),a&&(i=i.replace(l,`<img src="${a.awsPicURL}" style="height: 240px; width: 180px; object-fit: contain;" />`)),i=$.sanitize(i),B(i)};return s.jsxs("div",{children:[s.jsxs(h,{to:"../",className:"single-post-back-button",children:[s.jsx(R,{strokeColor:"#183333"})," Back to Blog"]}),s.jsxs("div",{className:"single-post-grid",children:[s.jsx("div",{className:"single-post-heading-div",children:s.jsxs("div",{className:"single-post-headliner",children:[s.jsx("h1",{className:"single-post-title",children:e.title}),s.jsxs("h2",{className:"single-post-subtitle",children:[s.jsxs("span",{className:"single-post-date",children:[s.jsx("br",{}),"Date: ",f(e.publishedAt)]}),s.jsx("div",{style:{fontSize:"14px"},children:s.jsx(C,{fillColor:"whitesmoke",post:e})}),s.jsxs("div",{className:"single-post-tags",children:["Tags:",e.tags[0]&&s.jsx(h,{to:`/blog/tags/${e.tags[0].id}`,style:{marginLeft:4},children:e.tags[0].name},e.tags[0].id),",",e.tags[1]&&s.jsx(h,{to:`/blog/tags/${e.tags[1].id}`,style:{marginLeft:4},children:e.tags[1].name},e.tags[1].id),",",e.tags[2]&&s.jsxs(h,{to:`/blog/tags/${e.tags[2].id}`,style:{marginLeft:4},children:[e.tags[2].name," "]},e.tags[2].id)]})]}),n&&s.jsx("div",{className:"single-post-home-picture",children:s.jsx("img",{src:n.awsPicURL,alt:n.altText})})]},e.id)}),s.jsxs("div",{className:"single-post-body",children:[e.subtitle,m(e.content)]})]}),s.jsxs("div",{className:"post-content",children:[s.jsx("br",{}),s.jsx("br",{})]})]})};export{T as default};
