import React, { useEffect, useState } from 'react';
import "../AdminViewContributors/AdminViewContributors.css"
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];

function AdminViewContributors() {
    const [data, setData] = useState({
        totalContributors: 0,
        totalMaintainers: 0,
        totalProjects: 0,
        totalIssues: 0,
    });
    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        // Fetch dashboard data
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/dashboard/pie-chart');
                console.log("Dashboard Data:", response.data);
                setData(response.data);  // Set dashboard data
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };

        // Fetch contributors data
        const fetchContributorsData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/contributors');
                console.log("Contributors Data:", response.data);
                setContributors(response.data);  // Set contributors data
            } catch (err) {
                console.error("Error fetching contributors data:", err);
            }
        };

        fetchDashboardData();
        fetchContributorsData();
    }, []);  // Empty dependency array ensures the API is called only once when the component mounts

    const navigate = useNavigate();

    const pieChartData = [
        { name: 'Contributors', value: data.totalContributors },
        { name: 'Maintainers', value: data.totalMaintainers },
        { name: 'Projects', value: data.totalProjects },
        { name: 'Total Issues', value: data.totalIssues },
    ];

    return (
        <div>
            <div className='mb-5'>
                <div style={{ width: '100%', height: 300, marginTop: '40px' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Card Section */}
            <div className="row admin-dash-cards justify-content-evenly">
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-one">
                        Total Contributors
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{data.totalContributors}</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-two">
                        Total Maintainers
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{data.totalMaintainers}</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-three">
                        Total Projects
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{data.totalProjects}</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-four">
                        Total Issues
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{data.totalIssues}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-warning text-light w-25 me-3' onClick={() => navigate("/admin-view-contributors")}>View Contributors</button>
                <button className='btn btn-warning text-light w-25 me-3' onClick={() => navigate("/admin-view-maintainers")}>View Maintainers</button>
            </div>

            <div className='p-4 bg-secondary container rounded mt-5'>
                <p className='text-light admin-view-container-jumbotron'>Contributors</p>
            </div>

            {/* Display Contributors */}
            <div className='row justify-content-center my-5'>
                {contributors.map((contributor, index) => (
                    // <div key={index} className="col-sm-3 d-flex align-items-center gap-2">
                    //     <FaUser size={24} color="#333" />
                    //     <div className="card w-100 p-2">
                    //         {`${contributor.firstName} ${contributor.lastName}`}
                    //     </div>
                    // </div>
                    <div
                        key={index}
                        className="col-sm-3 d-flex align-items-center gap-2"
                        onClick={() => navigate(`/admin-view-contributor-details/${contributor._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <FaUser size={24} color="#333" />
                        <div className="card w-100 p-2">
                            {`${contributor.firstName} ${contributor.lastName}`}
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default AdminViewContributors;
