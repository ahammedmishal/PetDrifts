import { useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons'

export const PasswordVisible = ({passwordVisible}) => {
    <>
    {
        passwordVisible ?
        <Icon name='eye-outline' size={20}/> 
        :
        <Icon name='eye-off-outline' size={20}/>
    }
    </>
};