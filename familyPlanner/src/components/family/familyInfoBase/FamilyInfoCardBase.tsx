import React from "react";
import { Family } from "../../../models/family"
import { Text, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { FamilyService } from "../../../api/services/familyService";

interface Props {
    family?: Family;
}

export const FamilyInfoCardBase: React.FC<Props> = ({family}) => {
    const { colors } = useColor();
    // const [currentFamily, setCurrentFamily] = React.useState(family);
    
    if(!family) {
        return;
    }

    return (
        <View
        style={{
            backgroundColor: colors.textCard.secondary,
            paddingHorizontal: Padding.Large,
            margin: Padding.Medium,
            borderRadius: 5,
        }}>
            <View
            style={{
            }}>
                <Text
                style={{
                    color: colors.text.secondary,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium,
                }}>
                    {family && family.name}
                </Text>
            </View>
            <View>
                <Text
                style={{
                    color: colors.text.main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small,

                }}>Brukere:</Text>
                {family && family.members.map((user, index) => (
                    <View key={index}>
                        <Text
                        style={{
                            color: colors.text.main,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.Small
                        }}>{user.firstName}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}