import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminAddEditCategory() {
    const [skills, setSkills] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [editingId, setEditingId] = useState(null);

    const token = 'YOUR_AUTH_TOKEN'; // Replace with actual token logic

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/admin/skills");
            setSkills(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const handleAddOrUpdate = async () => {
        if (!skillName.trim()) return;

        try {
            if (editingId) {
                // Update
                await axios.put(
                    `http://localhost:3000/api/admin/skills/${editingId}`,
                    { name: skillName },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // Create
                await axios.post(
                    "http://localhost:3000/api/admin/skills",
                    { name: skillName },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            setSkillName('');
            setEditingId(null);
            fetchSkills();
        } catch (error) {
            console.error("Error adding/updating skill:", error);
        }
    };

    const handleEdit = (skill) => {
        setSkillName(skill.name);
        setEditingId(skill._id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/admin/skills/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchSkills();
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };

    return (
        <div className='p-5'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Skill</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill, index) => (
                        <tr key={skill._id || index}>
                            <td>{skill._id}</td>
                            <td>{skill.name}</td>
                            <td><button className="btn btn-primary" onClick={() => handleEdit(skill)}>Edit</button></td>
                            <td><button className="btn btn-danger" onClick={() => handleDelete(skill._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="card p-5 mt-4">
                <label>Skill Name</label>
                <input
                    type='text'
                    className='form-control mb-4'
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                />
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-success' onClick={handleAddOrUpdate}>
                        {editingId ? 'Update Skill' : 'Add Skill'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminAddEditCategory;
