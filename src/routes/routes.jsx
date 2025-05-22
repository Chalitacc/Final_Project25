import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";

import Home from "../pages/Home/Home.jsx";
import BookMainPage from "../pages/BookMainPage/BookMainPage.jsx";
import BookDetails from "../pages/BookDetails/BookDetails.jsx";
import BookReadList from "../pages/BookReadList/BookReadList.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import SignOut from "../pages/SignOut/SignOut.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import Contact from "../pages/Contact/Contact.jsx";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index element={<Home></Home>}></Route>
      <Route
        path="/book-main-page"
        element={<BookMainPage></BookMainPage>}
      ></Route>
      {/* sjekk om dette er riktig for search */}
      <Route
        path="/book-main-page/:id"
        element={<BookDetails></BookDetails>}
      ></Route>
      <Route path="/read-list" element={<BookReadList></BookReadList>}></Route>
      <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
      <Route path="/sign-out" element={<SignOut></SignOut>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/verify-email" element={<VerifyEmail></VerifyEmail>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Route>
  )
);
