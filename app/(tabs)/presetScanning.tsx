import { Box, FlatList, Image, HStack, VStack, ScrollView } from "native-base";
import { useGetTemplates } from "@/hooks/tabs";
import MyText from "@/components/MyText";
import ChannelColorEnum from "@/constants/ChannelColorEnum";

export default function TabOneScreen() {
  const templateCover = require("@/assets/images/experiment_cover.png");
  const { templates, refreshing, fetchExpTemplates } = useGetTemplates();

  return (
    <FlatList
      flex="1"
      data={templates}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => {
        return (
          <Box
            borderColor="muted.800"
            borderBottomWidth="1"
            py="3"
            px={["6", "12"]}
          >
            <HStack>
              <Image source={templateCover} size="xl" alt="实验封面" mr="4" />
              <VStack justifyContent="space-between">
                <MyText fontSize="22" bold>
                  {item.templateName}
                </MyText>
                <HStack space={4}>
                  {item.conf.light.map((l) => {
                    return (
                      <MyText fontSize={18} color={ChannelColorEnum[l]}>
                        {l}
                      </MyText>
                    );
                  })}
                </HStack>
                <HStack space={4} alignItems="center">
                  <MyText fontSize={18} color="primary.500">
                    {item.conf.boardType}
                  </MyText>
                  <MyText fontSize={16}>{item.conf.countType}</MyText>
                  <MyText fontSize={16}>{item.conf.celltype}</MyText>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        );
      }}
      refreshing={refreshing}
      onRefresh={fetchExpTemplates}
    />
  );
}
