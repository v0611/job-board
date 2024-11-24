import { useEffect, useState } from "react";
import { getJobs } from "../data/jobs";
import { JobCard } from "../component/card";

export const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      setJobs(await getJobs());
    };

    loadJobs();
  }, []);

  return (
    <div className="container">
      {jobs.map((job) => {
        return (
          <JobCard
            key={job.id}
            style={{ marginBottom: "10px" }}
            jobId={job.id}
            jobTitle={job.title}
            jobDescription={job.description}
            salary={job.salary}
            applicants={job.applicants}
          />
        );
      })}
    </div>
  );
};
