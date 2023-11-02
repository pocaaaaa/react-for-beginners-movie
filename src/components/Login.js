import React, { useState, useRef } from 'react';
import styled from "@emotion/styled";
import { BiSolidCat } from "react-icons/bi";

const LoginForm = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InputContainerLabel = styled.label`
  flex: 1;
  font-weight: bold;
  text-align: right;
  margin-right: 10px;
`;

const InputContainerInput = styled.input`
  flex: 3;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
`;

const Login = ({setIsLogin, setUserKey}) => {
  /* state */
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  /* reg */
  const userIdRef = useRef();
  const passwordRef = useRef();

  /* function */
  const setCookie = (name, value, exp) => {
    const date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
  };

  const handleIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = () => {
    if(!userId) {
      alert("Please enter your id.");
      userIdRef.current.focus();
      return false;
    }

    if(!password) {
      alert("Please enter your password.");
      passwordRef.current.focus();
      return false;
    }

    let userList = localStorage.getItem('userList');
    userList = userList ? JSON.parse(userList) : [];
    userList = userList.filter(user => user.id === userId && user.password === password);
    
    if(userList && userList.length > 0) {
      setCookie("userKey", userList[0].key, 1);
      setUserInfo(userList[0].key);
    } else {
      alert("Please check your ID or password.");
      userIdRef.current.focus();
      return;
    }
  };

  const setUserInfo = (userKey) => {
    setIsLogin(true);
    setUserKey(userKey);
  };

  return (
    <LoginForm>
      <h2>Login<BiSolidCat/></h2>
      <InputContainer>
        <InputContainerLabel htmlFor="id">ID:</InputContainerLabel>
        <InputContainerInput 
          type="text" 
          id="id"
          value={userId}
          ref={userIdRef}
          onChange={handleIdChange}
          required 
        />
      </InputContainer>
      <InputContainer>
        <InputContainerLabel htmlFor="password">Password:</InputContainerLabel>
        <InputContainerInput 
          type="password" 
          id="password"
          value={password}
          ref={passwordRef}
          onChange={handlePasswordChange}
          required 
        />
      </InputContainer>
      <SubmitButton 
        className="submit-button"
        onClick={login}
      >
        Login
      </SubmitButton>
    </LoginForm>
  );
};

export default Login;
