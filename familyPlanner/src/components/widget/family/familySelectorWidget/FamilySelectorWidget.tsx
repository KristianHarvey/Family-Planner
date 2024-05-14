import React from "react";
import { Family } from "../../../../models/family"
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { CustomSelect } from "../../../customSelect/CustomSelect";
import { Text, View } from "react-native";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";

interface Props {
    families?: Family[];
    defaultSelectedFamily?: Family;
    setSelectedFamily?: (family: Family) => void;
}

export const FamilySelectorWidget: React.FC<Props> = ({families, defaultSelectedFamily, setSelectedFamily}) => {
    const { colors } = useColor();
    const handleSelectFamily = (selectedFamily: Family) => {
        setSelectedFamily(selectedFamily);
    };


    return (
        <WidgetBase
        sideMargins
        familyType
        familyColor={defaultSelectedFamily && defaultSelectedFamily.familyColor ? defaultSelectedFamily.familyColor : colors.widget_background}>
            <View
            style={{
                
            }}>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>Velg en familie du ønsker å redigere</Text>
            </View>
            <View style={{ marginTop: Padding.Large }}/>
            <CustomSelect 
            data={families}
            defaultValue={defaultSelectedFamily}
            renderItem={(selectedItem: Family, index, isSelected) => {
                return (
                    <View key={index}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 25, // Adjust padding as desired
                        backgroundColor: selectedItem.familyColor ?? colors.textCard.main, // Change background color when selected
                        borderBottomWidth: 1, // Add bottom border for separation
                    }}>
                        <Text
                        style={{
                            color: colors.text.main
                        }}>{selectedItem && selectedItem.name}</Text>
                    </View>
                )
            }}
            onSelect={handleSelectFamily} type="FAMILY"/>
        </WidgetBase>
    )
}