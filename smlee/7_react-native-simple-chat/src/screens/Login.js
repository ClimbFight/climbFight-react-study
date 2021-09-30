import React, { useRef, useState, useEffect, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import { Image, Input, Button } from "../components";
import { images } from "../utils/images";
import { validateEmail, removeWhiteSpace } from "../utils/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { login } from "../utils/firebase";
import { Alert } from "react-native";
import { ProgressContext, UserContext } from "../contexts";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    padding: 20px;
    padding-top: ${({insets: {top}}) => top}px;
    padding-bottom: ${({insets: {bottom}}) => bottom}px;
`;

const ErrorText = styled.Text`
    color: ${({theme}) => theme.errorText};
    align-items: flex-start;
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    line-height: 20px;
`

const Login = ({navigation}) => {
    const { spinner } = useContext(ProgressContext);

    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const insets = useSafeAreaInsets();

    const { dispatch } = useContext(UserContext);

    useEffect(() => {
        setDisabled(!(email && password && !errorMessage));
    }, [email, password, errorMessage]);

    const _handleEmailChange = email => {
        const changedEmail = removeWhiteSpace(email);
        setEmail(changedEmail);

        setErrorMessage(validateEmail(changedEmail) ? '' : 'Please verify your email');
    };

    const _handlePasswordChange = password => {
        setPassword(removeWhiteSpace(password));
    };

    const _hanldeLoginButtonPress = async() => {
        try {
            spinner.start();

            const user = await login({ email, password });
            dispatch(user);
        } catch (e) {
            Alert.alert("Login Error", e.message);
        } finally {
            spinner.stop();
        }
    };

    return(
        <KeyboardAwareScrollView contentContainerStyle={{flex: 1}} extraScrollHeight={20}>
            <Container insets={insets}>
                <Image url={images.logo} imageStyle={{ borderRadius: 8 }}/>      
                <Input label="Email" value={email} onChangeText={_handleEmailChange} onSubmitEditing={() => passwordRef.current.focus()} placeholder="Email" returnKeyType="next" />      
                <Input ref={passwordRef} label="Password" value={password} onChangeText={_handlePasswordChange} onSubmitEditing={_hanldeLoginButtonPress} placeholder="Password" returnKeyType="done" isPassword />
                <ErrorText>{errorMessage}</ErrorText>

                <Button title="Login" onPress={_hanldeLoginButtonPress} disabled={disabled} />
                <Button title="Sign up with email" onPress={() => navigation.navigate('Signup')} isFilled={false} disabled={false}/>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;