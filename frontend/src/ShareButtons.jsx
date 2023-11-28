import React from "react";
import Email from "./assets/ShareIcons/Email.jsx";
import Facebook from "./assets/ShareIcons/Facebook.jsx";
import LinkedIn from "./assets/ShareIcons/LinkedIn.jsx";
import Reddit from "./assets/ShareIcons/Reddit.jsx";
import Twitter from "./assets/ShareIcons/Twitter.jsx";

const ShareButtons = ({ fillColor }) => {
  const url = window.location.href;

  const share = (platform) => {
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <div className="share-buttons">
      Share:
      <button onClick={() => share("facebook")}>
        <Facebook fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Facebook
        </span>
      </button>
      <button onClick={() => share("linkedin")}>
        <LinkedIn fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          LinkedIn
        </span>
      </button>
      <button onClick={() => share("twitter")}>
        <Twitter fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Twitter
        </span>
      </button>
      <button onClick={() => share("email")}>
        <Email fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Email
        </span>
      </button>
      <button onClick={() => share("reddit")}>
        <Reddit fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Reddit
        </span>
      </button>
    </div>
  );
};

export default ShareButtons;
