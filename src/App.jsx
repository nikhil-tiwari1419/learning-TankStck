import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MainLayout from './components/Layouts/Mainlayout'
import Home from './Pages/Home'
import FetchOld from './Pages/FetchOld'
import FetchQuery from './Pages/FetchQuery'
import FetchIndv from './components/Ui/FetchIndv'
import InfinityScroll from './Pages/InfinityScroll'
const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: '/',
        element: <Home />
      },
      {
        path: '/trad',
        element: <FetchOld />
      },
      {
        path: '/qr',
        element: <FetchQuery />
      },
      {
        path:'/infinite',
        element: <InfinityScroll/>
      },
      {
        path: '/qr/:id',
        element: <FetchIndv />
      },
    ]

  }

])
function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={Router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App