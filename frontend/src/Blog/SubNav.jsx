//React Imports
import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { filterBlogpostsByTag } from "../store";
import JoinMailingList from "../Components/JoinMailingList";

const SubNav = ({ id }) => {
  const tags = useSelector((state) => state.tags);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!tags) {
    return null;
  }

  const tagToAdd = {
    id: 1234,
    name: "All Posts",
  };

  if (!tags.some((tag) => tag.id === tagToAdd.id && tag.name === tagToAdd.name)) {
    tags.unshift(tagToAdd);
  }

  const onTagClick = async (ev) => {
    if (ev === "1234") {
      navigate(`/blog/`);
    } else {
      await dispatch(filterBlogpostsByTag(ev));
      navigate(`/blog/tags/${ev}`);
    }
  };

  return (
    <div>
      <JoinMailingList />
      <div className="tag-styles-container">
        sort by tags:
        <select className="tag-styles" onChange={(event) => onTagClick(event.target.value)}>
          {tags.map((tag) => {
            return (
              <option value={tag.id} key={tag.id}>
                {tag.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SubNav;
