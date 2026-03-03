require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    const { experience, techStack, location, workMode, visa } = req.body;
    
    const query = `
      ${techStack.join(" ")} developer 
      ${experience ? experience + "+ years" : ""}
      ${workMode}
      ${visa ? "visa sponsorship" : ""}
    `;
    
    const response = await axios.get(
      'https://jsearch.p.rapidapi.com/search',
      {
        params: {
          query: query,
          location: location,
          page: 1,
          num_pages: 1
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
        }
      }
    );

    const cleanedJobs = response.data.data.map(job => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_location,
      employmentType: job.job_employment_type,
      salary: job.job_min_salary && job.job_max_salary
          ? `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_period}`
          : 'Not specified',
      remote: job.job_is_remote,
      applyLink: job.job_apply_link
    }));

    res.json(cleanedJobs);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

module.exports = router;