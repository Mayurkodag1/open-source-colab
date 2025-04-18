import React from 'react'
import "../ContributorsSearchProjects/ContributorsSearchProjects.css"

function ContributorsSearchProjects() {
    return (
        <div>
            <div className="container my-4 d-flex justify-content-center">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control contributors-searchbar-size"
                        placeholder="Search here..."
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-light contributors-btn-size" type="button">
                        🔍
                    </button>
                </div>
            </div>

            <div className='container mb-5'>
                <table className='table'>
                    <tr className='contributors-search-table-head'>
                        <th>Project ID</th>
                        <th>Project Title</th>
                        <th>Project Description</th>
                        <th>Project Status</th>
                        <th>Chat</th>
                    </tr>
                    <tr>
                        <td>1234567</td>
                        <td>Java AI</td>
                        <td>introducing new concept of AI tools related to Java</td>
                        <td>
                            <select className='form-control'>
                                <option>Pending</option>
                                <option>Success</option>
                            </select>
                        </td>
                        <td>Chat Y</td>
                    </tr>

                </table>
            </div>



        </div>

    )
}

export default ContributorsSearchProjects
