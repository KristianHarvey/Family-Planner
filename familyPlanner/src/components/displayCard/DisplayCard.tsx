import { Text } from "react-native"
import DisplayCardContainer from "./displayCardContainer/DisplayCardContainer"
import { useColor } from "../../hooks/useColor"
import { FontSize, Padding } from "../../constants/UIConstants";

const DisplayCard = () => {
    const { colors } = useColor();
    return (
        <DisplayCardContainer>
            <Text 
            style={{
                padding: Padding.XLarge, 
                color: colors.text.main,
                fontSize: FontSize.Small,
                fontFamily: 'TitilliumWeb-Regular'
            }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
        </DisplayCardContainer>
    );
};

export default DisplayCard;