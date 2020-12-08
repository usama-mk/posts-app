import React, { useState } from 'react'
import posterImg from '../../Assets/img/poster.png'
import bgImg from '../../Assets/img/posters/1.jpg'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ViewImage from '../../Pages/ViewImage/ViewImage';
import { withRouter } from 'react-router-dom';
import './Poster.scss';
import { Button, Input, Card } from '@material-ui/core';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreHoriz from '@material-ui/icons/MoreHoriz';




function Poster(props) {
    const [isOpen, setIsOpen]= useState("");
    
    const imageUrl=props.imageUrl;
    const title = props.title;
    const description = props.description;
    const userEmail= props.userEmail;
    const id= props.id;
    const uid= props.uid;

   const renderRedirect = () => {
      if (true) {
        props.history.push({
          pathname: '/viewimage',
          state: { imageUrl: imageUrl,
                   title: title,
                   description: description,
                   userEmail: userEmail,
                   id: id,
                   uid: uid
          }
        })
      }
    }
     const reportRedirect = () => {
        if (true) {
          props.history.push({
            pathname: '/reportimage',
            state: { imageUrl: imageUrl,
                     title: title,
                     description: description,
                     userEmail: userEmail,
                     id: id,
                     uid: uid
            }
          })
        }
      }
     
    return (
        <div className="poster">
            <div  style={{backgroundColor:"white", border: "1px solid lightGrey", width:"auto", height:"auto", maxHeight:"670px", padding:"5px", overFlow:"hidden", margin:"10px", marginTop:"4vh", display:"flex", flexDirection:"column", alignItems:"center"}} className="posterContainer">
                 
            {/* <span style={{width:"100%",alignItems:"start", color:"white", fontWeight:"bold", wordWrap:"break-word" }}>{title}</span> <br/> */}
            <div style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            {/* <i class="fad fa-user-circle"></i> */}
            <div style={{display:"flex", alignItems:"center"}}>
            <AccountCircle/>
            <h5  style={{ color:"black"}}>{uid}</h5>
            </div>
            {/* <Button variant="outlined" size="small" onClick={() =>{ reportRedirect() }} style={{ color:"black", height:"15px"}}>Report</Button> */}
            <MoreHoriz className="dots" onClick={() =>{ reportRedirect() }}/>
            </div>
            <div onClick={() =>{ renderRedirect() }}>
                <img  src={imageUrl?imageUrl:posterImg}  width="270" height="270" />
            </div>
            <div style={{width:"100%", display:"flex", justifyContent:"flex-end" }}>
           
          
            <div className="comment"  style={{display:"flex", alignItems:"center"}}  onClick={() =>{ renderRedirect() }}>
            <h5 style={{margin:"0px"}}>Comment </h5>
            < ChatBubbleOutline />
            </div>
            
            </div>
            <div style={{maxWidth:"366px",width:"100%", display:"flex",  flexWrap:"wrap",}}>
            <h4 style={{ width:"100%", overflow:"hidden" , overflowWrap:"break-word", textOverflow:"ellipsis", maxHeight:"103px", margin:"0px", justifyContent:"flex-start"}}>{description}</h4>
            </div> 
            </div>
             
            
        </div> 
    )
}
 export default withRouter(Poster);