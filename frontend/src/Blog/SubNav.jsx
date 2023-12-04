//React Imports
import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { filterBlogpostsByTag } from "../store";

const SubNav = () => {
  const tags = useSelector((state) => state.tags);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();

  if (!tags) {
    return null;
  }

  if (!id) {
    id = 0;
  }
  console.log("subnav", id);

  const onTagClick = async (tag) => {
    if (tag === "all") {
      navigate(`.`);
    }
    await dispatch(filterBlogpostsByTag(tag.id));
    navigate(`/blog/tags/${tag.id}`);
  };

  return (
    <div>
      <span style={{ fontSize: "14px" }}>sort by tags:</span>
      <div className="tag-styles-container">
        <div className="tag-styles" key={0}>
          <Link to="/blog">All Posts</Link>
        </div>
        {tags.map((tag) => {
          return (
            <div key={tag.id}>
              {tag.id === id ? (
                <div className="tag-styles-selected" onClick={() => onTagClick(tag)}>
                  {console.log("try again", id, tag.id)}

                  <Link onClick={() => onTagClick(tag)}>{tag.name}</Link>
                </div>
              ) : (
                <div className="tag-styles" key={tag.id} onClick={() => onTagClick(tag)}>
                  <Link onClick={() => onTagClick(tag)}>{tag.name}</Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubNav;
