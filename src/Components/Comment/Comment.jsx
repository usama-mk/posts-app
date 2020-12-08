import React, { useEffect } from 'react'
import './Comment.scss'


export default function Comment(props) {
    const {comment} = props;

    useEffect(()=>{
        // console.log(comment.commentMessage)
    },[])
    return (
        <div className="comment">
             
    <span style={{color:"white", fontSize:"bolder", backgroundColor:"grey"}} className="commentEmail">{comment.uid}</span>
    <h3 style={{color:"black", fontSize:"bolder", backgroundColor:"grey" }}className="commentMessage">{comment.commentMessage}</h3>
     
             
        </div>
    )
}
