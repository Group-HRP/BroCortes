import { useEffect, useState } from "react";
import * as Font from 'expo-font';

export default function useLoadFonts(){
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts(){
            await Font.loadAsync ({
                'Satoshi-Bold': require('../../assets/fonts/Satoshi-Bold.otf'),
                'OpenSans-ExtraBold': require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
                'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
                'OpenSans-SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
                'OpenSans-Medium': require('../../assets/fonts/OpenSans-Medium.ttf'),
                'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
                'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
                
            });
            setFontsLoaded(true);
        }
        loadFonts();
    },[]);

    return useLoadFonts;
}