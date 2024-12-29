import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getJobApplicants } from "../data/jobs";
import { JobApplicantCard } from "../component/applicant-card";

export const ApplicantList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = useMemo(() => params.jobId, [params]);
  const [applicants, setApplicants] = useState();

  useEffect(() => {
    const getStoreApplicants = async () => {
      if (!jobId) return;
      const applicants = await getJobApplicants(jobId);
      setApplicants(applicants);
    };

    getStoreApplicants();
  }, [jobId, navigate]);

  if (!applicants) return null;

  return (
    <div className="container">
      {applicants.map((applicant) => (
        <JobApplicantCard key={applicant.id} jobId={jobId} {...applicant} />
      ))}
    </div>
  );
};
