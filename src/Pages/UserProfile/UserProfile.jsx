import { TextField } from '@material-ui/core'
import { CheckBoxOutlineBlank, Edit, HomeOutlined, SettingsPhoneTwoTone, ThumbUpRounded } from '@material-ui/icons'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAdditionalData } from '../../actions';
import { db } from '../../firebase';
import './UserProfile.scss'

function UserProfile({user, additionalData}) {
    // const additionalData= useSelector(state => state.user.additionalData)
    const [newEmail, setNewEmail]= useState(additionalData.email)
    const [newBirthday, setNewBirthday]= useState(additionalData.birthday)
    const [newGender, setNewGender]= useState(additionalData.gender)
    const [newPhoneNumber, setNewPhoneNumber]= useState(additionalData.phoneNumber)
    const [newCountry, setNewCountry]= useState(additionalData.country)


    const history=useHistory()
    const [editOn, setEditOn]= useState(false)
    const [newName, setName]= useState(additionalData.name)
    const dispatch= useDispatch()

    const handleHomeRoute=()=>{
        history.push("/");
    }
    const editToggle=()=>{
        document.getElementById('name').toggleAttribute('disabled')
        document.getElementById('country').toggleAttribute('disabled')
        document.getElementById('bd').toggleAttribute('disabled')
        document.getElementById('pn').toggleAttribute('disabled')
        document.getElementById('g').toggleAttribute('disabled')
        setEditOn((prev)=> !prev)
    }

    const updateProfile=()=>{
        const userRef = db.doc(`users/${user.uid}`);
        try {
            userRef
              .set({
                name: newName,
                email: newEmail,
                birthday: newBirthday,
                gender: newGender,
                phoneNumber: newPhoneNumber,
                createdAt: new Date(),
              })
              .then(() => {
                  dispatch(setAdditionalData({
                    name: newName,
                    email: newEmail,
                    birthday: newBirthday,
                    gender: newGender,
                    phoneNumber: newPhoneNumber,
                    country: newCountry,
                  
                  }))
                  editToggle()
              });
          } catch (error) {
            console.log(`error is: ` + error);
          }
        
    }


    useEffect(()=>{
        // db.collection("users").doc(`${user.uid}`)
        // .onSnapshot((doc) => {
        // // console.log("Current data: ", doc.data());
        // dispatch(setAdditionalData(doc.data()))
        // console.log(additionalData)
        //      });
    },[])

    return (
        <div className="userProfile">
            <HomeOutlined fontSize='large' onClick={handleHomeRoute} />
            {editOn? <CheckCircleIcon fontSize='large' style={{color: 'green'}} onClick={updateProfile} /> :<Edit onClick={editToggle} />}
           <TextField
                    variant="outlined"
                    required
                    style={{ marginTop: "10px" }}
                    disabled
                    id="name"
                    label="Name"
                    name="name"
                    placeholder="Name"
                    autoFocus
                    value={newName}
                    onChange={(e)=>{setName(e.target.value)}}
                    style={{border: editOn? '2px lightblue solid' :"none", boxShadow: editOn? ' 10px 10px 8px #888888' :"none", marginTop: "10px"}}
                
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                   disabled
                    id="bd" 
                    label="Birthday"
                    name="birthday"
                    placeholder="birthday"
                    autoFocus
                    value={newBirthday}
                    onChange={(e)=>{setNewBirthday(e.target.value)}}
                    style={{border: editOn? '2px lightblue solid' :"none", boxShadow: editOn? ' 10px 10px 8px #888888' :"none", marginTop: "10px"}}
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    disabled
                    id="pn"
                    label="Phone Number"
                    name="Phone Number"
                    placeholder="Phone Number"
                    autoFocus
                    value={newPhoneNumber}
                    onChange={(e)=>{setNewPhoneNumber(e.target.value)}}
                    style={{border: editOn? '2px lightblue solid' :"none", boxShadow: editOn? ' 10px 10px 8px #888888' :"none", marginTop: "10px"}}
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    disabled
                    id="g"
                    label="Gender"
                    name="Gender"
                    placeholder="Gender"
                    autoFocus
                    value={newGender}
                    onChange={(e)=>{setNewGender(e.target.value)}}
                    style={{border: editOn? '2px lightblue solid' :"none", boxShadow: editOn? ' 10px 10px 8px #888888' :"none", marginTop: "10px"}}
                  />
                  <TextField
                    variant="outlined"
                    required
                    disabled
                    id="country"
                    label="Country"
                    name="Country"
                    placeholder="Country"
                    autoFocus
                    value={newCountry}
                    onChange={(e)=>{setNewCountry(e.target.value)}}
                    style={{border: editOn? '2px lightblue solid' :"none", boxShadow: editOn? ' 10px 10px 8px #888888' :"none", marginTop: "10px"}}
                  />
        </div>
    )
}

export default UserProfile
