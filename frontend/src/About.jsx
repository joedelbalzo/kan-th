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
import { businessPaperImg } from "./assets/ImageObjects";
import PieChart from "./assets/BusinessIcons/PieChart";
import Graph from "./assets/BusinessIcons/Graphj";
import { useScrollToTop } from "./Components/functions";

//Store Imports

function About() {
  useScrollToTop();

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
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
    // observer.observe(ref4.current);
    // observer.observe(ref5.current);

    return () => observer.disconnect();
  }, []);

  return (
    <FadeComponent>
      {/* HOME DIV */}
      <motion.div variants={container} initial="hidden" animate="show">
        <div>
          <div className="about-div-container">
            <div className="about-div-inner">
              <div className="about-div-text">
                <h1 className="about-title">Vali </h1>
                <motion.div variants={child} className="about-subtitle">
                  <h2 style={{ gridColumn: "1/-1" }}>
                    Dedicated to empowering small and medium-sized businesses with crucial financial insights.
                  </h2>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ABOUT CONTENT */}
      <div className="about-body-container">
        <motion.div variants={child} className="about-body-header">
          <h1>We're a small, privately owned company, just like yours.</h1>
          <br />
          <h2>We're ready to be your partner in this journey.</h2>
        </motion.div>

        <motion.div ref={ref1} initial={{ opacity: 0, y: "50px" }} animate={controls1} transition={transition}>
          <div className="kanica-about">
            <div className="kanica-heading">
              <div>
                <h1>Founder Name</h1>
                <h2>Founder</h2>
                <span style={{ marginTop: "1rem" }}>
                  <a href="https://www.linkedin.com/">LinkedIn</a>
                  <br />
                  <a href="mailto:contact.us.at.vali@usevali.com">contact.us.at.vali@usevali.com</a>
                </span>
              </div>
              <img
                src={
                  "https://images.unsplash.com/photo-1553484771-11998c592b9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                className="kanica-picture"
              />
            </div>
            <div className="kanica-text">
              <p>
                After spending 10 years in finance, from capital markets to investing, I came in close contact to valuation and financing
                decision making for enterprises. I began noticing how these skills and products are gapped for SMBs, those who would benefit
                the most.{" "}
              </p>
              <p>
                After experiencing the high growth environment Capsule, I saw firsthand the excitement and challenges of providing new
                products to underserved users.
              </p>
              <p>
                Finally, I personally care about this problem. After advising close friends and relatives in the valuations of their
                hard-earned businesses, I became completely overwhelmed with the problem and excited about the opportunity to serve this
                market.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div ref={ref2} initial={{ opacity: 0, y: "10px" }} animate={controls2} transition={transition}>
        <div className="home-content-images" style={{ display: "flex" }}>
          <div className="home-content-images-1">
            <FinanceBar width={"25vw"} height={"15vh"} />
            <div>We compare your data across benchmarks set by thousands of companies to see how you stack up in your industry.</div>
          </div>
          <div className="home-content-images-2">
            <Seedling width={"25vw"} height={"15vh"} />
            <div>
              Get access to dozens of lenders and business partners who can use your valuations to provide you with great rates and
              fundraising vehicles to grow your business.
            </div>
          </div>
          <div className="home-content-images-3">
            <Links width={"25vw"} height={"15vh"} />
            <div>
              Together, we can improve and grow your business using our tools and methodologies that will make you proud of what you've
              built.
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div ref={ref3} initial={{ opacity: 0, y: "50px" }} animate={controls3} transition={transition}>
        <div className="lets-go">
          <Link to="/login">Let's Go! &rarr;</Link>
        </div>
      </motion.div>
    </FadeComponent>
  );
}

export default About;
