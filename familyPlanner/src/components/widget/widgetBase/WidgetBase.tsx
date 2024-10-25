import React, { PropsWithChildren } from "react";
import { Animated, Dimensions, Pressable, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { useAuth } from "../../../hooks/useAuth";
import { Swipeable } from "react-native-gesture-handler";

interface Props extends PropsWithChildren {
	backgroundColor?: string;
	style?: StyleProp<ViewStyle>;
	pressable?: boolean;
	onPress?: () => void;
	sideMargins?: boolean;
	familyType?: boolean;
	familyColor?: string;
	swipeable?: boolean;
	renderLeftAction?: (
		progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		swipeable: Swipeable
	) => React.ReactNode;
	completedState?: boolean;
	onSwipeableClose?: (direction: "left" | "right", swipeable: Swipeable) => void;
	onSwipeableOpen?: (direction: "left" | "right", swipeable: Swipeable) => void;
	swipeableRef?: React.LegacyRef<Swipeable>;
}

enum Properties {
	Pressable = "pressable",
	Swipeable = "swipeable",
	PressableSwipe = "pressableSwipe",
	Unvalid = "unvalid",
}

const getPropertyKey = (action: string) => {
	switch (action) {
		case "pressable":
			return Properties.Pressable;
		case "swipeable":
			return Properties.Swipeable;
		case "pressableSwipe":
			return Properties.PressableSwipe;
		default:
			return Properties.Unvalid;
	}
};

export const WidgetBase: React.FC<Props> = ({
	backgroundColor,
	style,
	children,
	pressable,
	onPress,
	sideMargins,
	familyType,
	familyColor,
	swipeable,
	renderLeftAction,
	completedState,
	onSwipeableClose,
	onSwipeableOpen,
	swipeableRef,
}) => {
	const { colors } = useColor();
	let property: Properties;
	if (pressable && swipeable) {
		property = getPropertyKey("pressableSwipe");
	} else if (swipeable) {
		property = getPropertyKey("swipeable");
	} else if (pressable) {
		property = getPropertyKey("pressableSwipe");
	} else {
		property = getPropertyKey("unvalid");
	}
	const pressableWidget = () => {
		return (
			<TouchableOpacity
				style={[
					{
						backgroundColor: backgroundColor ? backgroundColor : colors.widget_background,
						paddingHorizontal: Padding.Large,
						paddingVertical: Padding.XLarge,
						marginLeft: sideMargins ? Padding.Medium : 0,
						marginRight: sideMargins ? Padding.Medium : 0,
						margin: Padding.Small,
						borderRadius: 5,
						shadowColor: "#000",
						shadowOpacity: 0.4,
						shadowOffset: { width: 1, height: 0 },
						shadowRadius: 2,
						elevation: 5,
						borderBottomWidth: familyType ? 5 : 0,
						borderBottomColor: familyType ? familyColor : "transparent",
					},
					style,
				]}
				onPress={onPress}
			>
				{children}
			</TouchableOpacity>
		);
	};

	const swipeWidget = () => {
		return (
			<Swipeable ref={swipeableRef} onSwipeableOpen={onSwipeableOpen} renderLeftActions={renderLeftAction} onSwipeableClose={onSwipeableClose}>
				<View
					style={[
						{
							backgroundColor: backgroundColor ? backgroundColor : colors.widget_background,
							paddingHorizontal: Padding.Large,
							paddingVertical: Padding.XLarge,
							marginLeft: sideMargins ? Padding.Medium : 0,
							marginRight: sideMargins ? Padding.Medium : 0,
							margin: Padding.Small,
							borderRadius: 5,
							shadowColor: "#000",
							shadowOpacity: 0.4,
							shadowOffset: { width: 1, height: 0 },
							shadowRadius: 2,
							elevation: 5,
							borderBottomWidth: familyType ? 5 : 0,
							borderBottomColor: familyType ? familyColor : "transparent",
						},
						style,
					]}
				>
					{children}
				</View>
			</Swipeable>
		);
	};

	const pressableSwipeWidget = () => {
		return (
			<Swipeable ref={swipeableRef} onSwipeableOpen={onSwipeableOpen} renderLeftActions={renderLeftAction} onSwipeableClose={onSwipeableClose}>
				<Pressable onPress={onPress}>
					<View
						style={[
							{
								backgroundColor: backgroundColor ? backgroundColor : colors.widget_background,
								paddingHorizontal: Padding.Large,
								paddingVertical: Padding.XLarge,
								marginLeft: sideMargins ? Padding.Medium : 0,
								marginRight: sideMargins ? Padding.Medium : 0,
								margin: Padding.Small,
								borderRadius: 5,
								shadowColor: "#000",
								shadowOpacity: 0.4,
								shadowOffset: { width: 1, height: 0 },
								shadowRadius: 2,
								elevation: 5,
								borderBottomWidth: familyType ? 5 : 0,
								borderBottomColor: familyType ? familyColor : "transparent",
							},
							style,
						]}
					>
						{children}
					</View>
				</Pressable>
			</Swipeable>
		);
	};

	const defaultWidget = () => {
		return (
			<View
				style={[
					{
						backgroundColor: backgroundColor ? backgroundColor : colors.widget_background,
						paddingHorizontal: Padding.Large,
						paddingVertical: Padding.XLarge,
						marginLeft: sideMargins ? Padding.Medium : 0,
						marginRight: sideMargins ? Padding.Medium : 0,
						margin: Padding.Small,
						borderRadius: 5,
						shadowColor: "#000",
						shadowOpacity: 0.4,
						shadowOffset: { width: 1, height: 0 },
						shadowRadius: 2,
						elevation: 5,
						borderBottomWidth: familyType ? 5 : 0,
						borderBottomColor: familyType ? familyColor : "transparent",
					},
					style,
				]}
			>
				{children}
			</View>
		);
	};

	const getWidgetBasedOnProperty = () => {
		switch (property) {
			case Properties.Pressable:
				return pressableWidget();
			case Properties.Swipeable:
				return swipeWidget();
			case Properties.PressableSwipe:
				return pressableSwipeWidget();
			default:
				return defaultWidget();
		}
	};

	return <View>{getWidgetBasedOnProperty()}</View>;
};
