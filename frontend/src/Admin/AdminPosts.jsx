//React Imports
import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

//Text Editor Imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//Store Imports
import { createBlogpost, editBlogpost } from "../store";

//Component Style Imports
import "./AdminStyles.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

//Function Imports
import { readableDate, pics } from "../functions";

const AdminPosts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { post, type } = location.state || {};
  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [content, setContent] = useState(post?.content || "");
  // const [tags, setTags] = useState("");
  const [homePicture, setHomePicture] = useState("");
  const [contentPicture, setContentPicture] = useState("");
  const [bannerPicture, setBannerPicture] = useState("");
  const [saveDateAndTime, setSaveDateAndTime] = useState("");
  const tags = useSelector((state) => state.tags);

  const handleSave = async (event) => {
    event.preventDefault();
    let saved = new Date().toString();
    setSaveDateAndTime(saved.slice(3, 24));

    const formData = new FormData();
    formData.append("homePicture", homePicture);
    formData.append("bannerPicture", bannerPicture);
    formData.append("contentPicture", contentPicture);

    const blogData = {
      title: title,
      subtitle: subtitle,
      content: content,
      published: false,
    };

    console.log("save function", blogData);

    if (type === "edit") {
      dispatch(editBlogpost(formData, blogData, post.id));
    } else if (type === "create") {
      dispatch(createBlogpost(formData, blogData));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("homePicture", homePicture);
    formData.append("bannerPicture", bannerPicture);
    formData.append("contentPicture", contentPicture);

    const blogData = {
      title: title,
      subtitle: subtitle,
      content: content,
      published: true,
    };

    console.log("blog data.", blogData);

    if (type === "edit") {
      dispatch(editBlogpost(formData, blogData, post.id));
    } else if (type === "create") {
      dispatch(createBlogpost(formData, blogData));
    }
  };

  let { homePic, bannerPic, contentPic } = post ? pics(post) : "";

  // const formatText = (action) => {
  //   const textarea = document.getElementById("myTextArea");
  //   const start = textarea.selectionStart;
  //   const end = textarea.selectionEnd;
  //   const selectedText = content.substring(start, end);

  //   // Determine the tags based on the action
  //   let tagStart, tagEnd;
  //   switch (action) {
  //     case "bold":
  //       tagStart = "<strong>";
  //       tagEnd = "</strong>";
  //       break;
  //     case "italic":
  //       tagStart = "<em>";
  //       tagEnd = "</em>";
  //       break;
  //     case "list":
  //       tagStart = "<ul><li>";
  //       tagEnd = "</li></ul>";
  //       break;
  //     case "hyperlink":
  //       const url = prompt("Enter the URL:"); // Using prompt for simplicity
  //       tagStart = `<a href="${url}">`;
  //       tagEnd = "</a>";
  //       break;
  //     case "subtitle":
  //       tagStart = `<h2>`;
  //       tagEnd = `</h2>`;
  //       break;
  //     case "subtitle3":
  //       tagStart = `<h3>`;
  //       tagEnd = `</h3>`;
  //       break;
  //     case "subtitle4":
  //       tagStart = `<h4>`;
  //       tagEnd = `</h4>`;
  //       break;
  //     case "blockquote":
  //       tagStart = `<blockquote>`;
  //       tagEnd = `</blockquote>`;
  //       break;
  //     case "linebreak":
  //       tagStart = `<blockquote>`;
  //       tagEnd = `</blockquote>`;
  //       break;
  //     case "indent":
  //       tagStart = `<div style="margin-left: 8px;">`;
  //       tagEnd = `</div>`;
  //       break;
  //   }

  //   // Construct the new content
  //   const before = content.substring(0, start);
  //   const after = content.substring(end);
  //   const newText = `${before}${tagStart}${selectedText}${tagEnd}${after}`;

  //   // Update the content state
  //   setContent(newText);
  // };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="form-field">
          <label htmlFor="title" className="form-labels">
            Title:{" "}
          </label>
          <TextField
            variant="outlined"
            type="text"
            id="title"
            value={title}
            className="form-input"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="subtitle" className="form-labels">
            Subtitle:
          </label>
          <TextField
            type="text"
            id="subtitle"
            variant="outlined"
            value={subtitle}
            className="form-input"
            onChange={(e) => setSubtitle(e.target.value)}
            required
          />
        </div>
        <div className="tag-fields">
          <div className="form-field">
            <label htmlFor="tags" className="form-labels">
              Tags:
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tags}
              getOptionLabel={(option) => option.tagName}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Tag 1" />}
            />
          </div>
          <div className="form-field">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tags}
              getOptionLabel={(option) => option.tagName}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Tag 2" />}
            />
          </div>
          <div className="form-field">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tags}
              getOptionLabel={(option) => option.tagName}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Tag 3" />}
            />
          </div>
        </div>
      </div>
      {/* <div style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
        <button type="button" onClick={() => formatText("bold")}>
          Bold
        </button>
        <button type="button" onClick={() => formatText("italic")}>
          Italic
        </button>
        <button type="button" onClick={() => formatText("list")}>
          List
        </button>
        <button type="button" onClick={() => formatText("hyperlink")}>
          Hyperlink
        </button>
        <button type="button" onClick={() => formatText("subtitle")}>
          Subtitle H2
        </button>
        <button type="button" onClick={() => formatText("subtitle3")}>
          Subtitle H3
        </button>
        <button type="button" onClick={() => formatText("subtitle4")}>
          Subtitle H4
        </button>
        <button type="button" onClick={() => formatText("blockquote")}>
          Blockquote
        </button>
        <button type="button" onClick={() => formatText("indent")}>
          Indent
        </button>
        <button type="button" onClick={() => formatText("linebreak")}>
          Line Break
        </button>
      </div> */}
      <div className="form-field">
        <label htmlFor="content" className="form-labels" style={{ alignItems: "flex-start" }}>
          Content:
        </label>
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ marginBottom: 50, minHeight: 400, minWidth: "70%" }}
        />
        {/* <textarea
          style={{ width: "80vw", height: "35vh" }}
          id="myTextArea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        /> */}
      </div>
      <div style={{ padding: 8 }}>
        <div style={{ paddingBottom: "2vh" }}>
          <label htmlFor="homePicture">
            Home Picture.
            <input
              type="file"
              id="homePicture"
              name="homePicture"
              onChange={(e) => setHomePicture(e.target.files[0])}
            />
          </label>
          {homePic ? (
            <div style={{ marginLeft: "8px", fontSize: "smaller", fontStyle: "italic" }}>
              Currently: {post.homePictureNickname}
            </div>
          ) : (
            ""
          )}
        </div>
        <div style={{ paddingBottom: "2vh" }}>
          <label htmlFor="bannerPicture">
            Banner Picture:
            <input
              type="file"
              id="bannerPicture"
              name="bannerPicture"
              onChange={(e) => setBannerPicture(e.target.files[0])}
            />
          </label>
          {bannerPic ? (
            <div style={{ marginLeft: "8px", fontSize: "smaller", fontStyle: "italic" }}>
              Currently: {bannerPic}
            </div>
          ) : (
            ""
          )}
        </div>
        <div style={{ paddingBottom: "2vh" }}>
          <label htmlFor="contentPicture">
            Content Picture:
            <input
              type="file"
              id="contentPicture"
              name="contentPicture"
              onChange={(e) => setContentPicture(e.target.files[0])}
            />
          </label>
          {contentPic ? (
            <div style={{ marginLeft: "8px", fontSize: "smaller", fontStyle: "italic" }}>
              Currently: {contentPic}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ display: "flex", width: "200px", margin: "auto" }}>
        <button className="save-button" type="button" onClick={handleSave}>
          Save
        </button>
        <button type="submit" className="publish-button">
          Publish
        </button>
      </div>
      <div>last saved at {saveDateAndTime}</div>
    </form>
  );
};

export default AdminPosts;
