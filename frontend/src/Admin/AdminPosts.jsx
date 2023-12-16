//React Imports
import React, { useState, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

//Text Editor Imports
// import ReactQuill from "react-quill";
const ReactQuill = lazy(() => import("react-quill"));
import "react-quill/dist/quill.snow.css";

//Store Imports
import { createBlogpost, editBlogpost } from "../store";

//Component Style Imports
import "./AdminStyles.css";
import Loading from "../assets/Loading";
import AdminNav from "./AdminNav";

//MUI Imports
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

//Function Imports
import { pics } from "../Components/functions";

const AdminPosts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  //gets post
  const { post, type } = location.state || {};
  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [content, setContent] = useState(post?.content || "");

  //gets pics
  let { homePic, bannerPic, contentPic } = post ? pics(post) : "";
  const [homePicture, setHomePicture] = useState(homePic?.picNickname || "");
  const [contentPicture, setContentPicture] = useState(contentPic?.picNickname || "");
  const [bannerPicture, setBannerPicture] = useState(bannerPic?.picNickname || "");
  const [homePictureCaption, setHomePictureCaption] = useState(homePic?.picCaption || "");
  const [contentPictureCaption, setContentPictureCaption] = useState(contentPic?.picCaption || "");
  const [bannerPictureCaption, setBannerPictureCaption] = useState(bannerPic?.picCaption || "");
  const [saveDateAndTime, setSaveDateAndTime] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  //gets tags
  const tags = useSelector((state) => state.tags);
  const [firstTag, setFirstTag] = useState(tags[0] || "Select Tag");
  const [secondTag, setSecondTag] = useState(tags[1] || "Select Tag");
  const [thirdTag, setThirdTag] = useState(tags[2] || "Select Tag");

  // const handleSave = async (event) => {
  //   event.preventDefault();
  //   let saved = new Date().toString();
  //   setSaveDateAndTime(saved.slice(3, 24));
  //   console.log("saving");

  //   const formData = new FormData();
  //   formData.append("homePicture", homePicture);
  //   formData.append("bannerPicture", bannerPicture);
  //   formData.append("contentPicture", contentPicture);

  //   const blogData = {
  //     title: title,
  //     subtitle: subtitle,
  //     content: content,
  //     published: false,
  //     lastSaved: new Date(),
  //   };

  //   const tagData = {
  //     firstTag: firstTag,
  //     secondTag: secondTag,
  //     thirdTag: thirdTag,
  //   };

  //   console.log("form data", formData);

  //   if (type === "edit") {
  //     dispatch(editBlogpost(formData, blogData, tagData, post.id));
  //   } else if (type === "create") {
  //     dispatch(createBlogpost(formData, blogData, tagData));
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.name === "save") {
      setSaveLoading(true);
    }
    if (event.nativeEvent.submitter.name === "publish") {
      setLoading(true);
    }
    try {
      const formData = new FormData();
      formData.append("homePicture", homePicture);
      formData.append("bannerPicture", bannerPicture);
      formData.append("contentPicture", contentPicture);

      const captions = {
        homePictureCaption: homePictureCaption,
        bannerPictureCaption: bannerPictureCaption,
        contentPictureCaption: contentPictureCaption,
      };

      const blogData = {
        title: title,
        subtitle: subtitle,
        content: content,
        publishedAt: new Date(),
        lastSaved: new Date(),
      };

      const tagData = {
        firstTag: firstTag || null,
        secondTag: secondTag || null,
        thirdTag: thirdTag || null,
      };

      if (event.nativeEvent.submitter.name === "save") {
        await dispatch(editBlogpost(formData, captions, blogData, tagData, post.id));
        setSaveLoading(false);
        let saved = new Date().toString();
        setSaveDateAndTime(saved.slice(3, 24));
      } else if (event.nativeEvent.submitter.name === "publish") {
        blogData.published = true;
        await dispatch(createBlogpost(formData, captions, blogData, tagData));
        setPublished(true);
        setLoading(false);
      }

      setTimeout(() => {
        setPublished(false);
      }, 10000);
    } catch (err) {
      console.log(err);
      setPublished(false);
      setLoading(false);
      setSaveLoading(false);
    }
  };

  return (
    <div>
      <Link to="/admin" className="image-upload-buttons">
        {" "}
        &larr; Back
      </Link>
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
                value={firstTag}
                options={tags}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Tag 1" />}
                onChange={(event, newValue) => {
                  setFirstTag(newValue);
                }}
                required
              />
            </div>
            <div className="form-field">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={secondTag}
                options={tags}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Tag 2" />}
                onChange={(event, newValue) => {
                  setSecondTag(newValue);
                }}
                required
              />
            </div>
            <div className="form-field">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={thirdTag}
                options={tags}
                getOptionLabel={(option) => (option.name ? option.name : "")}
                sx={{ width: 200 }}
                renderInput={(params) => <TextField {...params} label="Tag 3" />}
                onChange={(event, newValue) => {
                  setThirdTag(newValue);
                }}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="content" className="form-labels" style={{ alignItems: "flex-start" }}>
            Content:
          </label>
          <ReactQuill value={content} onChange={setContent} style={{ marginBottom: 50, minHeight: 400, minWidth: "70%" }} required />
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
            {homePicture && <div>Uploading: {homePicture.name}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="image-upload-labels">Home Caption:</p>
            <TextField variant="outlined" type="text" className="image-input" onChange={(e) => setHomePictureCaption(e.target.value)} />
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
            {bannerPicture && <div>Uploading: {bannerPicture.name}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="image-upload-labels">Banner Caption:</p>
            <TextField
              variant="outlined"
              type="text"
              // value={homeCaption}
              className="image-input"
              onChange={(e) => setBannerPictureCaption(e.target.value)}
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
            {contentPicture && <div>Uploading: {contentPicture.name}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="image-upload-labels">Content Caption:</p>
            <TextField
              variant="outlined"
              type="text"
              // value={homeCaption}
              className="image-input"
              onChange={(e) => setContentPictureCaption(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", width: "200px", margin: "auto" }}>
          {saveLoading == false ? (
            <button className="save-button" type="submit" name="save">
              Save
            </button>
          ) : (
            <button className="save-button" disabled>
              <Loading height={"10px"} width={"10px"} borderWidth={"3px"} />
            </button>
          )}

          {loading == false && published == false && (
            <button type="submit" name="publish" className="publish-button">
              Publish
            </button>
          )}
          {loading && published == false && (
            <button className="publish-button" disabled>
              <Loading height={"10px"} width={"10px"} borderWidth={"3px"} />
            </button>
          )}
          {loading == false && published && (
            <button className="publish-button" disabled>
              Published
            </button>
          )}
        </div>
        <div>last saved at {saveDateAndTime}</div>
        {/* <Loading /> */}
      </form>
    </div>
  );
};

export default AdminPosts;
