import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
`;

const AboutLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  border-right: 1px solid #757575;
`;

const TitleMenuBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    position: absolute;
    left: 2rem;
    color: #7d7d7d;
    font-size: 1.9rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
`;

const ContentBox = styled.div`
  margin: 1rem 0 2rem 2.5rem;
  p {
    color: #7d7d7d;
    font-size: 1.125rem;
    margin: 0;
    margin-bottom: 0.3rem;
    a {
      text-decoration: none;
      color: rgb(73, 73, 73);
      font-size: 1.25rem;
    }
  }
  .bold {
    text-decoration: none;
    color: rgb(73, 73, 73);
    font-size: 1.25rem;
  }
  .tabs {
    padding-left: 3rem;
    a {
      color: rgb(110, 110, 110);
    }
  }
  .about {
    font-size: 1.025rem;
  }
  .ability {
    font-size: 1.05rem;
  }
`;

const MenuRoundBox = styled.div`
  width: 85px;
  height: 85px;
  background: rgba(244, 129, 107, 0.2);
  border-radius: 50%;
`;

const ProjectBox = styled.div`
  margin-bottom: 2rem;
`;

const AboutRightBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const AboutInfo = () => {
  return (
    <AboutWrapper>
      <AboutLeftBox>
        <TitleMenuBox>
          <MenuRoundBox />
          <span>About Me</span>
        </TitleMenuBox>
        <ContentBox>
          <p className="about">
            웹 개발을 즐겨하는 학생 개발자입니다. 중학교 3학년때부터 웹 개발을
            공부하였으며, Vue.JS와 React를 접하고 나서 개발자로써 다양한
            프로젝트에 참여하고 있습니다. 다른 사람들이 손쉽게 접할 수 있고
            유용하게 쓰일 수 있는 서비스를 만드는 것을 목표로 하고 있습니다.
          </p>
        </ContentBox>
        <TitleMenuBox>
          <MenuRoundBox />
          <span>Technical Skills</span>
        </TitleMenuBox>
        <ContentBox>
          <p>
            <a>Frontend: </a>
            HTML & CSS, JavaScript, Vue.JS, React, Scss
          </p>
          <p className="bold">Backend: </p>
          <p className="tabs">
            <a>Node.JS</a> - Express, Koa, mongoose, Sequelize
          </p>
          <p className="tabs">
            <a>Database</a> - MariaDB, MongoDB,{' '}
          </p>
          <p>
            <a>그 외: </a>
            C, JAVA, Python
          </p>
        </ContentBox>
        <TitleMenuBox>
          <MenuRoundBox />
          <span>Projects</span>
        </TitleMenuBox>
        <ContentBox>
          <ProjectBox>
            <p className="bold">C-tab 프로젝트 (2019.04 ~ 2019.11)</p>
            <p className="about">
              Ctab 프로젝트는 해킹 CTF 웹 플랫폼 개발 프로젝트 입니다. 기획,
              디자인, 개발, 해킹 문제 제작 분야로 나뉘어 총 11명이 함께했습니다.
              이 프로젝트에서 프론트 엔드 및 백 엔드 개발을 도맡아 했습니다.
            </p>
            <p className="about">
              <a className="ability">기술 스택: </a>Vue.Js, Scss, Node.Js,
              Express, Sequelize, MariaDB
            </p>
          </ProjectBox>
          <ProjectBox>
            <p className="bold">개발 블로그 프로젝트 (2020.02 ~ 2020.05)</p>
            <p className="about">
              개발 블로그 프로젝트는 개발과 관련된 저의 지식을 다른 사람들과
              공유하기 위해서 블로그 형식 웹사이트를 개발한 프로젝트 입니다.
              개인 프로젝트로 진행되었으며, 기획, 디자인, 개발 모두 도맡아
              했습니다.
            </p>
            <p className="about">
              <a className="ability">기술 스택: </a>React, Redux, Scss, Node.Js,
              Koa, Sequelize, MongoDB, Mongoose
            </p>
          </ProjectBox>
          <ProjectBox>
            <p className="bold">코딩 교육 프로젝트 (진행 예정 2021.01 ~)</p>
            <p className="about">
              코딩 교육 프로젝트는 코딩을 배우고 싶은 누구나에게 다양한
              프로그래밍 언어를 경험할 수 있게 가이드 라인을 제시해 주는
              프로젝트입니다. 아직 프로젝트가 진행되지 않았으며, 내년부터 진행될
              예정입니다.
            </p>
            <p className="about">
              <a className="ability">기술 스택: </a>React, Redux, Scss, Node.Js,
              Koa, Sequelize, MongoDB, Mongoose
            </p>
          </ProjectBox>
        </ContentBox>
      </AboutLeftBox>
      <AboutRightBox></AboutRightBox>
    </AboutWrapper>
  );
};

export default AboutInfo;
