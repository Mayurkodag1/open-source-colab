import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import About from "./Pages/Aboutus/About"
import LandingPage from './Pages/LandingPage/LandingPage'
import Services from './Pages/Services/Services'
import TermsOfConditions from './Pages/TermsOfConditions/TermsOfConditions'
import FandQ from './Pages/F&Q/FandQ'
import MaintainersRegistration from './Pages/MaintainersRegistration/MaintainersRegistration'
import MaintainersLogin from './Pages/MaintainersLogin/MaintainersLogin'
import ContributorsRegistration from './Pages/ContributorsRegistration/ContributorsRegistration'
import ContributorsLogin from './Pages/ContributorsLogin/ContributorsLogin'
import ContributorsPortfolio from './Pages/ContributorsPortfolio/ContributorsPortfolio'
import ContributorsPageHead from './Components/ContributorsPageHead/ContributorsPageHead'
import ContributorsPage from './Pages/ContributorsPage/ContributorsPage'
import ContributorsActivity from './Pages/ContributorsActivity/ContributorsActivity'
import ContributorsIssueTracking from './Pages/ContributorsIssueTracking/ContributorsIssueTracking'
import ContributorsSearchProjects from './Pages/ContributorsSearchProjects/ContributorsSearchProjects'
import { AuthProvider } from './Components/AuthContext/AuthContext'
import ContributorsResetPassword from './Pages/ContributorsResetPassword/ContributorsResetPassword'
import MaintainerManageProject from './Pages/MaintainerManageProjectPage/MaintainerManageProject'
import MaintainerNavbar from './Components/MaintainerNavbar/MaintainerNavbar'
import AdminLogin from './Pages/AdminLogin/AdminLogin'
import MaintainerManageIssue from './Pages/MaintainerManageIssue/MaintainerManageIssue'
import AdminHome from './Pages/AdminHome/AdminHome'
import AdminNavbar from './Components/AdminNavbar/AdminNavbar'
import AdminViewContributors from './Pages/AdminViewContributors/AdminViewContributors'
import AdminViewContributorDetails from './Pages/AdminViewContributorDetails/AdminViewContributorDetails'
import AdminViewMaintainers from './Pages/AdminViewMaintainers/AdminViewMaintainers'
import AdminViewMaintainersDetails from './Pages/AdminViewMaintainersDetails/AdminViewMaintainersDetails'
import MaintainerCommunicate from './Pages/MaintainerCommunicateWithContributor/MaintainerCommunicate'
import MaintainerContributionTracking from './Pages/MaintainerContributionTracking/MaintainerContributionTracking'
import AdminProjectApprovalStatus from './Pages/AdminProjectApprovalStatus/AdminProjectApprovalStatus'
import AdminReviewSubmissionPage from './Pages/AdminReviewSubmissionPage/AdminReviewSubmissionPage'
import AdminAddEditCategory from './Pages/AdminAddEditCategory/AdminAddEditCategory'
import ForgotPassword from './Pages/ForgetPassword/ForgetPassword'
import Contact from './Pages/Contactus/Contact'
import Priv from './Pages/PrivacyPolicy/Priv'


