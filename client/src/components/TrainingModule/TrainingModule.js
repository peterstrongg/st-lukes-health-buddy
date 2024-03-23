import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TrainingModule.css';

const TrainingModule = (props) => {
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState("");
    const [description, setDescription] = useState("");

    const getModuleName = path => {
        return path.substring(path.lastIndexOf('/') + 1);
    }
    
    useEffect(() => {
        const moduleName = getModuleName(window.location.pathname);
        fetch("/api/v1/training/" + moduleName)
        .then(response => response.json())
        .then(data => {
            setTitle(data["title"])
            setVideo(data["video_link"])
            setDescription(data["description"])
        })
    }, [])

    return (
        <div>
            <h1>{title}</h1>
            <div className="video-wrapper">
                <iframe
                    title="Vimeo Video"
                    src={video}
                    width="640"
                    height="360"
                    allow="fullscreen;"
                    allowFullScreen
                ></iframe>
            </div>
            <p>
                <a href="https://vimeo.com/552139023">Module A - Pediatric Diabetes Education</a> from{' '}
                <a href="https://vimeo.com/stlukes">St. Luke's</a> on <a href="https://vimeo.com">Vimeo</a>.
            </p>
            <div className="description-container">
                <div className="green-box">
                    <p>{description}</p>
                </div>
            </div>
            <Link to="/"><button>Go back to Splash</button></Link>
        </div>
    );
}

export default TrainingModule;