import React from 'react';
import { Rating } from 'react-native-ratings';

type Props = {
  rating?: number;
  showRating?: boolean;
  align?: string;
};

const FZRatingView = ({ rating, showRating, align }: Props) => {
  return (
    <Rating
      showRating={showRating}
      readonly
      ratingCount={5}
      startingValue={rating}
      imageSize={15}
      style={{ alignSelf: align, paddingVertical: 5 }}
      showReadOnlyText={false}

    />
  );
};

FZRatingView.defaultProps = {
  rating: 5.0,
  showRating: false,
  align: 'flex-start',
};

export default FZRatingView;
