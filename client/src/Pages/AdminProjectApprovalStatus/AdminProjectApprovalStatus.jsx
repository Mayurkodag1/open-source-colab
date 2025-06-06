import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../AdminProjectApprovalStatus/AdminProjectApprovalStatus.css";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';


const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];

function AdminProjectApprovalStatus() {
      const navigate = useNavigate();
       const handleRowClick = (id) => {
        navigate(`/admin-review-submission-page/${id}`);
    };
    const [projects, setProjects] = useState([]);
     const [chartData, setChartData] = useState([]);
      const [counts, setCounts] = useState({ approved: 0, pending: 0, rejected: 0, total: 0 });

    useEffect(() => {
    axios.get('http://localhost:3000/api/admin/projects')
        .then(response => {
            // Ensure data is an array
            if (Array.isArray(response.data)) {
                setProjects(response.data);
                console.log("response",response.data)
            } else {
                console.error("Expected an array, got:", response.data);
                setProjects([]); // fallback to empty array
            }
        })
        .catch(error => {
            console.error("Error fetching projects:", error);
            setProjects([]); // fallback to empty array in case of error
        });
}, []);
useEffect(() => {
        axios.get('http://localhost:3000/api/admin/projects/counts')
            .then(response => {
                const { approved, pending, rejected, total } = response.data;
                 setCounts({ approved, pending, rejected, total });


                const formattedData = [
                    { name: 'Approved', value: Number(approved) },
                    { name: 'Pending', value: Number(pending) },
                    { name: 'Rejected', value: Number(rejected) },
                    { name: 'Total', value: Number(total) }
                ];

                setChartData(formattedData);
                console.log(response)
            })
            .catch(error => {
                console.error("Error fetching project counts:", error);
            });
    }, []);

    return (
        <div>
            {/* Pie Chart Section (No Changes) */}
             <div className='mb-5'>
                <div style={{ width: '100%', height: 300, marginTop: '40px' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cards Section (No Changes) */}
            <div className="row admin-dash-cards justify-content-evenly">
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-one text-center">
                        Success
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{counts.approved}</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-two text-center">
                        Pending
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{counts.pending}</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-three text-center">
                        Rejected
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{counts.rejected}</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-four text-center">
                        Total
                    </div>
                    <div className="card-body">
                        <p className='text-center'>{counts.total}</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            
        <div className="admin-project-approval-table container mt-5">
            <table className='table table-bordered'>
                <thead className='admin-project-approval-table-head'>
                    <tr>
                        <th>Project ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody className='admin-project-approval-table-body'>
                    {projects.map(project => (
                        <tr key={project._id} onClick={() => handleRowClick(project._id)} style={{ cursor: 'pointer' }}>
                            <td>{project._id}</td>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default AdminProjectApprovalStatus;





// import React from 'react'
// import "../AdminProjectApprovalStatus/AdminProjectApprovalStatus.css"
// import {
//     PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';

// const data = [
//     { name: 'Contributors', value: 400 },
//     { name: 'Maintainers', value: 300 },
//     { name: 'Projects', value: 300 },
//     { name: 'Value - 01', value: 200 },
// ];
// const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];
// function AdminProjectApprovalStatus() {
//     return (
//         <div>
//             <div className='mb-5'>
//                 <div style={{ width: '100%', height: 300, marginTop: '40px' }}>
//                     <ResponsiveContainer>
//                         <PieChart>
//                             <Pie
//                                 data={data}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                 outerRadius={100}
//                                 dataKey="value"
//                             >
//                                 {data.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>

//             <div className="row admin-dash-cards justify-content-evenly">
//                 <div className="card col-sm-2 admin-dash-card-size">
//                     <div className="card-header admin-dash-card-header-one text-center">
//                         Success
//                     </div>
//                     <div className="card-body">
//                         <p className='text-center'>400</p>
//                     </div>
//                 </div>
//                 <div className="card col-sm-2 admin-dash-card-size">
//                     <div className="card-header admin-dash-card-header-two text-center">
//                         Pending
//                     </div>
//                     <div className="card-body">
//                         <p className='text-center'>300</p>
//                     </div>
//                 </div>
//                 <div className="card col-sm-2 admin-dash-card-size">
//                     <div className="card-header admin-dash-card-header-three text-center">
//                       Rejected
//                     </div>
//                     <div className="card-body">
//                         <p className='text-center'>300</p>
//                     </div>
//                 </div>
//                 <div className="card col-sm-2 admin-dash-card-size">
//                     <div className="card-header admin-dash-card-header-four text-center">
//                        On hold
//                     </div>
//                     <div className="card-body">
//                         <p className='text-center'>200</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="admin-project-approval-table container mt-5">
//                 <table className='table  table-bordered'>
//                     <tr className='admin-project-approval-table-head'>
//                         <th>Project ID</th>
//                         <th>Title</th>
//                         <th>Description</th>
//                     </tr>
//                     <tr className='admin-project-approval-table-body'>
//                         <td>xxxx</td>
//                         <td>xxxx</td>
//                         <td>xxxx</td>
//                     </tr>
//                 </table>
//             </div>

//         </div>
//     )
// }

// export default AdminProjectApprovalStatus
