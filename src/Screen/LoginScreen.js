import { useState } from "react";
import CustomButton from "../components/CustomButton";
import SearchBox from "../components/SearchBox";
import { Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        try {

        }catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };
    
    return(

    )
}
