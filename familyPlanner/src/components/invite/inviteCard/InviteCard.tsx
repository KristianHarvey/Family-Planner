import { Modal, Pressable, TouchableOpacity, View, Text } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import React from "react";
import { useColor } from "../../../hooks/useColor";
import { UserService } from "../../../api/services/userService";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";
import { Button } from "../../button/Button";
import { Invite } from "../../../models/invite";

interface InviteCardProps {
    familyName: string;
    fromUserFirstName: string;
    invite: Invite;
    onButtonClick: () => void;
}

export const InviteCard: React.FC<InviteCardProps> = ({invite, familyName, fromUserFirstName, onButtonClick}) => {
    const { colors } = useColor();
    const [isModalVisible, setIsModalVisible] = React.useState(false);


    const onAcceptClick = async() => {
        console.log(invite);
        const response = await UserService.acceptInvite({
            id: invite.id ?? 0,
            toUserUid: invite.toUserUid,
            fromUserUid: invite.fromUserUid,
            toFamilyId: invite.toFamilyId
        });
        if(!response) {
            console.log("failed to accept invite!");
        }
        onButtonClick();
    }
    const declineInvite = async() => {
        const response = await UserService.declineInvite({
            id: invite.id ?? 0,
            toUserUid: invite.toUserUid,
            fromUserUid: invite.fromUserUid,
            toFamilyId: invite.toFamilyId
        });
        if(!response) {
            console.log("failed to decline invite");
        }
        setIsModalVisible(false);
        onButtonClick();
    }

    const renderModal = () => {
        return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
            setIsModalVisible(!isModalVisible);
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22
            }}>
                <View
                style={{
                    margin: 20,
                    backgroundColor: colors.text.main,
                    borderRadius: 10,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <Text
                    style={{
                        fontFamily: Font.TitilliumWebRegular,
                        fontSize: FontSize.Small,
                    }}>Er du sikker på at du vil avslå invitasjonen?</Text>
                    <View
                    style={{flexDirection: 'row', marginTop: Padding.XLarge}}>
                        <Button
                        color={'red'}
                        style={{
                            borderRadius: 5,
                            padding: 10,
                            elevation: 2,
                        }}
                        title="Avbryt"
                        onPress={() => setIsModalVisible(!isModalVisible)}/>
                        <Button
                        title="Bekreft"
                        onPress={declineInvite}/>
                    </View>
                </View>
            </View>
        </Modal>
        )
    }

    const onDeclineClick = () => {
        setIsModalVisible(true);
    }
    return (
        <View
        style={{
            margin: Padding.Large,
            borderRadius: 5,
            backgroundColor: colors.textCard.main
        }}>
            <View 
            style={{
                flexDirection: 'row',
                paddingHorizontal: Padding.Large,
            }}>
                <View style={{

                }}>
                    <Text style={{color: colors.text.main}}>Fra: {fromUserFirstName}</Text>
                </View>
            </View>
            {renderModal()}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: colors.text.main,
                    fontFamily: Font.TitilliumWebRegular,
                }}>Invitasjon til å være med i</Text>
                <Text style={{
                    fontFamily: Font.TitilliumWebRegular,
                    marginLeft: Padding.Medium,
                    color: colors.text.secondary
                }}>{familyName}</Text>
            </View>
            <View
            style={{
                width: '100%',
                flexDirection: 'row',
            }}>
                <TouchableOpacity style={{
                    width: '50%',
                    borderBottomLeftRadius: 5,
                    justifyContent: 'center',
                    backgroundColor: 'green',
                    alignItems: 'center',
                    marginTop: Padding.Medium
                }}
                onPress={onAcceptClick}>
                    <Feather
                    name="check"
                    size={40}
                    color={colors.text.main}/>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '50%',
                    borderBottomRightRadius: 5,
                    justifyContent: 'center',
                    backgroundColor: 'red',
                    alignItems: 'center',
                    marginTop: Padding.Medium
                }}
                onPress={onDeclineClick}>
                    <IonIcons
                    name="close"
                    size={40}
                    color={colors.text.main}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}