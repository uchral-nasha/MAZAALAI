import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, IconButton, VStack, HStack, Image, useColorModeValue } from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import { MATCHES, TEAMS, MONTHS } from '@/utils/const'
import { IMatch, ITeam } from '@/utils/types';
import { Section } from '@/layout/Section';


const getCurrentMonth = () => {
  return format(new Date(), 'yyyy-MM');
};

const getMatchesForMonth = (month: string): IMatch[] => {
  return MATCHES.filter(match =>
    match.start_date.startsWith(month)
  ).sort((a, b) =>
    new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
  );
};

const getTeamById = (id: string): ITeam | undefined => {
  return TEAMS.find(team => team.id === id);
};



const MatchList: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
  const [currentIndex, setCurrentIndex] = useState<number>(MONTHS.findIndex(m => m.value === selectedMonth));
  console.log(MONTHS[currentIndex])

  useEffect(() => {
    setSelectedMonth(MONTHS[currentIndex].value);
  }, [currentIndex]);

  const matches = getMatchesForMonth(selectedMonth);

  const handlePrevMonth = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : MONTHS.length - 1));
  };

  const handleNextMonth = () => {
    setCurrentIndex(prev => (prev < MONTHS.length - 1 ? prev + 1 : 0));
  };

  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(10, 24, 32, 0.7)');

  
  return (
    <Box 
      p="4"  
      color="white" 
      minH="100vh"
      bgGradient="linear(to-r, blue.900, blue.800)"
      bgImage={'/assets/images/logo.jpg'}
    >
      <Section>

      
        <Flex 
          justifyContent="center" 
          alignItems="center" 
          mb="6"
        >
          <IconButton
            aria-label="Previous Month"
            icon={<ArrowLeftIcon />}
            onClick={handlePrevMonth}
            colorScheme="blue.500"
            mr="4"
          />
          <Text fontSize="lg">{MONTHS[currentIndex].label}</Text>
          <IconButton
            aria-label="Next Month"
            icon={<ArrowRightIcon />}
            onClick={handleNextMonth}
            colorScheme="blue.500"
            ml="4"
          />
        </Flex>
        <VStack 
          spacing="4" 
        >
          {matches.map((match) => {
            const homeTeam = getTeamById(match.home_id);
            const awayTeam = getTeamById(match.away_id);

            if (!homeTeam || !awayTeam) return null;

            return (
              <Box
                key={match.id}
                w="100%"
                p="4"
                borderRadius="md"
                bg={bgColor}
                boxShadow="md"
                color="black"
                transition="transform 0.3s ease"
                  _hover={{ 
                    bg: useColorModeValue('rgba(237, 242, 247, 0.5)', 'rgba(45, 55, 72, 0.5)'), 
                    transform: 'scale(1.02)',
                    cursor: 'pointer'
                  }}
              >
                <HStack justifyContent="space-between">
                  <Image src={homeTeam.team_logo_url} alt={homeTeam.team_name} boxSize="50px" />
                  <Text fontSize="lg">
                    {homeTeam.team_name} {match.home_goals} - {match.away_goals} {awayTeam.team_name}
                  </Text>
                  <Image src={awayTeam.team_logo_url} alt={awayTeam.team_name} boxSize="50px" />
                </HStack>
                <Text mt="2" fontSize="sm">{match.start_date} - {match.location}</Text>
              </Box>
            );
          })}
        </VStack>
      </Section>
    </Box>
  );
};

export default MatchList;
