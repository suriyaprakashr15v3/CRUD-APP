import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import employeeData from "./data.json";

function App() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    location: "",
    gender: "",
    age: ""
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const locations = ["Madurai", "Sivakasi", "Virudhunagar", "Sattur"];

  useEffect(() => {
    const localData = localStorage.getItem("employees");
    if (localData) {
      setEmployees(JSON.parse(localData));
    } else {
      setEmployees(employeeData);
      localStorage.setItem("employees", JSON.stringify(employeeData));
    }
  }, []);

  const updateLocalStorage = (updatedEmployees) => {
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setForm({
      name: "",
      contact: "",
      location: "",
      gender: "",
      age: ""
    });
    setFormType("add");
    setShowForm(true);
  };

  const openEditForm = (emp) => {
    setForm({
      name: emp.name,
      contact: emp.contact,
      location: emp.location,
      gender: emp.gender,
      age: emp.age
    });
    setSelectedEmployee(emp);
    setFormType("edit");
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formType === "add") {
      const newEmployee = {
        id: employees.length ? employees[employees.length - 1].id + 1 : 1,
        ...form
      };
      const updated = [...employees, newEmployee];
      updateLocalStorage(updated);
    } else if (formType === "edit") {
      const updated = employees.map((emp) =>
        emp.id === selectedEmployee.id ? { ...emp, ...form } : emp
      );
      updateLocalStorage(updated);
    }
    setShowForm(false);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const updated = employees.filter((emp) => emp.id !== deleteId);
    updateLocalStorage(updated);
    setShowDeleteModal(false);
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        <div className="col-md-2 text-white p-3" style={{backgroundColor: "#001f3f"}}>
          <h3 className="mb-4">
          <span className="text-success">Tech</span>
          <span style={{ color: "white" }}>Lambdas</span>
        </h3>
        </div>

        <div className="col-md-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Employee List</h4>
            <button className="btn btn-success" onClick={openAddForm}>
              <FaPlus className="me-2" /> Add New
            </button>
          </div>

          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Employee Name</th>
                <th>Contact Number</th>
                <th>Location</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.contact}</td>
                  <td>{emp.location}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.age}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openEditForm(emp)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => openDeleteModal(emp.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div
            className="position-fixed top-0 end-0 bg-light p-4"
            style={{
              width: "400px",
              height: "100%",
              boxShadow: "-2px 0px 5px rgba(0,0,0,0.3)",
              transition: "all 0.5s ease"
            }}
          >
            <h4 className="mb-4">{formType === "add" ? "Add Employee" : "Edit Employee"}</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter Name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  name="contact"
                  value={form.contact}
                  onChange={handleInputChange}
                  placeholder="Enter Contact Number"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <select
                  required
                  className="form-select"
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                >
                  <option value="">Select Location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label><br />
                <div className="form-check form-check-inline">
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={form.gender === "Male"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={form.gender === "Female"}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  name="age"
                  value={form.age}
                  onChange={handleInputChange}
                  placeholder="Enter Age"
                />
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


export default App;