import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.orange &&
    css`
      background: white;
      color: rgba(244, 129, 107, 0.6);
      border: 1px solid rgba(244, 129, 107, 0.6);
      &:hover {
        background: rgba(244, 129, 107, 0.6);
        color: white;
      }
    `}

  ${props => 
    props.login &&
    css`
      width: 100%;
      font-size: 1.125rem;
      text-align: center;
      cursor: pointer;
      border: none;
      padding: 0.65rem 1rem;
      color: white;
      background: rgba(244, 129, 107, 0.6);
      border-radius: 4px;
      margin-top: 1rem;
      &:hover {
        background: rgba(244, 129, 107, 0.5);
        color: white;
      }
    `}
  
  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
    border: none;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = props => {
  return props.to ? (
    <StyledLink
      {...props}
      orange={props.orange ? 1 : 0}
      cyan={props.cyan ? 1 : 0}
    />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
