const t=n=>{let i=null,e=null,r=null;if(n.images)for(let l of n.images)l.position==="home"?i=l:l.position==="content"?r=l:l.position==="banner"&&(e=l);return{homePic:i,bannerPic:e,contentPic:r}},o=n=>{if(!n)return null;let i=n.slice(0,4),e=n.slice(5,7),r=n.slice(8,n.indexOf("T")),l=[0,"January","February","March","April","May","June","July","August","September","October","November","December"];return e[0]==0?e=l[e[1]]:e=l[e],`${e} ${r}, ${i}`};export{t as p,o as r};
//# sourceMappingURL=functions-804fb0d9.js.map
