import React from "react"
import { UserService } from "../../../api/services/userService";
import { Animated, Dimensions, FlatList, Image, ListRenderItem, Modal, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { User } from "../../../models/user";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "../../../hooks/useNavigation";
import IonIcons from "react-native-vector-icons/Ionicons"
import { Swipeable } from "react-native-gesture-handler";
// import Animated, { interpolate } from "react-native-reanimated";
// import { transform } from "typescript";

interface Props {
    onSearchResultChange?: (result: any) => void;
    familyId: number;
}

export const SearchUserInput: React.FC<Props> = ({onSearchResultChange, familyId}) => {
    const defaultProfileImage = require('../../../../assets/images/DefaultProfileImage.jpg');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<User[]>([]);
    const swipeableRef = React.useRef(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const { colors } = useColor();

    const fetchProductsFromQuery = async (query: string) => {
        try {
            if (!query) {
                setSearchResults([]);
                return;
            }

            const response = await UserService.search(query);
            if (response) {
                const users: User[] = response.map((user: User) => ({
                    id: user.id ?? 0,
                    firstName: user.firstName ?? "",
                    lastName: user.lastName ?? "",
                    profileImage: user.profileImage,
                    uid: user.uid,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    families: user.families
                }));
                console.log(users);
                setSearchResults(users);
            }
            // setIsLoading(false);

        } catch (error) {
            console.error('Error fetching products:', error);
            // setIsLoading(false);
        }
    };

    const handleSearch = async(query: string) => {
        setSearchQuery(query);
        await fetchProductsFromQuery(query);
    }

    const navigateBack = () => {
        setSearchQuery('');
        setSearchResults([]);
        navigate.navigate("Profile");
    }

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    }

    const closeSwipeable = () => {
        swipeableRef.current.close();
    };

    const renderLeftItem = (progress, dragX) => {
        const width = Dimensions.get('screen').width;
        const trans = dragX.interpolate({
            inputRange: [0, width / 2],
            outputRange: [-width / 2, 1],
          });
        return (
            <Animated.View
            style={{
                backgroundColor: 'green',
                width: width / 2,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ translateX: trans }]
            }}>
                <Animated.Text
                style={{
                    color: colors.text_main,
                    textAlign: 'center',
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium,
                    transform: [{translateX: trans}]
                }}>
                    Inviter
                </Animated.Text>
                {/* <Animated.View
                style={{
                    backgroundColor: 'green',
                    width: 80,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{translateX: trans}],
                }}> */}
                    {/* <Text
                    style={{
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Medium,
                        color: colors.text_main
                    }}>
                    Inviter
                    </Text> */}
                {/* </Animated.View> */}
            </Animated.View>
        )
    }
    // const handleSendInvite = async() => {
    //     console.log(selectedUser, familyId);
    //     const response = await UserService.SendInviteToUser({
    //         toUserUid: selectedUser!.uid,
    //         fromUserUid: auth?.userUid!,
    //         toFamilyId: familyId
    //     });
    //     navigate.navigate("Profile");
    // }
    const renderItem: ListRenderItem<User> = ({ item }) => {
        console.log(item);
        const totalFamilies = item.families && item.families.length;
        return (
            <View
            style={{
                backgroundColor: colors.background_main
            }}>
                <Swipeable
                renderLeftActions={renderLeftItem}
                
                containerStyle={{
                    backgroundColor: colors.background_main,
                    borderBottomWidth: 0.2,
                    borderBottomColor: colors.text_main,
                    paddingTop: Padding.XLarge,
                    paddingBottom: Padding.XLarge,
                }}>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Image
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 35 / 2,
                            marginRight: Padding.Large
                        }}
                        source={item.profileImage ? {uri: item.profileImage.uri} : defaultProfileImage}/>
                        <View>
                            <Text
                            style={{
                                color: colors.text_main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Medium
                            }}>
                                {item && item.firstName}
                            </Text>
                            <Text
                            style={{
                                color: colors.text_main,
                                fontFamily: Font.TitilliumWebRegular,
                                fontSize: FontSize.Small
                            }}>
                                {totalFamilies} {totalFamilies <= 1 ? 'familie' : 'familier'}
                            </Text>
                        </View>
                    </View>
                </Swipeable>
            </View>
        )
    }

    // const renderItem = { item: ShoppingListItem }) => (
    //     <TouchableOpacity
    //         style={{
    //             padding: 10,
    //             marginVertical: 5,
    //             borderRadius: 5,
    //         }}>
    //             <View
    //             style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center',
    //             }}>
    //                 <View
    //                 style={{
    //                     flexDirection: 'row',
    //                 }}>
    //                     <Image style={{
    //                         width: 50,
    //                         height: 50,
    //                         borderRadius: 50 / 2,
    //                         marginRight: Padding.Medium,
    //                     }} source={{uri: item.image ? item.image : ''}}/>
    //                     <View
    //                     style={{

    //                     }}>
    //                         <Text 
    //                         style={{ 
    //                             marginLeft: Padding.Medium, 
    //                             color: colors.text.main,
    //                             fontFamily: Font.TitilliumWebRegular,
    //                             fontSize: FontSize.Medium
    //                         }}>{item.name}</Text>
    //                         <Text
    //                         style={{
    //                             color: colors.text.main,
    //                             marginLeft: Padding.Medium,
    //                             fontFamily: Font.TitilliumWebRegular,
    //                             fontSize: FontSize.Small
    //                         }}>Pris: {item.currentPrice}</Text>
    //                     </View>
    //                 </View>
    //                 {shoppingList.items[shoppingList.items.findIndex((existingItem) => existingItem.id === item.id)].quantity > 0 ? (
    //                     <View
    //                     style={{
    //                         flexDirection: 'row',
    //                     }}>
    //                         <TouchableOpacity
    //                         style={{
    //                             width: 30,
    //                             height: 30,
    //                             borderRadius: 30 / 2,
    //                             backgroundColor: colors.textCard.secondary,
    //                             marginRight: Padding.Small,
    //                         }}
    //                         onPress={() => removeItemFromList(item)}>
    //                             <Feather
    //                             name='minus'
    //                             size={30}
    //                             color={colors.text.main}/>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                         style={{
    //                             width: 30,
    //                             height: 30,
    //                             borderRadius: 30 / 2,
    //                             backgroundColor: colors.textCard.secondary,
    //                             marginLeft: Padding.Small
    //                         }}
    //                         onPress={() => addItemToList(item)}>
    //                             <Feather
    //                             name='plus'
    //                             size={30}
    //                             color={colors.text.main}/>
    //                         </TouchableOpacity>
    //                     </View>
    //                 ): (
    //                     <TouchableOpacity
    //                     style={{
    //                         width: 30,
    //                         height: 30,
    //                         borderRadius: 30 / 2,
    //                         backgroundColor: colors.textCard.secondary,
    //                     }}
    //                     onPress={() => addItemToList(item)}>
    //                         <Feather
    //                         name='plus'
    //                         size={30}
    //                         color={colors.text.main}/>
    //                     </TouchableOpacity>
    //                 )}
    //             </View>
    //     </TouchableOpacity>
    // );

    // if(loading) {
    //     return (
    //         <ActivityIndicator/>
    //     )
    // }
    return (

        <View
        style={{
            flex: 1,
            backgroundColor: colors.background_main,
            marginTop: Platform.OS === "ios" ? Padding.Medium : Padding.XLarge * 3,
        }}>
            <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.widget_background,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: Padding.Medium,
                paddingLeft: Padding.Medium,
            }}>
                <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <IonIcons
                    name={'search-outline'}
                    size={30}
                    color={colors.text_main}/>
                    <View
                    style={{
                        flex: 1,
                    }}>
                        <TextInput
                        inputMode="search"
                        keyboardAppearance="dark"
                        returnKeyType="search"
                        placeholder="Søk blandt brukere"
                        placeholderTextColor={colors.text_gray}
                        value={searchQuery}
                        onChangeText={(query) => handleSearch(query)}
                        style={{
                            width: 'auto',
                            color: colors.text_main,
                            fontFamily: Font.TitilliumWebRegular,
                            fontSize: FontSize.Small,
                            margin: Padding.Large,
                            borderRadius: 5
                        }}
                        />
                    </View>
                    {searchQuery.length > 0 && ( // Only render the clear button when searchQuery is not empty
                        <TouchableOpacity onPress={clearSearch}
                        style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            marginRight: Padding.XLarge,
                        }}>
                            <IonIcons
                                name="close-circle-sharp"
                                size={16}
                                color={colors.text_gray}
                                style={{ marginLeft: 5 }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity
                style={{
                    marginRight: Padding.Medium
                }}
                onPress={navigateBack}>
                    <Text
                    style={{
                        color: colors.additional_periwinkle,
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small
                    }}>
                        angre
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
            data={searchResults}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};