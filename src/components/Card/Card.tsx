import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {styles} from './Card.styles';
import {CardProps} from '../../types';
import {iconMap} from '../../consts';

function Card({card: {isFlipped, icon, id}, onCardPress}: CardProps) {
  const onPress = () => onCardPress({isFlipped, icon, id});

  return (
    <View style={styles.container}>
      <Pressable style={styles.iconContainer} onPress={onPress}>
        {isFlipped && <Image style={styles.icon} source={iconMap[icon]} />}
      </Pressable>
    </View>
  );
}

export default Card;
