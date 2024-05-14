// import React, { useEffect } from "react";
// import { Dimensions, ScaledSize, Text, View } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import { ScreenStack } from "react-native-screens";
// import { Padding } from "../../constants/UIConstants";
// import { Calendar, DateData } from "react-native-calendars";
// import { format } from "date-fns";
// import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// const generateCurrentWeek = () => {
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//     return (
//         days.map((day, index) => (
//             <View key={index} style={{height: 30, justifyContent: "space-between", alignItems: "center"}}>
//                 <Text>{day}</Text>
//             </View>
//         ))
//     )
// }
// const generateDays = (week: number, ) => {

// }

// const getDaysInMonth = (month: number, year: number) => {
// }

// interface WeekCalendarProps {
//     currentDay?: string;
//     selectedDay?: string;
// }

// export const WeekCalendar: React.FC<WeekCalendarProps> = ({currentDay}) => {
//     const [selectedDay, setSelectedDay] = React.useState(format(new Date(), "yyyy-MM-dd"));
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const renderWeekView = () => {
//         // Render your custom week view here
//         // This is a simplified example
//         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         return daysOfWeek.map(day => (
//             <View key={day} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
//                 <Text>{day}</Text>
//                 {/* Render any additional information or components for each day */}
//             </View>
//         ));
//     };

//     return (
//         <View style={{
//             flexDirection: "row", 
//             justifyContent: "space-between", 
//             marginRight: Padding.XLarge, 
//             marginLeft: Padding.XLarge
//         }}>
//             {generateCurrentWeek()}
//         </View>
//     );
// }


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { format, addDays, subDays, startOfWeek, eachDayOfInterval, startOfMonth, addMonths, eachWeekOfInterval, isSameDay, getDay, getMonth, getWeek, getDaysInMonth, getWeeksInMonth, endOfMonth, isSameWeek } from 'date-fns';
import { Calendar, DateData } from 'react-native-calendars';
import Feather from 'react-native-vector-icons/Feather';
import { useColor } from '../../hooks/useColor';
import { Padding } from '../../constants/UIConstants';

const getIndexForCurrentDay = (day: Date) => {
  
}

interface WeekCalendarProps {
  onDayPress?: (day: DateData) => void;
  currentDay: string;
  selectedDay: Date;
  setSelectedDay: (date: string) => void;
}

const WeekCalendar: React.FC<WeekCalendarProps> = ({ onDayPress, currentDay, selectedDay, setSelectedDay }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(currentDay));
  const { colors } = useColor();
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const itemWidth = 10; // Replace with the actual width of each day item
  // const currentIndex = getIndexForCurrentDay(); // Implement a function to get the index of the current day
  // const contentOffsetX = currentIndex * itemWidth;
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);

  React.useLayoutEffect(() => {
    const updateContainerWidth = () => {
      setContainerWidth(Dimensions.get('screen').width);
    };

    Dimensions.addEventListener('change', updateContainerWidth);

    return () => {
    };
  }, []);


  const handleDatePress = (date: Date) => {
    setSelectedDay(format(date, "yyyy-MM-dd"));
    const dateData: DateData = {
      year: date.getFullYear(),
      dateString: format(date, "yyyy-MM-dd"),
      day: date.getDay(),
      month: date.getMonth(),
      timestamp: date.getTime()
    }
    if (onDayPress) { onDayPress(dateData); }
  };

  const scrollToCurrentDay = () => {
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDay), end: endOfMonth(currentDay) });
    const weeksInMonth = eachWeekOfInterval({start: startOfMonth(selectedDay), end: endOfMonth(selectedDay)})
    const currentDayIndex = daysInMonth.findIndex(day => isSameDay(day, currentDay));
    if(currentDayIndex >= 0 && scrollViewRef.current) {
      const cardWidth = Dimensions.get('window').width - 2.5 * Padding.Large; // Adjust padding as needed
      const itemWidth = cardWidth / 7;
      const scrollX = currentDayIndex * itemWidth - (Dimensions.get('window').width / 2) + (itemWidth / 2);
      scrollViewRef.current.scrollTo({ x: scrollX, animated: false });
    }
  };
  const scrollToCurrentDayAnimated = () => {
    const daysInMonth = eachDayOfInterval({ start: startOfMonth(currentDay), end: endOfMonth(currentDay) });
    const weeksInMonth = eachWeekOfInterval({start: startOfMonth(selectedDay), end: endOfMonth(selectedDay)})
    const currentDayIndex = daysInMonth.findIndex(day => isSameDay(day, currentDay));
    if(currentDayIndex >= 0 && scrollViewRef.current) {
      const cardWidth = Dimensions.get('window').width - 2.5 * Padding.Large; // Adjust padding as needed
      const itemWidth = cardWidth / 7;
      const scrollX = currentDayIndex * itemWidth - (Dimensions.get('window').width / 2) + (itemWidth / 2);
      scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
    }
  };

  React.useEffect(() => {

    scrollToCurrentDay();
  }, [])

  const renderDay = (date: Date) => {
    const isSelected = format(selectedDay, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    const isCurrentDay = currentDay === format(date, 'yyyy-MM-dd');
    const dayWidth = 50;
    const cardWidth = Dimensions.get('window').width - 3 * Padding.Large; // Adjust padding as needed

    return (
        <TouchableOpacity
          onPress={() => handleDatePress(date)}
          key={format(date, "yyyy-MM-dd")}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Padding.Large,
            borderRadius: 20,
            width: cardWidth / 7
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{
              fontSize: 12,
              color: isSelected ? colors.text.secondary : isCurrentDay ? colors.background.main : colors.text.main
            }}>
              {format(date, 'E')}
            </Text>
            <Text style={{
              marginTop: Padding.Medium,
              fontSize: 16,
              color: isSelected ? colors.text.secondary : isCurrentDay ? colors.background.main : colors.text.main
            }}>
              {date.getDate()}
            </Text>
          </View>
        </TouchableOpacity>
    );
  };



  const renderWeek = (start: Date) => {
    const days = [];
    console.log("start: ", start);
    const monday = startOfWeek(start, { weekStartsOn: 1 }); // Find the previous Monday
    for (let i = 0; i < 7; i++) {
      const day = addDays(monday, i);
      if (getMonth(day) === getMonth(currentDay)) { // Check if the day is in the current month
        days.push(day);
      } else {
        break;
      }
    }
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        {days.map(renderDay)}
      </View>
    );
  };

  const handlePreviousMonth = () => {
    setSelectedDate(prevMonth => subDays(startOfMonth(prevMonth), 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prevMonth => addMonths(startOfMonth(prevMonth), 1));
  };

  const renderMonth = (day: Date) => {
    const firstDayOfMonth = startOfMonth(day);
    const lastDayOfMonth = endOfMonth(day);
    const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
    
    const weeksInMonth = [];
    for(let i = 0; i < daysInMonth.length; i += 7) {
      const weeks = daysInMonth.slice(i, i + 7);
      weeksInMonth.push(weeks);
    }
  
    const dayWidth = 50; // Adjust this value based on your preference
    const scrollViewWidth = dayWidth * 7;
    const width = Dimensions.get('screen').width;
    return weeksInMonth.map((week, index) => (
      <View key={index} style={{justifyContent: "center", alignItems: "center"}}>
        <ScrollView snapToStart={true} horizontal key={index} style={{ flex: 1 }}>
          {week.map(renderDay)}
        </ScrollView>
      </View>
    ));
    // return daysInMonth.map((day, index) => (
    //   <ScrollView snapToStart={true} horizontal key={index}>
    //     {renderDay(day)}
    //   </ScrollView>
    // ));
  };
  const setToday = () => {
    setSelectedDay(currentDay);
    scrollToCurrentDayAnimated();
    // setSelectedDay(updatedSelectedDay => {
    //   console.log(updatedSelectedDay); // This will reflect the updated value
    //   scrollToCurrentDay();
    //   return updatedSelectedDay; // Make sure to return the updated value if you're not modifying it
    // });
  };
  return (

    <View style={{alignItems: "center"}}>
      <TouchableOpacity
        style={{
          width: "auto",
          height: "auto",
          borderRadius: 8,
          padding: Padding.Large,
          backgroundColor: colors.background.main,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={setToday}
      >
        <Text style={{ color: colors.text.main }}>Velg idag</Text>
      </TouchableOpacity>
      <ScrollView horizontal={true} ref={scrollViewRef} >
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          {renderMonth(selectedDay)}
        </View>
      </ScrollView>
    </View>
  );
};


export default WeekCalendar;