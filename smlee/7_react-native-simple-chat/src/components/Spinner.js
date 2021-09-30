import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import styled, {ThemeContext} from "styled-components";

const Contaier = styled.View`
    position: absolute;
    z-index: 2;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: ${({ theme }) => theme.spinnerBackground };
`;

const Spinner = () => {
    const theme = useContext(ThemeContext);
    return(
        <Contaier>
            <ActivityIndicator size={'large'} color={theme.spinnerIndicator} />
        </Contaier>
    );
};

export default Spinner;
