import { Platform } from "react-native";

export class Padding {
    static Small = Platform.OS === "ios" ? 8 : 4;
    static Medium = Platform.OS === "ios" ? 16 : 8;;
    static Large = Platform.OS === "ios" ? 12 : 24;
    static XLarge = Platform.OS === "ios" ? 32 : 16;
};
export class FontSize {
    static Small = 16;
    static Medium = 20;
    static Large = 28;
    static XLarge = 36;
};

export class Font {
    static TitilliumWebRegular = 'TitilliumWeb-Regular'
    static TitilliumWebSemiBold = 'TitilliumWeb-SemiBold'
    static TitilliumWebBold = 'TitilliumWeb-Bold'
    static TitilliumWebBlack = 'TitilliumWeb-Black'
}