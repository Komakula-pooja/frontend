import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Search } from "./pages/Search"
import { Profile } from "./pages/Profile"
import { OtherProfile } from "./pages/OtherProfile"
import { HomeRedirect } from "./pages/HomeRedirect"
import { ProtectedRoute } from "./components/protectRoute"

function App(){

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomeRedirect/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blog/:id" element={<ProtectedRoute element={<Blog />}/>} />
      <Route path="/blogs" element={<ProtectedRoute element={<Blogs />}/>} />
      <Route path="/publish" element={<ProtectedRoute element={<Publish />}/>} />
      <Route path="/search" element={<ProtectedRoute element={<Search />}/>} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />}/>} />
      <Route path="/otherprofile/:authorId" element={<ProtectedRoute element={<OtherProfile />}/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App