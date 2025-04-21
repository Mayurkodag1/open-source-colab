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
import AdminRegistration from './Pages/AdminRegistration/AdminRegistration'

function Router() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path='/admin-registration'
            element={
              <>
              <AdminRegistration/>
              </>
            }
            >

            </Route>


            <Route path='maintainer-navbar'
            element={
              <>
              <MaintainerNavbar/>
              </>
            }
            >

            </Route>



          <Route path="/maintainer-manage-project"
          element={
            <>
             <MaintainerNavbar/>
            <MaintainerManageProject/>
            </>
          }
          >
          </Route>

            <Route path='/contributor-reset-password'
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
                  <FandQ />
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
