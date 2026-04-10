const Problem = require("../models/problem");

module.exports.index = async (req, res) => {
    const problems = await Problem.find({}).populate('author', 'username');
    res.render("problems/index", { problems });
};

module.exports.renderNewForm = (req, res) => {
    res.render("problems/new");
};

module.exports.showProblem = async (req, res) => {
    let { id } = req.params;
    const problem = await Problem.findById(id)
        .populate({
            path: "solutions",
            populate: { path: "author" }
        })
        .populate("author");
    if (!problem) {
        req.flash("error", "Problem not found");
        return res.redirect("/problems");
    }
    res.render("problems/show", { problem });
};

module.exports.createProblem = async (req, res) => {
    const problemData = { ...req.body.problem };
    // Normalize tags: handle empty string, comma-separated string, or array
    if (!problemData.tags || problemData.tags === '') {
        delete problemData.tags; // let model default to []
    } else if (typeof problemData.tags === 'string') {
        problemData.tags = problemData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
        if (problemData.tags.length === 0) delete problemData.tags;
    } else if (Array.isArray(problemData.tags)) {
        problemData.tags = problemData.tags.filter(t => t && t.trim().length > 0);
    }
    const problem = new Problem(problemData);
    problem.author = req.user._id;
    if (req.file) {
        problem.image = { url: req.file.path, filename: req.file.filename };
    }
    await problem.save();
    req.flash("success", "New problem posted!");
    res.redirect(`/problems/${problem._id}`);
};

module.exports.editProblem = async (req, res) => {
    let { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
        req.flash("error", "Problem not found");
        return res.redirect("/problems");
    }
    let originalImageUrl = problem.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("problems/edit", { problem, originalImageUrl });
};

module.exports.updateProblem = async (req, res) => {
    let { id } = req.params;
    const problemData = { ...req.body.problem };
    // Normalize tags
    if (!problemData.tags || problemData.tags === '') {
        problemData.tags = [];
    } else if (typeof problemData.tags === 'string') {
        problemData.tags = problemData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    } else if (Array.isArray(problemData.tags)) {
        problemData.tags = problemData.tags.filter(t => t && t.trim().length > 0);
    }
    const problem = await Problem.findByIdAndUpdate(id, problemData, { new: true });
    if (req.file) {
        problem.image = { url: req.file.path, filename: req.file.filename };
        await problem.save();
    }
    req.flash("success", "Problem updated!");
    res.redirect(`/problems/${problem._id}`);
};

module.exports.deleteProblem = async (req, res) => {
    let { id } = req.params;
    await Problem.findByIdAndDelete(id);
    req.flash("success", "Problem deleted");
    res.redirect("/problems");
};

module.exports.toggleStatus = async (req, res) => {
    let { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
        req.flash("error", "Problem not found");
        return res.redirect("/problems");
    }
    problem.status = problem.status === "open" ? "solved" : "open";
    await problem.save();
    req.flash("success", `Problem marked as ${problem.status === "solved" ? "✅ Solved" : "🔓 Open"}`);
    res.redirect(`/problems/${id}`);
};