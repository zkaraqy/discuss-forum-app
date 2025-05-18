import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
} from '../states/threadDetail/action';
import {
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
} from '../states/comments/action';
import { asyncReceiveUsers } from '../states/users/action';
import ThreadDetailCard from '../components/ThreadDetailCard';
import CommentSection from '../components/CommentSection';

export default function DetailThreadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    threadDetail = null,
    authUser = null,
    users = [],
  } = useSelector((states) => states);
  const [commentContent, setCommentContent] = useState('');
  const [voteStatus, setVoteStatus] = useState({});
  const [sortOrder, setSortOrder] = useState('highest');
  const votedCommentsRef = useRef(new Set());

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    dispatch(asyncReceiveUsers());
  }, [dispatch, id]);

  useEffect(() => {
    if (threadDetail && authUser) {
      setVoteStatus((prevVoteStatus) => {
        const newVoteStatus = { ...prevVoteStatus };

        threadDetail.comments.forEach((comment) => {
          const commentId = comment.id;

          if (!votedCommentsRef.current.has(commentId)) {
            if (comment.upVotesBy.includes(authUser.id)) {
              newVoteStatus[commentId] = 'up';
            } else if (comment.downVotesBy.includes(authUser.id)) {
              newVoteStatus[commentId] = 'down';
            } else {
              newVoteStatus[commentId] = null;
            }
          }
        });

        return newVoteStatus;
      });
    }
  }, [threadDetail, authUser]);

  const getSortedComments = () => {
    if (!threadDetail || !threadDetail.comments) return [];

    return [...threadDetail.comments].sort((a, b) => {
      const scoreA = a.upVotesBy.length - a.downVotesBy.length;
      const scoreB = b.upVotesBy.length - b.downVotesBy.length;

      return sortOrder === 'highest' ? scoreB - scoreA : scoreA - scoreB;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'highest' ? 'lowest' : 'highest');
  };

  const handleThreadUpVote = () => {
    if (!authUser) return;

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    if (isUpVoted) {
      dispatch(asyncNeutralVoteThreadDetail(id, 'upVote'));
    } else {
      dispatch(asyncUpVoteThreadDetail(id));
    }
  };

  const handleThreadDownVote = () => {
    if (!authUser) return;

    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);
    if (isDownVoted) {
      dispatch(asyncNeutralVoteThreadDetail(id, 'downVote'));
    } else {
      dispatch(asyncDownVoteThreadDetail(id));
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      dispatch(asyncAddComment({ threadId: id, content: commentContent }));
      setCommentContent('');

      dispatch(asyncReceiveThreadDetail(id));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentUpVote = (commentId) => {
    if (!authUser) return;

    const currentVoteStatus = voteStatus[commentId];

    // Tandai komentar ini sebagai sudah di-vote secara manual
    votedCommentsRef.current.add(commentId);

    // Jika sudah upvote, maka netralkan
    if (currentVoteStatus === 'up') {
      setVoteStatus((prev) => ({
        ...prev,
        [commentId]: null,
      }));
      dispatch(asyncNeutralVoteComment({ threadId: id, commentId }, 'upVote'));
    }
    // Jika belum vote atau downvote, maka upvote
    else {
      setVoteStatus((prev) => ({
        ...prev,
        [commentId]: 'up',
      }));

      // Jika sebelumnya downvote, kita perlu memanggil neutral vote dulu
      if (currentVoteStatus === 'down') {
        dispatch(
          asyncNeutralVoteComment({ threadId: id, commentId }, 'downVote')
        );
      }

      dispatch(asyncUpVoteComment({ threadId: id, commentId }));
    }
  };

  const handleCommentDownVote = (commentId) => {
    if (!authUser) return;

    const currentVoteStatus = voteStatus[commentId];

    // Tandai komentar ini sebagai sudah di-vote secara manual
    votedCommentsRef.current.add(commentId);

    // Jika sudah downvote, maka netralkan
    if (currentVoteStatus === 'down') {
      setVoteStatus((prev) => ({
        ...prev,
        [commentId]: null,
      }));
      dispatch(
        asyncNeutralVoteComment({ threadId: id, commentId }, 'downVote')
      );
    }
    // Jika belum vote atau upvote, maka downvote
    else {
      setVoteStatus((prev) => ({
        ...prev,
        [commentId]: 'down',
      }));

      // Jika sebelumnya upvote, kita perlu memanggil neutral vote dulu
      if (currentVoteStatus === 'up') {
        dispatch(
          asyncNeutralVoteComment({ threadId: id, commentId }, 'upVote')
        );
      }

      dispatch(asyncDownVoteComment({ threadId: id, commentId }));
    }
  };

  const getUserInfo = (userId) => {
    const user = Array.isArray(users)
      ? users.find((u) => u.id === userId)
      : users.users?.find((u) => u.id === userId);

    return {
      name: user?.name || 'Unknown user',
      avatar:
        user?.avatar ||
        `https://ui-avatars.com/api/?name=${user?.name || 'User'}`,
    };
  };

  if (!threadDetail) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
      </div>
    );
  }

  const threadOwner = getUserInfo(threadDetail.owner.id);
  const sortedComments = getSortedComments();

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ThreadDetailCard
        threadDetail={threadDetail}
        authUser={authUser}
        threadOwner={threadOwner}
        onUpVote={handleThreadUpVote}
        onDownVote={handleThreadDownVote}
      />

      <CommentSection
        comments={sortedComments}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        authUser={authUser}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        handleCommentSubmit={handleCommentSubmit}
        handleCommentUpVote={handleCommentUpVote}
        handleCommentDownVote={handleCommentDownVote}
        voteStatus={voteStatus}
        getUserInfo={getUserInfo}
      />
    </div>
  );
}
