import React from "react";
import { Activity } from "../../../models/activity";
import { ActivityService } from "../../../api/services/activityService";
import { useColor } from "../../../hooks/useColor";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { WidgetBase } from "../../widget/widgetBase/WidgetBase";
import { Font, FontSize } from "../../../constants/UIConstants";

export const ActivityList = () => {
    const { colors } = useColor();
    const [activities, setActivities] = React.useState<Activity[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [limit, setLimit] = React.useState(20);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMoreItems, setHasMoreItems] = React.useState(true);

    const getActivityData = async() => {
        setIsLoading(true);
        const response = await ActivityService.getAllForCurrentUser();
        if(response) {
            const newActivities = response.data;
            const updatedActivities = newActivities.filter(newItem => !activities.some(oldItem => oldItem.id === newItem.id));
            setActivities([...activities, ...updatedActivities]);
            if(updatedActivities.length < limit) {
                setHasMoreItems(false);
            } else {
                setPage(page + 1);
            }
        }
        setIsLoading(false);
    }

    const getData = React.useCallback(async () => {
        await getActivityData();
    }, [activities]);

    React.useEffect(() => {
        getData();
    }, []);

    
    const renderItem = ({item}) => {
        return (
            <WidgetBase
            sideMargins>
                <Text
                style={{
                    color: colors.text_main,
                    fontFamily: Font.TitilliumWebRegular,
                    fontSize: FontSize.Medium
                }}>
                    {item.name}
                </Text>
            </WidgetBase>
        )
    }

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await getActivityData();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [getActivityData]);

    const handleReachedEnd = () => {
        if(!isLoading && hasMoreItems) {
            getActivityData();
        }
    };

    return (
        <View>
            <FlatList
            contentContainerStyle={{flexGrow: 1, backgroundColor: colors.background.main}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            data={activities}
            renderItem={renderItem}
            onEndReached={handleReachedEnd}
            onEndReachedThreshold={0.1}/>
        </View>
    )
}