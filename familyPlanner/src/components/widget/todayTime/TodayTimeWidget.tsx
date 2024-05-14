import React from "react";
import { useColor } from "../../../hooks/useColor"
import { WidgetBase } from "../widgetBase/WidgetBase";
import { Text, View } from "react-native";
import { Font, FontSize } from "../../../constants/UIConstants";
import { DayKeyUtils } from "../../../utils/DayKeyUtils";
import { useFocusEffect } from "@react-navigation/native";

export const TodayTimeWidget = () => {
    const { colors } = useColor();
    const [today, setToday] = React.useState(new Date());
    const [hoursRemaining, setHoursRemaining] = React.useState(0);
    const [minutesRemaining, setMinutesRemaining] = React.useState(0);
    const [secondsRemaining, setSecondsRemaining] = React.useState(0);

    const daysOfWeek = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];

    const getTime = React.useCallback(() => {
        const now = Date.now();
        const endOfDay = new Date(now);
        endOfDay.setHours(23);
        endOfDay.setMinutes(59);
        endOfDay.setSeconds(59);
        endOfDay.setMilliseconds(999);
        
        const timeRemaining = endOfDay - now;
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);

        setHoursRemaining(hours);
        setMinutesRemaining(minutes);
        setSecondsRemaining(seconds);
    }, [])
    React.useEffect(() => {
        const timer = setInterval(getTime, 1000);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        getTime();
    }, [getTime])
    // const getDayString()

    return (
        <WidgetBase
        sideMargins>
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

                </Text>
                <Text
                style={{
                    color: colors.accent_spring,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>
                    {daysOfWeek[today.getDay() - 1]} {''}
                </Text>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>
                    {DayKeyUtils.formatPretty(today)}
                </Text>
            </View>
            <View
            style={{
                flexDirection: 'row'
            }}>
            <Text
            style={{
                color: colors.text_main,
                fontFamily: Font.TitilliumWebRegular,
                fontSize: FontSize.XSmall
            }}>
                {hoursRemaining}t {minutesRemaining}m {secondsRemaining}s {''}
            </Text>
            <Text
            style={{
                color: colors.accent_spring,
                fontFamily: Font.TitilliumWebRegular,
                fontSize: FontSize.XSmall
            }}>
                igjen
            </Text>
            </View>
        </WidgetBase>
    )
}