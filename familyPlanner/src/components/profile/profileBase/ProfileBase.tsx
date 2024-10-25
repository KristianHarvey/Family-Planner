import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { RoundProfilePictureContainer } from "../roundProfilePicture/RoundProfilepictureContainer";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize } from "../../../constants/UIConstants";
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { User } from "../../../models/user";
import { ImageService } from "../../../api/services/imageService";

interface Props {
    canUploadPicture?: boolean;
    onProfileImageUpload?: (value: boolean) => void;
    currentUser?: User;
}

export const ProfileBase: React.FC<Props> = ({canUploadPicture, currentUser, onProfileImageUpload}) => {
    const defaultProfileImage = require('../../../../assets/images/DefaultProfileImage.jpg');
    const { colors } = useColor();
    const profileUri = currentUser && currentUser.profileImage ? currentUser.profileImage.uri : '';
    console.log(profileUri);

    const uploadImage = async() => {
        if(!canUploadPicture) {
            return;
        } else {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
        
            if(!result.canceled) {
                console.log(result.assets);
                const response = await fetch(result.assets[0].uri);
                if (!response.ok) {
                    throw new Error('Failed to fetch the file');
                }

                const blob = await response.blob();
                const formData = new FormData();
                // formData.append('image', blob,
                //     'profile_image' + crypto.randomUUID() + '.jpeg'
                // );
                const imageName = 'profile_image_' + new Date().toString() + '.png';
                console.log(imageName);
                formData.append('image', {
                    uri: result.assets[0].uri,
                    type: 'image/jpg', 
                    name: 'image.jpg',
                });
                console.log(formData);
                
                const imageResponse = await ImageService.UploadImage(formData);
                console.log(imageResponse.data);
                if(imageResponse) {
                    onProfileImageUpload(true);
                }
                // setImage(result.assets[0].uri);
            }
        }
    }

    return (
        <View
        style={{
            alignItems: 'center',
        }}>
            <View
            style={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2
            }}>
                {canUploadPicture ? (
                    <TouchableOpacity
                    onPress={uploadImage}>
                        <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 150 / 2,
                            overflow: 'hidden'
                        }} 
                        source={currentUser.profileImage && currentUser.profileImage.uri ? {uri: currentUser.profileImage.uri} : defaultProfileImage}/>
                    </TouchableOpacity>
                ) : (
                    <Image
                    style={{
                        width: 150,
                        height: 150,
                        borderRadius: 150 / 2,
                        overflow: 'hidden'
                    }} 
                    source={currentUser.profileImage && currentUser.profileImage.uri ? {uri: currentUser.profileImage.uri} : defaultProfileImage}/>

                )}
            </View>
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