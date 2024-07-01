import {
  RadioGroup,
  HStack,
  VStack,
  Stack,
  Radio,
  Text,
  Image,
} from '@chakra-ui/react'

type Props = {
  defaultValue: string
  onChange: (value: string) => void
}

export const AppearanceRadioGroup = ({ defaultValue, onChange }: Props) => {

  const appearanceData = [
    {
      value: 'light',
      label: 'Modo Claro',
      image: '/images/light-mode.png',
    },
    {
      value: 'dark',
      label: 'Modo Escuro',
      image: '/images/dark-mode.png',
    },
    {
      value: 'system',
      label: 'Sistema',
      image: '/images/system-mode.png',
    },
  ]
  return (
    <RadioGroup onChange={onChange} defaultValue={defaultValue}>
      <HStack spacing={4} w="full" align="stretch">
        {appearanceData.map((option) => (
          <VStack
            key={option.value}
            as="label"
            htmlFor={option.label}
            cursor="pointer"
            borderWidth="1px"
            borderRadius="md"
            w="full"
            spacing={2}
            justifyContent="space-between"
            pb={6}
          >
            <VStack spacing={4}>
              <Image
                src={option.image}
                alt="Theme preview"
                style={{ borderRadius: '0.250rem' }}
              />
              <Stack>
                <Text fontWeight="bold">{option.label}</Text>
              </Stack>
            </VStack>

            <Radio value={option.value} id={option.label} isDisabled={option.value == 'light' ? false : true} />
          </VStack>
        ))}
      </HStack>
    </RadioGroup>
  )
}
