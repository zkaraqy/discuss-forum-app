import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from '../states/threads/action';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import Button from '../components/Button';
import ThreadList from '../components/ThreadList';
import ThreadFilter from '../components/ThreadFilter';

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    threads = [],
    users = [],
    authUser = null,
  } = useSelector((states) => states);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const categories = useMemo(() => {
    return threads.map((thread) => thread.category);
  }, [threads]);

  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      // Filter berdasarkan kategori
      const categoryMatch =
        !selectedCategory || thread.category === selectedCategory;

      // Filter berdasarkan keyword (judul atau konten)
      const searchLower = searchKeyword.toLowerCase();
      const keywordMatch =
        !searchKeyword ||
        thread.title.toLowerCase().includes(searchLower) ||
        thread.body.toLowerCase().includes(searchLower);

      return categoryMatch && keywordMatch;
    });
  }, [threads, selectedCategory, searchKeyword]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSearchKeyword('');
  };

  const onUpVoteClick = async (threadId) => {
    if (!authUser) return;

    const isUpVoted = threads
      .find((thread) => thread.id === threadId)
      .upVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(threadId, 'upVote'));
    } else {
      dispatch(asyncUpVoteThread(threadId));
    }
  };

  const onDownVoteClick = async (threadId) => {
    if (!authUser) return;

    const isDownVoted = threads
      .find((thread) => thread.id === threadId)
      ?.downVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(threadId, 'downVote'));
    } else {
      dispatch(asyncDownVoteThread(threadId));
    }
  };

  return (
    <div className="container lg:max-w-[60dvw] mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Threads</h1>
        <Link to="/thread/form">
          <Button id="button-add-thread" className="btn-primary flex items-center gap-2">
            <FaPlus /> Tambah Thread
          </Button>
        </Link>
      </div>

      <ThreadFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        resetFilters={resetFilters}
      />

      {filteredThreads.length === 0 ? (
        <div className="alert alert-info">
          <div>
            <p>Tidak ada thread yang sesuai dengan filter yang dipilih.</p>
            <Button className="btn-sm mt-2" onClick={resetFilters}>
              Reset Filter
            </Button>
          </div>
        </div>
      ) : (
        <ThreadList
          threads={filteredThreads}
          users={users}
          authUser={authUser}
          onUpVote={onUpVoteClick}
          onDownVote={onDownVoteClick}
        />
      )}
    </div>
  );
}
