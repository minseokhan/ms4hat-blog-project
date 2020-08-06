import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
  margin: 0.75rem 0;
  border-bottom: ${(props) => (props.border ? '1px solid #ced4da;' : 'none')};
  padding-bottom: ${(props) => (props.border ? '0.5rem' : '0')};
  .tag {
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    color: rgba(244, 129, 107, 0.6);
    text-decoration: none;
    margin-right: 0.65rem;
    font-size: 1rem;
    border-radius: 15px;
  }
  .list_tag {
    color: rgba(244, 129, 107, 0.6);
    text-decoration: none;
    font-size: 0.8rem;
    margin-right: 0.75rem;
  }
`;

const Tags = ({ tags, border, list }) => {
  return (
    <TagsBlock list={list} border={border}>
      {tags.map((tag) => (
        <Link
          className={list === 'true' ? 'list_tag' : 'tag'}
          to={`/?tag=${tag}`}
          key={tag}
        >
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
