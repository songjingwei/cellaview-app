import React, { useRef } from "react";
import { AlertDialog, Button } from "native-base";
import MyText from "@/components/MyText";

interface DeleteDialogProps {
  title: string;
  desc: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog = ({
  title,
  desc,
  isOpen,
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>
          <MyText fontSize={16}>{desc}</MyText>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
            >
              取消
            </Button>
            <Button colorScheme="danger" onPress={onConfirm}>
              确认
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteDialog;
