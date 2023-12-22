// IMPORT PACKAGES
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// IMPORT COMPONETNS
import Navbar from './Components/Navbar/Navbar';
import FeedSection from './Components/FeedSection/FeedSection'
import BlogPost from './Components/BlogPostSection/BlogPostSection';
import SignIn from './Components/SessionSystem/SignIn';
import SignUp from './Components/SessionSystem/SignUp';
import AccountSection from './Components/AccountSection/AccountSection';
import AddBlogSection from './Components/AddBlogSection/AddBlogSection';
import Settings from './Components/AccountSection/Settings';

import BlogState from './Context/BlogState'; // IMPORT STATE

// IMPORT CSS
import './App.css';
import './Components/utils/utils.css'

function App() {

  const checkAuth = () => {
    if (localStorage.getItem('isAuth') !== null) {
      return true;
    }
    return false
  }

  return (
    <>
      <BlogState>
        <BrowserRouter>
          <Routes>

            {/* path="/" */}
            <Route exact path='/' element={[
              <Navbar key={"Navbar"} />,
              <FeedSection key={"FeedSection"} />
            ]} />

            {/* path="/blogs/:blogID" */}
            <Route exact path='/blogs/:blogID' element={[
              <Navbar key={"Navbar"} />,
              <BlogPost key={"BlogPost"} />
            ]} />

            {/* path="/createblog/:userID"  */}
            <Route exact path='/createblog' element={
              checkAuth() ? [<Navbar key={"Navbar"} isSearchBar={false} isAdd={false} />,
              <AddBlogSection key={"AddBlogSection"} />] : <Navigate to="/invalidauth" />
            } />

            {/* path="/signin" */}
            <Route exact path='/signin' element={[
              <Navbar key={"Navbar"} isSearchBar={false} isSign={false} />,
              <SignIn key={"SignIn"} />
            ]} />

            {/* path="/signup" */}
            <Route exact path='/signup' element={[
              <Navbar key={"Navbar"} isSearchBar={false} isSign={false} />,
              <SignUp key={"SignUp"} />
            ]} />

            {/* path="/user/:userID" */}
            <Route exact path='/user/:userID' element={
              [<Navbar key={"Navbar"} isSearchBar={false} isSign={false} />,
              <AccountSection key={"AccountSection"} />]
            } />

            {/* path="/settings/:userID" */}
            <Route exact path="/settings/:userID" element={
              checkAuth() ?
                [<Navbar key={"Navbar"} isSearchBar={false} isSign={false} />,
                <Settings key={"Settings"}/>]:<Navigate to={"invalidauth"}/>
            } />


            {/* path="/invalidauth" */}
            <Route path="/invalidauth" element={<h1 style={{ textAlign: "center", margin: "30px", color: "red" }}>Error 401: Invalid Authentication</h1>} />

            {/* path="*" */}
            <Route path="*" element={<h1 style={{ textAlign: "center", margin: "30px", color: "red" }}>Error 404: Page not found</h1>} />

          </Routes>
        </BrowserRouter>
      </BlogState>
    </>
  );
}

export default App;
