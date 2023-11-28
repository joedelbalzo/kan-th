//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { filterBlogpostsByTag } from "../store";

const SideNav = () => {
  const tags = useSelector((state) => state.tags);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!tags) {
    return null;
  }

  const onTagClick = async (tag) => {
    await dispatch(filterBlogpostsByTag(tag.id));
    navigate(`/blog/tags/${tag.id}`);
  };

  return (
    <div>
      Search by Tag:
      <ul style={{ padding: 4 }}>
        {tags.map((tag) => {
          return (
            <li key={tag.id} style={{ listStyleType: "none", padding: 4 }}>
              <Link onClick={() => onTagClick(tag)}>{tag.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;
