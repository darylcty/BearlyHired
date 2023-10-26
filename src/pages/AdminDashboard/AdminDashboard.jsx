import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllCompanies, deleteOneCompany, updateCompany } from '../../utils/companies-service';

export default function AdminDashboard() {
    const [ allCompanies, setAllCompanies ] = useState([]);

    useEffect(() => {
        async function fetchAllCompanies() {
            const companies = await getAllCompanies();
            setAllCompanies(companies);
        }
        fetchAllCompanies();
    }, []);

    async function handleDeleteCompany(event) {
        event.preventDefault();
        console.log("Delete button clicked");
        const companyId = event.currentTarget.getAttribute("data-id");
        console.log(companyId);
        deleteOneCompany(companyId).then(() => {
            const updatedCompanies = allCompanies.filter((company) => company._id !== companyId);
            setAllCompanies(updatedCompanies);
        });
    }

    function handleEdit() {
        console.log("Edit button clicked");
    }
    return (
        <>
            <h1>Admin Dashboard</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Company Location</th>
                        <th>Country of Operation</th>
                        <th>Industry</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {allCompanies.map((company, idx) => {
                    const { companyName, companyLocation, country, industry, createdAt } = company;
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{companyName}</td>
                            <td>{companyLocation}</td>
                            <td>{country}</td>
                            <td>{industry}</td>
                            <td>{createdAt}</td>
                            <td>
                                <button className="btn btn-primary" style={{ marginRight: "15px" }} onClick={handleEdit}>Edit</button>
                                <button className="btn btn-danger" style={{ margin: "auto" }} onClick={handleDeleteCompany} data-id={company._id}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
}