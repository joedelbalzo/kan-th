//React Imports
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

//Component Imports
import openSign from "./assets/pexels-tim-mossholder-3345876.jpg";
import FinanceBar from "./assets/FinanceBar";
import Seedling from "./assets/Seedling";
import Links from "./assets/Links";
import { FadeComponent } from "./assets/FadeComponent";

//Store Imports

function Home() {
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
  const [width] = useWindowSize();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

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
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);

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
                <motion.div variants={child}>
                  <h2 className="home-div-subtitle">
                    Small and medium business owners deserve better.
                  </h2>
                </motion.div>
                <motion.div variants={child} className="home-div-body">
                  Vali is here to help you get competitive funding quickly and easily.{"   "}
                  <Link to="/login" style={{ textDecoration: "underline", cursor: "pointer" }}>
                    {"   "}Let's go!
                  </Link>
                </motion.div>
              </div>
              <div className="home-div-image">
                <img src={openSign} />
                <div className="bottom-left">Get Started &rarr;</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* HOME CONTENT */}
      <div className="home-content">
        <motion.div
          ref={ref1}
          initial={{ opacity: 0, y: "50px" }}
          animate={controls1}
          transition={transition}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div className="home-content-about">
            Here is some more content that will fade up about us
          </div>
        </motion.div>
        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: "50px" }}
          animate={controls2}
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
              <FinanceBar width={"20vw"} height={"20vh"} />
              <div>
                We compare your data across benchmarks set by thousands of companies to see how you
                stack up in your industry.
              </div>
            </div>
            <div className="home-content-images-2">
              <Seedling width={"20vw"} height={"20vh"} />
              <div>
                Get access to dozens of lenders and business partners who can use your valuations to
                provide you with great rates and fundraising vehicles to grow your business.
              </div>
            </div>
            <div className="home-content-images-3">
              <Links width={"20vw"} height={"20vh"} />
              <div>
                Together, we can improve and grow your business using our tools and methodologies
                that will make you billionaires in minutes.
              </div>
            </div>
          </div>
        </motion.div>

        {/* JOIN NOW */}
        <motion.div
          ref={ref3}
          initial={{ opacity: 0, y: "50px" }}
          animate={controls3}
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
            <Link to="/login">Let's go! &rarr;</Link>
          </div>
        </motion.div>
      </div>
    </FadeComponent>
  );
}

export default Home;
