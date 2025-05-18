import React from 'react';
import PropTypes from 'prop-types';
import { FaTrophy, FaMedal } from 'react-icons/fa';

export default function RankBadge({ rank }) {
  switch (rank) {
  case 0:
    return <FaTrophy className="text-yellow-500 text-2xl" title="Peringkat #1" />;
  case 1:
    return <FaMedal className="text-gray-400 text-xl" title="Peringkat #2" />;
  case 2:
    return <FaMedal className="text-amber-700 text-xl" title="Peringkat #3" />;
  default:
    return <span className="text-lg font-bold text-gray-500">{rank + 1}</span>;
  }
}

RankBadge.propTypes = {
  rank: PropTypes.number.isRequired,
};