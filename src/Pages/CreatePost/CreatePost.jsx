import { Button, IconButton, Input, LinearProgress, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { db, firebaseApp, storage } from '../../firebase';
import { toast } from 'react-toastify';
// import '../Components/toast.css';
import 'react-toastify/dist/ReactToastify.css';
import './CreatePost.scss'
import AddCircle from '@material-ui/icons/AddCircle';
import firebase from 'firebase';



toast.configure();
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        backgroundColor: "#3f51b5",
        // color: 'white',
        margin: theme.spacing(3, 0, 2), 
        
        '&:hover': {
            backgroundColor: "blue",
            color: 'white',
            fontWeight: "bold"
        }
    },
}));



export default function CreatePost(props) {
    const classes= useStyles();
    const isAdmin= props.isAdmin
    const {register,handleSubmit, errors, reset} = useForm();
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState("");
    var filez="";
     
     useEffect(() => {
    uploadFileHandler()
}, [file]);
     
    const handleHomeRoute=()=>{
        window.location.assign("/");
    }
    const onSubmit = data => {
        data.userEmail= props.user.email;
        const dateL= (new Date(data.monthAndYear));
        var mm=(dateL.getMonth());
        mm=mm+1;
        var yyyy=(dateL.getFullYear());
        data.monthAndYear=`${mm}/${yyyy}`
        console.log(data.userEmail)
        const refID = db.collection("posters").doc().id;
        const ref = db.collection('posters').doc(refID);  
        var URL;
       
        if(file && progress==100){
            storage.ref("images").child(file.name).getDownloadURL().then(url => {
                URL=url;      

             }).then(()=>{
                 ref.set({
                     userEmail: data.userEmail,
                     imageUrl: URL,
                     timeStamp: firebase.firestore.FieldValue.serverTimestamp()  ,         
                     description: data.description,
                     
                 })
             }).then(()=>{
                 ref.update({
                     imageUrl: URL
                 })
                 // clearEditProfile();
             })

             toast.success('🚀 Successfully added the data to the database ', {
                position: "bottom-center",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                document.getElementById("file-input").value = "";
                // setFile("");
                filez="";
                setProgress(0)
                reset();
                
        }
      else{
           console.log(`${file}`)
        toast.warning("please upload an image or let it finish uploading");
      }
       
       
    };
   
    const selectFileHandler = (event) => {
         
        if (event.target.files[0]) {
            setFile(event.target.files[0])
            filez=event.target.files[0];
            uploadFileHandler();
        }
         
    
    }
   
    const uploadFileHandler = () => {
        
        if (file) {
            console.log(`name: ${file.name}`)
            const uploadTask = storage.ref(`images/${file.name}`).put(file);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                    console.log(progress)
                },
                error => {
                    console.log(error);
                },
               
            )
        }
    }

    return (
        <div  className={classes.paper}>
            <Button  style={{backgroundColor:"#ffcc00",color:"black", fontWeight:"bold"}} onClick={handleHomeRoute}>Home</Button>
            <h1 style={{backgroundColor:"black",color:"#ffcc00", fontWeight:"bold", padding:"10px"}}>Create Poster</h1>
            <h3 style={{backgroundColor:"black",color:"white", fontWeight:"bold", padding:"5px"}}>Upload Poster Picture</h3>
              <div>
              <div class="image-upload">
  <label for="file-input">
  < AddCircle   style={{width:"50px", height:"50px", color:"#f06d06" }}/>
  </label>

  <input id="file-input" type="file" onChange={selectFileHandler} />
</div>
              {/* <input type="file" className="input" id="input"  onChange={selectFileHandler}/> <br/> */}
               <LinearProgress color="primary" variant="determinate" value={progress} />
               {/* <Button style={{backgroundColor:"black",color:"#ffcc00", fontWeight:"bold", padding:"10px"}} className="btn"  onClick={uploadFileHandler} >Upload</Button> */}
              </div>
           <form autoComplete="off" className="go-right" onSubmit={handleSubmit(onSubmit)} >
   
  
  {/*  */}
  <div>
    <input style={{marginTop:"10px"}} placeholder="Description" name="description" type="text" ref={register({required: true, })}/>
    {/* {errors.name && <p style={{color:"red"}}>You can enter max 200 characters</p> } */} 
    <label>Description</label>
  </div>
   
           {/* {errors.password && <p>{errors.password.message}</p>} */}
           <IconButton>
           <input style={{backgroundColor:"#f06d06"}} className={classes.submit} type="submit" value="Add Poster" />

           </IconButton>           </form>
        </div>
    )
}
 