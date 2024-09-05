import type { ReactNode } from 'react';

export type IPlayer = {
  children?: ReactNode;
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
};

export type IPlayerStats = {
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
};

export type IMatch = {
  id: string;
  created_at: string;
  home_id: string;
  away_id: string;
  season: string;
  match_type: string;
  home_goals: string;
  away_goals: string;
  start_date: string;
  location: string;

};

export type ITeam = {
  id: string;
  team_type: string;
  team_logo_url: string;
  team_name: string;
}

export type IMonth  = {
  label: string;
  value: string;
}