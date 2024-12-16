import React, { useEffect, useState } from "react";
import { createJob, getJobById, updateJob } from "../../services";
import { useParams } from "react-router-dom";
import styles from "./NewJob.module.css";

function NewJob() {
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
    }
  }, [id]);

  const [jobFormData, setJobFormData] = useState({
    companyName: "",
    salary: "",
    jobPosition: "",
    jobType: "",
    remoteOrOffice: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skillsRequired: "",
  });

  const handleCreateJob = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    const res = isEdit
      ? await updateJob(id, jobFormData)
      : await createJob(jobFormData);
    if (res.status === 200) {
      const data = await res.json();
      setJobFormData({
        companyName: "",
        salary: "",
        jobPosition: "",
        jobType: "",
        remoteOrOffice: "",
        location: "",
        jobDescription: "",
        aboutCompany: "",
        skillsRequired: "",
      });
      alert(isEdit ? "Job Updated Successfully" : "Job Created Successfully");
    } else if (res.status === 401) {
      alert("Please login before creating a job");
    } else {
      console.error(res);
      alert("Error creating job");
    }
  };

  useEffect(() => {
    if (isEdit && id) {
      const fetchJob = async () => {
        const res = await getJobById(id);
        if (res.status === 200) {
          const data = await res.json();
          setJobFormData(data);
        } else {
          console.log("Error fetching job data");
        }
      };
      fetchJob();
    }
  }, [isEdit, id]);

  return (
    <div className={styles.newJobContainer}>
      <form onSubmit={handleCreateJob} className={styles.jobForm}>
        <div className={styles.formGroup}>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Enter company name"
            value={jobFormData.companyName}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jobPosition">Job Position:</label>
          <input
            type="text"
            name="jobPosition"
            id="jobPosition"
            placeholder="Enter job position"
            value={jobFormData.jobPosition}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            name="salary"
            id="salary"
            placeholder="Enter salary"
            value={jobFormData.salary}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="jobType">Job Type:</label>
          <select
            name="jobType"
            id="jobType"
            value={jobFormData.jobType}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">SELECT JOB TYPE</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="remoteOrOffice">Work Type:</label>
          <select
            name="remoteOrOffice"
            id="remoteOrOffice"
            value={jobFormData.remoteOrOffice}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option value="">SELECT WORK TYPE</option>
            <option value="remote">Remote</option>
            <option value="office">Office</option>
          </select>
        </div>

        {jobFormData.remoteOrOffice === "office" && (
          <div className={styles.formGroup}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Enter location"
              value={jobFormData.location}
              onChange={(e) =>
                setJobFormData({
                  ...jobFormData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="jobDescription">Job Description:</label>
          <input
            type="text"
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter job description"
            value={jobFormData.jobDescription}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="aboutCompany">About Company:</label>
          <input
            type="text"
            name="aboutCompany"
            id="aboutCompany"
            placeholder="Enter information about the company"
            value={jobFormData.aboutCompany}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="skillsRequired">Skills Required:</label>
          <input
            type="text"
            name="skillsRequired"
            id="skillsRequired"
            placeholder="Enter required skills"
            value={jobFormData.skillsRequired}
            onChange={(e) =>
              setJobFormData({
                ...jobFormData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          {isEdit ? "Update Job" : "Create Job"}
        </button>
      </form>
    </div>
  );
}

export default NewJob;
