import React from "react";
import { Image, Text, View } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { RoundProfilePictureContainer } from "../roundProfilePicture/RoundProfilepictureContainer";
import { useColor } from "../../../hooks/useColor";

interface Props {

}

export const ProfileBase: React.FC<Props> = () => {
    const defaultProfileImage = require('../../../../assets/images/DefaultProfileImage.jpg');
    const { colors } = useColor();
    const auth = useAuth();
    const currentUser = auth?.user;
    return (
        <View
        style={{
            borderWidth: 1,
            alignItems: 'center',
        }}>
            <RoundProfilePictureContainer
            canUploadPicture={false}>
                <Image
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 150 / 2,
                    overflow: 'hidden'
                }} 
                source={currentUser?.profileImage?.url ?? defaultProfileImage}/>
            </RoundProfilePictureContainer>
            <View>
                <Text style={{color: colors.text.main}}>{currentUser?.firstName}</Text>
            </View>
        </View>
    )
}