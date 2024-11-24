import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { applyForJob, getJob } from "../data/jobs";

export const ApplyPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = useMemo(() => {
    return params.jobId;
  }, [params]);
  const applicantName = useRef();
  const file = useRef();
  const [job, setJob] = useState();

  useEffect(() => {
    const getJobFromStore = async () => {
      if (!jobId) return;
      const loadedJob = await getJob(jobId);
      setJob(loadedJob);
    };

    getJobFromStore();
  }, [jobId, navigate]);

  const onSubmit = useCallback(async () => {
    await applyForJob(jobId, {
      file: file.current.files[0],
      name: applicantName.current.value,
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        // Add error handling
      });
  }, [jobId, file, applicantName]);

  if (!job) return null;

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Applicant</label>
          <input className="form-control" ref={applicantName} />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input className="form-control" readOnly value={job.title} />
        </div>

        <div className="form-group">
          <label>Hourly Rate</label>
          <input
            type="number"
            className="form-control"
            readOnly
            value={job.salary}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Job Description</label>
          <textarea
            readOnly
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="formFileSm" className="form-label">
            Upload Resume
          </label>
          <input
            ref={file}
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            accept="text/pdf, text/docx"
          />
        </div>
        <button
          onClick={onSubmit}
          type="button"
          style={{ marginTop: "10px" }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
