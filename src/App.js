
import './App.css';
import RegisterReactBoatstrap from "./components/RegisterReactBoatstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login/Login';
import Display from './components/layout/Display';
const router=createBrowserRouter([
  {
    path:'/',
    element:<Display></Display>,
children:[
  {
    path:'/',
    element:<RegisterReactBoatstrap></RegisterReactBoatstrap>
  },
  {
    path:'/register',
    element:<RegisterReactBoatstrap></RegisterReactBoatstrap>
  },
  {
    path:'/login',
    element:<Login></Login>
  }
]
  }
])

function App() {

  return (
    <div >
<RouterProvider router={router}>

</RouterProvider>

    </div>
  );
}

export default App;
