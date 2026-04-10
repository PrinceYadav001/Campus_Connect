const Problem = require("../models/problem.js");
const Solution = require("../models/solution.js");

module.exports.createSolution = async (req, res) => {
    let problem = await Problem.findById(req.params.id);
    let newSolution = new Solution(req.body.solution);
    newSolution.author = req.user._id;
    problem.solutions.push(newSolution);
    await newSolution.save();
    await problem.save();
    req.flash("success", "✅ Your answer has been posted to Campus Connect!");
    res.redirect(`/problems/${problem.id}`);
};

module.exports.deleteSolution = async (req, res) => {
    let { id, solutionId } = req.params;
    await Problem.findByIdAndUpdate(id, { $pull: { solutions: solutionId } });
    await Solution.findByIdAndDelete(solutionId);
    req.flash("success", "Answer removed.");
    res.redirect(`/problems/${id}`);
};

module.exports.acceptSolution = async (req, res) => {
    const { id, solutionId } = req.params;
    const problem = await Problem.findById(id);
    problem.acceptedSolution = solutionId;
    problem.status = "solved";
    await problem.save();
    await Solution.findByIdAndUpdate(solutionId, { isAccepted: true });
    req.flash("success", "🏆 Solution accepted! Problem marked as solved.");
    res.redirect(`/problems/${id}`);
};

module.exports.upvoteSolution = async (req, res) => {
    const { id, solutionId } = req.params;
    const solution = await Solution.findById(solutionId);
    if (!solution) {
        req.flash("error", "Solution not found.");
        return res.redirect(`/problems/${id}`);
    }
    const userId = req.user._id;
    // Check if already upvoted
    const alreadyUpvoted = solution.upvotedBy.some(uid => uid.equals(userId));
    if (alreadyUpvoted) {
        // Remove upvote (toggle)
        solution.upvotedBy = solution.upvotedBy.filter(uid => !uid.equals(userId));
        solution.upvotes = Math.max(0, solution.upvotes - 1);
        await solution.save();
        req.flash("success", "Upvote removed.");
    } else {
        solution.upvotedBy.push(userId);
        solution.upvotes = (solution.upvotes || 0) + 1;
        await solution.save();
        req.flash("success", "👍 Upvoted!");
    }
    res.redirect(`/problems/${id}`);
};