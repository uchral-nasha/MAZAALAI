import { Box, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface YearPickerProps {
  startYear: number;
  endYear?: number;
  onYearChange: (year: number) => void;
  onTeamTypeChange: (teamType: string) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
  startYear,
  endYear,
  onYearChange,
  onTeamTypeChange
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const[selectedTeamType, setSelectedTeamType] = useState("Футзал")
  
  const handleTeam = (teamType: string) => {
    setSelectedTeamType(teamType)
    onTeamTypeChange(teamType)
  }


  const handleChange = (year: number) => {
    setSelectedYear(year);
    onYearChange(year);
  };

  const generateYears = (start: number, end: number) => {
    const years = [];
    for (let i = end; start <= i; i--) {
      years.push(i);
    }
    return years;
  };
  const teamTypes = ['Футзал', 'Гадаа талбай']
  const years = generateYears(startYear, endYear || currentYear);

  return (
    <Box width="fit-content" justifyContent="space-between">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="white"
          color="blue.900"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ bg: 'blue.100' }}
          _expanded={{ bg: 'blue.900', color: 'white' }}
          _focus={{ boxShadow: 'outline' }}
        >{selectedTeamType}
        </MenuButton>
        <MenuList bg="blue.900" color="white" borderRadius="md">
          {teamTypes.map((teamType) => (
            <MenuItem
              key={teamType}
              onClick={() => handleTeam(teamType)}
              bg="blue.900"
              _hover={{ bg: 'blue.700' }}
            >
              {teamType}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      |
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          bg="white"
          color="blue.900"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ bg: 'blue.100' }}
          _expanded={{ bg: 'blue.900', color: 'white' }}
          _focus={{ boxShadow: 'outline' }}
        >
          {selectedYear}
        </MenuButton>
        <MenuList bg="blue.900" color="white" borderRadius="md">
          {years.map((year) => (
            <MenuItem
              key={year}
              onClick={() => handleChange(year)}
              bg="blue.900"
              _hover={{ bg: 'blue.700' }}
            >
              {year}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export { YearPicker };
