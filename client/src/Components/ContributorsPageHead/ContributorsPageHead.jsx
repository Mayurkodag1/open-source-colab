import React from 'react';
import "../ContributorsPageHead/ContributorsPageHead.css";
import headimg from "../../assets/Images/contributors_head_img.png";

function ContributorsPageHead({ onSectionChange }) {
    return (
        <div>
            <div className='contributors-portfolio-session-one'>
                <div className="contributors-portfolio-session-one-left">
                    <p className='contributors-portfolio-session-one-left-para-head'>Welcome back</p>
                    <p className='contributors-portfolio-session-one-left-para'>All you need is here!</p>
                </div>
                <div className="contributors-portfolio-session-one-right">
                    <img className='contributors-portfolio-session-one-right-img' src={headimg} alt="Header" />
                </div>
            </div>

            <div className="contributors-portfolio-session-two">
                <button
                    className='btn contributors-btn btn-one'
                    onClick={() => onSectionChange('portfolio')}
                >
                    <p className='btn-text'>Portfolio</p>
                </button>

                <button
                    className='btn contributors-btn btn-two'
                    onClick={() => onSectionChange('activity')}
                >
                    <p className='btn-text'>Activity</p>
                </button>

                <button className='btn contributors-btn btn-three'
                 onClick={() => onSectionChange('issue')}>
                    <p className='btn-text'>Issue Tracking</p>
                </button>

                <button className='btn contributors-btn btn-four'
                onClick={() => onSectionChange('search')}
                >
                    <p className='btn-text'>Search Projects</p>
                </button>
            </div>
        </div>
    );
}

export default ContributorsPageHead;
