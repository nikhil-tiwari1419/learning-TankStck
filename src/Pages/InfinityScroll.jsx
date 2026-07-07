import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUsers } from '../API/api'

function InfinityScroll() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (lastpage, allpages) => {
      console.log(lastpage, allpages)
      return lastpage.length === 10 ? allpages.length + 1 : undefined;
    },
  });
  console.log(data)

  const handleScroll = () => {
    const bottom = 
    window.innerHeight + window.scrollY >= 
    document.documentElement.scrollHeight - 1;

    if(bottom && hasNextPage)
      fetchNextPage();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-2">
        GitHub Users Infinite Scroll with React Query
      </h1>

      <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.pages.map((page, index) =>
          page.map((user) => (
            <div
              key={user.id}
              className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 p-5"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded mx-auto"
              />

              <h2 className="text-xl p-5 font-bold text-center mt-4">
                {user.login}
              </h2>

              <p className="text-center text-gray-400">
                GitHub User
              </p>

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="block mt-5 text-center bg-blue-500 hover:bg-violet-600 text-black font-semibold py-2 rounded-lg transition"
              >
                View Profile
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InfinityScroll

