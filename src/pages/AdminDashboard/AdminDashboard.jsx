import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllCompanies, deleteOneCompany, updateCompany } from '../../utils/companies-service';
import GenericModal from '../../components/Modal/GenericModal';

export default function AdminDashboard() {
    const [ allCompanies, setAllCompanies ] = useState([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [ selectedCompany, setSelectedCompany ] = useState(null);

    useEffect(() => {
        async function fetchAllCompanies() {
            const companies = await getAllCompanies();
            setAllCompanies(companies);
        }
        fetchAllCompanies();
    }, []);

    //? Close modal without action
    function handleCloseModal() {
        setModalShow(false);
    }

    //? Delete company after confirmation and closing modal
    async function handleDeleteCompanyConfirm() {
        if (selectedCompany) {
            await handleDeleteCompany();
            handleCloseModal();
        }
    }

    async function handleDeleteButtonClick(event) {
        event.preventDefault();
        const companyId = event.currentTarget.getAttribute("data-id");
        setSelectedCompany(companyId);
        setModalShow(true);
        }

    async function handleDeleteCompany() {
        if (selectedCompany) {
            await deleteOneCompany(selectedCompany);
            const updatedCompanies = allCompanies.filter(company => company._id !== selectedCompany);
            setAllCompanies(updatedCompanies);
            setModalShow(false);
            setSelectedCompany(null);
        }
    }
    function handleEdit() {
        console.log("Edit button clicked");
    }
    return (
        <>
            <GenericModal
            title="Delete Company"
            body="Are you sure you want to delete this company?"
            show={modalShow}
            onHide={handleCloseModal}
            onDelete={handleDeleteCompanyConfirm}
            />
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
                                <button className="btn btn-danger" style={{ margin: "auto" }} onClick={handleDeleteButtonClick} data-id={company._id}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </>
    );
}