function Router() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>






            <Route path='/admin-add-edit-category'
              element={
                <>
                  <AdminNavbar />
                  <AdminAddEditCategory />
                </>
              }
            >
            </Route>

            <Route path='/admin-review-submission-page'
              element={
                <>
                  <AdminNavbar />
                  <AdminReviewSubmissionPage />
                </>
              }
            >

            </Route>

            <Route path='/admin-project-approval-status'
              element={
                <>
                  <AdminNavbar />
                  <AdminProjectApprovalStatus />
                </>
              }
            >

            </Route>

            <Route path='/maintainer-contribution-tracking'
              element={
                <>
                  <MaintainerNavbar />
                  <MaintainerContributionTracking />
                </>
              }
            >

            </Route>

            <Route path='/maintainer-communicate-contributor'
              element={
                <>
                  <MaintainerNavbar />
                  <MaintainerCommunicate />
                </>
              }
            >

            </Route>

            <Route path='/admin-view-maintainers-details/:id'
              element={
                <>
                  <AdminViewMaintainersDetails />
                </>
              }
            >

            </Route>

            <Route path='/admin-view-maintainers'
              element={
                <>
                  <AdminNavbar />
                  <AdminViewMaintainers />
                </>
              }
            >

            </Route>

            <Route path='admin-view-contributor-details/:id'
              element={
                <>
                  <AdminNavbar />
                  <AdminViewContributorDetails />
                </>
              }
            >

            </Route>

            <Route path='/admin-view-contributors'
              element={
                <>
                  <AdminNavbar />
                  <AdminViewContributors />
                </>
              }
            >

            </Route>
            <Route path='/admin-home'
              element={
                <>
                  <AdminNavbar />
                  <AdminHome />
                </>
              }
            >

            </Route>

            <Route path='/admin'
              element={
                <>
                  <AdminLogin />
                </>
              }
            >

            </Route>


            <Route path='/maintainer-navbar'
              element={
                <>
                  <MaintainerNavbar />
                </>
              }
            >
            </Route>

            <Route path='/maintainer-manage-issue'
              element={
                <>
                  <MaintainerNavbar />
                  <MaintainerManageIssue />
                </>
              }
            >

            </Route>

            <Route path="/maintainer-manage-project"
              element={
                <>
                  <MaintainerNavbar />
                  <MaintainerManageProject />
                </>
              }
            >
            </Route>

            <Route path='/forgot-password'
              element={
                <>
                  <Navbar />
                  <ForgotPassword />
                  <Footer />
                </>
              }>

            </Route>

            <Route path='/resetpassword/:token'
              element={
                <>
                  <Navbar />
                  <ContributorsResetPassword />
                  <Footer />
                </>
              }
            >
            </Route>

            <Route path='/contributors-search'
              element={
                <>
                  <ContributorsSearchProjects />
                </>
              }
            >

            </Route>

            <Route path='/contributors-issue'
              element={
                <>
                  <ContributorsIssueTracking />
                </>
              }
            >
            </Route>
            <Route path='/contributors-activity'
              element={
                <>
                  <ContributorsActivity />
                </>
              }
            >

            </Route>
            <Route path='/contributors-page'
              element={
                <>
                  <Navbar />
                  <ContributorsPage />
                  <Footer />
                </>
              }
            >
            </Route>

            <Route path='/contributors-login'
              element={
                <>
                  <Navbar />
                  <ContributorsLogin />
                  <Footer />
                </>
              }
            >

            </Route>



            <Route path='/contributors-registration'
              element={
                <>
                  <Navbar />
                  <ContributorsRegistration />
                  <Footer />
                </>
              }
            >

            </Route>

            <Route path='/maintainers-login'
              element={
                <>
                  <Navbar />
                  <MaintainersLogin />
                  <Footer />
                </>
              }
            >

            </Route>
            <Route path='/maintainers-registration'
              element={
                <>
                  <Navbar />
                  <MaintainersRegistration />
                  <Footer />
                </>
              }
            >

            </Route>
            <Route path='/'
              element={
                <>
                  <Navbar />
                  <LandingPage />
                  <Footer />
                </>
              }
            >

            </Route>

            <Route path='/navbar'
              element={
                <>
                  <Navbar />
                </>
              }
            >
            </Route>

            <Route path='/footer'
              element={
                <>
                  <Footer />
                </>
              }>
            </Route>

            <Route path='/about'
              element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              }
            >
            </Route>

            <Route path='/services'
              element={
                <>
                  <Navbar />
                  <Services />
                  <Footer />
                </>
              }>

            </Route>
            <Route path='privacy'
              element={
                <>
                  <Navbar />
                  <Priv />
                  <Footer />
                </>
              }
            >

            </Route>
            <Route path='/contact'
              element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>
              }
            >

            </Route>

            <Route path='/terms-of-conditions'
              element={
                <>
                  <Navbar />
                  <TermsOfConditions />
                  <Footer />
                </>
              }
            >
            </Route>

            <Route path='/f&q'

              element={
                <>
                  <Navbar />
                  <FandQ />
                  <Footer />
                </>
              }
            >
            </Route>


          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </div>
  )
}

export default Router
