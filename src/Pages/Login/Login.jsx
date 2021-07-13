import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebaseApp, { db, provider } from "../../firebase";
import "./Login.css";
import { IconButton, Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setAdditionalData, setUser } from "../../actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    height: "100%",
  },
  submit: {
    marginTop: "5px",
    backgroundColor: "#ed7d31",
    color: "white",
  },
  contained: {
    "&:hover": {
      backgroundColor: "#de6310",
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  // const [user, setUser] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const additionalData = useSelector((state) => state.user.additionalData);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [Emailerror, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signup, setSignup] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    clearErrors();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (user) => {
        console.log(user);
        // await getUserDocument(user.uid);

        history.push("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(error.message);
            console.log("error");
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
            console.log("error");
            break;
        }
      });
    console.log(`user is: ${user.email}`);
  };

  const handleLogout = () => {
    firebaseApp.auth().signOut();
  };

  const getUserDocument= async (uid)=>{
      
    const userRef = db.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      console.log(`creating doc`);
      const { email } = user;

      try {
        userRef
          .get()
          .then((doc) => {
            if (doc.exists) {
                console.log("user' Document data:", doc.data());
               const additionalData= doc.data();
              
            } else {
                // doc.data() will be undefined in this case
                console.log("Admins: No such document!");
            }
              dispatch(setAdditionalData(doc.data()))
            handleHomeRoute();
          });
      } catch (error) {
        console.log(`error is: ` + error);
      }
    }
    
  }

  const authListener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        dispatch(setUser(user));
      } else {
        dispatch(setUser(""));
      }
    });
  };

  const toggleSignup = () => {
    setSignup(!signup);
  };

  const createUserDocument = async ({ user }) => {
    if (!user) return;

    const userRef = db.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      console.log(`creating doc`);
      const { email } = user;

      try {
        userRef
          .set({
            name: name,
            email: email,
            birthday: birthday,
            gender: gender,
            phoneNumber: phoneNumber,
            country: country,
            createdAt: new Date(),
          })
          .then(() => {
              dispatch(setAdditionalData({
                name: name,
                email: email,
                birthday: birthday,
                gender: gender,
                country: country,
                phoneNumber: phoneNumber
              }))
            handleHomeRoute();
          });
      } catch (error) {
        console.log(`error is: ` + error);
      }
    }
  };
  const handleSignup = () => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        console.log(user);
        await createUserDocument(user, name, birthday, gender, phoneNumber);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  useEffect(() => {
    authListener(); //on app starting check if user is available or not
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const loginWIthGoogle = () => {
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //Auth changes which triggers onAuthStateChanged (in auth state change method ) and sets the user
      })
      .then(() => {
        handleHomeRoute();
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleHomeRoute = () => {
    window.location.assign("/");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Button
              style={{
                backgroundColor: "#ffcc00",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={handleHomeRoute}
            >
              Home
            </Button>

            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              style={{ marginBottom: "15px" }}
              component="h1"
              variant="h5"
            >
              {signup ? "Sign up Event Scanner!" : "Sign in Event Scanner!"}
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmail}
              />
              <p className="errorMsg">{Emailerror}</p>
              {signup ? (
                <div>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    placeholder="Name"
                    autoFocus
                    value={name}
                    onChange={handleName}
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    fullWidth
                    id="bd"
                    label="Birthday"
                    name="birthday"
                    placeholder="birthday"
                    autoFocus
                    value={birthday}
                    onChange={handleBirthday}
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    fullWidth
                    id="pn"
                    label="Phone Number"
                    name="Phone Number"
                    placeholder="Phone Number"
                    autoFocus
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    fullWidth
                    id="g"
                    label="Gender"
                    name="Gender"
                    placeholder="Gender"
                    autoFocus
                    value={gender}
                    onChange={handleGender}
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="Country"
                    placeholder="Country"
                    autoFocus
                    value={country}
                    onChange={handleCountry}
                  />
                </div>
              ) : (
                ""
              )}
              <TextField
                variant="outlined"
                style={{ marginTop: "10px" }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
              />
              <p className="errorMsg">{passwordError}</p>
              {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
              {signup ? (
                <Button
                  fullWidth
                  variant="contained"
                  className={`${classes.submit} ${classes.contained}`}
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  className={`${classes.submit} ${classes.contained}`}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              )}
              <div style={{ textAlign: "center" }}>
                <h2>OR:</h2>
              </div>
              <Button
                style={{
                  justifyContent: "center",
                  height: "40px",
                  width: "100%",
                }}
                size="small"
              >
                <div
                  onClick={loginWIthGoogle}
                  style={{
                    backgroundColor: "white",
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                    width="20"
                    height="20"
                    style={{ marginRight: "15px" }}
                    alt="Google Logo"
                  />
                  <h4>{signup ? "Login with Google" : "Login with Google"}</h4>
                </div>
              </Button>

              {
                <Grid container>
                  {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid> */}
                  <Grid style={{ margin: "20px" }} item>
                    <Link
                      onClick={toggleSignup}
                      href="#"
                      variant="body2"
                      style={{ color: "#4b5a6c" }}
                    >
                      {"New user? Create Account"}
                    </Link>
                  </Grid>
                </Grid>
              }
            </form>
          </div>
          {/* <Box mt={8}>
                <Copyright />
            </Box> */}
          {user && (
            <Button onClick={handleLogout}>
              <h4 style={{ color: "red" }}>Log Out</h4>
            </Button>
          )}
        </Container>
      }
    </div>
  );
}
export default Login;
