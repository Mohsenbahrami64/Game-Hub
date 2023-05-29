import React from "react";
import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";

const GameGrid = () => {
  const { data, error, isLoding } = useGames();
  const skeletens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <React.Fragment>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {isLoding &&
          skeletens.map((skeleten) => (
            <GameCardContainer>
              <GameCardSkeleton key={skeleten} />
            </GameCardContainer>
          ))}

        {data.map((game) => (
          <GameCardContainer>
            <GameCard key={game.id} game={game} />{" "}
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default GameGrid;
