import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TextInputFieldProps {
    value?: string;
    placeholder?: string;
    onChange?: () => void;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({value, placeholder, onChange, ...rest}) => {
    const [inputValue, setInputValue] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    return (
        <TouchableOpacity onPress={() => setFocus(true)}>
            <View style={{

            }}>
                <Text style={{

                }}>{placeholder}</Text>
            </View>
        </TouchableOpacity>
    )
}