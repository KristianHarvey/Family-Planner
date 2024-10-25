import React from "react"
import { PlannedTask } from "../../../models/plannedTask"
import { useAuth } from "../../../hooks/useAuth";
import { UserService } from "../../../api/services/userService";
import { PlannedTaskService } from "../../../api/services/plannedTaskService";
import { FlatList, Text, View } from "react-native";
import { WidgetBase } from "../../widget/widgetBase/WidgetBase";
import { useColor } from "../../../hooks/useColor";
import { Font, FontSize } from "../../../constants/UIConstants";


export const TaskList = () => {
    const auth = useAuth();
    const { colors } = useColor();
    const [plannedTasks, setPlannedTasks] = React.useState<PlannedTask[]>([]);
    const [limit, setLimit] = React.useState(20);
    const [page, setPage] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMoreItems, setHasMoreItems] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const getPlannedTasks = async() => {
        setIsLoading(true);
        const response = await PlannedTaskService.getPlannedTasksForCurrentUser(limit, page);
        if(response) {
            const newTasks = response.data;
            const updatedTasks = newTasks.filter(newItem => !plannedTasks.some(oldItem => oldItem.id === newItem.id));
            setPlannedTasks([...plannedTasks, ...updatedTasks]);
            if(updatedTasks.length < limit) {
                setHasMoreItems(false);
            } else {
                setPage(page + 1);
            }
        }
        setIsLoading(false);
    }

    const fetchData = React.useCallback(async () => {
        await getPlannedTasks();
    }, [page]);

    React.useEffect(() => {
        fetchData();
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
        await getPlannedTasks();
        
    }, [getPlannedTasks])

    const handleEndReached = () => {
        if(!isLoading && hasMoreItems) {
            fetchData();
        }
    }

    return (
        <View>
            <FlatList
            data={plannedTasks}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}/>

        </View>
    )
}