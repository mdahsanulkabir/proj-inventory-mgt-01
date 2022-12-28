import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CustomSnackBar from "../../Shared/SnackBar/CustomSnackBar";

const theme = createTheme();


export default function Login(props) {
  // const { tokenHandler } = props; //todo for now i am using local storage 

  const navigate = useNavigate();
  const [ signInWithEmailAndPassword, user, loading, error ] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data);
    const email = data.get("email");
    const password = data.get("password");
    signInWithEmailAndPassword(email, password);
  };


    //? token direct from firebase
    const [ token, setToken ] = React.useState('');
    const [user1] = useAuthState(auth);
    React.useEffect(()=> {
        if(user1){
            user1.getIdToken(true)
            .then(res => setToken(res))
            .catch(error => console.log(error))
        }
        },[user1])
    if (token) {
      console.log("token at Login -", token);
      // tokenHandler(token); //todo for now i am using local storage 
      localStorage.setItem("token", token);
      
      // const [ token, setToken ] = useState('');
      // const [user] = useAuthState(auth);
      // console.log(user1);     // <--------------------------------
      // useEffect(()=> {
      //     if(user){
      //         user.getIdToken(true)
      //         .then(res => setToken(res))
      //         .catch(error => console.log(error))
      //     }
      //     },[user])
      navigate("/layout");
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div style={{textAlign : 'center', marginInline : "auto"}}>
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
      </div>)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box  sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center", }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
            <TextField margin="normal" required fullWidth id="password" label="Password" name="password" type="password" autoComplete="current-password"/>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>  Log In </Button>
            <Grid container>
              <Grid item md>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
          {/* <Counter
            render={(count, increaseCount) => (
              <ClickCountProp count2={count} increaseCount2={increaseCount} />
            )}
          />
          <Counter
            render={(count, increaseCount) => (
              <HoverCountProp count2={count} increaseCount2={increaseCount} />
            )}
          /> */}
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }} >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            SRP Inventory Management
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>

      {/* a snackbar example */}
      <CustomSnackBar msg={"You have logged out !!!"}/>


    </ThemeProvider>
  );
}
