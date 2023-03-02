import React from 'react';
import './App.css';
import './styles.css';

function App() {
  return (
    <div className="App">
      {/* Introduction */}
      <header>
        <h1>Hello, I'm Hamzah Punjabi</h1>
        <p>I am a Computer Science student in my final year at MUN.</p>
      </header>

      {/* Social links */}
      <section className="SocialLinks">
        <ul>
          <li><a href="https://github.com/hamzahap"><img src="./github.png" alt="GitHub " />Github</a></li>
          <li><a href="https://www.linkedin.com/in/hamzahpunjabi/"><img src="./linkedin.png" alt="LinkedIn" />LinkedIn</a></li>
          <li><a href="./HamzahPunjabi.pdf" target="_blank">Resume</a> </li>
          <li><a href="mailto:hamzahqatar123@gmail.com">Email</a> </li>
          <li>St. John's, NL, Canada</li>
        </ul>
      </section>

      {/* Education */}
      <section>
      <h2>Education</h2>
      <ul>
        <li>
          <strong>Bachelor of Science – Computer Science, MUN</strong><br />
          January 2019 – August 2023<br />
          CS Average: 90%
        </li>
        <li>
          <strong>Diploma in Information Systems Software (58 credits), CNA-Q</strong><br />
          September 2017 – December 2018<br />
          GPA: 4.0
          </li>
        </ul>
      </section>

      {/* Work Experience */}
      <section>
      <h2>Work Experience</h2>
      <ul>
        <li>
          <strong>Software Developer Intern, SmartICE</strong><br />
          September 2021 - August 2022<br />
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
        </li>
      </ul>
      </section>


      {/* Projects */}
      <section>
      <h2>Projects</h2>
      <ul>
        <li>Wine Quality (Fall 2023) - Conducted a data preprocessing project in Jupyter Notebook analyzing the Wine Quality Data Set from the UCI Machine Learning Repository. Conducted supervised learning, which included data analysis, feature engineering, creating missing values, and prediction of those missing values.</li>
        <li>EncryptionDecryption (Winter 2022) - Created a simple Encryption/Decryption/Backup script using PyMySQL, pandas, and Cryptography to back up database tables with CSV files.</li>
        <li>Blood2D (Fall 2022) - Developed a game using the SFML library in C++ as a group project. The game included advanced features such as collisions, inventory, game progression, shaders, custom user interface, advanced NPCs, and a custom level creation tool.</li>
        <li>Canadian Pollution Visualizer (Winter 2021) - Developed a web program using NodeJS for the backend and ReactJS for the frontend as a group project. The program enabled users to generate various types of graphs and filter data for the graphs.</li>
        <li>Quoridor Board Game (Fall 2020) - Built a board game using Java’s Swing and AWT components as a group project. The game allowed for individual player turns, movement of objects, calculating score, and a pathfinding algorithm.</li>
        <li>Hangman (Fall 2017) - Created a hangman game using Python and the tkinter library as a course project. The game utilized a user-created word list to randomly choose words.</li>
        <li>BlockWars (Ongoing) - Developing a 2D multiplayer game using C# and Unity. The game includes various PvP modes and uses Steam’s API for hosting and multiplayer functionality.</li>
      </ul>
    </section>


      {/* Certificates */}
      <section>
        <h2>Certificates</h2>
        <ul>
          {/* Add your certificates details here */}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2>Skills</h2>
        <ul>
          <li>Languages: Python, HTML, CSS, SQL, C#, C, C++, Java, Fortran, PHP, JavaScript</li>
          <li>Frameworks: React.js, Laravel, Node.js, Docker, REST</li>
          <li>Tools: Git, MongoDB, MySQL, SQLite, Heroku, Unity, Jupyter, Visual Studio</li>
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