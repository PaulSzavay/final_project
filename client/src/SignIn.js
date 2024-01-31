import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import SignInBackground from "./Assets/SignInBackground2.jpg";

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        if(parsed.status===200){
          setCurrentUser(parsed.data)
          localStorage.setItem("user", JSON.stringify(parsed.data))
          navigate("/")
        }
      })
      .catch((error) => {
        window.alert(error);
      });
    }


  useEffect(() => {
    if (currentUser) 
    {navigate("/")}
  }, [currentUser]);


  const navigateToSignUp = () => {
    navigate("/SignUp")
  }


  return (
    <>
      <Container>
        <FormBox>
          <Form onSubmit={handleClick}>
            <SignInTitle>Sign in to draft!</SignInTitle>
            <label>
              <LabelTitle>Email</LabelTitle>
              <Input
                type="text"
                onChange={(event) => setEmail(event.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Password</LabelTitle>
              <Input
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              ></Input>
            </label>
            <SignInButton>Sign In!</SignInButton>
          </Form>
          <SignUpTitle>Don't have an account?</SignUpTitle>
          <SignUpButton onClick={navigateToSignUp}>Sign Up!</SignUpButton>
        </FormBox>
      </Container>
    </>
  );
};

export default SignIn;

const Container = styled.section`
  color:rgb(227, 204, 174);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${SignInBackground});
  /* Photo by Peter Gargiulo on Unsplash */
  background-size: cover;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelTitle = styled.p`
  font-size: 1.75rem;
  margin-bottom: 0;
  margin-left: 1rem;
`;

const SignInTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

const Input = styled.input`
  font-family: 'Monomaniac One', sans-serif;
  font-size: 2rem;
  margin: 1rem;
  width: 30rem;
  background-color: rgb(227, 204, 174);
  &:focus {
    outline: 2px solid white;
  }
`;

const SignUpTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const SignInButton = styled.button`
  align-items: center;
  background-color: black;
  border: 1px solid darkgrey;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(227, 204, 174);
  cursor: pointer;
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 250ms;
  width: 10rem;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  opacity: 0.75;
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
`;


const SignUpButton = styled.button`
  align-items: center;
  background-color: black;
  border: 1px solid darkgrey;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(227, 204, 174);
  cursor: pointer;
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 250ms;
  width: 10rem;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  opacity: 0.75;
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
`;