import React from 'react';
import './VideoTest.css'; // Import VideoTest.css
// This file was created
function VideoTest() {
  return (
    <div className="videotest-container">
      <h1>Video Test</h1>
      <div className="video-wrapper">
        <iframe
          title="Vimeo Video"
          src="https://player.vimeo.com/video/552139023?h=cd454073fe"
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <p> 
        <a href="https://vimeo.com/552139023">Module A - Pediatric Diabetes Education</a> from{' '}
        <a href="https://vimeo.com/stlukes">St. Luke's</a> on <a href="https://vimeo.com">Vimeo</a>.
      </p>
    </div>
  );
}

export default VideoTest;
