const mongoose = require("mongoose");
const solution = require("./solution");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ["CSE", "ECE", "IT", "MBA", "Other"],
        required: true
    },
    type: {
        type: String,
        enum: ["Homework", "Project", "Exam", "Placement", "Campus"],
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true
    },
    tags: [String],
    status: {
        type: String,
        enum: ["open", "solved"],
        default: "open"
    },
    image: {
        filename: {
            type: String,
            default: "default_problem"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    solutions: [{
        type: Schema.Types.ObjectId,
        ref: "Solution"
    }],
    acceptedSolution: {
        type: Schema.Types.ObjectId,
        ref: "Solution"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

problemSchema.post("findOneAndDelete", async (problem) => {
    if (problem) {
        await solution.deleteMany({ _id: { $in: problem.solutions } });
    }
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;