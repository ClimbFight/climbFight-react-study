import React from 'react'
import styled from 'styled-components'
import { Alert, Text } from 'react-native'
import { useState, useRef, useEffect} from 'react';
import { validateEmail, removeWhiteSpace } from "../utils/common";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Image, Input } from '../components/index';
import { images } from "../utils/images";
import { signup } from "../utils/firebase";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color = ${({theme}) => theme.background};
    padding: 40px 20px;
`;

const ErrorText = styled.Text`
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
    color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMEssage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(images.photo);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();

    useEffect(() => {
        if (didMountRef.current) {
            let _errorMessage = '';

            if(!name) {
                _errorMessage = 'Please enter your name.';
            } else if (!validateEmail(email)) {
                _errorMessage = 'Please verify your email.';
            } else if (password.length < 6) {
                _errorMessage = 'The passwrod must contain 6 characters at least.';
            } else if (password !== passwordConfirm) {
                _errorMessage = 'Passwords need to match.';
            } else {
                _errorMessage = '';
            }

            setErrorMEssage(_errorMessage);
        } else {
           didMountRef.current = true; 
        }
    }, [name, email, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(!(name && email && password && passwordConfirm && !errorMessage));
    }, [name, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = async () => {
        try {
            const user = await signup({ email, password, name, photoUrl });
            console.log(user);
            Alert.alert("Signup Success", user.email);
        } catch (e) {
            Alert.alert("Signup Error", e.message);
        }
    };

    return(
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image rounded url={photoUrl} showButton onChangeImage={url => setPhotoUrl(url) }/>
                <Input label="Name" 
                       value={name} 
                       onChangeText={text => setName(text)} 
                       onSubmitEditing={() => { 
                           setName(name.trim());
                           emailRef.current.focus();
                           }}
                        onBlur={() => setName(name.trim())}
                        placeholder="Name"
                        returnKeyType="next"
                />
                <Input
                    ref={emailRef}
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(removeWhiteSpace(text))}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(removeWhiteSpace(text))}
                    onSubmitEditing={() => passwordConfirmRef.current.focus()}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <Input
                    ref={passwordConfirmRef}
                    label="Password Confrim"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(removeWhiteSpace(text))}
                    onSubmitEditing={_handleSignupButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="Signup"
                    onPress={_handleSignupButtonPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;