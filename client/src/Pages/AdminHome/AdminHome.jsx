import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure to import axios for API calls
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../AdminHome/AdminHome.css";

const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];

function AdminHome() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        totalContributors: 0,
        totalMaintainers: 0,
        totalProjects: 0,
        totalIssues: 0
    });

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/dashboard/pie-chart');
                console.log("Dashboard Data:", response.data);
                setData(response.data);  // Set the data from the API response
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }
        };

        fetchData();
    }, []);  // Empty dependency array ensures the API is called only once when the component mounts

    // Data for the Pie Chart
    const pieChartData = [
        { name: 'Contributors', value: data.totalContributors },
        { name: 'Maintainers', value: data.totalMaintainers },
        { name: 'Projects', value: data.totalProjects },
        { name: 'Total Issues', value: data.totalIssues },
    ];

    return (
        <div>

            {/* Pie Chart Section */}
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

            {/* Buttons Section */}
            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-warning text-light w-25 me-3 ' onClick={() => navigate("/admin-view-contributors")}>
                    View Contributors
                </button>
                <button className='btn btn-warning text-light w-25 me-3' onClick={() => navigate("/admin-view-maintainers")}>
                    View Maintainers
                </button>
                <button className='btn btn-warning text-light w-25' onClick={() => navigate("/admin-project-approval-status")}>
                    Project Approvals
                </button>
            </div>

        </div>
    );
}

export default AdminHome;
