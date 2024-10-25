import { Animated, Pressable, Text, View } from "react-native";
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { ShoppingList } from "../../../../models/shoppingList";
import React from "react";
import { useNavigate } from "../../../../hooks/useNavigation";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize } from "../../../../constants/UIConstants";
import Feather from "react-native-vector-icons/Feather";
import { ShoppingListWidgetBase } from "./ShoppingListWidgetBase";
import { Swipeable } from "react-native-gesture-handler";

interface Props {
	shoppingList?: ShoppingList;
	onPress?: (shoppingList: ShoppingList) => void;
	swipeable?: boolean;
	renderLeftAction?: (
		progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		swipeable: Swipeable
	) => React.ReactNode;
	onSwipeableClose?: (direction: "left" | "right", swipeable: Swipeable) => void;
	onSwipeableOpen?: (direction: "left" | "right", swipeable: Swipeable) => void;
	swipeableRef?: React.LegacyRef<Swipeable>;
}

export const ShoppingListWidget: React.FC<Props> = ({
	shoppingList,
	onPress,
	swipeable,
	renderLeftAction,
	onSwipeableClose,
	onSwipeableOpen,
	swipeableRef,
}) => {
	const navigate = useNavigate();
	const { colors } = useColor();
	if (!shoppingList) {
		return;
	}
	const handleNavigateToShoppingList = (shoppingList) => {
		navigate.navigate("ShoppingListView", { shoppingList });
	};
	return (
		<ShoppingListWidgetBase
			swipeable={swipeable}
			swipeableRef={swipeableRef}
			onSwipeableClose={onSwipeableClose}
			onSwipeableOpen={onSwipeableOpen}
			renderLeftAction={renderLeftAction}
			sideMargins
			shoppingList={shoppingList}
			pressable
			onPress={onPress}
		>
			<Feather name={"chevron-right"} size={50} color={colors.text_main} />
		</ShoppingListWidgetBase>
	);
};
