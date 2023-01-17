import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { isAuthUser } from '../src/store/actions/users_actions';
import { useDispatch, useSelector } from 'react-redux';
import Header from "./components/navigation/header";
import Loader from "./utils/loader";
import Home from "./pages/home";
import ResumeDasboard from "./pages/resume_dashboard";
import EditPage from "./pages/edit";
import FourOFour from "./pages/four_o_four";
import ResumeForm from "./pages/resume_form";
// import TestUpload from "./pages/upload_image";
// import PostsItem from "./pages/post_item";


const App = () => {

  const [loading, setLoading] = useState(true);
  const dispacth = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispacth(isAuthUser());
  }, [dispacth]);

  useEffect(() => {
    if (!users.auth) {
      setLoading(false);
    }
  }, [users])

  return (

    <>
      <BrowserRouter>
        <Header />
        {
          loading ? <Loader /> :
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/edit' element={<EditPage />} />
              <Route path='/dashboard' element={<ResumeDasboard />} />
              <Route path='/resume/:id' element={<ResumeForm />} />
              {/* <Route path='/testupload' element={<TestUpload />} />
              <Route path='/posts/:id' element={<PostsItem />} /> */}
              <Route
                path='*'
                element={
                  <FourOFour />
                }
              />
            </Routes>
        }

      </BrowserRouter>
    </>
  );
}

export default App;



