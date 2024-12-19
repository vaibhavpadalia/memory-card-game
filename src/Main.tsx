import React, {useState} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import Card from './components/Card/Card';
import {styles} from './Main.styles';
import type {CardDetails} from './types';
import {hasMatchingCards, reassignValuesToCards} from './utils';

function Main() {
  const [cards, setCards] = useState<CardDetails[]>(reassignValuesToCards());
  const [selectedCards, setSelectedCards] = useState<CardDetails[]>([]);
  const [flippedCards, setFlippedCards] = useState(0);

  const resetButton = () => {
    setCards(reassignValuesToCards());
    setFlippedCards(0);
    setSelectedCards([]);
  };

  const isSameCardFlipped = (card: CardDetails) =>
    selectedCards?.length !== 0 && selectedCards[0].id === card.id;

  const onCardPress = (card: CardDetails) => {
    let cardList = [] as CardDetails[];
    if (isSameCardFlipped(card)) return;
    cardList = cards.map(item => ({
      ...item,
      isFlipped: card.id === item.id ? !item.isFlipped : item.isFlipped,
    }));
    let newSelectedCards = [...selectedCards, card];
    setSelectedCards(newSelectedCards);
    setCards(cardList);
    if (newSelectedCards.length === 2) {
      if (hasMatchingCards(newSelectedCards)) {
        setFlippedCards(flippedCards + 1);
        setSelectedCards([]);
        if (flippedCards + 1 === 6) Alert.alert('Success', 'Game Completed');
      } else {
        setTimeout(() => {
          cardList = cards.map(item => ({
            ...item,
            isFlipped:
              newSelectedCards[0].id === item.id ||
              newSelectedCards[1].id === item.id
                ? false
                : item.isFlipped,
          }));
          setCards(cardList);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {cards.map(item => (
          <Card onCardPress={onCardPress} key={item.id} card={item} />
        ))}
      </View>
      <Pressable style={styles.buttonContainer} onPress={resetButton}>
        <Text style={styles.buttonText}>{'Reset'}</Text>
      </Pressable>
    </View>
  );
}

export default Main;
