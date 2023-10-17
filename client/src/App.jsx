import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewPhones from "./pages/ViewPhones";
import EditPhone from "./pages/EditPhone";
import CreatePhone from './pages/CreatePhone'
import PhoneDetails from './pages/PhoneDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreatePhone title='BOLT BUCKET | Customize' />
    },
    {
      path:'/customphones',
      element: <ViewPhones title='BOLT BUCKET | Custom Phones' />
    },
    {
      path: '/customphone/:id',
      element: <PhoneDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/customphone/edit/:id',
      element: <EditPhone title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App