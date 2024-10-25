import React from "react";
import * as Haptics from "expo-haptics";
import { Animated, Dimensions, Text, View } from "react-native";
import { SwipeableWidgetBase } from "../../swipeableWidgetBase/SwipeableWidgetBase";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../../constants/UIConstants";
import { ShoppingList } from "../../../../models/shoppingList";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import { ShoppingListService } from "../../../../api/services/shoppingListService";

interface Props {
	shoppingList?: ShoppingList;
	onPress?: (shoppingList: ShoppingList) => void;
	sideMargins?: boolean;
	onShoppingListUpdate: (shoppingList: ShoppingList) => void;
	familyType?: boolean;
	familyColor?: string;
}

export const SwipeableShoppingListWidget: React.FC<Props> = ({
	shoppingList,
	onPress,
	sideMargins,
	onShoppingListUpdate,
	familyType,
	familyColor,
}) => {
	const { colors } = useColor();
	const swipeableRef = React.useRef(null);
	const closingAnimation = React.useRef(new Animated.Value(0)).current;

	const renderLeftItem = (progress, dragX) => {
		const width = Dimensions.get("screen").width;
		const trans = dragX.interpolate({
			inputRange: [0, width / 5],
			outputRange: [-width / 5, 0],
		});
		return (
			<Animated.View
				style={{
					backgroundColor: shoppingList.completed ? colors.textCard.secondary : "green",
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					width: width / 4,
					margin: Padding.Small,
					justifyContent: "center",
					alignItems: "center",
					transform: [{ translateX: trans }],
				}}
			>
				{shoppingList.completed ? (
					<Text
						style={{
							color: colors.text_main,
							textAlign: "center",
							fontFamily: Font.TitilliumWebRegular,
							fontSize: FontSize.Medium,
						}}
					>
						Nullstill
					</Text>
				) : (
					<Text
						style={{
							color: colors.text_main,
							textAlign: "center",
							fontFamily: Font.TitilliumWebRegular,
							fontSize: FontSize.Medium,
						}}
					>
						Ferdig
					</Text>
				)}
			</Animated.View>
		);
	};

	const renderRightItem = (progress, dragX) => {
		const width = Dimensions.get("screen").width;
		const trans = dragX.interpolate({
			inputRange: [-width / 2, 0],
			outputRange: [1, width / 4],
		});
		return (
			<Animated.View
				style={{
					width: width / 2,
					flexDirection: "row",
					transform: [{ translateX: trans }],
				}}
			>
				<View
					style={{
						backgroundColor: "red",
						width: 180,
						borderRadius: 10,
						margin: Padding.Small,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: colors.text_main,
								textAlign: "center",
								fontFamily: Font.TitilliumWebRegular,
								fontSize: FontSize.Medium,
							}}
						>
							Slett
						</Text>
						<IonIcons
							style={{
								marginLeft: Padding.Medium,
							}}
							name="trash-outline"
							size={20}
							color={colors.text_main}
						/>
					</View>
				</View>
			</Animated.View>
		);
	};

	const handleSwipe = async () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		Animated.timing(closingAnimation, {
			toValue: 1,
			duration: 300,
			useNativeDriver: false,
		}).start(() => {
			if (swipeableRef.current) {
				onShoppingListUpdate(shoppingList);
				swipeableRef.current.close();
				closingAnimation.setValue(0);
			}
		});
	};

	const handleSwipeableOpen = (direction: string) => {
		if (direction === "left") {
			handleSwipe();
		}
	};

	return (
		<SwipeableWidgetBase
			onPress={() => onPress(shoppingList)}
			familyColor={familyColor}
			familyType={familyType}
			swipeableRef={swipeableRef}
			renderLeftActions={renderLeftItem}
			onSwipeableWillOpen={(direction) => handleSwipeableOpen(direction)}
			renderRightActions={renderRightItem}
			sideMargins={sideMargins}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View>
					<Text
						style={{
							color: colors.text_main,
							fontFamily: Font.TitilliumWebRegular,
							fontSize: FontSize.Medium,
						}}
					>
						{shoppingList.name}
					</Text>
					<Text
						style={{
							color: colors.accent_spring,
							fontFamily: Font.TitilliumWebRegular,
							fontSize: FontSize.Small,
							flexDirection: "row",
						}}
					>
						{shoppingList.items ? shoppingList.items.length : 0}
						<Text
							style={{
								color: colors.text_main,
							}}
						>
							{" "}
							Varer
						</Text>
					</Text>
				</View>
				<Feather name={"chevron-right"} size={50} color={colors.text_main} />
			</View>
		</SwipeableWidgetBase>
	);
};
