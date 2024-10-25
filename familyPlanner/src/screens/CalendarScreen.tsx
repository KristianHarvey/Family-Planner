import React from "react";
import { TouchableOpacity, View, Text, SafeAreaView, ScrollView, ListRenderItem, PanResponder, Dimensions, Animated, FlatList } from "react-native";
import { useColor } from "../hooks/useColor";
import { TopBar } from "../components/common/topBar/TopBar";
import { Font, FontSize, Padding } from "../constants/UIConstants";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { TaskList } from "../components/task/taskList/TaskList";
import { useAuth } from "../hooks/useAuth";
import { ShoppingListList } from "../components/shoppingList/shoppingListList/ShoppingListList";
import { ActivityList } from "../components/activity/activityList/ActivityList";
import { useNavigate } from "../hooks/useNavigation";

const CalendarScreen = () => {
	const { colors } = useColor();
	// const planCreationTypes = ["Oppgaver", "Handlelister", "Aktiviteter", "Måltider"];
	const auth = useAuth();
	const [currentScreenIndex, setCurrentScreenIndex] = React.useState(0);
	const navigate = useNavigate();
	// const [currentUser, setCurrentUser] = React.useState(auth.user);
	const tasks = {
		name: "Oppgaver",
		icon: (
			<MaterialIcons
				name="task"
				size={15}
				color={colors.additional_apricot}
				style={{
					opacity: currentScreenIndex === 0 ? 1 : 0.4,
				}}
			/>
		),
	};
	const shoppingLists = {
		name: "Handlelister",
		icon: (
			<MaterialIcons
				name="local-grocery-store"
				size={15}
				color={colors.additional_apricot}
				style={{
					opacity: currentScreenIndex === 1 ? 1 : 0.4,
				}}
			/>
		),
	};
	const activities = {
		name: "Aktiviteter",
		icon: (
			<Feather
				name="activity"
				size={15}
				color={colors.additional_apricot}
				style={{
					opacity: currentScreenIndex === 2 ? 1 : 0.4,
				}}
			/>
		),
	};
	const meals = {
		name: "Måltider",
		icon: (
			<IonIcons
				name="restaurant-sharp"
				size={15}
				color={colors.additional_apricot}
				style={{
					opacity: currentScreenIndex === 3 ? 1 : 0.4,
				}}
			/>
		),
	};

	const planCreationTypes = [tasks, shoppingLists, activities, meals];

	const { width } = Dimensions.get("window");
	const planTypeWidth = width;
	const scrollX = React.useRef(new Animated.Value(0)).current;

	const contentScrollViewRef = React.useRef(null);

	const indicatorWidth = (width - 2 * Padding.Large) / planCreationTypes.length;

	// const updateUser = React.useCallback(async () => {
	//     const response = await UserService.getCurrentUser();
	//     if(response) {
	//         setCurrentUser(response.data);
	//     }
	// }, [currentUser]);

	// React.useEffect(() => {
	//     updateUser();
	// }, []);

	const onMomentumScrollEnd = (event) => {
		const newIndex = Math.round(event.nativeEvent.contentOffset.x / planTypeWidth);
		setCurrentScreenIndex(newIndex);
	};

	const indicatorPosition = scrollX.interpolate({
		inputRange: [0, planTypeWidth * (planCreationTypes.length - 1)],
		outputRange: [0, (planCreationTypes.length - 1) * indicatorWidth],
	});

	const handleIconPress = (index) => {
		setCurrentScreenIndex(index);
		const offset = index * width;
		contentScrollViewRef.current.scrollTo({ x: offset, animated: false });
		Animated.spring(scrollX, {
			toValue: offset,
			useNativeDriver: false,
		}).start();
	};

	const navigateBasedOnType = (planType: string) => {
		console.log(planType);
		switch (planType) {
			case "Oppgaver":
				navigate.navigate("TaskCreate", { cameFrom: "Calendar" });
				break;
			case "Handlelister":
				navigate.navigate("ShoppingListCreate", { cameFrom: "Calendar" });
				break;
		}
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: colors.background.main,
			}}
		>
			<TopBar middleText="Kalender" />

			<View
				style={{
					height: 50,
					marginRight: Padding.Large,
					marginLeft: Padding.Large,
				}}
			>
				<View style={{ flexDirection: "row", flex: 1 }}>
					{planCreationTypes.map((planType, index) => (
						<TouchableOpacity
							key={index}
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: colors.background_main,
								height: "100%",
								flexDirection: "row",
							}}
							onPress={() => handleIconPress(index)}
						>
							{planType.icon}
							<Text
								style={{
									color: currentScreenIndex === index ? colors.text_main : colors.text_gray,
									marginLeft: Padding.Small,
									fontFamily: Font.TitilliumWebRegular, // Adjust the font if necessary
									fontSize: FontSize.XSmall, // Adjust the font size if necessary
								}}
							>
								{planType.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				<View
					style={{
						position: "absolute",
						height: 5,
						width: width - 2 * Padding.Large,
						backgroundColor: colors.text_dark_grey,
						borderRadius: 7,
						bottom: 0,
					}}
				/>
				<Animated.View
					style={{
						position: "absolute",
						height: 5,
						borderRadius: 7,
						width: indicatorWidth,
						backgroundColor: colors.accent_spring,
						bottom: 0,
						transform: [{ translateX: indicatorPosition }],
					}}
				/>
			</View>
			<View
				style={{
					justifyContent: "flex-end",
					alignItems: "flex-end",
					margin: Padding.Medium,
				}}
			>
				<IonIcons
					name="create-outline"
					size={30}
					color={colors.text_main}
					onPress={() => navigateBasedOnType(planCreationTypes[currentScreenIndex].name)}
				/>
			</View>

			<ScrollView
				horizontal
				pagingEnabled
				ref={contentScrollViewRef}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				onMomentumScrollEnd={onMomentumScrollEnd}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
				style={{ flex: 1 }}
			>
				{planCreationTypes.map((planType, index) => (
					<View
						key={index}
						style={{
							width: width,
						}}
					>
						{getPlansFromType(planType.name)}
					</View>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
export default CalendarScreen;

export const getPlansFromType = (planType: string) => {
	switch (planType) {
		case "Oppgaver":
			return <TaskList />;
		case "Handlelister":
			return <ShoppingListList />;
		case "Aktiviteter":
			return <ActivityList />;
	}
};
