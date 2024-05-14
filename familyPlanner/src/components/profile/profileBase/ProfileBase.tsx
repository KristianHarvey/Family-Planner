import React from "react";
import { Image, Text, View } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { RoundProfilePictureContainer } from "../roundProfilePicture/RoundProfilepictureContainer";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize } from "../../../constants/UIConstants";

interface Props {
    canUploadPicture?: boolean;
}

export const ProfileBase: React.FC<Props> = ({canUploadPicture}) => {
    const defaultProfileImage = require('../../../../assets/images/DefaultProfileImage.jpg');
    const { colors } = useColor();
    const auth = useAuth();
    const currentUser = auth?.user;
    const profileUri = currentUser.profileImage ? currentUser.profileImage.uri : '';
    console.log(profileUri);
    return (
        <View
        style={{
            alignItems: 'center',
        }}>
            <RoundProfilePictureContainer
            canUploadPicture={canUploadPicture}>
                <Image
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 150 / 2,
                    overflow: 'hidden'
                }} 
                source={currentUser.profileImage && currentUser.profileImage.uri ? {uri: currentUser.profileImage.uri} : defaultProfileImage}/>
            </RoundProfilePictureContainer>
            <View>
                <Text 
                style={{
                    color: colors.text.main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>{currentUser?.username}</Text>
            </View>
        </View>
    )
}