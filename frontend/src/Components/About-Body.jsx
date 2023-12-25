// //React Imports
// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { motion, useAnimation } from "framer-motion";

// //Component Imports
// // import construction from "./assets/pexels-ivan-samkov.webp";
// // import aboutTrip from "./assets/about-trip.webp";
// // import PieChart from "./assets/BusinessIcons/PieChart";
// import { pieChartImg, aboutTripImg, woodworkerImg } from "../assets/ImageObjects";

// //Store Imports

// function AboutBody() {
//   console.log("about body page?");
//   const controls1 = useAnimation();
//   const controls2 = useAnimation();
//   const controls3 = useAnimation();
//   const controls4 = useAnimation();
//   const controls5 = useAnimation();

//   const ref1 = useRef(null);
//   const ref2 = useRef(null);
//   const ref3 = useRef(null);
//   const ref4 = useRef(null);
//   const ref5 = useRef(null);

//   const transition = {
//     type: "spring",
//     damping: 10,
//     stiffness: 50,
//   };

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             if (entry.target === ref1.current) controls1.start({ opacity: 1, y: 0 });
//             if (entry.target === ref2.current) controls2.start({ opacity: 1, y: 0 });
//             if (entry.target === ref3.current) controls3.start({ opacity: 1, y: 0 });
//             if (entry.target === ref4.current) controls4.start({ opacity: 1, y: 0 });
//             // if (entry.target === ref5.current) controls5.start({ opacity: 1, y: 0 });
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: "0px 0px 0px 0px" }
//     );

//     observer.observe(ref1.current);
//     observer.observe(ref2.current);
//     observer.observe(ref3.current);
//     observer.observe(ref4.current);
//     // observer.observe(ref5.current);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="about-body-container">
//       <div className="vali-body-about">
//         <motion.div ref={ref1} initial={{ opacity: 0, y: "100px" }} animate={controls1} transition={transition}>
//           <div id="vali-body-about-first">
//             <main>
//               At Vali, we blend our expertise in finance with innovative technology to offer comprehensive valuation services that are both
//               accessible and reliable. Our mission at Vali is to demystify the business valuation process and make it a powerful tool for
//               SMB owners. <br />
//               <br />
//               We believe that understanding the true value of your business is not just a financial exercise but a strategic move to secure
//               your future, leverage growth opportunities, and plan for long-term success. <br />
//             </main>
//             <div id="svg-picture-overlay-container">
//               <img src={pieChartImg.src} alt={pieChartImg.alt} id="piechart-svg" />
//               <img src={construction} id="about-image" />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div ref={ref2} initial={{ opacity: 0, y: "100px" }} animate={controls2} transition={transition}>
//           <div id="vali-body-about-second">
//             <div className="vali-body-about-second-picture">
//               <img src={aboutTrip} />
//             </div>
//             <main className="vali-body-about-second-text">
//               We're excited to go on this journey of financial awareness and freedom with you. Here is how we get there:
//               <ul className="vali-about-list">
//                 <li>
//                   <strong>Comprehensive Business Valuation</strong>: Utilizing a blend of market-based, income-based, and asset-based
//                   approaches to provide a holistic view of your business's value.
//                 </li>
//                 <li>
//                   <strong>Strategic Advisory</strong>: Offering insights on how to increase your business's value based on its current
//                   valuation, and identifying opportunities for growth.
//                 </li>
//                 <li>
//                   <strong>Financing Assistance</strong>: Guiding you on how your valuation can aid in securing financing, whether through
//                   debt or equity.
//                 </li>
//                 <li>
//                   <strong>Competitive Analysis</strong>: Comparing your business with industry benchmarks to identify strengths, weaknesses,
//                   and areas for improvement.
//                 </li>
//                 <li>
//                   <strong>Preparation for Sale or Acquisition</strong>: Assisting in getting your business 'sale-ready' by providing a
//                   credible and comprehensive valuation report.
//                 </li>
//               </ul>
//             </main>
//           </div>
//         </motion.div>

//         <motion.div ref={ref3} initial={{ opacity: 0, y: "50px" }} animate={controls3} transition={transition}>
//           <div className="kanica-about">
//             <div className="kanica-text">
//               <h1>Founder: Kanica Allagh</h1>
//               <p>
//                 After spending 10 years in finance, from capital markets to investing, I came in close contact to valuation and financing
//                 decision making for enterprises. I began noticing how these skills and products are gapped for SMBs, those who would benefit
//                 the most.{" "}
//               </p>
//               <p>
//                 After experiencing the high growth environment Capsule, I saw firsthand the excitement and challenges of providing new
//                 products to underserved users.
//               </p>
//               <p>
//                 Finally, I personally care about this problem. After advising close friends and relatives in the valuations of their
//                 hard-earned businesses, I became completely overwhelmed with the problem and excited about the opportunity to serve this
//                 market.
//               </p>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div ref={ref4} initial={{ opacity: 0, y: "50px" }} animate={controls4} transition={transition}>
//           <div id="vali-body-about-third">
//             <main>
//               So, why choose us? Expertise, customized solutions, transparency, and a technology-driven approach. Our vision is to become
//               the most trusted partner for small and medium business owners in understanding and enhancing their business value. We strive
//               to turn valuation from a mere number into a roadmap for success, and we look forward to going on this journey with you.
//             </main>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default AboutBody;
