import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export default function ViewImage(props) {
    const location = useLocation();
    const imageUrl= location.state.imageUrl;
    const title = location.state.title;
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.state.imageUrl); // result: 'some_value'
     }, [location]);
 
    return (
        <div className="viewImage">
            <img src={imageUrl} alt="Image"/>
            <h1>{title}</h1>
        </div>
    )
}
