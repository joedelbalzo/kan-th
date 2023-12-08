import React from "react";

import { Facebook, Email, LinkedIn, Twitter, Reddit } from "../assets/ShareIcons.jsx";

const ShareButtons = ({ fillColor, post, shareType = null }) => {
  if (shareType == "generic") {
    const share = (platform) => {
      if (platform === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.usevali.com`, "_blank");
      } else if (platform === "linkedin") {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://www.usevali.com`, "_blank");
      } else if (platform === "twitter") {
        window.open(`https://twitter.com/intent/tweet?text=https://www.usevali.com`, "_blank");
      } else if (platform === "email") {
        const emailBody = `Check out Vali: https://www.usevali.com`;
        window.open(`mailto:?subject=Check out Vali&body=${emailBody}`, "_blank");
      } else if (platform === "reddit") {
        window.open(`https://www.reddit.com/submit?url=https://www.usevali.com`, "_blank");
      }
    };
    return (
      <div className="share-buttons">
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
  }

  const { title, subtitle, images } = post;
  const url = window.location.href;
  const emailSubject = `${title}`;

  const share = (platform, post) => {
    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${title}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "twitter") {
      const tweetText = title + " " + encodeURIComponent(url) + (imageUrl ? " " + imageUrl : "");
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank");
    } else if (platform === "email") {
      const emailBody = `Check out this article on Vali: ${url} \n\n${post.title}`;
      window.open(`mailto:?subject=${title}&body=${encodeURIComponent(emailBody)}`, "_blank");
    } else if (platform === "reddit") {
      window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${title}`, "_blank");
    }
  };

  return (
    <div className="share-buttons">
      Share:
      <button onClick={() => share("facebook", post)}>
        <Facebook fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Facebook
        </span>
      </button>
      <button onClick={() => share("linkedin", post)}>
        <LinkedIn fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          LinkedIn
        </span>
      </button>
      <button onClick={() => share("twitter", post)}>
        <Twitter fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Twitter
        </span>
      </button>
      <button onClick={() => share("email", post)}>
        <Email fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Email
        </span>
      </button>
      <button onClick={() => share("reddit", post)}>
        <Reddit fillColor={fillColor} />{" "}
        <span style={{ margin: 2 }} className="share-buttons-text">
          Reddit
        </span>
      </button>
    </div>
  );
};

export default ShareButtons;
