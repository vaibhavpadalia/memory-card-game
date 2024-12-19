export type CardDetails = {id: number; icon: string; isFlipped: boolean};

export type CardProps = {
  card: CardDetails;
  onCardPress: (card: CardDetails) => void;
};
