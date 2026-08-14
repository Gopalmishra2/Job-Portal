/* =====================================================
   JOB PORTAL JAVASCRIPT
===================================================== */


/* ================= DEFAULT JOB DATA ================= */

const defaultJobs = [

    {
        id: 1,
        title: "Java Developer",
        company: "TechSolutions",
        location: "Mumbai, Maharashtra",
        category: "Java",
        experience: "Fresher",
        salary: "₹4 - ₹6 LPA",
        description:
            "We are looking for a Java Developer to join our development team. Knowledge of Core Java, Spring Boot and MySQL is preferred."
    },

    {
        id: 2,
        title: "Frontend Developer",
        company: "InnovateTech",
        location: "Pune, Maharashtra",
        category: "Frontend",
        experience: "0-2",
        salary: "₹5 - ₹8 LPA",
        description:
            "Develop modern and responsive web applications using HTML, CSS, JavaScript and modern frontend technologies."
    },

    {
        id: 3,
        title: "Backend Developer",
        company: "CloudNova",
        location: "Bangalore, Karnataka",
        category: "Backend",
        experience: "0-2",
        salary: "₹6 - ₹9 LPA",
        description:
            "Build scalable backend applications and REST APIs. Knowledge of Java, Spring Boot, databases and REST APIs is required."
    },

    {
        id: 4,
        title: "Full Stack Developer",
        company: "CodeWorks",
        location: "Mumbai, Maharashtra",
        category: "Full Stack",
        experience: "2-5",
        salary: "₹8 - ₹12 LPA",
        description:
            "Work on complete web applications using frontend and backend technologies. Experience with REST APIs and databases is preferred."
    },

    {
        id: 5,
        title: "Software Tester",
        company: "QualitySoft",
        location: "Thane, Maharashtra",
        category: "Testing",
        experience: "Fresher",
        salary: "₹3 - ₹5 LPA",
        description:
            "Perform manual testing and automation testing. Knowledge of Selenium, Java and testing concepts is preferred."
    },

    {
        id: 6,
        title: "Data Analyst",
        company: "DataWorks",
        location: "Hyderabad, Telangana",
        category: "Data",
        experience: "0-2",
        salary: "₹5 - ₹8 LPA",
        description:
            "Analyze business data and create reports using SQL, Excel and data visualization tools."
    },

    {
        id: 7,
        title: "Junior Java Developer",
        company: "FinTech Solutions",
        location: "Navi Mumbai, Maharashtra",
        category: "Java",
        experience: "Fresher",
        salary: "₹3 - ₹5 LPA",
        description:
            "Join our Java development team and work on enterprise applications using Java, Spring Boot and MySQL."
    },

    {
        id: 8,
        title: "React Developer",
        company: "WebTech",
        location: "Pune, Maharashtra",
        category: "Frontend",
        experience: "0-2",
        salary: "₹5 - ₹8 LPA",
        description:
            "Develop interactive user interfaces using React, JavaScript, HTML and CSS."
    }

];


/* ================= LOCAL STORAGE ================= */

let jobs = JSON.parse(
    localStorage.getItem("jobFinderJobs")
);

if (!jobs) {

    jobs = defaultJobs;

    localStorage.setItem(
        "jobFinderJobs",
        JSON.stringify(jobs)
    );

}


let savedJobs = JSON.parse(
    localStorage.getItem("savedJobs")
) || [];


let currentJobId = null;


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayJobs(jobs);

        updateStatistics();

    }
);


/* ================= DISPLAY JOBS ================= */

