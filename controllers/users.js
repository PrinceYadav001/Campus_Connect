const User = require("../models/user");
const Problem = require("../models/problem");
const Solution = require("../models/solution");

const AVATAR_COLORS = [
    '#7c3aed', '#6d28d9', '#5b21b6',
    '#2563eb', '#0891b2', '#059669',
    '#dc2626', '#d97706', '#db2777',
];

module.exports.renderSignUpForm = (req, res) => {
    res.render("Users/signup.ejs");
};

module.exports.signupUser = async (req, res, next) => {
    try {
        const { username, email, password, fullName, branch, year, enrollmentNo, bio, phone, github, linkedin, skills } = req.body;
        const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
        // Parse skills from comma-separated string
        const skillsArr = skills ? skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];
        const newUser = new User({ email, username, fullName, branch, year, enrollmentNo, bio, phone, github, linkedin, skills: skillsArr, avatarColor });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", `🎉 Welcome to Campus Connect, ${username}! Start connecting and solving.`);
            res.redirect("/problems");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("Users/login.ejs");
};

module.exports.userLogin = (req, res) => {
    req.flash("success", `👋 Welcome back, ${req.user.username}! Great to have you here.`);
    const redirectUrl = req.session.returnTo || "/problems";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You've been logged out. See you soon! 👋");
        res.redirect("/problems");
    });
};

module.exports.showProfile = async (req, res) => {
    const { username } = req.params;
    const profileUser = await User.findOne({ username });
    if (!profileUser) {
        req.flash("error", "User not found");
        return res.redirect("/problems");
    }
    const problems = await Problem.find({ author: profileUser._id }).sort({ _id: -1 });
    // Count total solutions given by this user
    const solutionsGiven = await Solution.countDocuments({ author: profileUser._id });
    // Count upvotes received across all their solutions
    const userSolutions = await Solution.find({ author: profileUser._id });
    const totalUpvotes = userSolutions.reduce((acc, s) => acc + (s.upvotes || 0), 0);
    const totalSolutions = problems.reduce((acc, p) => acc + p.solutions.length, 0);
    res.render("Users/profile.ejs", { profileUser, problems, totalSolutions, solutionsGiven, totalUpvotes });
};

module.exports.showLeaderboard = async (req, res) => {
    // Get all users
    const users = await User.find({});
    // For each user, compute: problems posted, solutions given, upvotes received
    const leaderData = await Promise.all(users.map(async (u) => {
        const problemsPosted = await Problem.countDocuments({ author: u._id });
        const solutions = await Solution.find({ author: u._id });
        const solutionsGiven = solutions.length;
        const upvotesReceived = solutions.reduce((acc, s) => acc + (s.upvotes || 0), 0);
        const score = (problemsPosted * 2) + (solutionsGiven * 3) + (upvotesReceived * 1);
        return { user: u, problemsPosted, solutionsGiven, upvotesReceived, score };
    }));
    // Sort by score descending
    leaderData.sort((a, b) => b.score - a.score);
    res.render("leaderboard.ejs", { leaderData });
};