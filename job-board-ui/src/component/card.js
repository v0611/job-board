import { useCallback } from "react";
import { deleteJob } from "../data/jobs";
import { redirect, useNavigate } from "react-router";

const JobCardEntry = ({ name, value, style }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      <div>
        <strong>{name}</strong>
      </div>
      <div>{value}</div>
    </div>
  );
};

export const JobCard = ({
  jobId,
  jobTitle,
  salary,
  jobDescription,
  applicants,
  style,
} = {}) => {
  const navigate = useNavigate();
  const onDelete = useCallback(async () => {
    await deleteJob(jobId).then(() => {
      window.location.reload();
    });
  }, [jobId]);

  const onEditJob = useCallback(() => {
    navigate(`/edit-job/${jobId}`);
  }, [jobId, navigate]);

  const onApply = useCallback(() => {
    navigate(`apply/${jobId}`);
  }, [jobId, navigate]);


  const onViewApplicants = useCallback(() => {
    navigate(`jobs/${jobId}/applicants`);
  }, [jobId, navigate]);

  return (
    <div style={{ ...style }} className="card">
      <div
        className="card-body"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <JobCardEntry
          style={{ marginRight: "10px" }}
          name="Job ID:"
          value={jobId}
        />
        <JobCardEntry
          style={{ marginRight: "10px" }}
          name="Title"
          value={jobTitle}
        />
        <JobCardEntry
          style={{ marginRight: "10px" }}
          name="Salary"
          value={salary}
        />
        <JobCardEntry
          style={{ marginRight: "10px" }}
          name="Job Description"
          value={jobDescription}
        />
        <JobCardEntry
          style={{ marginRight: "10px" }}
          name="Number of Applicants"
          value={applicants}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <button
            onClick={onApply}
            className="btn btn-primary"
            style={{ height: "40px", marginRight: "5px" }}
          >
            Apply
          </button>
          <button
            onClick={onEditJob}
            className="btn btn-success"
            style={{ height: "40px", marginRight: "5px" }}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="btn btn-danger"
            style={{ height: "40px", marginRight: "5px" }}
          >
            Delete
          </button>
          <button
            onClick={onViewApplicants}
            className="btn btn-primary"
            style={{ height: "40px", marginRight: "5px" }}
          >
            View Applicants
          </button>
        </div>
      </div>
    </div>
  );
};
