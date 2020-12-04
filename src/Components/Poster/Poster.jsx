import React, { useState } from 'react'
import posterImg from '../../Assets/img/poster.png'
import bgImg from '../../Assets/img/posters/1.jpg'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ViewImage from '../../Pages/ViewImage/ViewImage';
import { withRouter } from 'react-router-dom';




function Poster(props) {
    const [isOpen, setIsOpen]= useState("");
    
    const imageUrl=props.imageUrl;
    const title = props.title;
    const description = props.description;
    const userEmail= props.userEmail;
    const id= props.id;

   const renderRedirect = () => {
      if (true) {
        props.history.push({
          pathname: '/viewimage',
          state: { imageUrl: imageUrl,
                   title: title,
                   description: description,
                   userEmail: userEmail,
                   id: id
          }
        })
      }
    }
     
    return (
        <div>
            <div onClick={() =>{ renderRedirect() }} style={{backgroundColor:"rgba(0, 0, 0, 0.3)", width:"auto", height:"auto", padding:"5px", margin:"5px", marginTop:"4vh", display:"flex", flexDirection:"column", alignItems:"center"}} className="posterContainer">
                 
            <span style={{width:"100%",alignItems:"start", color:"white", fontWeight:"bold", wordWrap:"break-word" }}>{title}</span> <br/>
                <img  src={imageUrl?imageUrl:posterImg}  width="113" height="168" />
            </div>
            {/* {isOpen && (
              
              <ViewImage imageUrl={imageUrl?imageUrl:posterImg} />
                
                )
                } */}
            
        </div>
    )
}
 export default withRouter(Poster);