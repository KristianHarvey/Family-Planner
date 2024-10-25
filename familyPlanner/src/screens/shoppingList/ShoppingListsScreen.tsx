import {
	Animated,
	Dimensions,
	Modal,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Switch,
	Text,
	TextInput,
	Touchable,
	TouchableOpacity,
	Vibration,
	View,
} from "react-native";
import { useColor } from "../../hooks/useColor";
import { TopBar } from "../../components/common/topBar/TopBar";
import { Font, FontSize, Padding } from "../../constants/UIConstants";
import React from "react";
import { CustomCard } from "../../components/customCard/CustomCard";
import { CustomCardWithoutText } from "../../components/customCard/CustomCardWithoutText";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Button } from "../../components/button/Button";
import { PlannedDayService } from "../../api/services/plannedDayService";
import { ShoppingListService } from "../../api/services/shoppingListService";
import { ShoppingList } from "../../models/shoppingList";
import Feather from "react-native-vector-icons/Feather";
import { useNavigate } from "../../hooks/useNavigation";
import { WidgetBase } from "../../components/widget/widgetBase/WidgetBase";
import { ShoppingListWidget } from "../../components/widget/shoppingList/shoppingListWidget/ShoppingListWidget";
import WeekCalendar from "../../components/weekCalendar/WeekCalendar";
import { useAuth } from "../../hooks/useAuth";
import * as Haptics from "expo-haptics";
import { SwipeableShoppingListWidget } from "../../components/widget/shoppingList/swipeableShoppingListWidget/SwipeableShoppingListWidget";

