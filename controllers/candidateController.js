// const Candidate = require("../models/candidateModel");
// const Employee = require("../models/employeeModel"); // for promotion logic
// const path = require("path");
// const fs = require("fs");

// const createCandidate = async (req, res) => {
//   try {
//     console.log("Candidate POST route hit");
//     const { name, email, phone, skills } = req.body;
//     const resume = req.file ? req.file.filename : null;

//     const candidate = new Candidate({
//       name,
//       email,
//       phone,
//       skills,
//       resume,
//     });

//     await candidate.save();
//     res.status(201).json(candidate);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating candidate", error });
//   }
// };

// const getAllCandidates = async (req, res) => {
//   try {
//     const { search, status } = req.query;

//     let query = {};
//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }
//     if (status) {
//       query.status = status;
//     }

//     const candidates = await Candidate.find(query);
//     res.status(200).json(candidates);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching candidates", error });
//   }
// };

// const getCandidateById = async (req, res) => {
//   try {
//     const candidate = await Candidate.findById(req.params.id);
//     if (!candidate) return res.status(404).json({ message: "Candidate not found" });
//     res.status(200).json(candidate);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching candidate", error });
//   }
// };

// const downloadResume = async (req, res) => {
//   try {
//     const candidate = await Candidate.findById(req.params.id);
//     if (!candidate || !candidate.resume) return res.status(404).json({ message: "Resume not found" });

//     const filePath = path.join(__dirname, "../uploads/", candidate.resume);
//     res.download(filePath);
//   } catch (error) {
//     res.status(500).json({ message: "Error downloading resume", error });
//   }
// };

// const updateCandidate = async (req, res) => {
//   try {
//     const updated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: "Candidate not found" });
//     res.status(200).json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating candidate", error });
//   }
// };

// const deleteCandidate = async (req, res) => {
//   try {
//     const deleted = await Candidate.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Candidate not found" });

//     if (deleted.resume) {
//       const filePath = path.join(__dirname, "../uploads/", deleted.resume);
//       fs.unlink(filePath, (err) => {
//         if (err) console.log("Resume file not found for deletion");
//       });
//     }

//     res.status(200).json({ message: "Candidate deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting candidate", error });
//   }
// };

// const promoteToEmployee = async (req, res) => {
//   try {
//     const candidate = await Candidate.findById(req.params.id);
//     if (!candidate) return res.status(404).json({ message: "Candidate not found" });

//     if (candidate.status !== "Selected") {
//       return res.status(400).json({ message: "Only selected candidates can be promoted" });
//     }

//     const employee = new Employee({
//       name: candidate.name,
//       email: candidate.email,
//       phone: candidate.phone,
//       skills: candidate.skills,
//       resume: candidate.resume,
//       joinedAt: new Date(),
//     });

//     await employee.save();
//     await Candidate.findByIdAndDelete(req.params.id);

//     res.status(201).json({ message: "Candidate promoted to employee", employee });
//   } catch (error) {
//     res.status(500).json({ message: "Error promoting candidate", error });
//   }
// };

// module.exports = { createCandidate, getAllCandidates, getCandidateById, downloadResume, updateCandidate, deleteCandidate, promoteToEmployee };

const Candidate = require("../models/candidateModel");
const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel"); 
const path = require("path");
const fs = require("fs");

// Create a new candidate
const createCandidate = async (req, res) => {
  try {
    // console.log(req.body)
    // console.log("Candidate POST route hit");

    const { name, email, phone, experience, position, status } = req.body;
    const resume = req.file ? req.file.filename : null;
    if(!resume){
      return res.status(400).json({ message: "Resume file is required" });
    }

    const candidate = new Candidate({
      name,
      email,
      phone,
      experience,
      position,
      status,
      resume,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    console.error("Error in createCandidate:", error);
    res.status(500).json({ message: "Error creating candidate", error });
  }
};

// Get all candidates with optional filters
const getAllCandidates = async (req, res) => {
  try {
    const { search, status } = req.query;

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (status) {
      query.status = status;
    }

    const candidates = await Candidate.find(query);
    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error in getAllCandidates:", error);
    res.status(500).json({ message: "Error fetching candidates", error });
  }
};

// Get a single candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    res.status(200).json(candidate);
  } catch (error) {
    console.error("Error in getCandidateById:", error);
    res.status(500).json({ message: "Error fetching candidate", error });
  }
};

// Download resume file
const downloadResume = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate || !candidate.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const filePath = path.join(__dirname, "../uploads/", candidate.resume);

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("Resume file does not exist:", filePath);
        return res.status(404).json({ message: "Resume file not found" });
      }

      res.download(filePath);
    });
  } catch (error) {
    console.error("Error in downloadResume:", error);
    res.status(500).json({ message: "Error downloading resume", error });
  }
};

// Update candidate
const updateCandidate = async (req, res) => {
  // console.log(req.body);
  try {
    const newStatus = req.body.status;
    const updated = await Candidate.findByIdAndUpdate(req.body.id, {
      status: newStatus
    }, { new: true });
    if (!updated) return res.status(404).json({ message: "Candidate not found" });
    // update candidate status


    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateCandidate:", error);
    res.status(500).json({ message: "Error updating candidate", error });
  }
};

// Delete candidate and remove resume file
const deleteCandidate = async (req, res) => {
  try {
    // console.log("delete Id : ",req.body.id);
    const deleted = await Candidate.findByIdAndDelete(req.body.id);
    if (!deleted) return res.status(404).json({ message: "Candidate not found" });

    if (deleted.resume) {
      const filePath = path.join(__dirname, "../uploads/", deleted.resume);

      // Try to delete file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn("Resume file not found during deletion:", filePath);
        } else {
          console.log("Deleted resume:", filePath);
        }
      });
    }

    res.status(200).json({ message: "Candidate deleted" });
  } catch (error) {
    console.error("Error in deleteCandidate:", error);
    res.status(500).json({ message: "Error deleting candidate", error });
  }
};

// Promote selected candidate to employee
const promoteToEmployee = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.body.id);
    // console.log("cd data : ",candidate);

    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    if (req.body.status !== "Selected") {
      return res.status(400).json({ message: "Only selected candidates can be promoted" });
    }

    const employee = new Employee({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      department: "To be assigned", // placeholder
      joiningDate: new Date(),
      status: "Present",
    });

    await employee.save({});
    await Candidate.findByIdAndUpdate(req.body.id, { status: req.body.status });
    // and add data in attendence model
    const attendance = new Attendance({
      //  i give the reference of employe
      employee: employee._id,
      employeeName: employee.name,
      date: new Date(),
      task: "Dashboard Home page Alignment",
      status: "Present",
      position: employee.position,
      department: employee.department,
    });
    await attendance.save();


    res.status(201).json({ message: "Candidate promoted to employee", employee });
  } catch (error) {
    console.error("Error in promoteToEmployee:", error);
    res.status(500).json({ message: "Error promoting candidate", error });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  downloadResume,
  updateCandidate,
  deleteCandidate,
  promoteToEmployee,
};
