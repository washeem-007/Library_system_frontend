import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemberForm from "../components/MemberForm";
import { getMemberById, updateMember } from "../services/memberService";

function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);

  useEffect(() => {
    getMemberById(id)
      .then((res) => setMember(res.data))
      .catch(() => {
        alert("Failed to load member");
        navigate("/members");
      });
  }, [id, navigate]);

  const handleSubmit = (updatedMember) => {
    updateMember(id, updatedMember)
      .then(() => {
        alert("Member updated successfully");
        navigate("/members");
      })
      .catch(() => alert("Failed to update member"));
  };

  if (!member) return <p className="text-center mt-4">Loading member...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Member</h2>
      <MemberForm initialData={member} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditMember;
