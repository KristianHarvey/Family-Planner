import React from "react";
import { InputModeOptions, ReturnKeyTypeOptions, StyleProp, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Padding } from "../../../constants/UIConstants";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useColor } from "../../../hooks/useColor";

interface Props {
  inputMode?: InputModeOptions;
  keyboardApperance?: "default" | "light" | "dark";
  returnKeyType?: ReturnKeyTypeOptions;
  placeholder?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  clearButton?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  textAlignVertical?: "center" | "auto" | "top" | "bottom";
}

export const TextInputField: React.FC<Props> = ({
  inputMode,
  keyboardApperance,
  returnKeyType,
  placeholder,
  placeholderTextColor,
  value,
  onChangeText,
  style,
  clearButton,
  multiline,
  numberOfLines,
  editable,
  textAlignVertical,
}) => {
  const [text, setText] = React.useState(value);
  const { colors } = useColor();
  const handleChangeText = (text: string) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* TextInput wrapped inside a parent view */}
        <View style={{}}>
          <TextInput
            inputMode={inputMode}
            keyboardAppearance={keyboardApperance}
            returnKeyType={returnKeyType}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={text}
            onChangeText={handleChangeText}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={editable}
            style={style} // Adjust paddingRight for clear button
            textAlignVertical={textAlignVertical}
          />
          {/* Clear button positioned inside the TextInput */}
          {clearButton && text.length > 0 && (
            <TouchableOpacity
              onPress={() => setText("")}
              style={{
                position: "absolute",
                right: 5,
                top: "50%",
                paddingRight: Padding.Medium,
                transform: [{ translateY: -8 }], // Adjust translateY based on button size
              }}
            >
              <IonIcons name="close-circle-sharp" size={16} color={colors.text_gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

{
  /* <TextInput
inputMode="search"
keyboardAppearance="dark"
returnKeyType="search"
placeholder="Søk blandt brukere"
placeholderTextColor={colors.text_gray}
value={searchQuery}
onChangeText={(query) => handleSearch(query)}
style={{
    width: 'auto',
    color: colors.text_main,
    fontFamily: Font.TitilliumWebRegular,
    fontSize: FontSize.Small,
    margin: Padding.Large,
    borderRadius: 5
}}
/>
</View>
{searchQuery.length > 0 && ( // Only render the clear button when searchQuery is not empty
<TouchableOpacity onPress={clearSearch}
style={{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: Padding.XLarge,
}}>
    <IonIcons
        name="close-circle-sharp"
        size={16}
        color={colors.text_gray}
        style={{ marginLeft: 5 }}
    />
</TouchableOpacity>
)} */
}