const ShoppingListsScreen = () => {
	const { colors } = useColor();
	const navigate = useNavigate();
	const auth = useAuth();
	const currentUser = auth.user;
	const [quantity, setQuantity] = React.useState("");
	const [itemName, setItemName] = React.useState("");
	const [shoppingListName, setShoppingListName] = React.useState("");
	const [createdNewShoppingList, setCreatedNewShoppingList] = React.useState(false);
	const [refreshing, setRefreshing] = React.useState(false);
	const [shoppingLists, setShoppingLists] = React.useState<ShoppingList[]>([]);
	const [itemCount, setItemCount] = React.useState(0);
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [isSwitchEnabled, setIsSwitchEnabled] = React.useState(false);
	const toggleSwitch = () => setIsSwitchEnabled((previousState) => !previousState);
	const swipeableRef = React.useRef(null);

	const handleCreateNewShoppingList = async () => {
		if (!shoppingListName) {
			return;
		}
		if (!isSwitchEnabled) {
			const response = await ShoppingListService.create({
				name: shoppingListName,
			});
			if (response) {
				setIsModalVisible(false);
				setCreatedNewShoppingList(true);
			}
		} else {
			const response = await ShoppingListService.create({
				name: shoppingListName,
				familyId: currentUser.selectedFamilyId ?? 0,
			});
			if (response) {
				setIsModalVisible(false);
				setCreatedNewShoppingList(true);
			}
		}
	};

	const fetchShoppingLists = async () => {
		const response = await ShoppingListService.getAllForCurrentUser();
		if (response) {
			const fetchedshoppingLists: ShoppingList[] = response.data;
			console.log("\n\n Fetched shopping lists: ", fetchedshoppingLists);
			setShoppingLists(fetchedshoppingLists);
		}
	};

	const updateShoppingList = async (shoppingList: ShoppingList) => {
		const response = await ShoppingListService.update(shoppingList.id, {
			id: shoppingList.id ?? 0,
			name: shoppingList.name ?? "",
			items: shoppingList.items ?? [],
			familyId: shoppingList.familyId ?? 0,
			dayKey: shoppingList.dayKey,
			startDate: shoppingList.startDate,
			endDate: shoppingList.endDate,
			plannedDayId: shoppingList.plannedDayId ?? 0,
			completed: !shoppingList.completed,
		});
		if (response) {
			const updatedShoppingList = response.data;
			const currentShoppingLists = shoppingLists.map((list) => (list.id === updatedShoppingList.id ? updatedShoppingList : list));
			setShoppingLists(currentShoppingLists);
		}
	};

	React.useEffect(() => {
		fetchShoppingLists();
	}, []);

	React.useEffect(() => {
		fetchShoppingLists();
		setCreatedNewShoppingList(false);
	}, [createdNewShoppingList]);

	const onRefresh = React.useCallback(async () => {
		setRefreshing(true);
		await fetchShoppingLists();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	}, [fetchShoppingLists]);

	const handleNavigateToShoppingList = (shoppingList) => {
		console.log(shoppingList);
		const shoppingListId = shoppingList.id ?? 0;
		navigate.navigate("ShoppingListView", { shoppingListId, cameFrom: "ShoppingList" });
	};

	const renderModal = () => {
		return (
			<Modal
				animationType="slide"
				style={{
					backgroundColor: colors.textCard.secondary,
				}}
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => {
					setIsModalVisible(!isModalVisible);
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						marginTop: 22,
					}}
				>
					<View
						style={{
							backgroundColor: colors.textCard.secondary,
							borderRadius: 5,
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 2 },
							shadowOpacity: 0.25,
							shadowRadius: 4,
							elevation: 5,
							width: "85%",
						}}
					>
						<View
							style={{
								marginTop: Padding.Large,
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								style={{
									marginTop: Padding.Small,
									color: colors.text.main,
									paddingHorizontal: Padding.Large,
									fontFamily: Font.TitilliumWebRegular,
									fontSize: FontSize.Medium,
								}}
							>
								Lag ny handleliste
							</Text>
							<View
								style={{
									justifyContent: "flex-end",
									alignItems: "flex-end",
									marginRight: Padding.Medium,
								}}
							>
								<IonIcons name="close" size={30} color={colors.text.main} onPress={() => setIsModalVisible(!isModalVisible)} />
							</View>
						</View>
						<View
							style={{
								padding: Padding.XLarge,
							}}
						>
							<TextInput
								placeholder="Navn på listen"
								onChangeText={setShoppingListName}
								placeholderTextColor={colors.textCard.main}
								style={{
									borderWidth: 1,
									borderColor: colors.background.main,
									backgroundColor: colors.text.main,
									padding: Padding.Large,
									marginLeft: Padding.Large,
									marginRight: Padding.Large,
									borderRadius: 5,
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text
									style={{
										color: colors.text_main,
										fontFamily: Font.TitilliumWebRegular,
										fontSize: FontSize.Small,
									}}
								>
									Vil du lage denne for din valgte familie?
								</Text>
								<Switch
									trackColor={{ false: colors.background.main, true: colors.text.main }}
									thumbColor={isSwitchEnabled ? colors.text.secondary : colors.text.main}
									onValueChange={toggleSwitch}
									value={isSwitchEnabled}
								/>
							</View>
							<View style={{ marginTop: Padding.XLarge }}>
								<Button
									color={!shoppingListName ? colors.textCard.main : colors.text.secondary}
									textColor={!shoppingListName ? colors.textCard.secondary : colors.text.main}
									title="Lagre"
									onPress={handleCreateNewShoppingList}
								/>
								<Text
									style={{
										marginTop: Padding.Large,
										textAlign: "center",
										color: colors.textCard.main,
										fontFamily: Font.TitilliumWebRegular,
										fontSize: FontSize.Medium,
										textDecorationLine: "underline",
										textDecorationColor: "red",
									}}
									onPress={() => setIsModalVisible(!isModalVisible)}
								>
									Avbryt
								</Text>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main }}>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background.main }}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			>
				<TopBar middleText="Handlelister" />
				<View
					style={{
						width: "50%",
					}}
				>
					<Button title="Lag ny handleliste" onPress={() => setIsModalVisible(true)} />
				</View>
				{renderModal()}
				{shoppingLists &&
					shoppingLists.map((shoppingList, index) => (
						<SwipeableShoppingListWidget
							key={index}
							familyType
							familyColor={shoppingList.family ? shoppingList.family.familyColor : colors.textCard.main}
							onShoppingListUpdate={updateShoppingList}
							sideMargins
							onPress={handleNavigateToShoppingList}
							shoppingList={shoppingList}
						/>
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default ShoppingListsScreen;
