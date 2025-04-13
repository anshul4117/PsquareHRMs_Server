const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const {getAllCandidates} = require("../controllers/candidateController");
const { protect } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/uploadMiddleware");

router.post("/add", protect, upload.single("resume"), candidateController.createCandidate);

router.get("/", protect, getAllCandidates);

router.get("/:id", protect, candidateController.getCandidateById);

router.get("/download/:id", protect, candidateController.downloadResume);

router.put("/status", protect, candidateController.updateCandidate);

router.delete("/", protect, candidateController.deleteCandidate);

router.post("/promote", protect, candidateController.promoteToEmployee);

module.exports = router;
