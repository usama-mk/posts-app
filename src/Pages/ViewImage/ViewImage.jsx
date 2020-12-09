import { Button, Input, Card } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useLocation, withRouter } from 'react-router-dom';
import Comment from '../../Components/Comment/Comment';
import { db } from '../../firebase';
import firebase from 'firebase';
import './ViewImage.scss';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ViewImage(props) {
    const user= props.user;
    const [comment, setComment]= useState("")
    const [comments, setComments]= useState([])
    const location = useLocation();
    const imageUrl= location.state.imageUrl;
    // const title = location.state.title;
    const description = location.state.description;
    const userEmail = location.state.userEmail;
    const id = location.state.id;
      const uid = location.state.uid;
     const matches = useMediaQuery('(max-width:860px)');
var name   = userEmail.substring(0, userEmail.lastIndexOf("@"));
    useEffect(() => {
       
 
         console.log(userEmail)
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
            email: user.email,
            uid:user.uid,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()  
    
        });
        setComment("");
     }
  }

  const handleHomeRoute=()=>{
    window.location.assign("/");
}

    return (
       <Card >
        <div className="viewImage">
           <div style={{width:matches?"400px":"1000px", margin:"0 auto", }}>
            <img src={imageUrl} alt="Image" width={matches?"300px":"auto"} height="400px"/> 
           </div>
           <br/>
            <Button onClick={() =>{ renderRedirect() }} style={{backgroundColor:"red", color:"white", boxShadow: "0px 2px 2px 0px #aaaaaa"}}>Report</Button>
            <Button  style={{backgroundColor:"#ffcc00",color:"black", fontWeight:"bold", marginLeft:"5px", boxShadow: "0px 2px 2px 0px #aaaaaa"}} onClick={handleHomeRoute}>Home</Button> <br/>
            {/* <h1 className="titleIn">{title}</h1> <br/> */}
             <h4 className="">{description}</h4> <br/> <hr/>  
              <h1 className="titleIn">Comentarios</h1> <br/>
           { user &&
               <div>
               <Input type="text" id="submitComment" onChange={(e)=>setComment(e.target.value)} value={comment}/>
           <Button style={{backgroundColor:"#03396c", color:"white", marginLeft:"5px", boxShadow: "0px 2px 2px 0px #aaaaaa"}} onClick={submitComment} >Add Comment</Button>
               </div>
           }
           {
               comments.map((comment)=>{
                   return <Comment key={comment.id} comment={comment.data}   />
               })
           }
        </div>
       </Card>
    )
}
export default withRouter(ViewImage);