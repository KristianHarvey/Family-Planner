import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootStackParamList";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

type NavigationType = keyof RootStackParamList;

type NavigationRouteProps<T extends NavigationType> = {
    navigation: NativeStackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
}

const useFamilyPlannerNavigationRoute = <T extends NavigationType>(): NavigationRouteProps<T> => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, T>>();
    const route = useRoute<RouteProp<RootStackParamList, T>>();

    return { navigation, route };
}

export default useFamilyPlannerNavigationRoute;