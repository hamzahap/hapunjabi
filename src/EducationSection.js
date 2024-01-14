import React, { useState, useEffect } from 'react';
import './App.css';

function EducationSection() {
  return (
    <div>
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
  
    <h2>Courses</h2>
    <ul>
        <li><strong>COMP 1000</strong> - Introductory overview of computer science, covering basic concepts, algorithm efficiency, and applications.</li>
        <li><strong>COMP 1001</strong> - Fundamental programming concepts, covering data types, algorithms, object-oriented programming, and basic data structures.</li>
        <li><strong>COMP 1002</strong> - Introduction to logic and discrete structures in computer science, focusing on Boolean circuits and algorithm analysis.</li>
        <li><strong>COMP 1003</strong> - Comprehensive study of computing systems, algorithms, data structures, theory of computing, and machine architecture.</li>
        <li><strong>COMP 1510</strong> - Basics of programming for scientific computing, focusing on numerical methods and programming in Fortran 90 and C.</li>
        <li><strong>COMP 1600</strong> - Foundation in computing and IT, covering spreadsheet, database, and presentation software, and data management.</li>
        <li><strong>COMP 2001</strong> - Intermediate-level object-oriented programming and human-computer interaction, with a focus on event-driven programming and interface design.</li>
        <li><strong>COMP 2002</strong> - Problem-solving through algorithms and data structures, covering algorithm design techniques and fundamental algorithms.</li>
        <li><strong>COMP 2003</strong> - Exploration of computer architecture, covering CPU, memory, I/O devices, and alternative architectures.</li>
        <li><strong>COMP 2004</strong> - Fundamentals of operating systems, their interaction with hardware and software, and operating system design.</li>
        <li><strong>COMP 2005</strong> - Software engineering processes from requirements to development, covering use cases, design patterns, and project management.</li>
        <li><strong>COMP 2006</strong> - Study of computer networking, focusing on Internet protocols, protocol stack layering, TCP/UDP, and network layer concepts.</li>
        <li><strong>COMP 2007</strong> - Introduction to database systems and information management, focusing on data storage, retrieval, and effective database use.</li>
        <li><strong>COMP 2008</strong> - Analysis of social and ethical issues in computing, employing case studies on professional challenges and ethical decision-making.</li>
        <li><strong>COMP 3100</strong> - Web programming fundamentals, covering web data transfer, browser content, and server-side frameworks.</li>
        <li><strong>COMP 3200</strong> - Introduction to AI algorithms and data structures, focusing on problem-solving and reasoning in software systems.</li>
        <li><strong>COMP 3201</strong> - Overview of nature-inspired computing methods, exploring evolutionary computing, neural networks, and their applications.</li>
        <li><strong>COMP 3202</strong> - Fundamental concepts and algorithms in machine learning, covering regression, classification, and supervised learning techniques.</li>
        <li><strong>COMP 3400</strong> - Data preparation techniques for pre-processing raw data, focusing on data cleaning, normalization, and dimensionality reduction.</li>
        <li><strong>COMP 3600</strong> - Advanced study in algorithm design and analysis, exploring greedy algorithms, dynamic programming, and dealing with intractable problems.</li>
        <li><strong>COMP 4300</strong> - Introduction to game programming, covering essential topics such as rendering, AI, game physics, and networking.</li>
        <li><strong>COMP 4750</strong> - Introduction to natural language processing, focusing on algorithms for speech recognition, text understanding, and information retrieval.</li>
    </ul>

    </section>
  </div>
  );
}

export default EducationSection;
