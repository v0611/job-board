import { useCallback } from "react";
import { redirect, useNavigate } from "react-router";
import { downloadApplication } from "../data/jobs";

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

export const JobApplicantCard = (applicant) => {
  const { id, file, name, style, jobId } = applicant;

  const onViewResume = useCallback(async () => {
    if (!file) return;
    await downloadApplication(jobId, id);
  }, [id, file]);

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
          name="Applicant ID:"
          value={id}
        />
        <JobCardEntry
          style={{ marginRight: "10px" }}
          name="Name"
          value={name}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <button
            onClick={onViewResume}
            className="btn btn-primary"
            style={{ height: "40px", marginRight: "5px" }}
          >
            View Resume
          </button>
        </div>
      </div>
    </div>
  );
};
