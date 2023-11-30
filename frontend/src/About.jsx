//React Imports
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

//Component Imports
import openSign from "./assets/pexels-tim-mossholder-3345876.jpg";
import FinanceBar from "./assets/FinanceBar";
import Seedling from "./assets/Seedling";
import Links from "./assets/Links";
import { FadeComponent } from "./assets/FadeComponent";

//Store Imports

function About() {
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
      { threshold: 0.1, rootMargin: "0px 0px 0px 0px" }
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
                <motion.div variants={child} className="home-div-subtitle">
                  <h2>Small and medium business owners deserve better.</h2>
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
      <div className="about-container">
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
          <div className="about-content">
            <div className="vali-about">
              <div className="vali-text">
                <h1 style={{ textAlign: "center" }}>Welcome to Vali</h1>
                <main>
                  A pioneer in SMB valuations dedicated to empowering small and medium-sized businesses with crucial financial insights. At
                  Vali, we blend our expertise in finance with innovative technology to offer comprehensive valuation services that are both
                  accessible and reliable. Our mission at Vali is to demystify the business valuation process and make it a powerful tool
                  for SMB owners. We believe that understanding the true value of your business is not just a financial exercise but a
                  strategic move to secure your future, leverage growth opportunities, and plan for long-term success.
                </main>
                <br />
                <main>
                  Vali offers a range of valuation services tailored to the unique needs of SMBs. From detailed valuation reports to
                  strategic consulting, we cover all aspects of business valuation. Our services are based on transparent, time-tested
                  methods, ensuring that you receive a valuation that truly reflects your business’s worth.
                  <ul>
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
                <main>
                  Why choose us? Expertise, customized solutions, transparency, and a technology-driven approach. Our vision is to become
                  the most trusted partner for small and medium business owners worldwide in understanding and enhancing their business
                  value. We strive to turn valuation from a mere number into a roadmap for success, and we look forward to being your
                  partner.
                </main>
              </div>
              <div className="vali-picture">
                <img src="https://prohygiene.com/usa/wp-content/uploads/sites/18/2015/12/placeholder.gif" width="320" height="480" />
              </div>
            </div>
            <div className="kanica-about">
              <div className="kanica-text">
                <h1>Founder: Kanica Allagh</h1>
                <p>
                  After spending 10 years in finance, from capital markets to investing, I came in close contact to valuation and financing
                  decision making for enterprises. I began noticing how these skills and products are gapped for SMBs, those who would
                  benefit the most.{" "}
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
              <div>We compare your data across benchmarks set by thousands of companies to see how you stack up in your industry.</div>
            </div>
            <div className="home-content-images-2">
              <Seedling width={"20vw"} height={"20vh"} />
              <div>
                Get access to dozens of lenders and business partners who can use your valuations to provide you with great rates and
                fundraising vehicles to grow your business.
              </div>
            </div>
            <div className="home-content-images-3">
              <Links width={"20vw"} height={"20vh"} />
              <div>
                Together, we can improve and grow your business using our tools and methodologies that will make you billionaires in
                minutes.
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

export default About;
