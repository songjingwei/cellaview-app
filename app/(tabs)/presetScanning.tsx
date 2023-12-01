import { Box, FlatList, Image, HStack, VStack, Pressable } from "native-base";
import { useGetTemplates } from "@/hooks/tabs";
import MyText from "@/components/MyText";
import ChannelColorEnum from "@/constants/ChannelColorEnum";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { DeleteDialog } from "@/components/presetScanning";
import expTemplateManager from "@/apis/expTemplate";
import myToast from "@/components/Toast";

export default function TabOneScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { templates, refreshing, fetchExpTemplates } = useGetTemplates();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    setSelectedIndex(null);
  };
  const onConfirm = async () => {
    try {
      const res = await expTemplateManager.deleteExpTemplateById({
        id: templates[selectedIndex as number].id,
      });
      if (res.errCode !== 0) {
        myToast.error(res.errMsg);
      } else {
        myToast.success("删除成功");
        fetchExpTemplates();
      }
    } catch (err) {
      myToast.error(err as string);
    } finally {
      onClose();
    }
  };

  // 点击以该模板进行实验
  const handlePress = (index: number | null) => {
    // TODO
    setSelectedIndex(index);
  };

  // 长按弹出删除 dialog
  const handleLongPress = (index: number | null) => {
    setSelectedIndex(index);
    setIsOpen(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const templateCover = require("@/assets/images/experiment_cover.png");

  return (
    <>
      <FlatList
        flex="1"
        data={templates}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              borderColor="muted.800"
              borderBottomWidth="1"
              py="3"
              px={["6", "12"]}
              onLongPress={() => handleLongPress(index)}
              onPress={() => handlePress(index)}
              bg={selectedIndex === index ? "warmGray.300" : "white"}
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
            </Pressable>
          );
        }}
        refreshing={refreshing}
        onRefresh={fetchExpTemplates}
      />
      {selectedIndex !== null && (
        <DeleteDialog
          title="删除模板"
          desc={`您确认要删除模板 ${templates[selectedIndex].templateName} 吗？`}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
}
