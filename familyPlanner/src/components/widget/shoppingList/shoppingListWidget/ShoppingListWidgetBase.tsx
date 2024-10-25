import { Animated, Pressable, Text, View } from "react-native";
import { WidgetBase } from "../../widgetBase/WidgetBase";
import { ShoppingList } from "../../../../models/shoppingList";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "../../../../hooks/useNavigation";
import { useColor } from "../../../../hooks/useColor";
import { Font, FontSize } from "../../../../constants/UIConstants";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../../../../hooks/useAuth";
import { Swipeable } from "react-native-gesture-handler";

interface Props extends PropsWithChildren {
	shoppingList?: ShoppingList;
	pressable?: boolean;
	onPress?: (shoppingList: ShoppingList) => void;
	backgroundColor?: string;
	sideMargins?: boolean;
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

export const ShoppingListWidgetBase: React.FC<Props> = ({
	shoppingList,
	backgroundColor,
	pressable,
	onPress,
	children,
	sideMargins,
	swipeable,
	renderLeftAction,
	onSwipeableClose,
	onSwipeableOpen,
	swipeableRef,
}) => {
	const navigate = useNavigate();
	const { colors } = useColor();
	if (!shoppingList) {
		return null;
	}
	console.log("Shopping list family: ", shoppingList.family);
	return (
		<WidgetBase
			sideMargins={sideMargins}
			renderLeftAction={renderLeftAction}
			swipeable={swipeable}
			swipeableRef={swipeableRef}
			onSwipeableClose={onSwipeableClose}
			onSwipeableOpen={onSwipeableOpen}
			familyType={shoppingList.familyId !== 0}
			familyColor={shoppingList.family ? shoppingList.family.familyColor : colors.widget_background}
			backgroundColor={backgroundColor}
			pressable={pressable}
			onPress={() => onPress(shoppingList)}
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
				{children}
			</View>
		</WidgetBase>
	);
};
