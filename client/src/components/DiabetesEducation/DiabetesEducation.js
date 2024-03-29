import React from 'react';
import { Link } from 'react-router-dom';
import './DiabetesEducation.css';

function DiabetesEducation() {
  // Description text to be fetched from the database later
  const descriptionText = "This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.This is the description for the Diabetes Education module.";

  return (
    <div className="diabeteseducation-container">
      <h1>Diabetes Education</h1>
      <div className="video-wrapper">
        <iframe
          title="Vimeo Video"
          src="https://player.vimeo.com/video/552139023?h=cd454073fe"
          width="640"
          height="360"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <a href="https://vimeo.com/552139023">Module A - Pediatric Diabetes Education</a> from{' '}
        <a href="https://vimeo.com/stlukes">St. Luke's</a> on <a href="https://vimeo.com">Vimeo</a>.
      </p>
      {/* Description box with green border */}
      <div className="description-container">
        <div className="green-box">
          <p>{descriptionText}</p>
        </div>
      </div>
      {/* Link to navigate back to the splash screen */}
      <Link to="/"><button>Go back to Splash</button></Link>
    </div>
  );
}

export default DiabetesEducation;
