import "../../Pages/AboutUS/About.css"
import imgone from "../../assets/Images/service1.png"
import imgtwo from "../../assets/Images/service2.png"
import imgthree from "../../assets/Images/service3.png"
import imgfour from "../../assets/Images/service4.png"

function About() {
  return (
    <div>
      <div className="aboutus-sectionone-container">
        <div className="container aboutus-img-grp-div">
          <div className="row">
            <div className="card col-sm-6 aboutus-img-card1">
              <img src={imgone} />
            </div>
            <div className="card col-sm-6 aboutus-img-card2">
              <img src={imgtwo} />
            </div>
          </div>
          <div className="row">
            <div className="card col-sm-6 aboutus-img-card3">
              <img src={imgthree} />
            </div>
            <div className="card col-sm-6 aboutus-img-card4">
              <img src={imgfour} />
            </div>
          </div>
        </div>

        <div className="aboutus-whoweare-div">
          <p className="aboutus-whoweare-div-headone">About Us</p>
          <p className="aboutus-whoweare-div-headtwo">Who We Are</p>
          <p className="aboutus-whoweare-para">Welcome to <span className="aboutus-para-bold">OpenSource Collab</span>, a platform dedicated to revolutionizing the way developers collaborate on open-source projects. Our mission is to bridge the gap between aspiring contributors, experienced maintainers, and supportive mentors to create a more inclusive and dynamic open-source ecosystem. Whether you’re a beginner looking to dive into open source or a seasoned maintainer seeking skilled contributors, OpenSource Collab offers the tools, resources, and guidance to empower your journey.</p>
        </div>
      </div>

      <div className="aboutus-sectiontwo-overview">
        <p className="aboutus-sectiontwo-overview-content">Overview</p>
        <div className="row d-flex justify-content-evenly aboutus-sectiontwo-card-row">
          <div className="card aboutus-sectiontwo-cardone col-sm-2">
            <div className="card-header aboutus-sectiontwo-cardone-head">Inclusive Collaboration</div>
            <div className="card-body aboutus-sectiontwo-cardone-body">OpenSource Collab connects contributors, maintainers, and mentors in an inclusive space designed to streamline project discovery and collaboration.</div>
          </div>
          <div className="card aboutus-sectiontwo-cardtwo col-sm-2">
            <div className="card-header aboutus-sectiontwo-cardtwo-head">AI-Powered Recommendations</div>
            <div className="card-body aboutus-sectiontwo-cardone-body">Using AI and machine learning, we recommend open-source projects that match your skills and interests, making it easier to find the right fit.</div>
          </div>
          <div className="card aboutus-sectiontwo-cardthree col-sm-2">
            <div className="card-header aboutus-sectiontwo-cardthree-head">Mentorship Opportunities</div>
            <div className="card-body aboutus-sectiontwo-cardone-body">Mentors provide feedback and guidance to help contributors grow and enhance their skills, fostering a welcoming learning environment.</div>
          </div>
          <div className="card aboutus-sectiontwo-cardfour col-sm-2">
            <div className="card-header aboutus-sectiontwo-cardfour-head">Seamless Integration</div>
            <div className="card-body aboutus-sectiontwo-cardone-body">With secure authentication and integration with platforms like GitHub and GitLab, collaborating has never been easier.</div>
          </div>
        </div>
      </div>

      <div className="aboutus-section-three">
        <div className="row d-flex justify-content-evenly">
          <div className="card aboutus-section-three-cardone col-sm-5">
            <div className="card-header aboutus-section-three-cardone-head">Mission</div>
            <p className="aboutus-section-three-cardone-para">Our mission is to empower individuals to engage in impactful open-source contributions by simplifying project discovery, connecting contributors with mentors, and creating a collaborative space where learning, sharing, and innovation thrive. We aim to lower entry barriers, making open-source contributions accessible and efficient for everyone.</p>
          </div>
          <div className="card aboutus-section-three-cardtwo col-sm-5">
            <div className="card-header aboutus-section-three-cardtwo-head">Vision</div>
            <p className="aboutus-section-three-cardtwo-para">Our vision is to transform the open-source landscape by fostering an inclusive, collaborative, and innovative ecosystem. We envision a world where contributors of all skill levels have the tools, resources, and guidance they need to make meaningful contributions and drive the growth of open-source projects globally.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
