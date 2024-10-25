import React, { PropsWithChildren } from "react";
import { Animated, Pressable, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useColor } from "../../../hooks/useColor";
import { Padding } from "../../../constants/UIConstants";

interface Props extends PropsWithChildren {
	onPress?: () => void;
	renderLeftActions?: (
		progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		swipeable: Swipeable
	) => React.ReactNode;
	renderRightActions?: (
		progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
		swipeable: Swipeable
	) => React.ReactNode;
	completedState?: boolean;
	onSwipeableClose?: (direction: "left" | "right", swipeable: Swipeable) => void;
	onSwipeableOpen?: (direction: "left" | "right", swipeable: Swipeable) => void;
	onSwipeableWillOpen?: (direction: "left" | "right") => void;
	swipeableRef?: React.LegacyRef<Swipeable>;
	backgroundColor?: string;
	sideMargins?: boolean;
	familyType?: boolean;
	familyColor?: string;
}

export const SwipeableWidgetBase: React.FC<Props> = ({
	children,
	onPress,
	renderLeftActions,
	renderRightActions,
	completedState,
	onSwipeableOpen,
	onSwipeableWillOpen,
	onSwipeableClose,
	swipeableRef,
	backgroundColor,
	sideMargins,
	familyType,
	familyColor,
}) => {
	const { colors } = useColor();
	return (
		<Swipeable
			ref={swipeableRef}
			renderLeftActions={renderLeftActions}
			renderRightActions={renderRightActions}
			onSwipeableClose={onSwipeableClose}
			onSwipeableOpen={onSwipeableOpen}
			onSwipeableWillOpen={onSwipeableWillOpen}
		>
			{onPress ? (
				<Pressable onPress={onPress}>
					<View
						style={{
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
						}}
					>
						{children}
					</View>
				</Pressable>
			) : (
				<View
					style={{
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
					}}
				>
					{children}
				</View>
			)}
		</Swipeable>
	);
};
