import axios from "axios";

export const getJobs = async () => {
  const response = await axios.get("/api/jobs");
  // TOOD: add error handling
  return await response.data;
};

export const addJob = async (payload) => {
  const response = await axios.post("/api/jobs", {
    title: payload.title,
    description: payload.description,
    salary: payload.salary,
  });

  //   TODO: Add error handling
  return response.data;
};

export const deleteJob = async (jobId) => {
  await axios.delete(`/api/jobs/${jobId}`);
};

export const getJob = async (jobId) => {
  const job = await axios.get(`/api/jobs/${jobId}`);
  //   TODO: Error Handling

  return job.data;
};
export const editJob = async (jobId, payload) => {
  const response = await axios.put(`/api/jobs/${jobId}`, {
    ...(payload.title ? { title: payload.title } : {}),
    ...(payload.salary ? { salary: payload.salary } : {}),
    ...(payload.description ? { description: payload.description } : {}),
  });

  //   TODO: Error Handling

  return response.data;
};

export const applyForJob = async (jobId, payload) => {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("name", payload.name);
  formData.append("jobId", jobId);

  const response = await axios.postForm("/api/jobs/apply", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const getJobApplicants = async (jobId) => {
  const response = await axios.get(`/api/jobs/${jobId}/applicants`);
  return response.data;
};

export const downloadApplication = async (jobId, applicationId) => {
  await axios
    .get(`/api/jobs/${jobId}/applicants/${applicationId}/resume`, {
      responseType: "blob",
    })
    .then((response) => {
      window.open(
        URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        )
      );
    });
};
