import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import SignUpBackground from "./Assets/SignInBackground2.jpg";

const SignUp = () => {
  // useState used to keep the values of names, email and password to be used in the fetch POST
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")


  const { currentUser, setCurrentUser, setLoggedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) 
    {navigate("/")}
  }, [currentUser]);

  // fetch (post) to push user info into database
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((parsed) => {
        console.log(parsed)
        if (parsed.status === 201) {
          localStorage.setItem("user", JSON.stringify(parsed.data.email));
          setCurrentUser(parsed.data.email)
          setLoggedInUser(parsed.data.name)
          navigate("/")
        } else if (parsed.status === 400) {
          setErrorMessage("Email is already taken. Please choose a different email.");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  useEffect(() => {
    if (currentUser) 
    {navigate("/")}
  }, [currentUser]);

  return (
    <>
      <Container>
        <FormBox>
          <Form onSubmit={handleSubmit}>
            <SignUpTitle>Sign Up Form</SignUpTitle>
            <label>
              <LabelTitle>First Name</LabelTitle>
              <Input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Last Name</LabelTitle>
              <Input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              ></Input>
            </label>
            <label>
              <LabelTitle>Email</LabelTitle>
              <Input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </label>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <label>
              <LabelTitle>Password</LabelTitle>
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </label>
            <ButtonDiv>
              <SignUpButton>Sign Up!</SignUpButton>
            </ButtonDiv>
          </Form>
        </FormBox>
      </Container>
    </>
  );
};

export default SignUp;

const Container = styled.section`
  color:rgb(227, 204, 174);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${SignUpBackground});
    /* Photo by Peter Gargiulo on Unsplash */
  background-size: cover;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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

const SignUpTitle = styled.h1`
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

const ErrorMessage = styled.p`
margin-left: 1rem;
`

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
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;