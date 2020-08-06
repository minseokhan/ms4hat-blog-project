import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaPinterestP, FaGithub } from 'react-icons/fa';

const FooterBlock = styled.div`
  width: 100%;
  background: #707070;
`;

const Wrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: row;
  padding: 4.5rem 10rem;
  span {
    color: white;
    font-size: 2.3rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }
`;

const AboutMeBlock = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  border-right: 1px solid white;
  position: relative;
  p {
    color: white;
    margin: 0;
    font-size: 1.025rem;
    letter-spacing: 1px;
    font-weight: 200;
  }
`;

const Contact = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  padding-left: 5.5rem;
  position: relative;
`;

const SnsIconBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;

const SnsIconBorder = styled.div`
  border: 1px solid #f5b9ae;
  width: 40px;
  height: 40px;
  color: #f5b9ae;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  &:hover {
    color: white;
    background: #f5b9ae;
  }
`;

const Copyright = styled.div`
  position: absolute;
  bottom: 10px;
`;

const NameEmailInputBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  &:nth-child(1) {
    margin-right: 1.75rem;
  }
  span {
    color: #f5b9ae;
    font-size: 1.15rem;
    margin: 0;
  }
  input {
    border: none;
    border-bottom: 1px solid white;
    background: none;
    height: 35px;
    color: white;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f5b9ae;
  color: #f5b9ae;
  background: 0;
  font-size: 1rem;
  letter-spacing: 1px;
  position: absolute;
  right: 0;
  bottom: 0;
  &:hover {
    background: #f5b9ae;
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <Wrapper>
        <AboutMeBlock>
          <span>About Me</span>
          <p>Phone : 010-8755-5249</p>
          <p>Email : hanms1017@naver.com</p>
          <p>Kakao Id : hanms1017</p>
          <SnsIconBlock>
            <SnsIconBorder>
              <FaFacebookF />
            </SnsIconBorder>
            <SnsIconBorder>
              <FaPinterestP />
            </SnsIconBorder>
            <SnsIconBorder>
              <FaGithub />
            </SnsIconBorder>
          </SnsIconBlock>
          <Copyright>
            <p className="copyright">© 2020 Ms4hat's Blog</p>
            <p className="copyright">Designed & Dev by Ms4hat</p>
          </Copyright>
        </AboutMeBlock>
        <Contact>
          <span>Contact</span>
          <NameEmailInputBlock>
            <InputBox>
              <span>Full Name</span>
              <input type="text" name="name" />
            </InputBox>
            <InputBox>
              <span>Email</span>
              <input type="text" name="email" />
            </InputBox>
          </NameEmailInputBlock>
          <InputBox>
            <span>Leave Your Message</span>
            <input type="text" name="message" />
          </InputBox>
          <SubmitButton>Submit</SubmitButton>
        </Contact>
      </Wrapper>
    </FooterBlock>
  );
};

export default Footer;
