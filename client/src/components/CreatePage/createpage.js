import React, { useState } from 'react';
import './createpage.css';

function CreatePage() {
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
        </div>
    );
}

export default CreatePage;
