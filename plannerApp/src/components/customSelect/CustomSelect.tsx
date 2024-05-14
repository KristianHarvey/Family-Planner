import { Text, TouchableOpacity, View } from "react-native";
import { useColor } from "../../hooks/useColor"
import SelectDropdown from "react-native-select-dropdown";
import { Family } from "../../models/family";
import { User } from "../../models/user";
import { ModelKey, getModelByKey, getModelKey } from "../../constants/constants";
import  Feather from "react-native-vector-icons/Feather";
import { ReactNode } from "react";
import { Padding } from "../../constants/UIConstants";

interface props {
    data: any[];
    type: string;
    onSelect: (selectedItem: any, index:number) => void;
    renderItem: (selectedItem: any, index: number, isSelected: boolean) => ReactNode;
    defaultValue?: any;
}

export const CustomSelect: React.FC<props> = ({data, type, defaultValue, onSelect, renderItem}) => {
    
    const modelKey = getModelKey(type);
    const model = getModelByKey(modelKey);
    const { colors } = useColor();

    
    return (
        <View>
            <SelectDropdown
            data={data}
            defaultValue={defaultValue}
            renderItem={renderItem}
            onSelect={onSelect}
            
            renderButton={(selectedItem: Family, index) => {
                return(
                    <TouchableOpacity
                    style={{
                        backgroundColor: colors.textCard.secondary,
                        padding: Padding.Large,
                        margin: Padding.Medium,
                        borderRadius: 5,
                    }}>
                        <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text
                            style={{
                                color: colors.text.main
                            }}>{selectedItem ? selectedItem.name: ''}</Text>
                            <View
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}>
                                <Feather
                                name="chevron-down"
                                color={colors.text.main}
                                size={30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }}
            dropdownStyle={{
                backgroundColor: colors.background.main,
                borderWidth: 1, // Add border for dropdown
                borderColor: colors.text.secondary, // Customize border color
                borderRadius: 8, // Round the corners
                marginTop: 10, // Add space between input and dropdown
                shadowColor: '#000', // Add shadow for depth
                shadowOpacity: 0.8,
                shadowRadius: 10,
                elevation: 5, // Add elevation for Android
                
            }}/>
        </View>
    )
}