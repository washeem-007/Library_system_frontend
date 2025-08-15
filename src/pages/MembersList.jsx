import React, { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../services/memberService";
import { Link } from "react-router-dom";

function MembersList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = () => {
    getMembers()
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch members");
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      deleteMember(id).then(fetchMembers);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Members List</h2>
        <Link to="/members/add" className="btn btn-primary">+ Add Member</Link>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.memberId}>
              <td>{member.memberId}</td>
              <td>{member.name}</td>
              <td>{member.age}</td>
              <td>{member.email}</td>
              <td>{member.username}</td>
              <td>
                <Link
                  to={`/members/edit/${member.memberId}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(member.memberId)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembersList;
