import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';
import PageHeader from '../components/PageHeader';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PageHeader
        title="Leaderboard"
        subtitle="Pengguna dengan kontribusi dan partisipasi terbaik"
      />

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th className="text-center">Rank</th>
                  <th>Pengguna</th>
                  <th className="text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboards.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">
                      Memuat data leaderboard...
                    </td>
                  </tr>
                ) : (
                  leaderboards.map((leaderboard, index) => (
                    <LeaderboardItem
                      key={leaderboard.user.id}
                      leaderboard={leaderboard}
                      rank={index}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
