import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import './Comment.scss'


export default function Comment(props) {
    const {comment} = props;
    const user= useSelector(state => state.user.user)
  const additionalData= useSelector(state => state.user.additionalData)
    useEffect(()=>{
        // console.log(comment.commentMessage)
    },[])
    return (
        <div className="comment">
             
    <span style={{color:"white", fontSize:"bolder", backgroundColor:"grey"}} className="commentEmail">{user.uid==comment.uid?additionalData.name:comment.name?comment.name:comment.name}</span>
    <h3 style={{color:"black", fontSize:"bolder", backgroundColor:"grey" }}className="commentMessage">{comment.commentMessage}</h3>
     
             
        </div>
    )
}
