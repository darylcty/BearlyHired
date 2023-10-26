import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getAllCompanies, deleteOneCompany } from '../../utils/companies-service';
import GenericModal from '../../components/Modal/GenericModal';
import EditCompanyModal from '../../components/Modal/EditCompanyModal';

export default function AdminDashboard() {
    const [ allCompanies, setAllCompanies ] = useState([]);
    const [ modalShow, setModalShow ] = useState(false);
    const [ selectedCompany, setSelectedCompany ] = useState(null);
    const [ companyData, setCompanyData ] = useState(null);

    //? display all companies
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
    //? Render Delete Confirmation Modal
    async function handleDeleteButtonClick(event) {
        event.preventDefault();
        const companyId = event.currentTarget.getAttribute("data-id");
        setSelectedCompany(companyId);
        setModalShow("delete");
    }

    //? Render Edit Company Modal
    async function handleEditButtonClick(event) {
        event.preventDefault();
        const companyId = event.currentTarget.getAttribute("data-id");
        const fetchCompanyData = allCompanies.find(company => company._id === companyId);
        setCompanyData(fetchCompanyData);
        setModalShow("edit");
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

    return (
        <>
            <GenericModal
            title="Delete Company"
            body="Are you sure you want to delete this company?"
            show={modalShow == "delete"}
            onHide={handleCloseModal}
            onDelete={handleDeleteCompanyConfirm}
            />
            {companyData && (
            <EditCompanyModal
            show={modalShow == "edit"}
            onHide={handleCloseModal}
            companyId={companyData._id}
            originalData = {{
                companyName: companyData.companyName,
                companyAddress: companyData.companyAddress,
                country: companyData.country,
                industry: companyData.industry
            }}
            allCompanies={allCompanies}
            setAllCompanies={setAllCompanies}
            />
            )}

            <h1>Admin Dashboard</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Country of Operation</th>
                        <th>Industry</th>
                        <th>Date Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {allCompanies.map((company, idx) => {
                    const { companyName, companyAddress, country, industry, createdAt } = company;
                    return (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{companyName}</td>
                            <td>{companyAddress}</td>
                            <td>{country}</td>
                            <td>{industry}</td>
                            <td>{createdAt}</td>
                            <td>
                                <button className="btn btn-primary" style={{ marginRight: "15px" }} onClick={handleEditButtonClick} data-id={company._id}>Edit</button>
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