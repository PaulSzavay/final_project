import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const SignUp = () => {
  // useState used to keep the values of names, email and password to be used in the fetch POST
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")


  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) return navigate("/");
  }, [currentUser]);

  // fetch (post) to push user info into database
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/createuser", {
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
        if (parsed.status === 200) {
          localStorage.setItem("user", JSON.stringify(parsed.userId));
        } else if (parsed.status === 400) {
          setErrorMessage("Email is already taken. Please choose a different email.");
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };

  useEffect(() => {
    if (currentUser) return navigate("/");
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
  margin: auto;
  margin-top: 5rem;
  margin-bottom: 5rem;
  padding: 4em 2em;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-secondary);
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
  font-size: 1.3rem;
  margin-bottom: 0;
`;

const SignUpTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
`;

const Input = styled.input`
  font-size: 2rem;
  margin: 1rem;
  &:focus {
    outline: 2px solid var(--color-primary);
  }
`;

const ErrorMessage = styled.p`
`

const SignUpButton = styled.button`
  align-items: center;
  background-color: var(--color-primary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-secondary);
  cursor: pointer;
  display: inline-flex;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: 10rem;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color:  rgba(239,222,205,0.65);
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: var(--color-secondary);
  transform: translateY(0);
}
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;