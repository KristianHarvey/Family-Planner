import React from "react";
import { Image } from "../../models/image";
import * as ImagePicker from 'expo-image-picker';
import { ImageService } from "../../api/services/imageService";

interface Props {
    onImageChange: (image: Image) => void;
}

export const ImageUploader = async() => {
    const [image, setImage] = React.useState(null);
    console.log("HELLO");
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
        const response = await ImageService.UploadImage(image);
        console.log(response.data);
        return response.data;
        // setImage(result.assets[0].uri);
    }
}