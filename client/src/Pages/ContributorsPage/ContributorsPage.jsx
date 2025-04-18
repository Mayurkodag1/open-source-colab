import React, { useState } from 'react'
import ContributorsPageHead from '../../Components/ContributorsPageHead/ContributorsPageHead';
import ContributorsPortfolio from '../ContributorsPortfolio/ContributorsPortfolio';
import ContributorsActivity from '../ContributorsActivity/ContributorsActivity';
import ContributorsIssueTracking from '../ContributorsIssueTracking/ContributorsIssueTracking';

function ContributorsPage() {
    const [activeSection, setActiveSection] = useState('');

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };
    return (
        <div>
            <ContributorsPageHead onSectionChange={handleSectionChange} />

            {activeSection === 'portfolio' && <ContributorsPortfolio />}
            {activeSection === 'activity' && <ContributorsActivity />}
            {activeSection ==="issue" && <ContributorsIssueTracking/>}
        </div>
    )
}

export default ContributorsPage
