import MyText from "@/components/MyText";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  ScrollView,
  VStack,
  FormControl,
  Input,
  HStack,
  Button,
  Box,
  Checkbox,
} from "native-base";

interface RouteParamsType {
  currentTemplateStr: string;
}

const experimentInfo = () => {
  const route = useRoute();
  const router = useRouter();
  const { currentTemplateStr } = route.params as RouteParamsType;
  const currentTemplate = JSON.parse(currentTemplateStr);
  console.log("currentTemplate: ", currentTemplate);
  // 返回模板首页
  const backToIndex = () => {
    router.replace("./");
  };

  return (
    <ScrollView p="4" bg="gray.200" flex="1">
      <VStack alignItems="center" space="4" borderRadius="6" pb="6">
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">模板名称：</MyText>
            </FormControl.Label>
            <MyText fontSize="lg">{currentTemplate.templateName}</MyText>
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">细胞类型：</MyText>
            </FormControl.Label>
            <MyText fontSize="lg">{currentTemplate.conf.celltype}</MyText>
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">通道配置：</MyText>
            </FormControl.Label>
            <MyText fontSize="lg">
              {currentTemplate.conf.light.join("、")}
            </MyText>
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">耗材配置：</MyText>
            </FormControl.Label>
            <MyText fontSize="lg">
              {`${currentTemplate.conf.holesInfo.product} / ${currentTemplate.conf.holesInfo.type} / ${currentTemplate.conf.holesInfo.sn}`}
            </MyText>
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">扫描模式：</MyText>
            </FormControl.Label>
            <MyText fontSize="lg">{currentTemplate.conf.scanType}</MyText>
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">算法调用：</MyText>
            </FormControl.Label>
            <MyText fontSize="lg">{currentTemplate.conf.countType}</MyText>
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">实验名称：</MyText>
            </FormControl.Label>
            <Input w="65%" fontSize="lg" />
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack alignItems="center" space="4">
            <FormControl.Label>
              <MyText fontSize="lg">实验备注：</MyText>
            </FormControl.Label>
            <Input w="65%" fontSize="lg" />
          </HStack>
        </FormControl>
        <HStack w="100%">
          <Checkbox value="">
            <MyText fontSize="lg" top="-1">
              启动定时拍摄
            </MyText>
          </Checkbox>
        </HStack>
        <HStack>
          <FormControl isRequired>
            <HStack alignItems="center" space="4">
              <FormControl.Label>
                <MyText fontSize="lg">拍摄间隔：</MyText>
              </FormControl.Label>
              <HStack alignItems="center" space="2">
                <Input w="60" fontSize="lg" keyboardType="phone-pad" />
                <MyText fontSize="lg">时</MyText>
                <Input w="60" fontSize="lg" />
                <MyText fontSize="lg">分</MyText>
              </HStack>
            </HStack>
          </FormControl>
        </HStack>
        <HStack>
          <FormControl isRequired>
            <HStack alignItems="center" space="4">
              <FormControl.Label>
                <MyText fontSize="lg">拍摄时长：</MyText>
              </FormControl.Label>
              <ScrollView horizontal>
                <HStack alignItems="center" space="2">
                  <Input w="60" fontSize="lg" keyboardType="phone-pad" />
                  <MyText fontSize="lg">天</MyText>
                  <Input w="60" fontSize="lg" keyboardType="phone-pad" />
                  <MyText fontSize="lg">时</MyText>
                  <Input w="60" fontSize="lg" />
                  <MyText fontSize="lg">分</MyText>
                </HStack>
              </ScrollView>
            </HStack>
          </FormControl>
        </HStack>
        <HStack justifyContent="space-between" w="100%">
          <Button w={150} colorScheme="warmGray" onPress={backToIndex}>
            返回
          </Button>
          <Button w={150}>确认</Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default experimentInfo;
