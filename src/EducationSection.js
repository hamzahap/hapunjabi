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
    <li>
      <strong>COMP 1000</strong><br />
      <p>Computer Science - An Introduction is a foundational course that offers students an overview of computer science. It equips them with the necessary knowledge to understand and appreciate computing in everyday life. The course covers topics such as computer program development, the representation and manipulation of information by computers, algorithm efficiency, and explores various applications of computer science in contemporary and future contexts.</p>
    </li>
    <li>
        <strong>COMP 1001</strong><br />
        <p>Introduction to Programming is a course that introduces fundamental programming techniques, primitive data types, and simple algorithms along with their design concepts. The course covers a variety of topics including data types, variables, operations, expressions, assignment statements, input and output, selection and repetition, functions, file handling, algorithms, fundamental data structures (such as strings, arrays, lists, sets, and dictionaries), object-oriented programming (including objects and methods, overloading operators and methods, inheritance, and polymorphism), recursion, exception handling, searching and sorting (linear and binary search, insertion, selection, and bubble sort), and linked lists.</p>
    </li>
    <li>
        <strong>COMP 1002</strong><br />
        <p>Introduction to Logic for Computer Scientists is designed to provide students with a fundamental understanding of logic and discrete structures, which are essential in computer science. The course focuses on computer science-specific applications, including Boolean circuits and basic algorithm analysis. Topics covered include propositional and predicate logic, set theory, functions, relations, incomputability, proof techniques including induction, and basic counting and modular arithmetic.</p>
    </li>

    <li>
        <strong>COMP 1003</strong><br />
        <p>Foundations of Computing Systems is a comprehensive course that introduces students to fundamental topics in computer science. It covers algorithms and data structures, providing insights into abstract data types, implementation, sorting, searching, and the performance characteristics of data structures. The course also explores the theory of computing, delving into alphabets, formal languages, abstract machines, finite state automata, Turing machines, universality, computability, and intractability. Additionally, students will learn about machine architecture, including the transition from abstract machines to real computers, representation of information, machine language programming, virtual machines, Boolean logic, and digital circuits.</p>
    </li>


    <li>
        <strong>COMP 1510</strong><br />
        <p>An Introduction to Programming for Scientific Computing is designed to introduce students to basic programming in the context of numerical methods. The course aims to provide the foundation necessary to handle larger scientific programming projects. Topics covered include computer terminology, fundamental concepts, problem solving, floating-point arithmetic, programming in Fortran 90 (covering data types, expressions, I/O, formatted I/O, if statements, logical operators, loops, arrays, and subprograms), numerical methods for solving problems in Physics, Chemistry, and Mathematics, and programming in C (covering data types, expressions, I/O, formatted I/O, if statements, logical operators, loops, arrays, and subprograms).</p>
    </li>


    <li>
        <strong>COMP 1600</strong><br />
        <p>Basic Computing and Information Technology is a course designed to provide students with a foundational understanding of basic concepts and essential skills needed to effectively utilize spreadsheet, database, and presentation software for data management, analysis, and presentation. The course covers various topics, including using the Windows operating system for file organization and management, using MS-Excel software for electronic spreadsheets, data processing, decision-making, graphing, summarizing, analyzing, and workbook design. Additionally, students will learn how to use MS-Access for database management, including designing queries, implementing security and integrity, and database design. The course also includes the use of MS-PowerPoint to create efficient presentations and integration of data from multiple applications such as MS-Word, MS-Excel, MS-Access, and MS-PowerPoint.</p>
    </li>

    <li>
        <strong>COMP 2001</strong><br />
        <p>Object-Oriented Programming and Human-Computer Interaction is an intermediate-level course that builds upon the foundations laid in Introduction to Programming. This course delves into object-oriented programming, covering topics such as event-driven programming, program correctness, simple refactoring, interfaces, and human-computer interaction. It also offers a brief overview of various programming languages. The course aims to equip students with advanced programming skills and an understanding of designing user-friendly interfaces for effective human-computer interaction.</p>
    </li>

    <li>
        <strong>COMP 2002</strong><br />
        <p>Data Structures and Algorithms is a course focused on teaching problem-solving techniques through fundamental algorithms and data structures, basic design techniques, and analysis. The course will be primarily language-neutral and will present material mainly in pseudocode. However, it will also incorporate a significant programming (implementation) component through assignments and labs. Topics covered include algorithm analysis, various algorithm design techniques (brute-force, greedy, divide-and-conquer, backtracking, dynamic programming), data structures (stacks, queues, binary search trees, hash tables, graphs), and fundamental algorithms (sorting, searching, BFS/DFS, MST, shortest path).</p>
    </li>

    <li>
        <strong>COMP 2003</strong><br />
        <p>Computer Architecture is a course that aims to explore the inner workings of computers and how they are constructed. The course covers the classical components of a computer system, including the CPU, ALU, buses, memory, and I/O devices. It also delves into topics like integer arithmetic, bitwise operations, state machines, instruction set architecture, Boolean algebra, logic design, register transfer level, memory management, interruption, and I/O. Additionally, the course explores concepts related to multiprocessing and alternative computer architectures. Throughout the course, students will gain insights into various levels of abstraction used to understand computer organization and architecture.</p>
    </li>

    <li>
        <strong>COMP 2004</strong><br />
        <p>Introduction to Operating Systems is a course that focuses on the fundamental aspects of operating systems. The main objectives of this course are to teach students how operating systems interface with hardware and software resources in a user's environment. Additionally, students will learn about the composition and connections of multilevel operating systems and gain the ability to design substantial parts of an operating system. The course covers a wide range of topics, including an introduction, overview, and history of operating systems, process management, process coordination, memory hierarchy and management, file management, interface communication, protection mechanisms, and performance evaluation.</p>
    </li>

    <li>
        <strong>COMP 2005</strong><br />
        <p>Software Engineering is a course with the objective of guiding students through the process of creating a software system, starting from requirements capture. The course covers requirements capture techniques using use case analysis, creating an object-oriented domain analysis model based on the use cases, transforming the domain model into software classes, and applying design patterns in software development. The course also includes topics like software development process definitions, software lifecycles, systems-level considerations, software process models, use cases and UML notation, software construction, project management, verification and validation, software evolution, software reliability, professional communication, professional ethics, and defensive programming. Optional topics such as software tools like CVS/SVN/Git, Ant, and JUnit may also be covered.</p>
    </li>

    <li>
        <strong>COMP 2006</strong><br />
        <p>Computer Networking is a course focused on the design and performance of Internet protocols. The course primarily emphasizes the study of the most commonly used protocols that are integral to modern computer systems. Topics covered include an introduction to protocol stack layering, essential application-layer protocols, programming with sockets, transport layer concepts with a focus on reliable data transfer, and an exploration of TCP and UDP. Additionally, the course delves into the network layer, covering switching, routing, and IP, as well as discussions on link and access technologies.</p>
    </li>
    <li>
        <strong>COMP 2007</strong><br />
        <p>Introduction to Information Management is a course that introduces students to fundamental concepts in database systems and information management. The course focuses on teaching students how to analyze situations where data needs to be stored, design a database, and then implement and utilize it effectively. Topics covered include basic information storage and retrieval, data capture and representation, queries, links, analysis, indexing, scalability, database systems, core DBMS function design, architecture, the use of declarative query languages, data modeling, and considerations related to security and privacy.</p>
    </li>
    <li>
        <strong>COMP 2008</strong><br />
        <p>Social Issues and Professional Practice is a course that equips students with the knowledge and skills to address ethical and social issues in computing. It involves a comparative analysis of different approaches to determine appropriate actions in various situations. The course employs case studies to illustrate professional challenges in computing and related ethical considerations. Topics covered include the social implications of computing, ethical analysis fundamentals (including ethical argumentation and theories), professional ethics, intellectual property (including IP rights, copyright, plagiarism, software piracy, and open source), privacy and civil liberties, and sustainability.</p>
    </li>
    <li>
        <strong>COMP 3100</strong><br />
        <p>Web Programming is a course that focuses on web information systems from a programming perspective. It covers the fundamentals of web data transfer across the network, designing interactive browser content, and providing dynamic server-side pages. Topics include the foundation of web information systems, which covers HTTP, web servers, browsers, and other clients. The client-side portion of the course delves into HTML5, CSS3, JavaScript, browser APIs, Browser Development Tools, and mobile web applications. The server-side section includes topics like CGI and Python Server Frameworks (such as Flask). The course also touches on application frameworks.</p>
    </li>
    <li>
        <strong>COMP 3200</strong><br />
        <p>This course explores fundamental algorithmic techniques and data structures essential for embedding basic intelligent behaviors, such as problem-solving and reasoning, in software systems and agents. Topics covered include search algorithms, logical reasoning, and probabilistic reasoning in the context of artificial intelligence.</p>
    </li>
    <li>
        <strong>COMP 3201</strong><br />
        <p>Introduction to Nature-Inspired Computing offers an overview of popular computing methods inspired by biological and non-biological systems. The course explores methods such as cellular automata, evolutionary computing, swarm intelligence, neural networks, complex networks, and artificial life. Students gain insights into their applications in areas like optimization, machine learning, and robotics, as well as their contributions to advances in the natural sciences.</p>
    </li>
    <li>
        <strong>COMP 3202</strong><br />
        <p>Introduction to Machine Learning is a course that covers fundamental concepts and algorithms in machine learning for regression and classification tasks. Students will learn about various machine learning methods, including linear methods, model assessment and selection, measuring classifier performance, supervised learning techniques like nearest-neighbors and decision trees, as well as combining classifiers through methods such as boosting and random forests. Additionally, the course introduces other approaches such as support vector machines and hidden Markov models.</p>
    </li>
    <li>
        <strong>COMP 3400</strong><br />
        <p>Data Preparation Techniques is a course that equips students with essential knowledge and skills for pre-processing raw data. Students learn how to perform data pre-processing on both small and large datasets, evaluate the impact of pre-processing techniques using data mining and machine learning methods, and scale up pre-processing for large datasets using distributed frameworks. The course covers various topics, including data cleaning, scaling, normalization, discretization, supervised and unsupervised learning, dimensionality reduction, feature selection, data integration, encodings, and MapReduce for scaling up data analysis.</p>
    </li>
    <li>
        <strong>COMP 3600</strong><br />
        <p>Algorithmic Design and Analysis is a course designed to enhance students' algorithmic problem-solving abilities. The course delves into general methods of algorithm design and analysis, going beyond specific algorithms. Topics covered include greedy algorithms, divide and conquer, dynamic programming, network flows, NP-completeness with examples of reductions, and strategies for dealing with intractable problems such as approximation algorithms, heuristics, and randomized algorithms.</p>
    </li>
    <li>
        <strong>COMP 4300</strong><br />
        <p>Introduction to Game Programming is an introductory course designed for students interested in learning the fundamental principles of game programming. The course covers various topics, including vector math for games, rendering, animation, artificial intelligence, collision detection, game physics, user interfaces, camera systems, event-based systems, scripting languages, basic networking, and more. Students will have the opportunity to apply their knowledge by creating a fully functional game during the course.</p>
    </li>
    <li>
        <strong>COMP 4750</strong><br />
        <p>Introduction to Natural Language Processing is a course that explores various tasks related to human languages, including speech recognition, text understanding, and information retrieval. The course covers algorithms and data structures used to solve key NLP tasks, focusing on both rule-based and statistical paradigms. Students will delve into topics like linguistics, utterance comprehension, production, language acquisition, and special applications like language translation, question answering, and text mining. The course emphasizes text-based processing while also addressing speech-based processing where applicable.</p>
    </li>


    </ul>
    </section>
  </div>
  );
}

export default EducationSection;
