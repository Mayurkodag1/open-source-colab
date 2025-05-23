import React from 'react';
import "../LandingPage/LandingPage.css";


function LandingPage() {
    return (
        <div>
            <div className="landing-page-container">
                <div className="landing-page-session-one container">
                    <div class="mt-4 text-white  landing-page-jumbo">
                        <h1>Collaborate on Open Source</h1>
                        <p>Connect with contributors, maintainers, and mentors in a seamless and interactive environment. Find the perfect project for your skills.</p>
                        {/* <button class="btn btn-lg text-light landing-page-jumbo-btn">Get Started</button> */}
                    </div>
                </div>

                <div className="card container landing-page-sesssion-two-main-card mt-5 mb-5 p-5">
                    <div className="landingpage-session-two">
                        <div className='d-flex justify-content-center'>
                            <h1 className='mb-4'>Why OpenSource Collab?</h1>
                        </div>
                        <div className="row landingpage-card-row-one">
                            <div className="card col-sm-3 landing-page-card">
                                <div className="card-header  landing-page-card-header">
                                    Smart Project Discovery
                                </div>
                                <div className="card-body">
                                    AI-powered recommendations to match you with projects that align with your skills and interests.
                                </div>
                            </div>
                            <div className="card col-sm-3 landing-page-card">
                                <div className="card-header landing-page-card-header">
                                    Mentorship Connections
                                </div>
                                <div className="card-body">
                                    Connect with experienced mentors who can guide you through your open source journey.
                                </div>
                            </div>
                            <div className="card col-sm-3 landing-page-card">
                                <div className="card-header landing-page-card-header">
                                    Interactive Discussions
                                </div>
                                <div className="card-body">
                                    Engage in meaningful conversations about projects, issues, and solutions with the community.
                                </div>
                            </div>
                        </div>


                        <div className="row landingpage-card-row-two mt-5">
                            <div className="card col-sm-3 landing-page-card">
                                <div className="card-header landing-page-card-header">
                                    Seamless Integration
                                </div>
                                <div className="card-body">
                                    Connect with GitHub, GitLab, and Bitbucket to streamline your contribution workflow.
                                </div>
                            </div>

                            <div className="card col-sm-3 landing-page-card">
                                <div className="card-header landing-page-card-header">
                                    Track Your Progress
                                </div>
                                <div className="card-body">
                                    Monitor your contributions, skills growth, and impact on the open source community.
                                </div>
                            </div>
                            <div className="card col-sm-3 landing-page-card">
                                <div className="card-header landing-page-card-header">
                                    Secure Collaboration
                                </div>
                                <div className="card-body">
                                    Enterprise-grade security to protect your code and communications within the platform.
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
