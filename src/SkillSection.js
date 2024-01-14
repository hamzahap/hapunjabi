import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAws, faGit, faGithub, faHtml5, faLinkedin, faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faCloud, faCode, faDatabase, faDesktop, faEnvelope, faFile, faFileAlt, faGamepad, faLocationCrosshairs, faScroll, faUniversity } from '@fortawesome/free-solid-svg-icons';

function SkillsSection() {
  return (
    <div>
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
        <p>Skilled in HTML, CSS, PHP, and JavaScript. Developed responsive web applications, focusing on user-friendly designs and optimized performance.</p>
        <FontAwesomeIcon icon={faHtml5} />
      </div>
    </li>
    <li>
      <div>
        <h3>Frameworks & Technologies</h3> 
        <p>Proficient in using various frameworks and technologies including React.js, .NET Core, Laravel, Flask, Node.js, React Native, and Flutter. Developed cross-platform mobile applications and complex web applications.</p>
        <FontAwesomeIcon icon={faReact} />
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
        <p>Experienced in Python, C, C#, C++, Dart, Java, Fortran, and PHP. Developed various applications, games, and tools across platforms.</p>
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

  </div>
  );
}

export default SkillsSection;
