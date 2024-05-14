import React from "react";
import { Family } from "../../../../models/family"
import { useColor } from "../../../../hooks/useColor";
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { Text, View } from "react-native";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";

interface Props {
    family?: Family;
}

export const FamilyInfoWidget: React.FC<Props> = ({family}) => {
    if(!family) {
        return;
    }
    const { colors } = useColor();
    return (
        <WidgetBase
        sideMargins
        familyType
        familyColor={family.familyColor ?? colors.widget_background}>
            <View
            style={{
                flexDirection: 'row'
            }}>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>
                    Familienavn: {' '}
                </Text>
                <Text
                style={{
                    color: colors.accent_spring,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>
                    {family.name}
                </Text>
            </View>

            <View style={{ marginTop: Padding.Large }}/>
            
            <Text
            style={{
                color: colors.text_main,
                fontFamily: Font.TitilliumWebRegular,
                fontSize: FontSize.Small
            }}
            >
                Brukere: {''}
            </Text>

            <View
            style={{
                flexDirection: 'row'
            }}>
            {family.members && family.members.map((user, index) => (
                <View
                key={index}
                style={{
                }}>
                    <Text
                    style={{
                        color: colors.text_main,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small
                    }}>
                        {user.firstName} {family.members[index + 1] ? ', ' : ''}
                    </Text>

                </View>

            ))}
            </View>

        </WidgetBase>
    )
}