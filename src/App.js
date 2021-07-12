import {  Switch } from "react-router";
import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { db, firebaseApp } from './firebase';
import CreatePost from './Pages/CreatePost/CreatePost';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import ReportImage from './Pages/ReportImage/ReportImage';
import ViewImage from './Pages/ViewImage/ViewImage';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./actions";
import UserProfile from "./Pages/UserProfile/UserProfile";

function App() {
  // const [user, setUser] = useState("");
  const user= useSelector(state=> state.user.user)
  const dispatch= useDispatch()
  const [isAdmin, setIsAdmin]=useState("")

  const authListener = ()=>{
    firebaseApp.auth().onAuthStateChanged((user)=>{
        if(user){
            
            dispatch(setUser(user));
        }
        else{
           dispatch( setUser(""));
        }
    })
}
 
useEffect(()=>{
   
  authListener();
  console.log("admin sec")
  var docRef = db.collection("Admins").doc("cKbxaFUTg1KcAkgCXExa");
  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Admins' Document data:", doc.data());
         const adminsArray= doc.data().adminsArray;
         adminsArray.map((admin)=>{
            if(user.email==admin){
                setIsAdmin(true)
            }
         })
      } else {
          // doc.data() will be undefined in this case
          console.log("Admins: No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
},[isAdmin, user])
  return (
    <div className="App">
      <BrowserRouter>
       
       
       <Route exact path="/"  render={()=>(<Home user={user} isAdmin={isAdmin} />)} />
       <Route exact path="/login" component={Login} />
       {user ? <Route exact path={`/createpost`} render={()=>(<CreatePost user={user} isAdmin={isAdmin} />)} />: <div></div> }
       {<Route exact path="/viewimage" render={()=>(<ViewImage user={user}  />)} /> }
       {<Route exact path="/reportimage" render={()=>(<ReportImage user={user}  />)} /> }
       {<Route exact path="/userprofile" render={()=>(<UserProfile user={user}  />)} /> }
      
      </BrowserRouter>
    </div>
  );
}

export default App;
