import React, { useState, useEffect } from 'react';
import './App.css';

function CertificatesSection() {
  return (
    <div>
    {/* Certificates */}
    <section className="CertificatesSection">
        <h2>Certificates</h2>
        <ul>
          {/* Add your certificates details here */}
          <center><a href="https://www.credly.com/badges/1769a415-88da-4445-9447-f92b9ae73337" target="_blank" rel="noopener noreferrer"><img src="./badge.png" alt="AWS Badge" /></a></center>
        </ul>
        <br />
      
      </section>

  </div>
  );
}

export default CertificatesSection;
