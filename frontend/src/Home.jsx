//React Imports
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

//Component Imports
import FinanceBar from "./assets/FinanceBar";
import Seedling from "./assets/Seedling";
import Links from "./assets/Links";
import { FadeComponent } from "./assets/FadeComponent";
import PieChart from "./assets/BusinessIcons/PieChart";
import JoinMailingList from "./Components/JoinMailingList";
import { useScrollToTop } from "./Components/functions";
import AnimatedSection from "./Components/AnimatedSections";
import { aboutTripImg, woodworkerImg, yesWereOpenImg, texturedBackgroundImg } from "./assets/ImageObjects";
import SectionBackground from "./assets/SectionBackground";

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

  return (
    <FadeComponent>
      <ParallaxProvider>
        <motion.div variants={container} initial="hidden" animate="show">
          <div>
            <div className="home-div">
              <div className="home-div-inner">
                <div className="home-div-text">
                  <h1 className="home-div-title">Financing shouldn't be a guessing game.</h1>
                  <motion.div variants={child} className="home-div-subtitle">
                    <h2>Your business deserves better.</h2>
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
          <div style={{ padding: "3rem 0" }}></div>
          <JoinMailingList />

          <div className="vali-body-about">
            <AnimatedSection>
              <div id="vali-body-about-first">
                <main>
                  Vali was founded and developed in the fall of 2023, but as the co-founders began to persue other ventures, the platform
                  was moved to the back burner. I enjoyed developing this with them, and I hope you enjoy our content. <br />
                  <br />
                  If you would like to explore the administrative capabilites and backend technologies a user would have enjoyed, please
                  contact me for the proper login information.
                  <br />
                  <br />
                  At Vali, we blend our expertise in finance with innovative technology to offer comprehensive valuation services that are
                  both accessible and reliable. Our mission at Vali is to demystify the business valuation process and make it a powerful
                  tool for SMB owners. <br />
                  <br />
                </main>
                <div id="svg-picture-overlay-container">
                  <Parallax speed={8}>
                    <PieChart alt={"Image of a pie chart graph."} />
                  </Parallax>
                  <img src={woodworkerImg.src} alt={woodworkerImg.alt} style={{ zIndex: "-10" }} id="about-image" />
                </div>
              </div>
            </AnimatedSection>
          </div>
          <div className="blue-text-divs" id="blue-text-div-one">
            <div id="vali-body-about-third">
              <div className="parallax-background">
                <Parallax speed={10}>
                  <SectionBackground />
                </Parallax>
              </div>
              <div className="parallax-content">
                We believe that understanding the true value of your business is not just a financial exercise, but a strategic move to
                secure your future, leverage growth opportunities, and plan for long-term success.
              </div>
            </div>
          </div>

          <div className="vali-body-about">
            <AnimatedSection>
              <div id="vali-body-about-second">
                <div className="vali-body-about-second-picture">
                  <img src={aboutTripImg.src} alt={aboutTripImg.alt} />
                </div>
                <main className="vali-body-about-second-text">
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
                      <strong>Financing Assistance</strong>: Guiding you on how your valuation can aid in securing financing, whether
                      through debt or equity.
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
            </AnimatedSection>
          </div>

          <JoinMailingList />
          <div className="home-content">
            <AnimatedSection>
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
                    Together, we can improve and grow your business using our tools and methodologies that will make you proud of what
                    you've built.
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection>
            <div className="blue-text-divs" id="blue-text-div-two">
              <div id="vali-body-about-third">
                <main>
                  Our vision is to become the most trusted partner for small and medium business owners in understanding and enhancing their
                  business value.
                  <br />
                  <br />
                  We strive to turn valuation from a mere number into a roadmap for success, and we look forward to going on this journey
                  with you.
                </main>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <div className="lets-go">
          <Link to="/login">Let's Go! &rarr;</Link>
        </div>
      </ParallaxProvider>
    </FadeComponent>
  );
}

export default Home;
