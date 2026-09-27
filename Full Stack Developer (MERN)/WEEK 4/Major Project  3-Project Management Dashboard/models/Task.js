import mongoose from "mongoose";

/**
 * Checklist item schema
 */
const checklistSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Checklist item text is required"],
      trim: true,
      maxlength: [500, "Checklist item cannot exceed 500 characters"],
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

/**
 * Task schema
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [1, "Task title cannot be empty"],
      maxlength: [200, "Task title cannot exceed 200 characters"],
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [5000, "Task description cannot exceed 5000 characters"],
    },

    status: {
      type: String,
      enum: {
        values: ["TODO", "IN PROGRESS", "DONE"],
        message: "Invalid task status",
      },
      default: "TODO",
      index: true,
    },

    priority: {
      type: String,
      enum: {
        values: ["LOW", "MEDIUM", "HIGH", "URGENT"],
        message: "Invalid task priority",
      },
      default: "MEDIUM",
      index: true,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
      index: true,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    tags: [
      {
        type: String,
        trim: true,
        maxlength: 50,
      },
    ],

    progress: {
      type: Number,
      min: [0, "Progress cannot be less than 0"],
      max: [100, "Progress cannot exceed 100"],
      default: 0,
    },

    checklist: {
      type: [checklistSchema],
      default: [],
    },

    type: {
      type: String,
      enum: {
        values: ["BUG", "FEATURE", "DESIGN"],
        message: "Invalid task type",
      },
      default: "FEATURE",
      index: true,
    },

    cover: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Remove duplicate tags before saving.
 */
taskSchema.pre("save", function (next) {
  if (Array.isArray(this.tags)) {
    const normalizedTags = this.tags
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    this.tags = [...new Set(normalizedTags)];
  }

  next();
});

/**
 * Automatically synchronize task progress with its status.
 *
 * DONE tasks are 100% complete.
 * TODO tasks remain at 0 unless explicitly given progress.
 */
taskSchema.pre("save", function (next) {
  if (this.status === "DONE") {
    this.progress = 100;
  }

  if (this.progress === 100) {
    this.status = "DONE";
  }

  next();
});

/**
 * Virtual field for checklist completion percentage.
 */
taskSchema.virtual("checklistProgress").get(function () {
  if (!this.checklist || this.checklist.length === 0) {
    return 0;
  }

  const completedItems = this.checklist.filter(
    (item) => item.done
  ).length;

  return Math.round(
    (completedItems / this.checklist.length) * 100
  );
});

/**
 * Virtual field for checklist statistics.
 */
taskSchema.virtual("checklistStats").get(function () {
  const total = this.checklist?.length || 0;

  const completed =
    this.checklist?.filter((item) => item.done).length || 0;

  return {
    total,
    completed,
    remaining: total - completed,
    percentage:
      total === 0
        ? 0
        : Math.round((completed / total) * 100),
  };
});

/**
 * Include virtual properties when converting
 * documents to JSON or plain objects.
 */
taskSchema.set("toJSON", {
  virtuals: true,
});

taskSchema.set("toObject", {
  virtuals: true,
});

/**
 * Indexes for common task queries.
 */
taskSchema.index({
  project: 1,
  status: 1,
});

taskSchema.index({
  project: 1,
  priority: 1,
});

taskSchema.index({
  project: 1,
  assignee: 1,
});

taskSchema.index({
  project: 1,
  createdAt: -1,
});

taskSchema.index({
  dueDate: 1,
});

taskSchema.index({
  title: "text",
  description: "text",
  tags: "text",
});

/**
 * Task model
 */
const Task = mongoose.model("Task", taskSchema);

export default Task;