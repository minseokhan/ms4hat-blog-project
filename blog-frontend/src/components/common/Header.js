import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { Link, NavLink } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  z-index: 99;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.325rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: ${palette.gray[7]};
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const StyledLink = styled(NavLink)`
  color: ${palette.gray[10]};
  font-size: 1rem;
  & + & {
    margin-left: 3rem;
  }
  &:hover {
    color: ${palette.orange[0]};
  }
`;

const UserName = styled.span`
  color: ${palette.gray[10]};
  font-size: 1rem;
  margin-left: 3rem;
  cursor: pointer;
`;

const NoLink = styled.div`
  color: ${palette.gray[10]};
  font-size: 1rem;
  margin-left: 3rem;
  cursor: pointer;
  &:hover {
    color: ${palette.orange[0]};
  }
`;

const Spacer = styled.div`
  height: 6.5rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">
            MS4HAT'S BLOG
          </Link>
          <div className="right">
            <StyledLink to="/" activeStyle={{ color: '#F4816B' }} exact>
              Home
            </StyledLink>
            <StyledLink to="/about" activeStyle={{ color: '#F4816B' }}>
              About
            </StyledLink>
            <StyledLink to="/blog" activeStyle={{ color: '#F4816B' }} exact>
              Blog
            </StyledLink>
            {user ? (
              <>
                <UserName>{user.username}</UserName>
                <NoLink onClick={onLogout}>Logout</NoLink>
              </>
            ) : (
              <StyledLink to="/login">Login</StyledLink>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
