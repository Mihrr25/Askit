import React from "react";

const Star = ({ fillPercentage }) => {
  return (
    <div className="relative w-4 h-4">
      {/* Filled part */}
      <svg
        className="absolute top-0 left-0"
        viewBox="0 0 24 24"
        fill="gold"
        style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
      >
        <path d="M12 .587l3.668 7.571L24 9.748l-6 5.847 1.42 8.288L12 19.771l-7.42 4.112L6 15.595 0 9.748l8.332-1.59z" />
      </svg>
      {/* Star border */}
      <svg className="absolute top-0 left-0" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="2">
        <path d="M12 .587l3.668 7.571L24 9.748l-6 5.847 1.42 8.288L12 19.771l-7.42 4.112L6 15.595 0 9.748l8.332-1.59z" />
      </svg>
    </div>
  );
};

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = rating - i;
    const fill = diff >= 1 ? 100 : diff > 0 ? diff * 100 : 0;
    return <Star key={i} fillPercentage={fill} />;
  });

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
