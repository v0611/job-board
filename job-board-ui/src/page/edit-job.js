import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { editJob, getJob } from "../data/jobs";

export const EditJob = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = useMemo(() => params.jobId, [params]);
  const [job, setJob] = useState();
  const jobTitle = useRef();
  const hourlyRate = useRef();
  const jobDescription = useRef();

  const onSubmit = useCallback(async () => {
    await editJob(jobId, {
      title: jobTitle.current.value,
      salary: Number(hourlyRate.current.value),
      description: jobDescription.current.value,
    })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        // Add error handling
      });
  }, [jobId, jobTitle, hourlyRate, jobDescription]);

  useEffect(() => {
    const getJobFromStore = async () => {
      if (!jobId) return;
      const loadedJob = await getJob(jobId);
      setJob(loadedJob);
    };

    getJobFromStore();
  }, [jobId, navigate]);

  if (!job) return null;

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Job Title</label>
          <input
            ref={jobTitle}
            className="form-control"
            placeholder={job.title}
          />
        </div>

        <div className="form-group">
          <label>Hourly Rate</label>
          <input
            ref={hourlyRate}
            type="number"
            className="form-control"
            placeholder={job.salary}
          />
        </div>

        <div className="form-group">
          <label for="exampleFormControlTextarea1">Job Description</label>
          <textarea
            placeholder={job.description}
            ref={jobDescription}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
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
