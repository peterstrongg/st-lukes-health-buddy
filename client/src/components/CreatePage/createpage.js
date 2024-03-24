import React, { useEffect, useState } from 'react';
import './createpage.css';
import { Navigate } from 'react-router-dom';

function CreatePage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [videoEmbed, setVideoEmbed] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Title:", title);
        console.log("Video Embed:", videoEmbed);
        console.log("Description:", description);
        console.log("Link:", link);
    };

    // Retrieve session
    useEffect(() => {
        fetch("/api/v1/login")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data["loggedIn"]) {
                setLoggedIn(true);
            }
            setLoading(false);
        })
    }, [])

    const logout = () => {
        fetch("/api/v1/logout")
        .then(response => response.json())
        .then(_ => {
            setLoggedIn(false)
        })
    }

    if(loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    else if(!loading && loggedIn) {
        return (
            <div className="create-page">
                <h1>Create Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Video Embed:</label>
                        <input type="text" value={videoEmbed} onChange={(e) => setVideoEmbed(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Link (healthbuddy.com/x):</label>
                        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <button onClick={logout}>Log out</button>
            </div>
        );
    }
    else if(!loading && !loggedIn) {
        return (
            <Navigate to="/login" replace={false} />
        )
    }
}

export default CreatePage;
