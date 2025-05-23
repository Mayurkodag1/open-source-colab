<<<<<<< HEAD
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaUser } from 'react-icons/fa';

const data = [
    { name: 'Contributors', value: 400 },
    { name: 'Maintainers', value: 300 },
    { name: 'Projects', value: 300 },
    { name: 'Value - 01', value: 200 },
];

const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];
function AdminViewMaintainers() {
    const navigate =useNavigate();
    return (
        <div>
            <div className='mb-5'>
                <div style={{ width: '100%', height: 300, marginTop: '40px' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="row admin-dash-cards justify-content-evenly">
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-one">
                        Total Contributors
                    </div>
                    <div className="card-body">
                        <p className='text-center'>400</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-two">
                        Total Maintainers
                    </div>
                    <div className="card-body">
                        <p className='text-center'>300</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-three">
                        Total Projects
                    </div>
                    <div className="card-body">
                        <p className='text-center'>300</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-four">
                        Value -01
                    </div>
                    <div className="card-body">
                        <p className='text-center'>200</p>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-warning text-light w-25 me-3' onClick={()=>navigate("/admin-view-contributors")} >View Contributors</button>
                <button className='btn btn-warning text-light w-25 me-3' onClick={()=>navigate("/admin-view-maintainers")} >View Maintainers</button>
            </div>

            <div className='p-4 bg-secondary container rounded mt-5 '>
                <p className='text-light admin-view-container-jumbotron'>Maintainers</p>
            </div>

            <div className='row justify-content-center mt-5'>
                <div className="col-sm-3 d-flex align-items-center gap-2">
                    <FaUser size={24} color="#333" />
                    <div className="card w-100 p-2">
                        Name
                    </div>
                </div>

                <div className="col-sm-3 d-flex align-items-center gap-2">
                    <FaUser size={24} color="#333" />
                    <div className="card w-100 p-2">
                        Another Name
                    </div>
                </div>

                <div className="col-sm-3 d-flex align-items-center gap-2">
                    <FaUser size={24} color="#333" />
                    <div className="card w-100 p-2">
                        Third Name
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminViewMaintainers
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';

const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];

function AdminViewMaintainers() {
    const [data, setData] = useState({
        totalContributors: 0,
        totalMaintainers: 0,
        totalProjects: 0,
        totalIssues: 0,
    });

    const [maintainers, setMaintainers] = useState([]); // State to hold maintainers data

    // Fetch data from APIs
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dashboard data
                const response = await axios.get('http://localhost:3000/api/admin/dashboard/pie-chart');
                console.log("Dashboard Data:", response.data);
                setData(response.data);  // Set the data from the API response
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            }

            try {
                // Fetch maintainers data
                const response = await axios.get('http://localhost:3000/api/admin/maintainers');
                console.log("Maintainers Data:", response.data);
                setMaintainers(response.data);  // Set the maintainers data
            } catch (err) {
                console.error("Error fetching maintainers data:", err);
            }
        };

        fetchData();
    }, []);  // Empty dependency array ensures the API is called only once when the component mounts

    // Pie chart data based on the state
    const pieChartData = [
        { name: 'Contributors', value: data.totalContributors },
        { name: 'Maintainers', value: data.totalMaintainers },
        { name: 'Projects', value: data.totalProjects },
        { name: 'Total Issues', value: data.totalIssues },
    ];

    const navigate = useNavigate();

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

            <div className='d-flex justify-content-center mt-5'>
                <button className='btn btn-warning text-light w-25 me-3' onClick={() => navigate("/admin-view-contributors")}>View Contributors</button>
                <button className='btn btn-warning text-light w-25 me-3' onClick={() => navigate("/admin-view-maintainers")}>View Maintainers</button>
            </div>

            <div className='p-4 bg-secondary container rounded mt-5'>
                <p className='text-light admin-view-container-jumbotron'>Maintainers</p>
            </div>

            {/* Display Maintainers */}
            <div className='row justify-content-center mt-5'>
                {maintainers.map((maintainer, index) => (
                    <div onClick={()=> navigate(`/admin-view-maintainers-details/${maintainer._id}`)} key={index} className="col-sm-3 d-flex align-items-center gap-2">
                        <FaUser size={24} color="#333" />
                        <div className="card w-100 p-2">
                            {`${maintainer.firstName} ${maintainer.lastName}`} {/* Concatenate firstName and lastName */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminViewMaintainers;
>>>>>>> new
