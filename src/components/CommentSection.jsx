import React from 'react';
import PropTypes from 'prop-types';
import { FaComment, FaSort } from 'react-icons/fa';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import Button from './Button';

export default function CommentSection({
  comments,
  commentContent,
  setCommentContent,
  authUser,
  sortOrder,
  toggleSortOrder,
  handleCommentSubmit,
  handleCommentUpVote,
  handleCommentDownVote,
  voteStatus,
  getUserInfo,
}) {
  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-2xl flex gap-2 items-center">
            <FaComment /> Komentar ({comments.length})
          </h2>

          <Button
            className="btn-sm btn-ghost gap-2"
            onClick={toggleSortOrder}
            title={
              sortOrder === 'highest'
                ? 'Menampilkan komentar dengan vote tertinggi'
                : 'Menampilkan komentar dengan vote terendah'
            }
          >
            <FaSort />
            {sortOrder === 'highest' ? 'Vote Tertinggi' : 'Vote Terendah'}
          </Button>
        </div>

        <CommentForm
          content={commentContent}
          setContent={setCommentContent}
          onSubmit={handleCommentSubmit}
        />

        <div className="space-y-4 mt-6">
          {comments.length === 0 ? (
            <div className="text-center text-gray-500 py-6">
              Belum ada komentar.
            </div>
          ) : (
            comments.map((comment) => {
              const commentOwner = getUserInfo(comment.owner.id);
              const isUpVoted = voteStatus[comment.id] === 'up';
              const isDownVoted = voteStatus[comment.id] === 'down';

              let upVotesCount = comment.upVotesBy.length;
              let downVotesCount = comment.downVotesBy.length;

              if (authUser) {
                const hasUserUpVoted = comment.upVotesBy.includes(authUser.id);
                const hasUserDownVoted = comment.downVotesBy.includes(
                  authUser.id
                );

                if (isUpVoted && !hasUserUpVoted) {
                  upVotesCount += 1;
                } else if (!isUpVoted && hasUserUpVoted) {
                  upVotesCount -= 1;
                }

                if (isDownVoted && !hasUserDownVoted) {
                  downVotesCount += 1;
                } else if (!isDownVoted && hasUserDownVoted) {
                  downVotesCount -= 1;
                }
              }

              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  commentOwner={commentOwner}
                  isUpVoted={isUpVoted}
                  isDownVoted={isDownVoted}
                  upVotesCount={upVotesCount}
                  downVotesCount={downVotesCount}
                  onUpVote={() => handleCommentUpVote(comment.id)}
                  onDownVote={() => handleCommentDownVote(comment.id)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  commentContent: PropTypes.string.isRequired,
  setCommentContent: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  sortOrder: PropTypes.oneOf(['highest', 'lowest']).isRequired,
  toggleSortOrder: PropTypes.func.isRequired,
  handleCommentSubmit: PropTypes.func.isRequired,
  handleCommentUpVote: PropTypes.func.isRequired,
  handleCommentDownVote: PropTypes.func.isRequired,
  voteStatus: PropTypes.objectOf(PropTypes.oneOf(['up', 'down', null])).isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

CommentSection.defaultProps = {
  authUser: null,
};
