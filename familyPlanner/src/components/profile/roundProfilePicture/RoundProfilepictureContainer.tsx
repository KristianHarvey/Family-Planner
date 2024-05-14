import React, { PropsWithChildren } from "react";
import { Platform, StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import FormData from 'form-data';
import { useColor } from "../../../hooks/useColor";
import { ImageUploader } from "../../imagePicker/ImagePicker";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImageService } from "../../../api/services/imageService";
import { Image } from "../../../models/image";
import { UserService } from "../../../api/services/userService";
import { useAuth } from "../../../hooks/useAuth";

interface Props extends PropsWithChildren {
    canUploadPicture?: boolean;
    containerStyle?: StyleProp<ViewStyle>; // Additional style prop for the container
    size?: number;
    setShouldReload?: (value: boolean) => void;
}

export const RoundProfilePictureContainer: React.FC<Props> = ({canUploadPicture, children, containerStyle, size, setShouldReload, ...rest}) => {
    const { colors } = useColor();
    const auth = useAuth();
    const currentUser = auth.user ?? null;

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
                const image: Image = {
                    uri: result.assets[0].uri,
        
                }
                console.log(result.assets);
                const response = await fetch(image.uri);
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
                    uri: image.uri,
                    type: 'image/jpg', 
                    name: 'image.jpg',
                });
                console.log(formData);
                
                const imageResponse = await ImageService.UploadImage(formData);
                console.log(imageResponse.data);
                if(imageResponse) {
                    setShouldReload(true);
                }
                // setImage(result.assets[0].uri);
            }
        }
    }

    const handleUploadImage = async() => {
        const image = await ImageUploader();
    }

    return (
        <View
        {...rest}>
            <View
            style={[{
                width: size ? size : 150,
                height: size ? size : 150,
                borderRadius: size ? size / 2 : 150 / 2,
                
            }, containerStyle]} {...rest}>
                {canUploadPicture ? (
                    <TouchableOpacity
                    onPress={uploadImage}>
                        {children}
                    </TouchableOpacity>
                ): (
                    <View>
                        {children}
                    </View>
                )}
            </View>
        </View>
    )
}