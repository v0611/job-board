import { useCallback, useRef } from "react";
import { addJob } from "../data/jobs";
import { useNavigate } from "react-router";

export const AddJob = () => {
  const navigate = useNavigate();
  const jobTitle = useRef();
  const hourlyRate = useRef();
  const jobDescription = useRef();

  const onSubmit = useCallback(async () => {
    const response = await addJob({
      jobTitle: jobTitle.current.value,
      hourlyRate: Number(hourlyRate.current.value),
      jobDescription: jobDescription.current.value,
    });

    navigate("/");
  }, [jobTitle, hourlyRate, jobDescription]);

  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Job Title</label>
          <input
            ref={jobTitle}
            className="form-control"
            placeholder="Enter Job Title"
          />
        </div>

        <div className="form-group">
          <label>Hourly Rate</label>
          <input
            ref={hourlyRate}
            type="number"
            className="form-control"
            placeholder="Hourly Rate"
          />
        </div>

        <div className="form-group">
          <label for="exampleFormControlTextarea1">Job Description</label>
          <textarea
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
