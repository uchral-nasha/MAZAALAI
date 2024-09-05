import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  CircularProgress,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Section } from '@/layout/Section';
import { PLAYERS, STATS } from '@/utils/const';

const Profile = () => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const player = PLAYERS.find((player) => player.id === router.query.id);
  if (!player) {
    return <div>Player not found</div>;
  }

  const stats = STATS.filter((stat) => stat.player_id === player.id).sort(
    (a, b) => a.relevant_season - b.relevant_season,
  );
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        position="relative"
        bgGradient="linear(to-r, blue.900, blue.800)"
        color="white"
        display="flex"
        alignItems="center"
        bgImage={'/assets/images/logo.jpg'}
      >
        <Flex flexDir="column" align="start" ml="8%" textAlign="left">
          <Text fontSize="2xl" fontWeight="bold">
            {player.first_name}
          </Text>
          <Text fontSize="7xl" fontWeight="bold" lineHeight="1">
            {player.last_name.toUpperCase()}
          </Text>
          <Text fontSize="9xl" fontWeight="bold" color="blue.300">
            {player.player_number}
          </Text>
        </Flex>
        <Box
          w="300px"
          position="absolute"
          right="10%"
          top="10"
          overflow="hidden"
          boxShadow="xl"
          borderRadius="lg"
          transition="background-color 0.3s ease"
          _hover={{ bg: 'blue.100', textColor: 'blue.600' }}
          bg="blue.600" // Light blue background on hover
        >
          <Image
            src={player.img_url}
            alt={`${player.first_name} ${player.last_name}`}
            w="full"
            objectFit="cover"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
          <Box p="6" transition="background-color 0.3s ease">
            <Text fontSize="xl" fontWeight="bold">
              {player.background_story}
            </Text>
          </Box>
        </Box>
      </Box>
      <Section>
        <Accordion allowToggle>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text
                    fontSize="7xl"
                    fontWeight="bold"
                    lineHeight="1"
                    textColor="blue.700"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    Замнал
                  </Text>
                  {isExpanded ? (
                    <MinusIcon fontSize="36px" textColor="blue.700" />
                  ) : (
                    <AddIcon fontSize="36px" textColor="blue.700" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Text>{player.background_story}</Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Text
                    fontSize="7xl"
                    fontWeight="bold"
                    lineHeight="1"
                    textColor="blue.700"
                    as="span"
                    flex="1"
                    textAlign="left"
                  >
                    Статистик
                  </Text>
                  {isExpanded ? (
                    <MinusIcon fontSize="36px" textColor="blue.700" />
                  ) : (
                    <AddIcon fontSize="36px" textColor="blue.700" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  {!stats || stats.length === 0 ? (
                    <Text>"Статистик одоохондоо гараагүй"</Text>
                  ) : (
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                      {stats.map((stat, index) => (
                        <Box
                          key={index}
                          bg="blue.50"
                          borderRadius="lg"
                          p={4}
                          textAlign="center"
                        >
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            mb={2}
                            color="blue.700"
                          >
                            {stat.relevant_season} оны улирал
                          </Text>
                          <Flex justifyContent="space-around" mb={4}>
                            <Tooltip label="Тоглосон тоглолт">
                              <Box position="relative">
                                <CircularProgress
                                  value={(stat.matches_played / 30) * 100}
                                  color="green.400"
                                  size="80px"
                                />
                                <Box
                                  position="absolute"
                                  top="50%"
                                  left="50%"
                                  transform="translate(-50%, -50%)"
                                >
                                  <Text fontSize="lg" fontWeight="bold">
                                    {stat.matches_played}
                                  </Text>
                                </Box>
                                <Text mt={2} fontSize="sm" color="gray.600">
                                  Тоглолт
                                </Text>
                              </Box>
                            </Tooltip>
                            <Tooltip label="Оролцсон минут">
                              <Box position="relative">
                                <CircularProgress
                                  value={(stat.minutes / 2700) * 100}
                                  color="blue.400"
                                  size="80px"
                                />
                                <Box
                                  position="absolute"
                                  top="50%"
                                  left="50%"
                                  transform="translate(-50%, -50%)"
                                >
                                  <Text fontSize="lg" fontWeight="bold">
                                    {stat.minutes}'
                                  </Text>
                                </Box>
                                <Text mt={2} fontSize="sm" color="gray.600">
                                  Минут
                                </Text>
                              </Box>
                            </Tooltip>
                          </Flex>
                          <Flex justifyContent="space-around">
                            <Box>
                              <Text
                                fontSize="3xl"
                                fontWeight="bold"
                                color="orange.500"
                              >
                                {stat.goals}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                Гоол
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize="3xl"
                                fontWeight="bold"
                                color="purple.500"
                              >
                                {stat.assists}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                Оновчтой дамжуулалт
                              </Text>
                            </Box>
                          </Flex>
                          <Flex justifyContent="space-around" mt={4}>
                            <Tooltip label="Шар кард">
                              <Box
                                bg="yellow.400"
                                borderRadius="md"
                                p={2}
                                width="30px"
                                height="40px"
                              />
                            </Tooltip>
                            <Text
                              fontSize="2xl"
                              fontWeight="bold"
                              color="gray.700"
                            >
                              {stat.yellow_card}
                            </Text>
                            <Tooltip label="Улаан кард">
                              <Box
                                bg="red.500"
                                borderRadius="md"
                                p={2}
                                width="30px"
                                height="40px"
                              />
                            </Tooltip>
                            <Text
                              fontSize="2xl"
                              fontWeight="bold"
                              color="gray.700"
                            >
                              {stat.red_card}
                            </Text>
                          </Flex>
                        </Box>
                      ))}
                      <Box mt={4}>
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          Гоол ба оновчтой дамжуулалт
                        </Text>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={stats}>
                            <XAxis dataKey="relevant_season" />
                            <YAxis />
                            <RechartsTooltip />
                            <Line
                              type="monotone"
                              dataKey="goals"
                              stroke="#ED8936"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="assists"
                              stroke="#9F7AEA"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>

                      <Box mt={4}>
                        <Text fontSize="lg" fontWeight="bold" mb={2}>
                          Тоглолт ба минут
                        </Text>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={stats}>
                            <XAxis dataKey="relevant_season" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <RechartsTooltip />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="matches_played"
                              stroke="#48BB78"
                              strokeWidth={2}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="minutes"
                              stroke="#4299E1"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </Grid>
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>

        <Divider />
      </Section>
    </>
  );
};

export default Profile;
