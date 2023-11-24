import {
  Icon,
  IconButton,
  Modal,
  Input,
  Text,
  HStack,
  IInputProps,
  Box,
  Button,
  useToast,
  Alert,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
export default function ConnectIp() {
  const _input: Partial<IInputProps> = {
    fontSize: 32,
    keyboardType: "numeric",
    maxLength: 3,
  };
  const [showModal, setShowModal] = useState(false);
  const handlePress = () => {
    console.log("打开 ip 填写窗口");
    setShowModal(true);
  };

  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const connectIp = () => {
    setLoading(true);
    console.log("ip1: ", ip1, typeof ip1);
    if (
      ip1.length === 0 ||
      ip2.length === 0 ||
      ip3.length === 0 ||
      ip4.length === 0
    ) {
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Box bg="error.600" rounded="sm" px="4" py="2">
              <HStack alignItems="center" space={2}>
                <Alert.Icon size={18} />
                <Text fontSize={20}>IP 格式错误</Text>
              </HStack>
            </Box>
          );
        },
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        icon={<Icon as={<MaterialIcons />} />}
        borderRadius="full"
        _icon={{
          name: "connected-tv",
          color: "dark.50",
          size: "lg",
        }}
        _hover={{
          bg: "dark.50:alpha.20",
        }}
        _pressed={{
          bg: "dark.50:alpha.20",
        }}
        onPress={handlePress}
      />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content w="98%">
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontSize="xl">连接仪器 IP</Text>
          </Modal.Header>
          <Modal.Body>
            <HStack justifyContent="center">
              <Input
                w="22%"
                _input={_input}
                value={ip1}
                onChangeText={(val) => setIp1(val)}
              />
              <Text fontSize={36} position="relative" top="2">
                .
              </Text>
              <Input
                w="22%"
                _input={_input}
                value={ip2}
                onChangeText={(val) => setIp2(val)}
              />
              <Text fontSize={36} position="relative" top="2">
                .
              </Text>
              <Input
                w="22%"
                _input={_input}
                value={ip3}
                onChangeText={(val) => setIp3(val)}
              />
              <Text fontSize={36} position="relative" top="2">
                .
              </Text>
              <Input
                w="22%"
                _input={_input}
                value={ip4}
                onChangeText={(val) => setIp4(val)}
              />
            </HStack>
            <Box mt="4">
              <Button
                w="30%"
                alignSelf="flex-end"
                onPress={connectIp}
                isLoading={loading}
              >
                确认
              </Button>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
