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
        }
    }
    // main: '#116466',
    // secondary: '#D9B08C',
    return { colors };
}