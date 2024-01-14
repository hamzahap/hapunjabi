import React, { useState, useEffect } from 'react';
import './App.css';

function ProjectsSection() {
  return (
    <div>
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
          <strong>TaskTracker (Winter 2022)</strong><br />
          <p>Developed a task management application using .NET Core and Entity Framework. Focused on clean architecture and best coding practices, integrated user authentication, designed a responsive user interface, and utilized database operations for task management.</p>
      </li>
      <li>
        <strong>Blood2D (Fall 2022)</strong><br />
        <p>Developed a game using the SFML library in C++ as a group project. The game included advanced features such as collisions, inventory, game progression, shaders, custom user interface, advanced NPCs, and a custom level creation tool.</p>
      </li>
      
      <li>
          <strong>SimpleNotes (Fall 2022)</strong><br />
          <p>Built a straightforward note-taking app using React Native. Aimed for a minimalist and user-friendly interface, provided basic features for creating, editing, and deleting notes, and ensured data persistence through local storage for offline access.</p>
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


  </div>
  );
}

export default ProjectsSection;
