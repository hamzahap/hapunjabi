import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './tabs.css';
import './App.css';
import ProjectsSection from './ProjectSection';
import SkillsSection from './SkillSection';
import WorkExperienceSection from './WorkExperienceSection';
import CertificatesSection from './CertificateSection';
import EducationSection from './EducationSection';
import RockShooterGame from './rock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAws, faGit, faGithub, faHtml5, faLinkedin, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faCloud, faCode, faDatabase, faDesktop, faEnvelope, faFile, faFileAlt, faGamepad, faLocationCrosshairs, faScroll, faUniversity } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      {/* Introduction */}
      <header>
        <h1>Hello, I'm Hamzah Punjabi</h1>
        <p>I am a Software Developer.</p>
      </header>

      {/* Social links */}
      <section className="SocialLinks">
        <ul>
          <li><a href="https://github.com/hamzahap" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} color='#000000' size="2x" /></a></li>
          <li><a href="https://www.linkedin.com/in/hamzahpunjabi/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} color='#000000' size="2x" /></a> </li>
          <li><a href="./ResumeHP.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFileAlt} color='#000000' size="2x" /></a> </li>
          <li><a href="mailto:hamzahqatar123@gmail.com"><FontAwesomeIcon icon={faEnvelope} color='#000000' size="2x" /></a> </li>
          {/* <li><a href="https://www.google.com/maps/place/St.+John's,+NL/@47.4825459,-52.9697214,11z/data=!3m1!4b1!4m6!3m5!1s0x4b0ca38e6b0aa261:0x9e1fd4001f12261f!8m2!3d47.5556097!4d-52.7452511!16zL20vMGo4cDY" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLocationCrosshairs} color='#000000' size="2x" /></a></li> */}
          <li><a href="./FinalOfficialTranscript.pdf"><FontAwesomeIcon icon={faScroll} color='#000000' size="2x" /></a> </li>
        </ul>
      </section>


      {Tabs}
      <Tabs>
        <TabList>
          <Tab>Education</Tab>
          <Tab>Work Experience</Tab>
          <Tab>Certificates</Tab>
          <Tab>Projects</Tab>
          <Tab>Skills</Tab>
        </TabList>

        <TabPanel>
          <EducationSection />
        </TabPanel>
        <TabPanel>
          <WorkExperienceSection />
        </TabPanel>
        <TabPanel>
          <CertificatesSection />
        </TabPanel>
        <TabPanel>
          <ProjectsSection />
        </TabPanel>
        <TabPanel>
          <SkillsSection />
        </TabPanel>
      </Tabs>
      

      {/* RockShooterSection */}
      <section className="RockShooterSection">
      <h2>RokcC? c ?c/ </h2>
      <RockShooterGame />
      </section>


      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Hamzah Punjabi. All rights reserved.</p>
      </footer>
  </div>
  );
}

export default App;


