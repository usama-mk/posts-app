import { Button, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useLocation, withRouter } from 'react-router-dom';
import Comment from '../../Components/Comment/Comment';
import { db } from '../../firebase';
import firebase from 'firebase';
import './ViewImage.scss'

function ViewImage(props) {
    const [comment, setComment]= useState("")
    const [comments, setComments]= useState([])
    const location = useLocation();
    const imageUrl= location.state.imageUrl;
    const title = location.state.title;
    const description = location.state.description;
    const userEmail = location.state.userEmail;
    const id = location.state.id;
    useEffect(() => {
        const unsubscribe = db.collection('posters').doc(id).collection("comments").orderBy("timeStamp" , "asc").onSnapshot((snapshot)=>
               {
                   if(!snapshot){
                       return;
                   }
              setComments(snapshot.docs.map(doc =>                              
                  ({
                      id: doc.id,        
                      data: doc.data(),  
                  })
                  ))
               } );
           
               return () => {      
                   unsubscribe();   
               }
     }, [location]);


     const renderRedirect = () => {
        if (true) {
          props.history.push({
            pathname: '/reportimage',
            state: { imageUrl: imageUrl,
                     title: title,
                     description: description,
                     userEmail: userEmail,
                     id: id
            }
          })
        }
      }

  const submitComment=()=>{
    
     if(comment){
        db.collection('posters').doc(id).collection("comments").add({
            commentMessage: comment,
            email: userEmail,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()  
    
        });
        setComment("");
     }
  }

  const handleHomeRoute=()=>{
    window.location.assign("/");
}

    return (
        <div className="viewImage">
            <img src={imageUrl} alt="Image" width="250" height="250"/> <br/>
            <Button onClick={() =>{ renderRedirect() }} style={{backgroundColor:"red", color:"white"}}>Report</Button>
            <Button  style={{backgroundColor:"#ffcc00",color:"black", fontWeight:"bold", marginLeft:"5px"}} onClick={handleHomeRoute}>Home</Button>
            <h1>{title}</h1>
           <Input type="text" id="submitComment" onChange={(e)=>setComment(e.target.value)} value={comment}/>
           <Button onClick={submitComment} >Comment</Button>
           {
               comments.map((comment)=>{
                   return <Comment key={comment.id} comment={comment.data} />
               })
           }
        </div>
    )
}
export default withRouter(ViewImage);