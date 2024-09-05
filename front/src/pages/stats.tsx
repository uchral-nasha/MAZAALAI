import { Section } from "@/layout/Section"
import { PLAYERS, STATS } from "@/utils/const"
import { Box } from "@chakra-ui/react"
import { useState } from "react"
import { YearPicker } from "@/button/YearPicker"
import CustomTable from '@/components/CustomTable'

const Stats = () => {
  const [filteredYear, setFilteredYear] = useState<number>(
    new Date().getFullYear(),
  );

  const  [teamType, setTeamType] = useState<string>("1")

  const handleYearChange = (year: number) => {
    setFilteredYear(year);
  };

  const handleTeamType = (type: string) => {
    setTeamType(type)
  }
 

  return <>
    <Box
      bgGradient="linear(to-r, blue.900, blue.800)"
      bgImage={'/assets/images/logo.jpg'}
    >
      <Section>
          <Box mb={8} alignItems="right">
            <YearPicker startYear={1998} onYearChange={handleYearChange} onTeamTypeChange={handleTeamType}/>
          </Box>
        <CustomTable players={PLAYERS} stats={STATS} year={filteredYear} teamType={teamType}/>
      </Section>
    </Box>
  </>
}

export default Stats