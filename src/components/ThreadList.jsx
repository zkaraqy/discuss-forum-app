import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

export default function ThreadList({
  threads,
  users,
  authUser,
  onUpVote,
  onDownVote,
}) {
  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : userId;
  };

  return (
    <div className="space-y-4" data-testid="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          authUser={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          getUserName={getUserName}
          userAvatar={users.find((user) => user.id === thread.ownerId)?.avatar}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadList.defaultProps = {
  authUser: null,
};
