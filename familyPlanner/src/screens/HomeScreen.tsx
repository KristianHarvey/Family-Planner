import { RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native"
import { useColor } from "../hooks/useColor";
import { Font, FontSize } from "../constants/UIConstants";
import RoundButton from "../components/bottomBar/roundButton/RoundButton";
import BottomBar from "../components/bottomBar/BottomBar";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import DisplayCard from "../components/displayCard/DisplayCard";
import { TopBar } from "../components/common/topBar/TopBar";
import { useAuth } from "../hooks/useAuth";

const HomeScreen = () => {
    const {colors} = useColor();
    const [refreshing, setRefreshing] = React.useState(false);
    const auth = useAuth();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background.main}}>
            <TopBar middleText="Hjem"/>
            <ScrollView 
            contentContainerStyle={{flex: 1, backgroundColor: colors.background.main}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.background.main,
                    justifyContent: 'center',
                    alignItems: 'center',
                    }}>
                        
                    <Text style={{
                        color: colors.text.main,
                        fontSize: FontSize.Large,
                        fontFamily: Font.TitilliumWebBlack
                    }}
                    >Family Planner</Text>
                    <DisplayCard/>
                    <DisplayCard/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default HomeScreen;