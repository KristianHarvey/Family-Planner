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
            contrast: '#2D2D44'
        },
        text: {
            main: '#ffffff',
            secondary: '#2D2D44',
        },
        textCard: {
            main: '#A9A9A9',
            secondary: '#CCCCCC',
        }
    }
    // main: '#116466',
    // secondary: '#D9B08C',
    return { colors };
}