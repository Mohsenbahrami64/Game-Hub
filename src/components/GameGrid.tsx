import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
  const { games, error, isLoding } = useGames();
  const skeletens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <React.Fragment>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={10}
      >
        {isLoding &&
          skeletens.map((skeleten) => <GameCardSkeleton key={skeleten} />)}
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default GameGrid;
