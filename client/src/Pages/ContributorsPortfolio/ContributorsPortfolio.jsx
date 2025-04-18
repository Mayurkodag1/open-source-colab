import React from 'react'
import "../ContributorsPortfolio/ContributorsPortfolio.css"


function ContributorsPortfolio() {
  return (
    <div>
 
      <div className="contributors-portfolio-session-three d-flex justify-content-center mb-5">
                <div className="card contributors-portfolio-session-three-main-card">
                    <p className='contributors-portfolio-session-three-main-card-head'>Portfolio ID</p>
                    <input type='text' className='form-control' />

                    <div>
                        <p className='contributors-portfolio-session-three-main-card-head'>Portfolio Summary</p>
                        <textarea className='form-control' cols={200} rows={5}>
                            {`👋 Hi, I'm Asri a UI/UX Design Intern with a passion for crafting clean, user-focused interfaces. I've worked on projects like a zoo website, a career guidance app, and a project management system—combining usability, visual design, and real-world problem solving.
                              💡 Skilled in Figma, wireframing, prototyping, and building smooth user experiences. I aim to design interfaces that are both intuitive and impactful.`}
                        </textarea>
                    </div>

                    <p className='contributors-portfolio-session-three-main-card-head'>Skills</p>
                    <input type='text' className='form-control' />

                    <div>
                        <p className='contributors-portfolio-session-three-main-card-head'>Project List</p>
                        <textarea className='form-control' cols={200} rows={5}>
                            {`1. Zoona – Zoo Website Redesign: Redesigned a zoo’s website with a playful yet functional UI. Focused on improving navigation, accessibility, and visual storytelling to engage families and visitors.
                              2. Career Ji – Career Guidance App: Designed a mobile-first app to help users explore career paths. Created intuitive flows for onboarding, career quizzes, and personalized suggestions.`}
                        </textarea>
                    </div>

                    <div>
                        <p className='contributors-portfolio-session-three-main-card-head'>Social Links</p>
                 
                            <ul>
                                <li><a href='#'>Linkedin</a></li>
                                <li><a href='#'>Github</a></li>
                            </ul>
 
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ContributorsPortfolio
