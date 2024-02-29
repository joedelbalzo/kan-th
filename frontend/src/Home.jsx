//React Imports
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

//Component Imports
import FinanceBar from "./assets/FinanceBar";
import Seedling from "./assets/Seedling";
import Links from "./assets/Links";
import { FadeComponent } from "./assets/FadeComponent";
import PieChart from "./assets/BusinessIcons/PieChart";
import JoinMailingList from "./Components/JoinMailingList";
import { useScrollToTop } from "./Components/functions";

import { aboutTripImg, woodworkerImg, yesWereOpenImg } from "./assets/ImageObjects";

//Store Imports

function Home() {
  useScrollToTop();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //text
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  //motion
  const controls = useAnimation();
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const [width] = useWindowSize();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const transition = {
    type: "spring",
    damping: 10,
    stiffness: 50,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === ref1.current) controls1.start({ opacity: 1, y: 0 });
            if (entry.target === ref2.current) controls2.start({ opacity: 1, y: 0 });
            if (entry.target === ref3.current) controls3.start({ opacity: 1, y: 0 });
            if (entry.target === ref4.current) controls4.start({ opacity: 1, y: 0 });
            if (entry.target === ref5.current) controls5.start({ opacity: 1, y: 0 });
          }
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px -20px 0px" }
    );

    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
    observer.observe(ref4.current);
    observer.observe(ref5.current);

    return () => observer.disconnect();
  }, []);

  return (
    <FadeComponent>
      {/* HOME DIV */}
      <motion.div variants={container} initial="hidden" animate="show">
        <div>
          <div className="home-div">
            <div className="home-div-inner">
              <div className="home-div-text">
                <h1 className="home-div-title">Financing shouldn't be a guessing game.</h1>
                <motion.div variants={child} className="home-div-subtitle">
                  <h2>Small and medium business owners deserve better.</h2>
                </motion.div>
                <motion.div variants={child} className="home-div-body">
                  <Link to="/login" className="lets-go" style={{ cursor: "pointer", color: "white", outline: "2px solid white" }}>
                    {"   "}Let's go.
                  </Link>
                </motion.div>
              </div>
              <div className="home-div-image">
                <img src={yesWereOpenImg.src} alt={yesWereOpenImg.alt} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="about-body-container">
        <JoinMailingList />

        <div className="vali-body-about">
          <motion.div ref={ref1} initial={{ opacity: 0, y: "100px" }} animate={controls1} transition={transition}>
            <div id="vali-body-about-first">
              <main>
                Vali was founded and developed in the fall of 2023, but as the co-founders began to persue other ventures, the platform was
                moved to the back burner. I enjoyed developing this with them, and I hope you enjoy our content. <br />
                <br />
                If you would like to explore the administrative capabilites and backend technologies a user would have enjoyed, please
                contact me for the proper login information.
                <br />
                <br />
                At Vali, we blend our expertise in finance with innovative technology to offer comprehensive valuation services that are
                both accessible and reliable. Our mission at Vali is to demystify the business valuation process and make it a powerful tool
                for SMB owners. <br />
                <br />
              </main>
              <div id="svg-picture-overlay-container">
                <PieChart alt={"Image of a pie chart graph."} />
                <img src={woodworkerImg.src} alt={woodworkerImg.alt} id="about-image" />
              </div>
            </div>
            {/* </motion.div>

          <motion.div ref={ref2} initial={{ opacity: 0, y: "100px" }} animate={controls2} transition={transition}> */}
          </motion.div>

          <motion.div ref={ref2} initial={{ opacity: 0, y: "100px" }} animate={controls2} transition={transition}>
            <div id="vali-body-about-second">
              <div className="vali-body-about-second-picture">
                <img src={aboutTripImg.src} alt={aboutTripImg.alt} />
              </div>
              <main className="vali-body-about-second-text">
                We believe that understanding the true value of your business is not just a financial exercise but a strategic move to
                secure your future, leverage growth opportunities, and plan for long-term success: <br />{" "}
                <ul className="vali-about-list">
                  <li>
                    <strong>Comprehensive Business Valuation</strong>: Utilizing a blend of market-based, income-based, and asset-based
                    approaches to provide a holistic view of your business's value.
                  </li>
                  <li>
                    <strong>Strategic Advisory</strong>: Offering insights on how to increase your business's value based on its current
                    valuation, and identifying opportunities for growth.
                  </li>
                  <li>
                    <strong>Financing Assistance</strong>: Guiding you on how your valuation can aid in securing financing, whether through
                    debt or equity.
                  </li>
                  <li>
                    <strong>Competitive Analysis</strong>: Comparing your business with industry benchmarks to identify strengths,
                    weaknesses, and areas for improvement.
                  </li>
                  <li>
                    <strong>Preparation for Sale or Acquisition</strong>: Assisting in getting your business 'sale-ready' by providing a
                    credible and comprehensive valuation report.
                  </li>
                </ul>
              </main>
            </div>
          </motion.div>
          <JoinMailingList />

          <motion.div ref={ref3} initial={{ opacity: 0, y: "100px" }} animate={controls3} transition={transition}>
            <div id="vali-body-about-third">
              <main>
                So, why choose us? Expertise, customized solutions, transparency, and a technology-driven approach. Our vision is to become
                the most trusted partner for small and medium business owners in understanding and enhancing their business value. We strive
                to turn valuation from a mere number into a roadmap for success, and we look forward to going on this journey with you.
              </main>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="home-content">
        <motion.div
          ref={ref4}
          initial={{ opacity: 0, y: "100px" }}
          animate={controls4}
          transition={transition}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div className="home-content-images" style={{ display: "flex" }}>
            <div className="home-content-images-1">
              <FinanceBar width={"30vw"} height={"20vh"} />
              <div>We compare your data across benchmarks set by thousands of companies to see how you stack up in your industry.</div>
            </div>
            <div className="home-content-images-2">
              <Seedling width={"30vw"} height={"20vh"} />
              <div>
                Get access to dozens of lenders and business partners who can use your valuations to provide you with great rates and
                fundraising vehicles to grow your business.
              </div>
            </div>
            <div className="home-content-images-3">
              <Links width={"30vw"} height={"20vh"} />
              <div>
                Together, we can improve and grow your business using our tools and methodologies that will make you proud of what you've
                built.
              </div>
            </div>
          </div>
        </motion.div>

        {/* JOIN NOW */}
        <motion.div
          ref={ref5}
          initial={{ opacity: 0, y: "100px" }}
          animate={controls5}
          transition={transition}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div className="lets-go">
            <Link to="/login">Let's Go! &rarr;</Link>
          </div>
        </motion.div>
      </div>
    </FadeComponent>
  );
}

export default Home;
