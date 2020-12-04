import React, { useEffect } from 'react'

export default function Comment(props) {
    const {comment} = props;
    useEffect(()=>{
        // console.log(comment.commentMessage)
    },[])
    return (
        <div className="comment">
             
    <span>{comment.email}</span>
    <h3>{comment.commentMessage}</h3>
     
             
        </div>
    )
}
