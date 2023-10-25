import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllCompanies } from '../../utils/companies-service';

export default function AdminDashboard() {
    const [ allCompanies, setAllCompanies ] = useState([]);

    useEffect(() => {
        async function fetchAllCompanies() {
            const companies = await getAllCompanies();
            setAllCompanies(companies);
        }
        fetchAllCompanies();
    }, []);

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
                                <button className="btn btn-primary">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
}