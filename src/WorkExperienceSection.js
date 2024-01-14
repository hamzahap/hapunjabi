import React, { useState, useEffect } from 'react';
import './App.css';

function WorkExperienceSection() {
  return (
    <div>
    {/* Work Experience */}
    <section className="WorkExperienceSection">
          <h2>Work Experience</h2>
          
          <center><strong>Software Developer, Bin Yousef</strong></center><br />
          <center><b>December 2023 - Present</b></center><br />
          <ul>
              <li>Developing a comprehensive web application utilizing .NET Core for robust backend functionality and optimized performance.</li>
              <li>Building a cross-platform mobile application with Flutter, ensuring a seamless and responsive user experience on both iOS and Android devices.</li>
              <li>Integrating a SQL database for efficient data management, storage, and retrieval, tailored to the application's requirements.</li>
              <li>Leveraging a Sports API for dynamic data integration, providing real-time sports statistics and updates within the application.</li>
              <li>Implementing Azure DevOps pipelines to automate the continuous integration and delivery process, enhancing the software deployment cycle.</li>
              <li>Utilizing Git within Azure for version control, facilitating effective team collaboration and efficient management of code changes.</li>
              <li>Designing and developing RESTful API solutions, focusing on scalable and secure data communication between the application and external services.</li>
              <li>Crafting intuitive API interfaces for enhanced user interaction, ensuring ease of use and accessibility for a wide range of users.</li>
          </ul>
          <br/>
          <br/>
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
  </div>
  );
}

export default WorkExperienceSection;
