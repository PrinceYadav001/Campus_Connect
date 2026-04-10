const express = require("express");
const router = express.Router();
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig");
const upload = multer({ storage });
const wrapAsync = require("../utils/wrapAsync");
const problemController = require("../controllers/problems");
const { isLoggedIn, isAuthor, validateProblem } = require("../middleware");

router.route("/")
    .get(wrapAsync(problemController.index))
    .post(isLoggedIn, upload.single("image"), validateProblem, wrapAsync(problemController.createProblem));

router.get("/new", isLoggedIn, problemController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(problemController.showProblem))
    .put(isLoggedIn, isAuthor, upload.single("image"), validateProblem, wrapAsync(problemController.updateProblem))
    .delete(isLoggedIn, isAuthor, wrapAsync(problemController.deleteProblem));

router.get("/:id/edit", isLoggedIn, isAuthor, wrapAsync(problemController.editProblem));

// Toggle open/closed status (owner only)
router.post("/:id/toggle-status", isLoggedIn, isAuthor, wrapAsync(problemController.toggleStatus));

module.exports = router;