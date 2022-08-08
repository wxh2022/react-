import Loadable from '@loadable/component'
import { useRoutes } from 'react-router-dom';
import ChatList from '../views/front/chat-list';
import ContactList from '../views/front/contact-list';

export default function Routers() {

    const Register=Loadable(()=>import('../views/register'));
    const Login=Loadable( ()=>import('../views/login'));
    const Front=Loadable(()=>import('../views/front'));
    const routers = [
    {
        path:'/login',
        element: <Login />
    },
    {
        path:'/register',
        element:<Register />
    },
    {
        path:'/front',
        element:<Front />,
        children:[
            {
                path:'chat-list',
                element:<ChatList />,
            },
            {
                path:'contact-list',
                element:<ContactList />
            },
            {
                path:'/front',
                element:<ChatList/>
            }
        ]
    },
    {
        path:'/',
        element:<Front />
    },
    ]
    return useRoutes(routers)
}



