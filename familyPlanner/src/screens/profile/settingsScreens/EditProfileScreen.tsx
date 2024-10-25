import React from "react";
import { ActivityIndicator, Image, SafeAreaView, TouchableOpacity, View } from "react-native"
import { useColor } from "../../../hooks/useColor"
import { TopBar } from "../../../components/common/topBar/TopBar";
import { useAuth } from "../../../hooks/useAuth";
import { UserService } from "../../../api/services/userService";
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { ImageService } from "../../../api/services/imageService";

export const EditProfileScreen = () => {
    const { colors } = useColor();
    const auth = useAuth();
    const [shouldReload, setShouldReload] = React.useState(false);
    const defaultProfileImage = require('../../../../assets/images/DefaultProfileImage.jpg');
    const [currentUser, setCurrentUser] = React.useState(auth.user);
    const [profileImage, setProfileImage] = React.useState(auth.user.profileImage);
    const [loading, setLoading] = React.useState(false);

    const fetchUserInfo = async() => {
        const response = await UserService.getCurrentUser();
        if(response) {
            setCurrentUser(response.data);
        }
    }
    React.useEffect(() => {
        fetchUserInfo();
    }, []);

    React.useEffect(() => {
        fetchUserInfo();
    }, [profileImage]);

    const uploadImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        
        if(!result.canceled) {
            setLoading(true);
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
            console.log("Formdata: ", formData);
            
            const imageResponse = await ImageService.UploadImage(formData);
            console.log(imageResponse.data);
            if(imageResponse) {
                setProfileImage(imageResponse.data);
                setLoading(false);
            }
            // setImage(result.assets[0].uri);
        }
    }

    return (
        <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: colors.background.main,
        }}>
            <TopBar leftIcon='arrow-back' cameFromScreen="ProfileSetting" middleText="Rediger Profil"/>
            <View
            style={{
                alignItems: 'center'
            }}>
                <View
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 150 / 2,
                }}>
                    <TouchableOpacity
                    onPress={uploadImage}>
                        {loading ? (
                            <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                                borderRadius: 75, // Match the border radius of the image container
                            }}>
                                <ActivityIndicator size="large" color={colors.text_main} />
                            </View>
                        ) : (
                            <Image
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 150 / 2
                            }}
                            source={currentUser.profileImage ? {uri: currentUser.profileImage.uri} : defaultProfileImage}/>

                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}