/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#d2d2d2';
const tintColorDark = '#fff';

export const Colors = {
    light: {
        text: '#000000',
        header: '#607e46',
        background: '#ffffff',
        tint: tintColorLight,
        icon: '#607e46',
        favorite: '#fd8182',
        notFavorite: '#d2d2d2',
        tabIconDefault: '#607e46',
        tag: '#cbd38f',
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
    },
};
