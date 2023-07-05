import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const [data, setData] = useState({});

  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("/api/users")
  //     .then((response) => response.json())
  //     .then((parsed) => {
  //       setData(parsed.data);
  //     });
  // }, []);


  // console.log(data)

  // let _id = null;
  const handleClick = (event) => {
    event.preventDefault();

    // if (password !== "" && email !== "") {
    //   const foundUser = data.find((user) => {
    //     return password === user.password && email === user.email;
    //   });
    //   _id = foundUser._id;
    // }

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
          <SignUpButton to="/signup">Sign Up!</SignUpButton>
        </FormBox>
      </Container>
    </>
  );
};

export default SignIn;

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
  font-size: 1.3rem;
  margin-bottom: 0;
`;

const SignInTitle = styled.h1`
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

const SignUpTitle = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const SignInButton = styled.button`
  align-items: center;
  background-color: var(--color-accent);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-secondary);
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-family: 'Monomaniac One', sans-serif;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  margin-top: .8rem;
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
  color: rgba(239,222,205,0.65);
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  background-color: var(--color-secondary);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: var(--color-accent);
  transform: translateY(0);
}
`;

const SignUpButton = styled(Link)`
  align-items: center;
  background-color: var(--color-primary);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: var(--color-secondary);
  cursor: pointer;
  display: inline-flex;
  font-family: 'Monomaniac One', sans-serif;
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