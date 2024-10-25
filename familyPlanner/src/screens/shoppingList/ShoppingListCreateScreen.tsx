import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { useColor } from "../../hooks/useColor";
import React from "react";
import { PlanningStateInput } from "../../components/common/planningStateInput/PlanningStateInput";
import { Padding } from "../../constants/UIConstants";
import { TopBar } from "../../components/common/topBar/TopBar";
import { TextInputField } from "../../components/atoms/textInputField/TextInputField";
import { useRoute } from "@react-navigation/native";

interface ParamProps {
	cameFrom?: string;
}

export const ShoppingListCreateScreen = () => {
	const { colors } = useColor();
	const [name, setName] = React.useState("");
	const route = useRoute();

	const { cameFrom } = route.params as ParamProps;

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: colors.background_main,
			}}
		>
			<TopBar leftIcon={"arrow-back"} cameFromScreen={cameFrom} middleText="Lag ny handleliste" />
			<View style={{ padding: Padding.Large }} />
			<ScrollView
				style={{
					flex: 1,
				}}
			>
				<TextInputField
					value={name}
					placeholder="Navn"
					onChangeText={setName}
					style={{
						color: colors.text_main,
						backgroundColor: colors.widget_background,
						borderRadius: 5,
						paddingHorizontal: Padding.Medium,
						paddingVertical: Padding.Medium,
					}}
				/>
				<View style={{ padding: Padding.Large }} />
				<PlanningStateInput />
			</ScrollView>
		</SafeAreaView>
	);
};
