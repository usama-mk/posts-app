import React, { useState } from "react";
import posterImg from "../../Assets/img/poster.png";
import bgImg from "../../Assets/img/posters/1.jpg";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ViewImage from "../../Pages/ViewImage/ViewImage";
import { withRouter } from "react-router-dom";
import "./Poster.scss";
import { Button, Input, Card } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import { db, firebaseApp } from "../../firebase";
import firebase from "firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Poster(props, {isLoading}) {
  const [isOpen, setIsOpen] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [description, setDescription] = useState(props.description);
  const user = useSelector((state) => state.user.user);
  const additionalData = useSelector((state) => state.user.additionalData);

  const imageUrl = props.imageUrl;
  const title = props.title;
  const userEmail = props.userEmail;
  const id = props.id;
  const uid = props.uid;
  const name = props.name;
  
  const renderRedirect = () => {
    if (true) {
      props.history.push({
        pathname: "/viewimage",
        state: {
          imageUrl: imageUrl,
          title: title,
          description: description,
          userEmail: userEmail,
          id: id,
          uid: uid,
          name: name,
        },
      });
    }
  };
  const reportRedirect = () => {
    setIsOpen(true);
     
  };

  const deleteDoc = () => {
    db.collection("posters")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  const updateEdit = (desc) => {
    const ref = db.collection("posters").doc(id);
    ref.set({
      userEmail: userEmail,
      imageUrl: imageUrl,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      description: desc,
      uid: uid,
      name: name,
    });
    setEditOpen(false);
  };
  const editPost = () => {
    setEditOpen((prev) => !prev);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateEdit(description);
    }
  };

  const PostOptions = () => {
    return (
      <div>
        <HighlightOffIcon
          style={{ color: "red" }}
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <p onClick={editPost}>edit</p>
        <p onClick={deleteDoc}>delete</p>
      </div>
    );
  };

  return editOpen ? (
    <div>
      <HighlightOffIcon
        style={{ color: "red" }}
        onClick={() => {
          updateEdit(description);
        }}
      />
      <ReactQuill
        theme="snow"
        value={description}
        //  onKeyDown={_handleKeyDown}
        modules={modules}
        formats={formats}
        onChange={(e) => setDescription(e)}
      />
    </div>
  ) : (
    <div className="poster box">
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid lightGrey",
          width: "auto",
          minWidth: "400px",
          height: "auto",
          maxHeight: "670px",
          padding: "5px",
          overFlow: "hidden",
          margin: "10px",
          marginTop: "4vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="posterContainer"
      >
        {/* <span style={{width:"100%",alignItems:"start", color:"white", fontWeight:"bold", wordWrap:"break-word" }}>{title}</span> <br/> */}
        <div
          className="box"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <i class="fad fa-user-circle"></i> */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountCircle />
            <h5 style={{ color: "black" }}>
              {user.uid == uid ? additionalData?additionalData.name:'...' : 
              name ? 
              name :
              uid}
            </h5>
          </div>
          {/* <Button variant="outlined" size="small" onClick={() =>{ reportRedirect() }} style={{ color:"black", height:"15px"}}>Report</Button> */}

          {isOpen ? (
            <PostOptions />
          ) : user.uid == uid ? (
            <MoreHoriz
              className="dots"
              onClick={() => {
                reportRedirect();
              }}
            />
          ) : (
            ""
          )}
        </div>
        <div
          className="box"
          onClick={() => {
            renderRedirect();
          }}
        >
          <img src={imageUrl ? imageUrl : posterImg} width="270" height="270" />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <div
            className="comment box"
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => {
              renderRedirect();
            }}
          >
            <h5 style={{ margin: "0px" }}>Comment </h5>
            <ChatBubbleOutline />
          </div>
        </div>
        <div
          className="box"
          style={{
            maxWidth: "366px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              overflowWrap: "break-word",
              textOverflow: "ellipsis",
              maxHeight: "103px",
              margin: "0px",
              justifyContent: "flex-start",
              marginBottom: "10px",
            }}
          >
            {editOpen
              ? // <Input onChange={(e)=>setDescription(e.target.value)} onKeyDown={_handleKeyDown} value={description} />
                ""
              : ReactHtmlParser(description)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Poster);
export const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],

    [{ size: [] }],

    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],

    ["link", "image", "video"],

    ["clean"],
    ["code-block"],
  ],
};

export const formats = [
  "header",
  "font",

  "size",

  "bold",

  "italic",

  "underline",

  "strike",

  "blockquote",

  "list",

  "bullet",

  "link",

  "image",

  "video",

  "code-block",
];