function displayJobs(jobList) {

    const container =
        document.getElementById("jobContainer");

    const noJobs =
        document.getElementById("noJobs");


    container.innerHTML = "";


    if (jobList.length === 0) {

        noJobs.style.display = "block";

        return;

    }


    noJobs.style.display = "none";


    jobList.forEach(function (job) {

        const isSaved =
            savedJobs.includes(job.id);


        const card =
            document.createElement("div");

        card.className = "job-card";


        card.innerHTML = `

            <div class="job-header">

                <div class="job-company">

                    <div class="company-icon">
                        ${job.company.charAt(0)}
                    </div>

                    <div>

                        <h3 class="job-title">
                            ${job.title}
                        </h3>

                        <p class="company-name">
                            ${job.company}
                        </p>

                    </div>

                </div>


                <i
                    class="fa-solid fa-bookmark bookmark
                    ${isSaved ? "saved" : ""}"
                    onclick="toggleSaveJob(${job.id})"
                ></i>

            </div>


            <div class="job-info">

                <span>
                    <i class="fa-solid fa-location-dot"></i>
                    ${job.location}
                </span>

                <span>
                    <i class="fa-solid fa-clock"></i>
                    ${formatExperience(job.experience)}
                </span>

                <span>
                    <i class="fa-solid fa-layer-group"></i>
                    ${job.category}
                </span>

            </div>


            <p class="job-description">
                ${job.description}
            </p>


            <div class="job-footer">

                <span class="salary">
                    ${job.salary}
                </span>

                <button
                    class="view-btn"
                    onclick="viewJob(${job.id})"
                >
                    View Details
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* ================= EXPERIENCE ================= */

function formatExperience(experience) {

    if (experience === "Fresher") {
        return "Fresher";
    }

    if (experience === "0-2") {
        return "0-2 Years";
    }

    if (experience === "2-5") {
        return "2-5 Years";
    }

    return experience;

}


/* ================= SEARCH ================= */

function searchJobs() {

    const title =
        document
        .getElementById("searchTitle")
        .value
        .toLowerCase()
        .trim();


    const location =
        document
        .getElementById("searchLocation")
        .value
        .toLowerCase()
        .trim();


    const filtered =
        jobs.filter(function (job) {

            const matchesTitle =
                job.title
                .toLowerCase()
                .includes(title)
                ||
                job.description
                .toLowerCase()
                .includes(title)
                ||
                job.category
                .toLowerCase()
                .includes(title);


            const matchesLocation =
                job.location
                .toLowerCase()
                .includes(location);


            return matchesTitle && matchesLocation;

        });


    displayJobs(filtered);


    document
        .getElementById("jobs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= FILTER ================= */

function filterJobs() {

    const category =
        document
        .getElementById("categoryFilter")
        .value;


    const experience =
        document
        .getElementById("experienceFilter")
        .value;


    const salary =
        document
        .getElementById("salaryFilter")
        .value;


    let filtered = jobs;


    if (category !== "all") {

        filtered =
            filtered.filter(
                job => job.category === category
            );

    }


    if (experience !== "all") {

        filtered =
            filtered.filter(
                job => job.experience === experience
            );

    }


    if (salary !== "all") {

        filtered =
            filtered.filter(
                job => {

                    const salaryText =
                        job.salary;

                    if (salary === "3-5") {

                        return (
                            salaryText.includes("3 - 5") ||
                            salaryText.includes("3 - 6") ||
                            salaryText.includes("4 - 6")
                        );

                    }

                    if (salary === "5-8") {

                        return (
                            salaryText.includes("5 - 8") ||
                            salaryText.includes("6 - 9")
                        );

                    }

                    if (salary === "8+") {

                        return (
                            salaryText.includes("8 -") ||
                            salaryText.includes("9 -") ||
                            salaryText.includes("10 -") ||
                            salaryText.includes("12 -")
                        );

                    }

                    return true;

                }
            );

    }


    displayJobs(filtered);

}


/* ================= VIEW JOB ================= */

function viewJob(id) {

    const job =
        jobs.find(
            job => job.id === id
        );


    if (!job) {
        return;
    }


    currentJobId = id;


    const details =
        document.getElementById("jobDetails");


    details.innerHTML = `

        <h2>${job.title}</h2>

        <p class="details-company">
            ${job.company}
        </p>


        <ul class="details-list">

            <li>
                <i class="fa-solid fa-location-dot"></i>
                ${job.location}
            </li>

            <li>
                <i class="fa-solid fa-briefcase"></i>
                ${formatExperience(job.experience)}
            </li>

            <li>
                <i class="fa-solid fa-layer-group"></i>
                ${job.category}
            </li>

            <li>
                <i class="fa-solid fa-money-bill"></i>
                ${job.salary}
            </li>

        </ul>


        <h3>Job Description</h3>

        <p class="job-description">
            ${job.description}
        </p>


        <button
            class="apply-main-btn"
            onclick="openApply(${job.id})"
        >
            Apply Now
        </button>

    `;


    document.getElementById(
        "jobModal"
    ).style.display = "flex";

}


/* ================= APPLY ================= */

function openApply(id) {

    currentJobId = id;

    closeModal("jobModal");

    document.getElementById(
        "applyModal"
    ).style.display = "flex";

}


/* ================= APPLICATION ================= */

document
    .getElementById("applicationForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const job =
                jobs.find(
                    job => job.id === currentJobId
                );


            if (!job) {
                return;
            }


            const name =
                document.getElementById(
                    "applicantName"
                ).value;


            alert(
                `Application submitted successfully for ${job.title}!\n\nThank you ${name}.`
            );


            this.reset();

            closeModal("applyModal");

        }
    );


/* ================= SAVE JOB ================= */

function toggleSaveJob(id) {

    if (savedJobs.includes(id)) {

        savedJobs =
            savedJobs.filter(
                jobId => jobId !== id
            );

    } else {

        savedJobs.push(id);

    }


    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );


    displayJobs(jobs);

}


/* ================= SHOW SAVED JOBS ================= */

function showSavedJobs() {

    const saved =
        jobs.filter(
            job => savedJobs.includes(job.id)
        );


    displayJobs(saved);


    document
        .getElementById("jobs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= LOGIN ================= */

function openLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "flex";

}


document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            alert(
                "Login successful! Welcome to JobFinder."
            );

            closeModal("loginModal");

            this.reset();

        }
    );


/* ================= POST JOB ================= */

function openPostJob() {

    document.getElementById(
        "postJobModal"
    ).style.display = "flex";

}


document
    .getElementById("postJobForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const newJob = {

                id: Date.now(),

                title:
                    document.getElementById(
                        "jobTitle"
                    ).value,

                company:
                    document.getElementById(
                        "companyName"
                    ).value,

                location:
                    document.getElementById(
                        "jobLocation"
                    ).value,

                category:
                    document.getElementById(
                        "jobCategory"
                    ).value,

                experience:
                    document.getElementById(
                        "jobExperience"
                    ).value,

                salary:
                    document.getElementById(
                        "jobSalary"
                    ).value,

                description:
                    document.getElementById(
                        "jobDescription"
                    ).value

            };


            jobs.unshift(newJob);


            localStorage.setItem(
                "jobFinderJobs",
                JSON.stringify(jobs)
            );


            displayJobs(jobs);

            updateStatistics();


            alert(
                "Job posted successfully!"
            );


            this.reset();

            closeModal("postJobModal");

        }
    );


/* ================= STATISTICS ================= */

function updateStatistics() {

    document.getElementById(
        "totalJobs"
    ).textContent = jobs.length;

}


/* ================= CLOSE MODAL ================= */

function closeModal(id) {

    document.getElementById(
        id
    ).style.display = "none";

}


/* ================= OUTSIDE MODAL CLICK ================= */

window.addEventListener(
    "click",
    function (event) {

        const modals =
            document.querySelectorAll(".modal");


        modals.forEach(function (modal) {

            if (event.target === modal) {

                modal.style.display = "none";

            }

        });

    }
);


/* ================= ENTER SEARCH ================= */

document
    .getElementById("searchTitle")
    .addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchJobs();

            }

        }
    );


document
    .getElementById("searchLocation")
    .addEventListener(
        "keypress",
        function (event) {

            if (event.key === "Enter") {

                searchJobs();

            }

        }
    );