import { Switch, Text, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import React from "react";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { ShoppingListPlanWidget } from "../../widget/shoppingList/shoppingListPlanWidget/ShoppingListPlanWidget";
import WeekCalendar from "../../weekCalendar/WeekCalendar";
import { DayKeyUtils } from "../../../utils/DayKeyUtils";
import { WidgetBase } from "../../widget/widgetBase/WidgetBase";

enum PlanningKey {
	FamilySwitch = "FamilySwitch",
	PlanningSwitch = "PlanningSwitch",
	AllSwitches = "AllSwitches",
	Invalid = "Invalid",
}

interface Props {
	onPlannedDayChanged?: (date: string) => void;
}

export const PlanningStateInput: React.FC<Props> = ({ onPlannedDayChanged }) => {
	const { colors } = useColor();
	const [familySwitchOn, setFamilySwitchOn] = React.useState(false);
	const [planningSwitchOn, setPlanningSwitchOn] = React.useState(false);
	const [selectedDay, setSelectedDay] = React.useState(DayKeyUtils.getDayKey(new Date()));

	const getKey = () => {
		if (familySwitchOn && planningSwitchOn) {
			return PlanningKey.AllSwitches;
		} else if (familySwitchOn) {
			return PlanningKey.FamilySwitch;
		} else if (planningSwitchOn) {
			return PlanningKey.PlanningSwitch;
		}
	};

	const key = getKey();

	const familyView = () => {
		if (familySwitchOn) {
			return (
				<View>
					<Text
						style={{
							color: colors.text_main,
						}}
					>
						Familie
					</Text>
				</View>
			);
		} else {
			return <></>;
		}
	};

	const handleDayChange = (day: string) => {
		setSelectedDay(day);
		if (onPlannedDayChanged) {
			onPlannedDayChanged(day);
		}
	};

	const datePlanningView = () => {
		if (planningSwitchOn) {
			return (
				<WidgetBase>
					<WeekCalendar currentDay={DayKeyUtils.getDayKey(new Date())} selectedDay={new Date(selectedDay)} setSelectedDay={handleDayChange} />
					<View
						style={{
							flexDirection: "row",
							marginLeft: Padding.Medium,
							marginTop: Padding.Large,
						}}
					>
						<Text
							style={{
								color: colors.text_main,
								fontFamily: Font.TitilliumWebRegular,
								fontSize: FontSize.Small,
							}}
						>
							Valgt dato:
						</Text>
						<Text
							style={{
								color: colors.additional_periwinkle,
								fontFamily: Font.TitilliumWebRegular,
								fontSize: FontSize.Small,
							}}
						>
							{"  "}
							{DayKeyUtils.formatPretty(new Date(selectedDay))}
						</Text>
					</View>
				</WidgetBase>
			);
		} else {
			return <></>;
		}
	};

	const SetView = () => {
		switch (key) {
			case "FamilySwitch":
				return familyView();
			case "PlanningSwitch":
				return datePlanningView();
			case "AllSwitches":
				return familyView() && datePlanningView();
		}
	};

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: colors.text_main,
						fontFamily: Font.TitilliumWebRegular,
						fontSize: FontSize.Medium,
					}}
				>
					Planlegg for familie
				</Text>
				<Switch value={familySwitchOn} onValueChange={() => setFamilySwitchOn(!familySwitchOn)} />
			</View>
			{familyView()}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						color: colors.text_main,
						fontFamily: Font.TitilliumWebRegular,
						fontSize: FontSize.Medium,
					}}
				>
					Tidsfrist
				</Text>
				<Switch value={planningSwitchOn} onValueChange={() => setPlanningSwitchOn(!planningSwitchOn)} />
			</View>
			{datePlanningView()}
		</View>
	);
};
