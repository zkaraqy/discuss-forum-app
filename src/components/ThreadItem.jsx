import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import { formatDate } from '../utils/formatDate';
import Button from './Button';
import UserAvatar from './UserAvatar';

export default function ThreadItem({
  thread,
  authUser,
  onUpVote,
  onDownVote,
  getUserName,
  userAvatar,
}) {
  return (
    <div className="card bg-base-100 shadow-md p-4 border border-base-300 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="badge badge-primary">{thread.category}</span>
        <span className="text-sm text-gray-500 flex gap-1 items-center">
          <UserAvatar
            user={{ name: getUserName(thread.ownerId), avatar: userAvatar }}
            size="w-5 h-5"
          />
          {getUserName(thread.ownerId)} • {formatDate(thread.createdAt)}
        </span>
      </div>

      <h2 className="text-2xl font-semibold">
        <Link to={`/thread/detail/${thread.id}`} className="hover:underline">
          {thread.title}
        </Link>
      </h2>

      <p className="text-gray-700 mt-2">
        {thread.body.length > 100
          ? `${thread.body.substring(0, 100)}...`
          : thread.body}
        {thread.body.length > 100 && (
          <Link
            to={`/thread/detail/${thread.id}`}
            className="text-blue-500 hover:underline ml-1"
          >
            Baca selengkapnya
          </Link>
        )}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            className={`btn-sm ${
              thread.upVotesBy.includes(authUser?.id)
                ? 'btn-success'
                : 'btn-outline btn-success'
            }`}
            onClick={() => onUpVote(thread.id)}
          >
            <FaArrowUp /> {thread.upVotesBy.length}
          </Button>

          <Button
            className={`btn-sm ${
              thread.downVotesBy.includes(authUser?.id)
                ? 'btn-error'
                : 'btn-outline btn-error'
            }`}
            onClick={() => onDownVote(thread.id)}
          >
            <FaArrowDown /> {thread.downVotesBy.length}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <FaComment className="text-gray-500" />
          <Link to={`/thread/detail/${thread.id}`} className="hover:underline">
            {thread.totalComments} komentar
          </Link>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  getUserName: PropTypes.func.isRequired,
  userAvatar: PropTypes.string,
};

ThreadItem.defaultProps = {
  authUser: null,
  userAvatar: null,
};
