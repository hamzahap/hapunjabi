import React from 'react';
import './App.css';
import RockShooterGame from './rock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAws, faGit, faGithub, faHtml5, faLinkedin, faPython } from '@fortawesome/free-brands-svg-icons';
import { faCloud, faCode, faDatabase, faDesktop, faEnvelope, faFile, faFileAlt, faGamepad, faLocationCrosshairs, faScroll, faUniversity } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      {/* Introduction */}
      <header>
        <h1>Hello, I'm Hamzah Punjabi</h1>
        <p>I am a Software Developer recently graduated from MUN.</p>
      </header>

      {/* Social links */}
      <section className="SocialLinks">
        <ul>
          <li><a href="https://github.com/hamzahap" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} color='#000000' size="2x" /></a></li>
          <li><a href="https://www.linkedin.com/in/hamzahpunjabi/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} color='#000000' size="2x" /></a> </li>
          <li><a href="./ResumeHamzahPunjabi.pdf" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFileAlt} color='#000000' size="2x" /></a> </li>
          <li><a href="mailto:hamzahqatar123@gmail.com"><FontAwesomeIcon icon={faEnvelope} color='#000000' size="2x" /></a> </li>
          <li><a href="https://www.google.com/maps/place/St.+John's,+NL/@47.4825459,-52.9697214,11z/data=!3m1!4b1!4m6!3m5!1s0x4b0ca38e6b0aa261:0x9e1fd4001f12261f!8m2!3d47.5556097!4d-52.7452511!16zL20vMGo4cDY" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLocationCrosshairs} color='#000000' size="2x" /></a></li>
          <li><a href="./FinalOfficialTranscript.pdf"><FontAwesomeIcon icon={faScroll} color='#000000' size="2x" /></a> </li>
        </ul>
      </section>

      {/* Education */}
      <section className="EducationSection">
        <h2>Education</h2>
        <ul>
          <li>
            <strong>Bachelor of Science – Computer Science, MUN</strong><br />
            <p>January 2019 – August 2023<br />GPA: 3.46</p>
            
          </li>
          <li>
            <strong>Diploma in Information Systems Software (58 credits), CNA-Q</strong><br />
            <p>September 2017 – December 2018<br />GPA: 4.0</p> 
          </li>
        </ul>
      </section>

      {/* Work Experience */}
      <section className="WorkExperienceSection">
        <h2>Work Experience</h2>
            <center><strong>Software Developer Intern, SmartICE</strong></center><br />
            <center><b>September 2021 - August 2022</b></center><br />
            <ul>
              <li>Maintained a dashboard application for SmartICE technology utilizing Laravel, ReactJS, ChartJS and Leaflet.</li>
              <li>Integrated REST API functionality and caching into the dashboard to optimize database query performance.</li>
              <li>Streamlined team collaboration and project management for SmartICE technology with Jira, Asana, and Github.</li>
              <li>Managed codebase with Git for efficient version control.</li>
              <li>Wrote Python encrypted database backup script to safeguard server data.</li>
              <li>Programmed ADXL343 accelerometer into the SmartBUOY board in C using CCS compiler as a feature.</li>
              <li>Developed a Windows Forms feature in C# for SmartQAMUTIK data that enabled remote report generation, PDF conversion, Dropbox saving via Dropbox API, as well as remote viewing and sharing of SmartQAMUTIK data, resulting in improved efficiency and productivity.</li>
              <li>Documented comprehensive work instructions for clear and accurate knowledge sharing.</li>
            </ul>
      </section>

      {/* Certificates */}
      <section className="CertificatesSection">
        <h2>Certificates</h2>
        <ul>
          {/* Add your certificates details here */}
          <center><a href="https://www.credly.com/badges/1769a415-88da-4445-9447-f92b9ae73337" target="_blank" rel="noopener noreferrer"><img src="./badge.png" alt="AWS Badge" /></a></center>
        </ul>
        <br />
      {/*<RockShooterGame />*/}
      </section>

      {/* Projects */}
      <section className="ProjectsSection">
      <h2>Projects</h2>
      <ul>
      <li>
        <a href='https://github.com/hamzahap/resume_tailor' target="_blank" rel="noopener noreferrer"><strong>LaTeX Resume Tailor (Spring 2023)</strong></a><br />
        <p>Developed a local web application using Python (Flask) for the backend and ReactJS for the frontend. The tool allows users to upload a LaTeX resume, select, rearrange, and edit specific sections, and then generate a tailored version emphasizing relevant experiences and skills for job applications.</p>
      </li>
      <li>
        <strong>Wine Quality (Fall 2023)</strong><br />
        <p>Conducted a data preprocessing project in Jupyter Notebook analyzing the Wine Quality Data Set from the UCI Machine Learning Repository. Conducted supervised learning, which included data analysis, feature engineering, creating missing values, and prediction of those missing values.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/EncryptionDecryption' target="_blank" rel="noopener noreferrer"><strong>EncryptionDecryption (Winter 2022)</strong></a><br />
        <p>Created a simple Encryption/Decryption/Backup script using PyMySQL, pandas, and Cryptography to back up database tables with CSV files.</p>
      </li>
      <li>
        <strong>Blood2D (Fall 2022)</strong><br />
        <p>Developed a game using the SFML library in C++ as a group project. The game included advanced features such as collisions, inventory, game progression, shaders, custom user interface, advanced NPCs, and a custom level creation tool.</p>
      </li>
      <li>
        <strong>Canadian Pollution Visualizer (Winter 2021)</strong><br />
        <p>Developed a web program using NodeJS for the backend and ReactJS for the frontend as a group project. The program enabled users to generate various types of graphs and filter data for the graphs.</p>
      </li>
      <li>
        <strong>Quoridor Board Game (Fall 2020)</strong><br />
        <p>Built a board game using Java’s Swing and AWT components as a group project. The game allowed for individual player turns, movement of objects, calculating score, and a pathfinding algorithm.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/HangmanGame' target="_blank" rel="noopener noreferrer"><strong>Hangman (Fall 2017)</strong></a><br />
        <p>Created a hangman game using Python and the tkinter library as a course project. The game utilized a user-created word list to randomly choose words.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/hapunjabi' target="_blank" rel="noopener noreferrer"><strong>This Website (Winter 2023)</strong></a><br />
        <p>Developed a personal website using ReactJS and NodeJS and is hosted on Github Pages. The website showcases my skills, and includes a portfolio of my projects and achievements. Also includes a simple rock shooter game that doesn't make sense but exists.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/Resume' target="_blank" rel="noopener noreferrer"><strong>My Resume (Winter 2023)</strong></a><br />
        <p>Wrote a professional resume in LaTeX, collaborated with peers to review and revise, and stayed up-to-date with industry trends.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/AdventOfCode2022' target="_blank" rel="noopener noreferrer"><strong>Advent of Code 2022 (Fall 2023)</strong></a><br />
        <p>Completed the challenge in Google Sheets (Frustrating btw), using formulas and macros to automate data processing and analysis. Completed 10 out of 25 days.</p>
      </li>
      <li>
        <strong>Resume Screening using NLP (Fall 2023)</strong><br />
        <p>As part of a course project, our group investigated the use of natural language processing techniques, such as TF-IDF, Word2vec, and BERT, for automated resume screening.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/AdventOfCode2021' target="_blank" rel="noopener noreferrer"><strong>Advent of Code 2021 (Fall 2022)</strong></a><br />
        <p>Completed the challenge in Python and numpy, solving problems using data structures and algorithms. Ranked 2nd on the MUN Computer Science Society leaderboard.</p>
      </li>
      <li>
        <strong>Unity Projects (Winter 2019)</strong><br />
        <p>Completed several beginner-level 2D games using Unity in my free time, including a skating game, a text adventure game, and a number wizard game. These projects demonstrate my interest in game development.</p>
      </li>
      <li>
      <a href='https://github.com/MUNComputerScienceSociety/Automata' target="_blank" rel="noopener noreferrer"><strong>MUNCS Automata Discord bot (Winter 2021)</strong></a><br />
        <p>Contributed to the development of a Discord bot used by the MUN CS Society, adding several fun commands to the bot.</p>
      </li>
      <li>
      <a href='https://github.com/hamzahap/hex16toint' target="_blank" rel="noopener noreferrer"><strong>hex16toint (Spring 2022)</strong></a><br />
        <p>Developed a simple PHP/Python script to convert 16 bit hexadecimal numbers to signed integers.</p>
      </li>
      <li>
        <strong>BlockWars (Ongoing)</strong><br />
        <p>Developing a 2D multiplayer game using C# and Unity. The game includes various PvP modes and uses Steam’s API for hosting and multiplayer functionality.</p>
      </li>
    </ul>
      </section>

      {/* Skills */}
      <section className="SkillsSection">
  <h2>Skills</h2>
  <ul>
    <li>
     
      <div>
        <h3>Python</h3> 
        <p>Proficient in data analysis, machine learning, automation scripts, and GUI development with tkinter.</p>
        <FontAwesomeIcon icon={faPython} />
      </div>
    </li>
    <li>
      <div>
        <h3>Web Development</h3> 
        <p>Skilled in HTML, CSS, PHP, and JavaScript. Developed responsive web applications using frameworks like React.js, Laravel, Flask, and Node.js.</p>
        <FontAwesomeIcon icon={faHtml5} />
      </div>
    </li>
    <li>
      <div>
        <h3>Databases</h3> 
        <p>Proficient with relational and NoSQL databases like MySQL, MongoDB, and SQLite. Expertise in query optimization, backups, and data processing.</p>
        <FontAwesomeIcon icon={faDatabase} />
      </div>
    </li>
    <li>
      <div>
        <h3>Programming Languages</h3> 
        <p>Experienced in Python, C, C#, C++, Java, Fortran, and PHP. Developed various applications, games, and tools across platforms.</p>
        <FontAwesomeIcon icon={faCode} />
      </div>
    </li>
    <li>
      <div>
        <h3>AWS Services</h3> 
        <p>Hands-on experience with services like EC2, S3, Lambda, RDS, and others for cloud solutions and deployments.</p>
        <FontAwesomeIcon icon={faAws} />
      </div>
    </li>
    <li>
      <div>
        <h3>Version Control</h3> 
        <p>Proficient in managing codebases and collaboration using Git and platforms like GitHub.</p>
        <FontAwesomeIcon icon={faGit} />
      </div>
    </li>
    <li>
      <div>
        <h3>Game Development</h3> 
        <p>Developed games using C++ with SFML, Java, and Unity in C#. Experience in 2D game mechanics, NPC interactions, and multiplayer functionalities.</p>
        <FontAwesomeIcon icon={faGamepad} />
      </div>
    </li>
    <li>
      <div>
        <h3>Deployment & DevOps</h3> 
        <p>Familiar with containerization using Docker and deploying web apps on platforms like Heroku.</p>
        <FontAwesomeIcon icon={faCloud} />
      </div>
    </li>
    <li>
      <div>
        <h3>IDEs & Tools</h3> 
        <p>Proficient in tools like Visual Studio, Jupyter Notebook, and LaTeX for development, data processing, and documentation.</p>
        <FontAwesomeIcon icon={faDesktop} />
      </div>
    </li>
  </ul>
</section>


  {/* Footer */}
  <footer>
    <p>&copy; {new Date().getFullYear()} Hamzah Punjabi. All rights reserved.</p>
  </footer>
</div>
);
}

export default App;


