import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { Background } from '@/background/Background';
import { Section } from '@/layout/Section';
import { Player } from '@/components/Player';
import { PLAYERS } from '@/utils/const';

const Teams: React.FC = () => {

  return (
    <>
      <Background color="bg-white">
        <Section>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Футзал</Tab>
              <Tab>Гадаа талбай</Tab>
              <Tab>Арын алба</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex direction="row" gap={5} wrap="wrap">
                  {PLAYERS
                    .filter((player) => player.team == '1')
                    .map((player) => (
                      <Player key={player.id} {...player} />
                    ))}
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex direction="row" gap={5} wrap="wrap">
                  {PLAYERS
                    .filter((player) => player.team == '2')
                    .map((player) => (
                      <Player key={player.id} {...player} />
                    ))}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Section>
      </Background>
    </>
  );
};

export default Teams;
