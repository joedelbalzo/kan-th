import React from "react";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";

const Help = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <AdminNav />

      <div className="help-and-documentation-div">
        <Link to="/admin" className="back-button">
          {" "}
          &larr; Back
        </Link>
        <div className="help-and-documentation-links">
          <ul>
            <button className="other-buttons" onClick={() => scrollToSection("post101")}>
              Post 101
            </button>

            <button className="other-buttons" onClick={() => scrollToSection("creating-posts")}>
              Creating and Editing Posts
            </button>

            <button className="other-buttons" onClick={() => scrollToSection("archiving-posts")}>
              Archiving Posts
            </button>
          </ul>
          <div className="help-and-docs-body" id="post101">
            <h2>Blog Post 101</h2>
            <ul>
              <li>
                When you see the home page, you initially see the Title, Subtitle, Tags, Publish Date, and one Home Picture. When you click
                "... read more," you'll see the rest of your text, as well as up to two more pictures of your choice.
              </li>
              <li>
                Your blogs are uploaded into a secure database and your pictures are uploaded to AWS. Blogposts are also archived to AWS
                immediately after publishing, however they'll only include links and names of your pictures rather than the pictures
                themselves. I do recommend you keep all pictures you plan to upload in an organized folder on your desktop or on Google
                Drive or something. A picture can always be reuploaded.
              </li>
              <li>
                You'll notice you don't have an option to delete your posts. Please let an administrator know if you need for this to
                change. I highly recommend archiving a post and keeping it on AWS. This is on the developer's to-do list, but since hiding
                and archiving a post is already available, it's low on the to-do list.
              </li>
            </ul>
          </div>
          <div className="help-and-docs-body" id="creating-posts">
            <h2>Creating and Editing Posts</h2>
            <ul>
              <li>
                When creating a post, you're required to submit a Title, a Subtitle, three tags, and content. Pictures aren't required, but
                they're obviously really great.
              </li>
              <li>
                The content editor we're using has some quirks. For one, you may only apply a heading to an entire paragraph. If you'd like
                your first sentence to be Heading 1, you need to create a paragraph after the first sentence that is then normal. Hyperlinks
                can be added, but you have to select the text you want first and then you can add the link. For example, if you want to add
                the link "google.com" to the text "Google," type out the word Google first, highlight it, and then hit the link button.
              </li>
              <li>
                When uploading pictures, there are three locations. Your home picture goes first. That's what everyone will see immediately
                without clicking on your post. You then have options of adding a Banner Picture and a Content Picture. The Banner picture
                should go below the fold and the whole width of the screen, while the content picture will be a little smaller and kind of
                on the side.
              </li>

              <li>
                To give you some flexibility here, you can place those two pictures wherever you'd like. This is done through a specific
                text replace functionality. These two keys are also in your post upload, but for your information they are:
                <ul>
                  <li>%% banner picture goes here %%</li>
                  <li>%% content picture goes here %%</li>
                </ul>
                Please type the phrase of your choice <strong>exactly</strong> in order to have your picture load properly.
              </li>
              <li>Please let a developer know if there is any other functionality you need here.</li>
              <li>
                After finishing your post, feel free to save or publish. Obviously if you hit publish, it'll publish right away. If you hit
                save, it'll appear in your drafts and then you can publish instantly from there.{" "}
              </li>
              <li>
                The blog is sorted by published date and time, so if you want to make changes after publishing, you'll have to republish,
                not just save.
              </li>
            </ul>
          </div>
          <div className="help-and-docs-body" id="archiving-posts">
            <h2>Archiving Posts</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
