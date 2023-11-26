import { Alert, VStack, HStack, Text, IconButton, useToast, Box, NativeBaseProvider, Center } from "native-base";
import React from "react";

interface ToastAlertProps {
  status?: React.ComponentProps<typeof Alert>["status"];
  variant: React.ComponentProps<typeof Alert>["variant"];
  title: string;
}

const ToastAlert = ({
  status,
  variant,
  title,
}: ToastAlertProps) => {
  return (
    <Alert maxW="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={variant}>
      <Alert.Icon mr={2} />
      <Text fontSize="md" fontWeight="medium">
        {title}
      </Text>
    </Alert>
  );
}

export default ToastAlert;