// //React Imports
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// //Component Imports
// import Login from "./Login";
// import Nav from "./Nav";

// //Store Imports
// // import { fetchPublishedBlogposts } from "./store";

// const Search = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { auth } = useSelector((state) => state);

//   if (!auth) {
//     return null;
//   }

//   return (
//     <div>
//       {blogposts.map((blogpost) => {
//         return (
//           <div key={blogpost.id}>
//             Title: {blogpost.title}
//             <br />
//             Date: {blogpost.publishedAt}
//             <br />
//             Content: {blogpost.content}
//             <br />
//             <br />
//             <hr />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Search;
