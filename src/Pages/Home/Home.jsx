import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Poster from '../../Components/Poster/Poster';
import { db, firebaseApp } from '../../firebase';
import logo from '../../Assets/img/esLogo.png';
import './Home.css'
import { useHistory } from 'react-router-dom';

export default function Home(props) {
    const {user}= props;
    const[posters, setPosters]= useState([]);
    const history= useHistory()
  
  

    const handleLoginRoute=(url)=>{
       history.push(url) ;
    }
    const handleLogout= ()=>{
        firebaseApp.auth().signOut();
        
    }
   
    const handleCreatePostRoute=()=>{
       history.push("/createpost")
    }
    
    
   

   //Getting Posters
    useEffect(()=>{
         
        const unsubscribe = db.collection('posters').orderBy("timeStamp" , "desc").onSnapshot((snapshot)=>
               {
                   if(!snapshot){
                       return;
                   }
              setPosters(snapshot.docs.map(doc =>                              
                  ({
                      id: doc.id,        //the unique 'auto' ids
                      data: doc.data(),  //the data inside the doc(coll>doc>data)
                  })
                  ))
               } );
            //    console.log(posters[0].data.name);
           
               return () => {      //when comp cleansup/unmount(cleansup is better), (always) detach this real time listener after it's done using it(best def)
                   unsubscribe();  //this is for optimization
               }
             
          }, []); 
 
    return (
        <div className="home">
            <div className="title">
               <div style={{marginTop:"5vh"}}>
                   {
                       user && <span style={{color:"black", marginTop:"5vh", paddingTop:"20px"}} >
                           Logged in as: {user.email} <br/>
                       </span> 
                   }
               {
                   !user && <Button onClick={()=>{handleLoginRoute("/login")}}>
                   <h4 style={{color:"yellow", backgroundColor:"black", padding:"5px", borderRadius:"50px"}}>Login / Create Account</h4>
               </Button>
               }
                {
                    user && <Button onClick={handleLogout}>
                    <h4 style={{color:"white", backgroundColor:"red", padding:"5px", borderRadius:"50px"}}>Log Out</h4>
                </Button>
                }
                 {
                    user && <Button onClick={handleCreatePostRoute}>
                    <div>
                    <h4 style={{color:"yellow", backgroundColor:"black", padding:"5px", boxShadow: "0px 3px 3px 0px #aaaaaa"}}>Create Post</h4>
                    </div>
                </Button>
                }
                 
               </div>
              {/* <img src={logo} height="100px" width="300px" alt="logo"/> <br/> */}
              <h1 style={{display: "inline-block", color:"black" ,boxShadow: "0px 5px 5px 5px #aaaaaa" }}>
             Posts App
              </h1>
             
              
            </div>
           
            <div className="container">
               {
                   posters.map((poster)=>{
                                        
                                        return <Poster  
                                        key={poster.id}
                                        imageUrl= {poster.data.imageUrl}
                                        title={poster.data.title}
                                        description={poster.data.description}
                                        userEmail={poster.data.userEmail}
                                        id= {poster.id}
                                        uid={ poster.data.uid}
                                        />   
                   })
               }
            </div>
            
        </div>
    )
}
 