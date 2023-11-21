//React Imports
import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

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

  let { homePic, bannerPic, contentPic } = post ? pics(post) : "";

  console.log(homePic, bannerPic, contentPic);

  const [homePicture, setHomePicture] = useState(homePic?.picNickname || "");
  const [contentPicture, setContentPicture] = useState(contentPic?.picNickname || "");
  const [bannerPicture, setBannerPicture] = useState(bannerPic?.picNickname || "");
  const [saveDateAndTime, setSaveDateAndTime] = useState("");
  const [published, setPublished] = useState(false);
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
    try {
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
        await dispatch(editBlogpost(formData, blogData, post.id));
      } else if (type === "create") {
        await dispatch(createBlogpost(formData, blogData));
      }
      setPublished(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-post-form">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="form-field">
          <label htmlFor="title" className="form-labels">
            Title:
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
        <div className="tag-fields" style={{ marginTop: 8 }}>
          <div className="form-field">
            <label htmlFor="tags" className="form-labels">
              Tags:
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tags[0] ? tags[0] : ""}
              value={tags[0] ? tags[0] : ""}
              getOptionLabel={(option) => option.tagName}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Tag 1" />}
            />
          </div>
          <div className="form-field">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tags[1] ? tags[1] : ""}
              value={tags[1] ? tags[1] : ""}
              getOptionLabel={(option) => option.tagName}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Tag 2" />}
            />
          </div>
          <div className="form-field">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={tags[2] ? tags[2] : ""}
              value={tags[2] ? tags[2] : ""}
              getOptionLabel={(option) => option.tagName}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="Tag 3" />}
            />
          </div>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="content" className="form-labels" style={{ alignItems: "flex-start" }}>
          Content:
        </label>
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ marginBottom: 50, minHeight: 400, minWidth: "70%" }}
        />
      </div>

      <div style={{ padding: 8 }}>
        <div style={{ paddingBottom: "2vh", width: "100%", display: "flex", alignItems: "center" }}>
          <label htmlFor="homePicture" className="image-upload-labels">
            Home Picture:
          </label>
          <input
            type="file"
            id="homePicture"
            name="homePicture"
            style={{ display: "none" }}
            onChange={(e) => setHomePicture(e.target.files[0])}
          />

          <label htmlFor="homePicture" className="image-upload-buttons">
            {homePic ? "Select New File" : "Select File"}
          </label>
          {homePic && <div>Current Picture: {homePic.picNickname}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="image-upload-labels">Home Caption:</p>
          <TextField
            variant="outlined"
            type="text"
            // value={homeCaption}
            className="image-input"
            onChange={console.log("home caption")}
          />
        </div>
        <div style={{ paddingBottom: "2vh", width: "100%", display: "flex", alignItems: "center" }}>
          <label htmlFor="bannerPicture" className="image-upload-labels">
            Banner Picture:
          </label>
          <input
            type="file"
            id="bannerPicture"
            name="bannerPicture"
            style={{ display: "none" }}
            onChange={(e) => setBannerPicture(e.target.files[0])}
          />

          <label htmlFor="bannerPicture" className="image-upload-buttons">
            {bannerPic ? "Select New File" : "Select File"}
          </label>
          {bannerPic && <div>Current Picture: {bannerPic.picNickname}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="image-upload-labels">Banner Caption:</p>
          <TextField
            variant="outlined"
            type="text"
            // value={homeCaption}
            className="image-input"
            onChange={console.log("banner caption")}
          />
        </div>

        <div style={{ paddingBottom: "2vh", width: "100%", display: "flex", alignItems: "center" }}>
          <label htmlFor="contentPicture" className="image-upload-labels">
            Content Picture:
          </label>
          <input
            type="file"
            id="contentPicture"
            name="contentPicture"
            style={{ display: "none" }}
            onChange={(e) => setContentPicture(e.target.files[0])}
          />

          <label htmlFor="contentPicture" className="image-upload-buttons">
            {contentPic ? "Select New File" : "Select File"}
          </label>
          {contentPic && <div>Current Picture: {contentPic.picNickname}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="image-upload-labels">Content Caption:</p>
          <TextField
            variant="outlined"
            type="text"
            // value={homeCaption}
            className="image-input"
            onChange={console.log("content caption")}
          />
        </div>
      </div>
      <div style={{ display: "flex", width: "200px", margin: "auto" }}>
        <button className="save-button" type="button" onClick={handleSave}>
          Save
        </button>
        <button type="submit" className="publish-button">
          Publish
        </button>
        {published && <div>you've done it</div>}
      </div>
      <div>last saved at {saveDateAndTime}</div>
    </form>
  );
};

export default AdminPosts;
