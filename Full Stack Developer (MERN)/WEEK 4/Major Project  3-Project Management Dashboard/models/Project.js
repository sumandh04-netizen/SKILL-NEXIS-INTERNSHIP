import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: [2, "Project name must be at least 2 characters"],
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Project description cannot exceed 1000 characters"],
    },

    color: {
      type: String,
      default: "#6366f1",
      trim: true,
      match: [
        /^#[0-9A-Fa-f]{6}$/,
        "Project color must be a valid hexadecimal color",
      ],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project owner is required"],
      index: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Remove duplicate members before saving.
 */
projectSchema.pre("save", function (next) {
  if (Array.isArray(this.members)) {
    this.members = [
      ...new Map(
        this.members.map((member) => [member.toString(), member])
      ).values(),
    ];
  }

  next();
});

/**
 * Automatically populate the owner when querying projects.
 */
projectSchema.virtual("memberCount").get(function () {
  return Array.isArray(this.members) ? this.members.length : 0;
});

/**
 * Include virtual fields when converting documents to JSON.
 */
projectSchema.set("toJSON", {
  virtuals: true,
});

projectSchema.set("toObject", {
  virtuals: true,
});

/**
 * Indexes for commonly used queries.
 */
projectSchema.index({
  owner: 1,
  createdAt: -1,
});

projectSchema.index({
  members: 1,
});

projectSchema.index({
  name: "text",
  description: "text",
});

const Project = mongoose.model("Project", projectSchema);

export default Project;