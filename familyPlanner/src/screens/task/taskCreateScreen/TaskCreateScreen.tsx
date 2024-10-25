import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useColor } from "../../../hooks/useColor";
import { TopBar } from "../../../components/common/topBar/TopBar";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { PlannedTask } from "../../../models/plannedTask";
import { TextInputField } from "../../../components/atoms/textInputField/TextInputField";
import { WidgetBase } from "../../../components/widget/widgetBase/WidgetBase";
import { Font, FontSize, Padding } from "../../../constants/UIConstants";

interface ParamProps {
  cameFrom?: string;
}

export const TaskCreateScreen = () => {
  const { colors } = useColor();
  const [createdTask, setCreatedTask] = React.useState<PlannedTask | undefined>();
  const [name, setName] = React.useState("");
  const [body, setBody] = React.useState("");
  const route = useRoute();
  const { cameFrom } = route.params as ParamProps;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background_main,
      }}
    >
      <TopBar
        cameFromScreen={cameFrom}
        leftIcon="arrow-back"
        middleText="Lag ny oppgave"
        rightText="lagre"
        rightTextColor={colors.additional_periwinkle}
      />
      <ScrollView
        style={{
          flex: 1,
          marginRight: Padding.Large,
          marginLeft: Padding.Large,
        }}
      >
        <Text
          style={{
            color: colors.text_main,
            fontFamily: Font.TitilliumWebRegular,
            fontSize: FontSize.Medium,
            marginBottom: Padding.Small,
          }}
        >
          Navn
        </Text>
        <TextInputField
          value={name}
          onChangeText={setName}
          placeholder="Gi oppgaven ett navn"
          placeholderTextColor={colors.text_silver}
          clearButton
          style={{
            color: colors.text_main,
            backgroundColor: colors.widget_background,
            borderRadius: 5,
            paddingHorizontal: Padding.Medium,
            paddingVertical: Padding.Medium,
          }}
        />
        <View style={{ marginTop: Padding.XLarge }} />
        <Text
          style={{
            color: colors.text_main,
            fontFamily: Font.TitilliumWebRegular,
            fontSize: FontSize.Medium,
            marginBottom: Padding.Small,
          }}
        >
          Beskrivelse
        </Text>
        <TextInputField
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={10}
          placeholder="Gi oppgaven en beskrivelse"
          placeholderTextColor={colors.text_silver}
          textAlignVertical="top"
          style={{
            color: colors.text_main,
            backgroundColor: colors.widget_background,
            borderRadius: 5,
            paddingHorizontal: Padding.Medium,
            paddingVertical: Padding.Medium,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
