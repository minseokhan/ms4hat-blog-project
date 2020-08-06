import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import Responsive from '../components/common/Responsive';
import AboutInfo from '../components/about/AbouInfo';

const AboutPage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <AboutInfo />
      </Responsive>
    </>
  );
};

export default AboutPage;
