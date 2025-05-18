import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown, FaClock } from 'react-icons/fa';
import { formatDate } from '../utils/formatDate';
import Button from './Button';
import UserAvatar from './UserAvatar';

export default function ThreadDetailCard({
  threadDetail,
  authUser,
  threadOwner,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <span className="badge badge-primary">{threadDetail.category}</span>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500" />
            <span className="text-sm text-gray-500">
              {formatDate(threadDetail.createdAt)}
            </span>
          </div>
        </div>

        <h1 className="card-title text-3xl mb-4">{threadDetail.title}</h1>

        <div
          className="prose max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />

        <div className="flex items-center justify-between mt-4 pt-4">
          <div className="flex items-center gap-2">
            <Button
              className={`btn-sm ${
                threadDetail.upVotesBy.includes(authUser?.id)
                  ? 'btn-success'
                  : 'btn-outline btn-success'
              }`}
              onClick={onUpVote}
            >
              <FaArrowUp /> {threadDetail.upVotesBy.length}
            </Button>
            <Button
              className={`btn-sm ${
                threadDetail.downVotesBy.includes(authUser?.id)
                  ? 'btn-error'
                  : 'btn-outline btn-error'
              }`}
              onClick={onDownVote}
            >
              <FaArrowDown /> {threadDetail.downVotesBy.length}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <UserAvatar user={threadOwner} size="w-8 h-8" />
            <span className="font-medium">{threadOwner.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadDetailCard.propTypes = {
  threadDetail: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.array,
  }).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  threadOwner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadDetailCard.defaultProps = {
  authUser: null,
};
