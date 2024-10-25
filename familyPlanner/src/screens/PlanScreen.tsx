import React, { useEffect } from 'react';
import { PlannedDayService } from '../api/services/plannedDayService';
import { PlannedDay } from '../models/plannedDay';
import { Text, View } from 'react-native';
import { useColor } from '../hooks/useColor';
import { useRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigate } from '../hooks/useNavigation';
import { TopBar } from '../components/common/topBar/TopBar';
import { PlannedDayService2 } from '../api/services/plannedDayService2';

export interface PlanScreenProps {
    planId: number;   
}

export const PlanScreen: React.FC = () => {
    const route = useRoute();
    const { planId } = route.params as PlanScreenProps;
    
    const [plan, setPlan] = React.useState<PlannedDay | undefined>();
    const { colors } = useColor();
    const navigate = useNavigate();
    const fetchClickedPlan = async() => {
        const plannedDay = await PlannedDayService2.getPlannedDayById(planId);
        setPlan(plannedDay!);
    }

    const navigateBack = () => {
        navigate.goBack();
    }
    const handleDeletePlan = async() => {
        const response = await PlannedDayService2.deletePlannedDay(planId);
        if(response) {
            console.log(`Successfully deleted plan: ${planId}`);
            navigate.navigate("Create");
        }
    }
    useEffect(() => {
        fetchClickedPlan();
    }, [planId]);
    return (
        <View style={{flex: 1, backgroundColor: colors.background.main}}>
            <TopBar cameFromScreen='Create'/>
            <Ionicons name='close' size={30} color={colors.text.main} onPress={handleDeletePlan}/>
        </View>
    )
}