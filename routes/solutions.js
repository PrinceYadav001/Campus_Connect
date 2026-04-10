const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const solutionController = require("../controllers/solutions");
const { isLoggedIn, isSolutionAuthor, validateSolution } = require("../middleware");

router.post("/", isLoggedIn, validateSolution, wrapAsync(solutionController.createSolution));
router.delete("/:solutionId", isLoggedIn, isSolutionAuthor, wrapAsync(solutionController.deleteSolution));
router.post("/:solutionId/accept", isLoggedIn, wrapAsync(solutionController.acceptSolution));
router.post("/:solutionId/upvote", isLoggedIn, wrapAsync(solutionController.upvoteSolution));

module.exports = router;