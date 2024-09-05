import { Badge, Box, Flex, Image, Stack, Text } from '@chakra-ui/react';

import type { IPlayer } from '@/utils/types';

const Player = (props: IPlayer) => {
  return (
    <Box
      w="300px"
      rounded="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      transition="background-color 0.3s ease"
      _hover={{ bg: 'blue.100', cursor: 'pointer' }} // Light blue background on hover
    >
      <a href={`/profiles/${props.id}`}>
        <Image
          src={props.img_url}
          alt={`${props.first_name} ${props.last_name}`}
          w="full"
          h="300px"
          objectFit="cover"
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.05)' }} // Slight zoom on hover
        />
        <Box p="6" transition="background-color 0.3s ease">
          <Stack spacing="3">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">
                {props.first_name} {props.last_name}
              </Text>
              <Badge
                colorScheme="blue"
                fontSize="lg"
                p="2"
                rounded="full"
                textAlign="center"
              >
                #{props.player_number}
              </Badge>
            </Flex>
            <Text fontSize="sm" color="gray.600">
              Position: {props.position}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Age: {props.age}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Height: {props.height} | Weight: {props.weight}
            </Text>
            <Text fontSize="sm" color="gray.600">
              DOB: {props.date_of_birth}
            </Text>
          </Stack>
        </Box>
      </a>
    </Box>
  );
};

export { Player };
