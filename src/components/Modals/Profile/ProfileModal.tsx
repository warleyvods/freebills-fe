import { Button, Flex, Modal, ModalContent, ModalOverlay, Stack, Text, useDisclosure, } from '@chakra-ui/react'
import React, { useState } from "react";
import { MyAccountForm } from "./MyAccountForm";
import { UserPreference } from "./UserPreference";
import { WorkspaceConfig } from "./WorkspaceConfig";




interface ModalTypes {
  trigger: (onOpen?: () => void, onClose?: () => void) => React.ReactNode;
}

type SettingsTab =
  | 'my-account'
  | 'user-settings'
  | 'configs'
  | 'members'
  | 'billing'


export function ProfileModal({trigger}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedTab, setSelectedTab] = useState<SettingsTab>('my-account')

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal onClose={onClose} isOpen={isOpen} size={"3xl"}>
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent minH="600px" flexDir="row">
          <Stack
            spacing={8}
            w="250px"
            py="6"
            borderRightWidth={1}
            justifyContent="space-between"
          >
            <Stack p={"22px"}>
              <Stack>
                <Text pl="4" fontSize={"20px"} fontWeight={"bold"}>
                  Perfil
                </Text>
                <Button
                  h={"48px"}
                  variant={selectedTab === 'my-account' ? 'solid' : 'ghost'}
                  onClick={() => setSelectedTab('my-account')}
                  // leftIcon={<IconComponent name={"people"} width={"24px"} height={"24px"} />}
                  size="sm"
                  justifyContent="flex-start"
                  pl="16px"
                >
                  Minha conta
                </Button>
                <Button
                  h={"48px"}
                  variant={selectedTab === 'user-settings' ? 'solid' : 'ghost'}
                  onClick={() => setSelectedTab('user-settings')}
                  // leftIcon={<IconComponent name={"settings"} width={"24px"} height={"24px"} />}
                  size="sm"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Aparência
                </Button>
              </Stack>
              <Stack mt={"15px"}>
                <Button
                  h={"48px"}
                  variant={selectedTab === 'configs' ? 'solid' : 'ghost'}
                  onClick={() => setSelectedTab('configs')}
                  // leftIcon={<IconComponent name={"hardDisk"} width={"24px"} height={"24px"} />}
                  size="sm"
                  justifyContent="flex-start"
                  pl="16px"
                >
                  Configurações
                </Button>
                <Button
                  h={"48px"}
                  variant={selectedTab === 'billing' ? 'solid' : 'ghost'}
                  onClick={() => setSelectedTab('billing')}
                  // leftIcon={<IconComponent name={"card"} width={"24px"} height={"24px"} />}
                  size="sm"
                  justifyContent="flex-start"
                  pl="4"
                >
                  Cobrança
                </Button>
              </Stack>
            </Stack>
            <Flex justify="center" pt="10">
              <Text color="gray.500" fontSize="xs">
                Versão 0.0.1
              </Text>
            </Flex>
          </Stack>

          {isOpen && (
            <Flex flex="1" p="10">
              <SettingsContent tab={selectedTab} onClose={onClose} />
            </Flex>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

const SettingsContent = ({tab, onClose}: { tab: SettingsTab, onClose: () => void }) => {
  switch (tab) {
    case 'my-account':
      return <MyAccountForm onClose={onClose} />
    default:
      return null
  }
}
