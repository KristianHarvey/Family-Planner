interface Color {
    background: {
        main: string;
        secondary: string;
        accent: string;
        tertiary: string;
    }
    text: {
        main: string;
        secondary: string;
    }
};
export const useColor = () => {
    const colors = {
        background: {
            main: '#212121',
            secondary: '#708090',
            tertiary: '#708090',
            contrast: '#8a2be2'
        },
        text: {
            main: '#ffffff',
            secondary: '#8a2be2',
        },
        textCard: {
            main: '#3b3b3b',
            secondary: '#555555',
        },
        button: {
            main: '#616161',
            secondary: '#757575'
        },
        navbar: {
            main: '#222',
            icons: '#ffffff'
        },
        accent: {
            main: '#92A8D1',
        },

        background_main: '#212121',
        widget_background: '#303030',
        navbar_background: '#212121',
        accent_dark: '#FF5252',
        accent_golden: '#FFD740',
        accent_cerulean: '#64B5F6',
        accent_spring: '#81C784',
        accent_amethyst: '9575CD',
        text_main: '#FFFFFF',
        text_secondary: '#E0E0E0',
        text_silver: '#9E9E9E',
        text_gray: '#757575',
        text_dark_grey: '#424242',
        additional_primary: '#FFB74D',
        additional_secondary: '#4DB6AC',
        additional_taupe: '#A1887F',
        additional_periwinkle: '#7986CB',
        additional_coral: '#FF8A80',
        additional_lime: '#AED581',
        additional_apricot: '#FFD180',
        additional_steel: '#90A4AE',
        additional_blush: '#FF80AB'
    }
    // main: '#116466',
    // secondary: '#D9B08C',
    return { colors };
}