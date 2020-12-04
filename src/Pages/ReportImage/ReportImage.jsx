import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import './ReportImage.scss'

export default function ReportImage(props) {
    const [reportMessage, setReportMessage] = useState("");
    const user = props.user.email;
    const location = useLocation();
    const imageUrl= location.state.imageUrl;
    const title = location.state.title;
    const description = location.state.description;
    const userEmail = location.state.userEmail;
    const id = location.state.id;
    const submitReport=()=>{
        if(reportMessage){
            db.collection('reports').add({
                reportMessage: reportMessage,
                reporterEmail: user,
                // timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                reportedImageId: id,
                reportedImageTitle: title,
                reportedImageUrl: imageUrl
        
            });
            setReportMessage("");
            toast.success('🚀 Image Report sent ', {
                position: "bottom-center",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
         }
    }

    const handleHomeRoute=()=>{
        window.location.assign("/");
    }

    return (
        <div className="reportImage">
            <Button  style={{backgroundColor:"#ffcc00",color:"black", fontWeight:"bold", marginBottom:"30px"}} onClick={handleHomeRoute}>Home</Button>
            <textarea rows="4" cols="50" onChange={(e)=>setReportMessage(e.target.value)} value={reportMessage}>
            </textarea> <br/>
            <Button onClick={submitReport} style={{backgroundColor:"green" , color:"white"}}>Submit Report</Button>
        </div>
    )
}