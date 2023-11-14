import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaRegEnvelope, FaReddit } from "react-icons/fa";

const ShareButtons = () => {
  const url = window.location.href;

  const share = (platform) => {
    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank"
      );
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank");
    }
    // Add more platforms as needed
  };

  return (
    <div className="share-buttons">
      Share:
      <button onClick={() => share("facebook")}>
        <FaFacebookF /> <span style={{ margin: 2 }}>Facebook</span>
      </button>
      <button onClick={() => share("linkedin")}>
        <FaLinkedinIn /> <span style={{ margin: 2 }}>LinkedIn</span>
      </button>
      <button onClick={() => share("twitter")}>
        <FaTwitter /> <span style={{ margin: 2 }}>Twitter</span>
      </button>
      <button onClick={() => share("email")}>
        <FaRegEnvelope /> <span style={{ margin: 2 }}>Email</span>
      </button>
      <button onClick={() => share("email")}>
        <FaReddit /> <span style={{ margin: 2 }}>Reddit</span>
      </button>
      {/* Add more buttons for other platforms */}
    </div>
  );
};

export default ShareButtons;
