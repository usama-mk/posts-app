import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Poster from '../../Components/Poster/Poster';
import { db, firebaseApp } from '../../firebase';
import logo from '../../Assets/img/esLogo.png';
import './Home.css'

export default function Home(props) {
    const {user}= props;
    const[posters, setPosters]= useState([]);
    const[dropDownDetails, setDropDownDetails]= useState([]);
   const[selectedGenre, setSelectedGenre]=useState("");
   const [selectedCity, setSelectedCity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedMonthAndYear, setSelectedMonthAndYear ] = useState("");
    const [isAdmin, setIsAdmin]=useState("")
    const[selectedCountry, setSelectedCountry]=useState("")
    const [selectedName, setSelectedName]=useState("")
    var  genres=[];
    var cities=[];
    var locations=[];
    var countries=[];
    var monthAndYears=[];
    var names=[];
  

    const handleLoginRoute=(url)=>{
        window.location.href=url ;
    }
    const handleLogout= ()=>{
        firebaseApp.auth().signOut();
        
    }
   
    const handleCreatePostRoute=()=>{
       window.location.assign("/createpost")
    }
    const handleApprovePostRoute=()=>{
        window.location.assign("/approvepost")
    }
   const selectGenre=()=>{
    const GENRE= document.getElementById("genre").value
    setSelectedGenre(GENRE);
    console.log(GENRE)
     
   }
   const selectCity=()=>{
    const CITY= document.getElementById("city").value
    setSelectedCity(CITY);
    console.log(CITY)
     
   }
   const selectMonth=()=>{
    const MONTH= document.getElementById("month").value
    setSelectedMonthAndYear(MONTH);
    console.log(MONTH)
     
   }
   const selectLocation=()=>{
    const LOCATION= document.getElementById("location").value
    setSelectedLocation(LOCATION);
    console.log(LOCATION)
     
   }
   const selectName=()=>{
    const NAME= document.getElementById("name").value
    setSelectedName(NAME);
    console.log(NAME)
     
   }
   const selectCountry=()=>{
    const COUNTRY= document.getElementById("country").value
    setSelectedCountry(COUNTRY);
    console.log(COUNTRY)
     
   }

    
   

   //Getting Posters
    useEffect(()=>{
         
        const unsubscribe = db.collection('posters').onSnapshot((snapshot)=>
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
                       user && <span style={{color:"white", marginTop:"5vh", paddingTop:"20px"}} >
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
                    <h4 style={{color:"yellow", backgroundColor:"black", padding:"5px"}}>Create Post</h4>
                    </div>
                </Button>
                }
                 
               </div>
              {/* <img src={logo} height="100px" width="300px" alt="logo"/> <br/> */}
              <h1 style={{display: "inline-block", color:"white", borderBottom: "1px solid black", }}>
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
                                        />   
                   })
               }
            </div>
            
        </div>
    )
}
 