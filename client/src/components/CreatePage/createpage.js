import React, { useEffect, useState } from 'react';
import './createpage.css';
import { Navigate } from 'react-router-dom';

function CreatePage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // Error state
    const [moduleContainsSpace, setModuleContainsSpace] = useState(false);
    const [moduleEmpty, setModuleEmtpy] = useState(false);
    const [titleEmpty, setTitleEmpty] = useState(false);
    const [videoLinkEmpty, setVideoLinkEmpty] = useState(false);
    const [descriptionEmpty, setDescriptionEmpty] = useState(false);

    const [moduleName, setModuleName] = useState('');
    const [title, setTitle] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        setModuleContainsSpace(false)
        setModuleEmtpy(false)
        setTitleEmpty(false)
        setVideoLinkEmpty(false)
        setDescriptionEmpty(false)
        
        let error = false
        if (moduleName.indexOf(" ") >= 0) {
            setModuleContainsSpace(true)
            error = true
        } 
        if (moduleName.trim().length === 0) {
            setModuleEmtpy(true)
            error = true
        }
        if (title.trim().length === 0) {
            setTitleEmpty(true)
            error = true
        }
        if (videoLink.trim().length === 0) {
            setVideoLinkEmpty(true)
            error = true
        }
        if (description.trim().length === 0) {
            setDescriptionEmpty(true)
            error = true
        }
        if (error) {
            return
        }

        fetch("/api/v1/admin/create-module", {
            method: "POST",
            body: JSON.stringify({
                "moduleName" : moduleName.trim(),
                "title" : title.trim(),
                "videoLink" : videoLink.trim(),
                "description" : description.trim()
            }),
            headers: {
                "Content-Type" : "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data && data["success"] === true) {
                alert("Module uploaded successfully!")
                return
            }
            alert("Module upload failed. Module name already exists.")
        })
    };

    // Retrieve session
    useEffect(() => {
        fetch("/api/v1/login")
        .then(response => response.json())
        .then(data => {
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
                        <label>Module Name :</label>
                        <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} />
                        {moduleContainsSpace && <p className="create-page-error">Module name must not contain spaces</p>}
                        {moduleEmpty && <p className="create-page-error">Module name cannot be empty</p>}
                    </div>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {titleEmpty && <p className="create-page-error">Title cannot be empty</p>}
                    </div>
                    <div className="form-group">
                        <label>Video Link:</label>
                        <input type="text" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
                        {videoLinkEmpty && <p className="create-page-error">Video link cannot be empty</p>}
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        {descriptionEmpty && <p className="create-page-error">Description cannot be empty</p>}
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
