import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import About from "./Pages/Aboutus/About"
import LandingPage from './Pages/LandingPage/LandingPage'
import Services from './Pages/Services/Services'
import TermsOfConditions from './Pages/TermsOfConditions/TermsOfConditions'
import FandQ from './Pages/F&Q/FandQ'
import MaintainersRegistration from './Pages/MaintainersRegistration/MaintainersRegistration'


function Router() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/maintainers-registration'
          element={
            <>
            <MaintainersRegistration/>
            </>
          }
          >

          </Route>
          <Route path='/'
          element={
            <>
            <Navbar/>
            <LandingPage/>
            <Footer/>
            </>
          }
          >

          </Route>

            <Route path='/navbar'
            element={
                <>
                <Navbar/>
                </>
            }
            >
            </Route>

            <Route path='/footer'
            element={
                <>
                <Footer/>
                </>
            }>
            </Route>

            <Route path='/about'
            element={
              <>
               <Navbar/>
              <About/>
              <Footer/>
              </>
            }
            >
            </Route>

            <Route path='/services'
            element={
              <>
              <Navbar/>
              <Services/>
              <Footer/>
              </>
            }>

            </Route>

            <Route path='/terms-of-conditions'
            element={
              <>
              <Navbar/>
              <TermsOfConditions/>
              <Footer/>
              </>
            }
            >
            </Route>

            <Route path='/f&q'
            
            element={
              <>
              <FandQ/>
              </>
            }
            >
            </Route>

           
        </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Router
