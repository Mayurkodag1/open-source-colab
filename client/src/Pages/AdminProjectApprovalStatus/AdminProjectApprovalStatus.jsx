import React from 'react'
import "../AdminProjectApprovalStatus/AdminProjectApprovalStatus.css"
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Contributors', value: 400 },
    { name: 'Maintainers', value: 300 },
    { name: 'Projects', value: 300 },
    { name: 'Value - 01', value: 200 },
];
const COLORS = ['#F4BE37', '#FF9F40', '#28946a', '#5388D8'];
function AdminProjectApprovalStatus() {
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
                    <div className="card-header admin-dash-card-header-one text-center">
                        Success
                    </div>
                    <div className="card-body">
                        <p className='text-center'>400</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-two text-center">
                        Pending
                    </div>
                    <div className="card-body">
                        <p className='text-center'>300</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-three text-center">
                      Rejected
                    </div>
                    <div className="card-body">
                        <p className='text-center'>300</p>
                    </div>
                </div>
                <div className="card col-sm-2 admin-dash-card-size">
                    <div className="card-header admin-dash-card-header-four text-center">
                       On hold
                    </div>
                    <div className="card-body">
                        <p className='text-center'>200</p>
                    </div>
                </div>
            </div>

            <div className="admin-project-approval-table container mt-5">
                <table className='table  table-bordered'>
                    <tr className='admin-project-approval-table-head'>
                        <th>Project ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                    <tr className='admin-project-approval-table-body'>
                        <td>xxxx</td>
                        <td>xxxx</td>
                        <td>xxxx</td>
                    </tr>
                </table>
            </div>

        </div>
    )
}

export default AdminProjectApprovalStatus
