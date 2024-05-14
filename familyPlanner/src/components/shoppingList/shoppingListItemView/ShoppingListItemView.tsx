import { Image, Text, View } from "react-native";
import { useColor } from "../../../hooks/useColor"
import { Font, FontSize, Padding } from "../../../constants/UIConstants";

interface Props {
    uri?: string;
    name?: string;
    price?: number;
}

export const ShoppingListItemView: React.FC<Props> = ({uri, name, price}) => {
    const { colors } = useColor();
    return (
        <View
        style={{
            flexDirection: 'row',
        }}>
            <Image style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                marginRight: Padding.Medium,
            }} source={{uri: uri ? uri : ''}}/>
            <View
            style={{

            }}>
                <Text 
                style={{ 
                    marginLeft: Padding.Medium, 
                    color: colors.text.main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>{name}</Text>
                <Text
                style={{
                    color: colors.text.main,
                    marginLeft: Padding.Medium,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small
                }}>{price}kr</Text>
            </View>
        </View>
    )
}