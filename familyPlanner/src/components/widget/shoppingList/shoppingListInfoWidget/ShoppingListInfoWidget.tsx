import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../../hooks/useColor"
import { ShoppingList } from "../../../../models/shoppingList";
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import { DayKeyUtils } from "../../../../utils/DayKeyUtils";
import { Button } from "../../../button/Button";
import { Family } from "../../../../models/family";
import Feather from "react-native-vector-icons/Feather"
import React from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { User } from "../../../../models/user";

interface Props {
    shoppingList?: ShoppingList;
    onFamilyAddPress?: (family: Family) => void;
    currentUser?: User;
}

export const ShoppingListInfoWidget: React.FC<Props> = ({shoppingList, onFamilyAddPress, currentUser}) => {
    const { colors } = useColor();
    const auth = useAuth();
    const [wantsToAddFamily, setWantsToAddFamily] = React.useState(false);
    const [selectedFamily, setSelectedFamily] = React.useState<Family | undefined>();
    const date = shoppingList.plannedDay && DayKeyUtils.formatPretty(new Date(shoppingList.plannedDay.dayKey));

    const selectFamily = (family) => {
        console.log(family);
        setSelectedFamily((prevSelectedFamily) => {
            // Check if the clicked family is already selected
            if (prevSelectedFamily && prevSelectedFamily.id === family.id) {
                // If it is, deselect the family by setting selected family to null
                return null;
            } else {
                // Otherwise, select the clicked family
                return family;
            }
        });
    }
    const confirm = () => {
        onFamilyAddPress(selectedFamily);
    }

    return (
        <WidgetBase
        sideMargins>
            <View
            style={{
            }}>
                <Text
                style={{
                    color: colors.accent_spring,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium,
                }}>
                    {shoppingList.name}
                </Text>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small
                }}>
                    {shoppingList.items.length} varer i handlelisten
                </Text>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Small,
                }}>
                </Text>
                {shoppingList.plannedDay && (
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <Text
                    style={{
                        color: colors.text_main,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                    }}>Planlagt til: </Text>
                    <Text
                    style={{
                        color: colors.accent_spring,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Medium,
                    }}>
                        {date}
                    </Text>
                    </View>
                )}
                {shoppingList.family ? (
                    <View
                    style={{
                        alignItems: 'center'
                    }}>
                        <Text
                        style={{
                            color: colors.text_main,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.Small
                        }}>
                            Familie: {shoppingList.family.name}
                        </Text>
                    </View>
                ) : (
                    <>
                    {wantsToAddFamily ? (
                        <View
                        style={{
                        }}>
                        <ScrollView
                        horizontal>
                            {currentUser && currentUser.families.map((family, index) => (
                                <TouchableOpacity
                                key={index}
                                style={{
                                    backgroundColor: family === selectedFamily ? colors.accent_spring : colors.background_main,
                                    marginTop: Padding.Large,
                                    padding: Padding.Medium,
                                    borderRadius: 5,
                                    marginRight: Padding.Medium,
                                    marginBottom: Padding.Large
                                }}
                                onPress={() => selectFamily(family)}>
                                    <Text
                                    style={{
                                        color: colors.text_main,
                                        fontFamily: Font.TitilliumWebRegular,
                                        fontSize: FontSize.Small
                                    }}>{family.name}</Text>
                                </TouchableOpacity>
                            ))}
                            
                        </ScrollView>
                        <Button title="bekreft" onPress={confirm}/>
                        </View>
                    ) : (
                        <View
                        style={{
                            width: '60%'
                        }}>
                            <Button title="Legge til en familie?" onPress={() => setWantsToAddFamily(true)}>
                                <Feather
                                name={'chevron-down'}
                                size={15}
                                color={colors.text_main}/>
                            </Button>
                        </View>

                    )}
                    </>
                )}
            </View>
        </WidgetBase>
    )
}