import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { formatDate } from '../utils/formatDate';
import Button from './Button';
import UserAvatar from './UserAvatar';

export default function CommentItem({
  comment,
  commentOwner,
  isUpVoted,
  isDownVoted,
  upVotesCount,
  downVotesCount,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="card bg-base-200 shadow-sm">
      <div className="card-body py-4">
        {/* Comment Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserAvatar user={commentOwner} size="w-8 h-8" />
            <span className="font-medium">{commentOwner.name}</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <div
          className="mt-2 prose"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />

        <div className="flex items-center gap-2 mt-2">
          <Button
            className={`btn-xs ${
              isUpVoted ? 'btn-success' : 'btn-outline btn-success'
            }`}
            onClick={onUpVote}
          >
            <FaArrowUp /> {upVotesCount}
          </Button>
          <Button
            className={`btn-xs ${
              isDownVoted ? 'btn-error' : 'btn-outline btn-error'
            }`}
            onClick={onDownVote}
          >
            <FaArrowDown /> {downVotesCount}
          </Button>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string),
    downVotesBy: PropTypes.arrayOf(PropTypes.string),
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  commentOwner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  upVotesCount: PropTypes.number.isRequired,
  downVotesCount: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};
