import React from 'react';
import PropTypes from 'prop-types';
import RankBadge from './RankBadge';
import UserAvatar from './UserAvatar';

const getBadgeColor = (rank) => {
  switch (rank) {
  case 0:
    return 'badge-primary';
  case 1:
    return 'badge-secondary';
  case 2:
    return 'badge-accent';
  default:
    return 'badge-ghost';
  }
};

export default function LeaderboardItem({ leaderboard, rank }) {
  return (
    <tr className={rank < 3 ? 'hover font-medium' : 'hover'}>
      <td className="text-center">
        <div className="flex justify-center items-center">
          <RankBadge rank={rank} />
        </div>
      </td>
      <td>
        <div className="flex items-center space-x-3">
          <div
            className={`${
              rank === 0 ? 'ring ring-yellow-500 rounded-full' : ''
            }`}
          >
            <UserAvatar user={leaderboard.user} size="w-12 h-12" />
          </div>
          <div>
            <div className="font-bold">{leaderboard.user.name}</div>
            <div className="text-sm opacity-70">{leaderboard.user.email}</div>
          </div>
        </div>
      </td>
      <td className="text-center">
        <div className={`badge ${getBadgeColor(rank)} badge-lg font-bold`}>
          {leaderboard.score}
        </div>
      </td>
    </tr>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};
