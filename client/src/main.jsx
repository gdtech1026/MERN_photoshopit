import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import Error from './pages/Error';
import Post from './pages/Post';
import Search from './pages/Search';
// import Comment from './pages/Comment';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Search />,
            },
            {
                path: '/Post',
                element: <Post />,
            },
            // {
            //     path: '/Comment',
            //     element: <Comment />,
            // }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
