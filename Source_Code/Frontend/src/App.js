
import Homapage from "./pages/Homepage";
import MovieViewAllPage from './pages/Movie/ViewAllPage'
import MovieViewDetailPage from './pages/Movie/ViewDetails'
import MovieCreatePage from './pages/Movie/CreatePage'

import TheaterRoomViewAllPage from './pages/TheaterRoom/ViewAllPage'
import TheaterRoomCreatePage from './pages/TheaterRoom/CreatePage'

import FoodDrinkViewAllPage from './pages/FoodDrink/ViewAllPage'
import FoodDrinkCreatePage from './pages/FoodDrink/CreatePage'

import StaffViewAllPage from './pages/Staff/ViewAllPage'
import StaffCreatePage from './pages/Staff/CreatePage'

import OrderViewAllPage from './pages/Order/ViewAllPage'
import OrderCreatePage from './pages/Order/CreatePage'
import OrderViewDetailPage from './pages/Order/ViewDetails'

import UserProfilePage from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import MovieSchedule from "./pages/MovieSchedule";

import Login from "./pages/Auth/Login";
import { Routes, Route, useNavigate } from "react-router-dom"
import UserContext from "./context/UserContext";
import axios from "axios";
import "./App.scss";
import { useEffect, useState } from "react";
import ChangePassword from "./pages/Auth/ChangePassword";
//TODO: create a context to store information about user including: name, avatar and role?
//TODO: refactor itemImage -> image
function App() {
  const getTokenFromLocalStorage = () => {
    if (localStorage.hasOwnProperty('token')) {
      const token = localStorage.getItem("token")
      if (token) {
        return token;
      }

    }
    return null
  }

  const [jwtToken, setJwtToken] = useState(getTokenFromLocalStorage())
  const fetchUserInfo = async () => {
    let user

    if (!jwtToken) {
      user = null
    } else {
      const config = {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }
      };

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user-info`, config);
        // Handle the response data
        if (response.data.success) {
          user = response.data.data
        }
        console.log(response.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    }

    setUser(user)
    // this is for the userEffect that auto redirect user
    if (!isFetchUserInfoComplete) {
      setIsFetchuserInfoComplete(true)
    }

  };

  
  const [user, setUser] = useState(() => fetchUserInfo());
  const [pathname, setPathname] = useState(window.location.pathname)
  const [isFetchUserInfoComplete, setIsFetchuserInfoComplete] = useState(false);

  const navigate = useNavigate()

  // update the pathname when the user go to other the pathname
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [window.location])

  useEffect(() => {
    fetchUserInfo()
    console.log('ihi');
  }, [jwtToken])


  //TODO: after fetch user run this code, write a method and loading animation for this
  // auto redirect based on the user login status
  useEffect(() => {
    
    // Redirect unauthenticated users to the login page
    // if the user is not authenticated after fetching userinfor with the jwttoken in the localstorage
    if (isFetchUserInfoComplete && !user  && !pathname.startsWith('/login')) {
      console.log('hey');
      navigate('/login')
    } else if (jwtToken) {
      // Redirect authenticated users to the homepage
      if (pathname.startsWith('/login')) {
        navigate('/')
      }
    }

  }, [user, jwtToken, pathname, isFetchUserInfoComplete])


  return (
    <UserContext.Provider value={{ user, setUser, jwtToken, setJwtToken }}>
      <div className="App">
        {user && !window.location.pathname.startsWith('/login') && <Navbar />}
        <div className='app-container'>
          <Routes>

            <Route path="/" element={<Homapage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/login" element={<Login />} />

            <Route path='/movies' element={<MovieViewAllPage />} />
            <Route path='/add-movie' element={<MovieCreatePage />} />
            <Route path='/movies/:id' element={<MovieViewDetailPage />} />
            <Route path='/movie-scheduling/:id' element={<MovieSchedule />} />

            <Route path='/theater-rooms' element={<TheaterRoomViewAllPage />} />
            <Route path='/add-theater-room' element={<TheaterRoomCreatePage />} />

            <Route path='/foods-and-drinks' element={<FoodDrinkViewAllPage />} />
            <Route path='/add-food-and-drink' element={<FoodDrinkCreatePage />} />

            <Route path='/create-order' element={<OrderCreatePage />} />
            <Route path='/order-history' element={<OrderViewAllPage />} />
            <Route path='/order/:id' element={<OrderViewDetailPage />} />

            <Route path='/staffs' element={<StaffViewAllPage />} />
            <Route path='/add-staff' element={<StaffCreatePage />} />

            <Route path='/profile' element={<UserProfilePage />} />
          </Routes>
        </div>

      </div>
    </UserContext.Provider>
  );
}
export default App;
