import {CardDetails} from './types';

const shuffleCards = () => {
  let array = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  array.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return array;
};

export const reassignValuesToCards = () => {
  let shuffledValues = shuffleCards();
  return shuffledValues.map((item, index) => ({
    id: index,
    icon: `img-${item}`,
    isFlipped: false,
  }));
};

export const hasMatchingCards = (selectedCards: CardDetails[]) =>
  selectedCards[0].icon === selectedCards[1].icon;
