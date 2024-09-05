import React, { useMemo, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  Flex,
  Box,
  Badge,
  useColorModeValue,
  Button,
  HStack,
  Select
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import Router from 'next/router';

interface IPlayer {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  height: string;
  weight: string;
  img_url: string;
  player_number: string;
  position: string;
  age: string;
  team: string;
  is_current: boolean;
  background_story: string;
}

interface IPlayerStats {
  id: string;
  player_id: string;
  match_id: string;
  matches_played: number;
  goals: number;
  assists: number;
  red_card: number;
  yellow_card: number;
  yellow_red_card: number;
  minutes: number;
  relevant_season: number;
}

interface PlayerStatsTableProps {
  players: IPlayer[];
  stats: IPlayerStats[];
  year: number;
  teamType: string;
}

type SortField = 'name' | 'matches_played' | 'goals' | 'assists' | 'minutes' | 'yellow_card' | 'red_card';
type SortOrder = 'asc' | 'desc'

const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({ 
    players, stats, 
    // year, teamType
  }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  // const bgColor = useColorModeValue('white', 'gray.800');
  // const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Calculate pagination
  // const indexOfLastPlayer = currentPage * playersPerPage;
  // const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;

  // const filteredPlayers = useMemo(() => {
  //   return players.filter(player => 
  //     {   
  //         console.log(teamType)
  //         if(teamType === 'Гадаа талбай') {
  //         return player.team === '1'
  //       } else {
  //         return player.team === '2'
  //       }
  //     }
      
  //   );
  // }, [players, year, teamType]);
  // console.log(filteredPlayers)

  const sortedPlayers = useMemo(() => {
    return [...players].map(player => {
      // Attach stats to each player
      const playerStats = stats.find(stat => stat.player_id === player.id) || {
        matches_played: 0,
        goals: 0,
        assists: 0,
        minutes: 0,
        yellow_card: 0,
        red_card: 0,
      };
      return { ...player, ...playerStats };
    }).sort((a, b) => {
      if (sortField === 'name') {
        const fullNameA = `${a.first_name} ${a.last_name}`;
        const fullNameB = `${b.first_name} ${b.last_name}`;
        return sortOrder === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
      } else {
        return sortOrder === 'asc' 
          ? (a[sortField] - b[sortField])
          : (b[sortField] - a[sortField]);
      }
    });
  }, [players, stats, sortField, sortOrder]);

  const currentPlayers = sortedPlayers.slice(
    (currentPage - 1) * playersPerPage,
    currentPage * playersPerPage
  );

  const totalPages = Math.ceil(players.length / playersPerPage);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <TriangleUpIcon ml={1} /> : <TriangleDownIcon ml={1} />;
  };
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.7)', 'rgba(26, 32, 44, 0.7)');
  const headerBgColor = useColorModeValue('rgba(237, 242, 247, 0.8)', 'rgba(45, 55, 72, 0.8)');


  return (
    <Box  
      boxShadow="md" 
      borderRadius="lg" 
      // overflowX="auto" 
      css={{
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)', // for Safari
      }}
    >
    <Box >
      <Table 
        variant="simple" 
        bg={bgColor}
      >
        <Thead 
          // bg={useColorModeValue('gray.50', 'gray.700')}
          bg={headerBgColor}
        >
          <Tr>
              <Th>
                Тоглогч
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => handleSort('matches_played')}>
                Тоглолт<SortIcon field="matches_played" />
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => handleSort('goals')}>
                Гоол <SortIcon field="goals" />
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => handleSort('assists')}>
                Оновчтой дамжуулалт <SortIcon field="assists" />
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => handleSort('minutes')}>
                Минут <SortIcon field="minutes" />
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => handleSort('yellow_card')}>
                Шар кард <SortIcon field="yellow_card" />
              </Th>
              <Th isNumeric cursor="pointer" onClick={() => handleSort('red_card')}>
                Улаан кард <SortIcon field="red_card" />
              </Th>
            </Tr>
        </Thead>
        <Tbody>
          {currentPlayers.map((player) => {
            const playerStats = stats.find(stat => stat.player_id === player.id);
            return (

                <Tr 
                  transition="transform 0.3s ease"
                  _hover={{ 
                    bg: useColorModeValue('rgba(237, 242, 247, 0.5)', 'rgba(45, 55, 72, 0.5)'), 
                    transform: 'scale(1.02)',
                    cursor: 'pointer'
                  }}
                  onClick={() => Router.push(`/profiles/${player.id}`)}
                  key={player.id}
                > 
                  <Td>
                    <Flex align="center">
                      <Image
                        src={player.img_url}
                        alt={`${player.first_name} ${player.last_name}`}
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius="full"
                        mr={3}
                      />
                      <Box>
                        <Text fontWeight="bold">{`${player.first_name} ${player.last_name}`}</Text>
                        <Flex align="center" mt={1}>
                          <Badge colorScheme="blue" mr={2}>{player.position}</Badge>
                          <Text fontSize="sm" color="gray.500">#{player.player_number}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Td>
                  <Td isNumeric>{playerStats?.matches_played || 0}</Td>
                  <Td isNumeric><Text color="green.500" fontWeight="bold">{playerStats?.goals || 0}</Text></Td>
                  <Td isNumeric><Text color="blue.500" fontWeight="bold">{playerStats?.assists || 0}</Text></Td>
                  <Td isNumeric>{playerStats?.minutes || 0}</Td>
                  <Td isNumeric><Badge colorScheme="yellow">{playerStats?.yellow_card || 0}</Badge></Td>
                  <Td isNumeric><Badge colorScheme="red">{playerStats?.red_card || 0}</Badge></Td>
                
                </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
    
    <Flex justifyContent='center' mt={4} alignItems="center" borderRadius={5} paddingBottom={2}>
      <HStack spacing={2}>
        <Button
          size="sm"
          onClick={() => paginate(currentPage - 1)}
          isDisabled={currentPage === 1}
          leftIcon={<ChevronLeftIcon />}
        >
          Өмнөх
        </Button>
        <Flex>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Button
              key={number}
              size="sm"
              onClick={() => paginate(number)}
              colorScheme={currentPage === number ? "blue" : "gray"}
              variant={currentPage === number ? "solid" : "ghost"}
              mx={1}
            >
              {number}
            </Button>
          ))}
        </Flex>
        <Button
          size="sm"
          onClick={() => paginate(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          rightIcon={<ChevronRightIcon />}
          bgColor="blue.200"
        >
          Дараах
        </Button>
        <Select 
          size="sm"
          width="70px"
          value={playersPerPage} 
          onChange={(e) => {
            setPlayersPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          textColor="black"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
      </HStack>
    </Flex>
  </Box>
  );
};

export default PlayerStatsTable;