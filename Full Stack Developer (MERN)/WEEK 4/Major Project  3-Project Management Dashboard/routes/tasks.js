import { Router } from "express";
import mongoose from "mongoose";

import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = Router();

/**
 * Check whether a user has access to a project.
 */
async function userHasProjectAccess(projectId, userId) {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return null;
  }

  return Project.findOne({
    _id: projectId,
    $or: [
      {
        owner: userId,
      },
      {
        members: userId,
      },
    ],
  });
}

/**
 * GET /api/tasks
 *
 * Get tasks with optional filters:
 *
 * ?project=<projectId>
 * ?status=TODO
 * ?priority=HIGH
 * ?assignee=<userId>
 * ?type=FEATURE
 * ?search=dashboard
 */
router.get("/", auth, async (req, res) => {
  try {
    const {
      project,
      status,
      priority,
      assignee,
      type,
      search,
    } = req.query;

    const query = {};

    /**
     * Project filter and access control.
     */
    if (project) {
      const projectDocument =
        await userHasProjectAccess(
          project,
          req.user.id
        );

      if (!projectDocument) {
        return res.status(403).json({
          message:
            "You do not have access to this project",
        });
      }

      query.project = project;
    } else {
      /**
       * Without a project filter, only return tasks
       * from projects the user can access.
       */
      const accessibleProjects =
        await Project.find({
          $or: [
            {
              owner: req.user.id,
            },
            {
              members: req.user.id,
            },
          ],
        }).select("_id");

      const projectIds =
        accessibleProjects.map(
          (item) => item._id
        );

      query.project = {
        $in: projectIds,
      };
    }

    /**
     * Status filter.
     */
    if (status) {
      const allowedStatuses = [
        "TODO",
        "IN PROGRESS",
        "DONE",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid task status",
        });
      }

      query.status = status;
    }

    /**
     * Priority filter.
     */
    if (priority) {
      const allowedPriorities = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT",
      ];

      if (
        !allowedPriorities.includes(
          priority
        )
      ) {
        return res.status(400).json({
          message: "Invalid task priority",
        });
      }

      query.priority = priority;
    }

    /**
     * Assignee filter.
     */
    if (assignee) {
      if (
        !mongoose.Types.ObjectId.isValid(
          assignee
        )
      ) {
        return res.status(400).json({
          message: "Invalid assignee ID",
        });
      }

      query.assignee = assignee;
    }

    /**
     * Task type filter.
     */
    if (type) {
      const allowedTypes = [
        "BUG",
        "FEATURE",
        "DESIGN",
      ];

      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          message: "Invalid task type",
        });
      }

      query.type = type;
    }

    /**
     * Search title, description and tags.
     */
    if (search && search.trim()) {
      const searchRegex = {
        $regex: search.trim(),
        $options: "i",
      };

      query.$or = [
        {
          title: searchRegex,
        },
        {
          description: searchRegex,
        },
        {
          tags: searchRegex,
        },
      ];
    }

    /**
     * Fetch tasks.
     */
    const tasks = await Task.find(query)
      .populate(
        "assignee",
        "name email avatar"
      )
      .populate(
        "project",
        "name description color owner members"
      )
      .sort({
        createdAt: -1,
      });

    return res.json(tasks);
  } catch (error) {
    console.error(
      "Get tasks error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to load tasks",
    });
  }
});

/**
 * GET /api/tasks/:id
 *
 * Get a single task.
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const task = await Task.findById(id)
      .populate(
        "assignee",
        "name email avatar"
      )
      .populate(
        "project",
        "name description color owner members"
      );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    /**
     * Verify project access.
     */
    const project =
      await userHasProjectAccess(
        task.project._id,
        req.user.id
      );

    if (!project) {
      return res.status(403).json({
        message:
          "You do not have access to this task",
      });
    }

    return res.json(task);
  } catch (error) {
    console.error(
      "Get task error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to load task",
    });
  }
});

/**
 * POST /api/tasks
 *
 * Create a new task.
 */
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description = "",
      status = "TODO",
      priority = "MEDIUM",
      assignee = null,
      project,
      dueDate = null,
      tags = [],
      progress = 0,
      checklist = [],
      type = "FEATURE",
      cover = "",
    } = req.body;

    /**
     * Validate title.
     */
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    /**
     * Validate project.
     */
    if (!project) {
      return res.status(400).json({
        message: "Project is required",
      });
    }

    const projectDocument =
      await userHasProjectAccess(
        project,
        req.user.id
      );

    if (!projectDocument) {
      return res.status(403).json({
        message:
          "You do not have access to this project",
      });
    }

    /**
     * Validate assignee.
     */
    if (assignee !== null && assignee !== "") {
      if (
        !mongoose.Types.ObjectId.isValid(
          assignee
        )
      ) {
        return res.status(400).json({
          message: "Invalid assignee ID",
        });
      }

      const assigneeExists =
        await User.exists({
          _id: assignee,
        });

      if (!assigneeExists) {
        return res.status(400).json({
          message: "Assignee not found",
        });
      }
    }

    /**
     * Validate status.
     */
    const allowedStatuses = [
      "TODO",
      "IN PROGRESS",
      "DONE",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    /**
     * Validate priority.
     */
    const allowedPriorities = [
      "LOW",
      "MEDIUM",
      "HIGH",
      "URGENT",
    ];

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({
        message: "Invalid task priority",
      });
    }

    /**
     * Validate type.
     */
    const allowedTypes = [
      "BUG",
      "FEATURE",
      "DESIGN",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        message: "Invalid task type",
      });
    }

    /**
     * Validate progress.
     */
    const numericProgress =
      Number(progress);

    if (
      Number.isNaN(numericProgress) ||
      numericProgress < 0 ||
      numericProgress > 100
    ) {
      return res.status(400).json({
        message:
          "Progress must be between 0 and 100",
      });
    }

    /**
     * Create task.
     */
    const task = await Task.create({
      title: title.trim(),
      description:
        typeof description === "string"
          ? description.trim()
          : "",
      status,
      priority,
      assignee:
        assignee === ""
          ? null
          : assignee,
      project,
      dueDate:
        dueDate || null,
      tags: Array.isArray(tags)
        ? tags
        : [],
      progress: numericProgress,
      checklist:
        Array.isArray(checklist)
          ? checklist
          : [],
      type,
      cover:
        typeof cover === "string"
          ? cover.trim()
          : "",
    });

    /**
     * Return populated task.
     */
    const populatedTask =
      await Task.findById(task._id)
        .populate(
          "assignee",
          "name email avatar"
        )
        .populate(
          "project",
          "name description color"
        );

    return res.status(201).json(
      populatedTask
    );
  } catch (error) {
    console.error(
      "Create task error:",
      error
    );

    return res.status(400).json({
      message:
        error.message ||
        "Failed to create task",
    });
  }
});

/**
 * PUT /api/tasks/:id
 *
 * Update an existing task.
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const existingTask =
      await Task.findById(id);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    /**
     * Verify access to the task's project.
     */
    const existingProject =
      await userHasProjectAccess(
        existingTask.project,
        req.user.id
      );

    if (!existingProject) {
      return res.status(403).json({
        message:
          "You do not have permission to update this task",
      });
    }

    const {
      title,
      description,
      status,
      priority,
      assignee,
      project,
      dueDate,
      tags,
      progress,
      checklist,
      type,
      cover,
    } = req.body;

    /**
     * Prevent changing to a project
     * the user cannot access.
     */
    if (project !== undefined) {
      const targetProject =
        await userHasProjectAccess(
          project,
          req.user.id
        );

      if (!targetProject) {
        return res.status(403).json({
          message:
            "You do not have access to the target project",
        });
      }

      existingTask.project = project;
    }

    /**
     * Update title.
     */
    if (title !== undefined) {
      if (!String(title).trim()) {
        return res.status(400).json({
          message:
            "Task title cannot be empty",
        });
      }

      existingTask.title =
        String(title).trim();
    }

    /**
     * Update description.
     */
    if (description !== undefined) {
      existingTask.description =
        String(description).trim();
    }

    /**
     * Update status.
     */
    if (status !== undefined) {
      const allowedStatuses = [
        "TODO",
        "IN PROGRESS",
        "DONE",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message:
            "Invalid task status",
        });
      }

      existingTask.status = status;
    }

    /**
     * Update priority.
     */
    if (priority !== undefined) {
      const allowedPriorities = [
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT",
      ];

      if (
        !allowedPriorities.includes(
          priority
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid task priority",
        });
      }

      existingTask.priority = priority;
    }

    /**
     * Update assignee.
     */
    if (assignee !== undefined) {
      if (
        assignee !== null &&
        assignee !== "" &&
        !mongoose.Types.ObjectId.isValid(
          assignee
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid assignee ID",
        });
      }

      if (
        assignee !== null &&
        assignee !== ""
      ) {
        const assigneeExists =
          await User.exists({
            _id: assignee,
          });

        if (!assigneeExists) {
          return res.status(400).json({
            message:
              "Assignee not found",
          });
        }
      }

      existingTask.assignee =
        assignee === ""
          ? null
          : assignee;
    }

    /**
     * Update due date.
     */
    if (dueDate !== undefined) {
      existingTask.dueDate =
        dueDate || null;
    }

    /**
     * Update tags.
     */
    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        return res.status(400).json({
          message:
            "Tags must be an array",
        });
      }

      existingTask.tags = tags;
    }

    /**
     * Update progress.
     */
    if (progress !== undefined) {
      const numericProgress =
        Number(progress);

      if (
        Number.isNaN(numericProgress) ||
        numericProgress < 0 ||
        numericProgress > 100
      ) {
        return res.status(400).json({
          message:
            "Progress must be between 0 and 100",
        });
      }

      existingTask.progress =
        numericProgress;
    }

    /**
     * Update checklist.
     */
    if (checklist !== undefined) {
      if (!Array.isArray(checklist)) {
        return res.status(400).json({
          message:
            "Checklist must be an array",
        });
      }

      existingTask.checklist =
        checklist;
    }

    /**
     * Update task type.
     */
    if (type !== undefined) {
      const allowedTypes = [
        "BUG",
        "FEATURE",
        "DESIGN",
      ];

      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          message:
            "Invalid task type",
        });
      }

      existingTask.type = type;
    }

    /**
     * Update cover.
     */
    if (cover !== undefined) {
      existingTask.cover =
        typeof cover === "string"
          ? cover.trim()
          : "";
    }

    /**
     * Save with schema validation.
     */
    await existingTask.save();

    /**
     * Return populated task.
     */
    const updatedTask =
      await Task.findById(
        existingTask._id
      )
        .populate(
          "assignee",
          "name email avatar"
        )
        .populate(
          "project",
          "name description color"
        );

    return res.json(updatedTask);
  } catch (error) {
    console.error(
      "Update task error:",
      error
    );

    return res.status(400).json({
      message:
        error.message ||
        "Failed to update task",
    });
  }
});

/**
 * DELETE /api/tasks/:id
 *
 * Delete a task.
 */
router.delete(
  "/:id",
  auth,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (
        !mongoose.Types.ObjectId.isValid(id)
      ) {
        return res.status(400).json({
          message: "Invalid task ID",
        });
      }

      const task =
        await Task.findById(id);

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      /**
       * Verify project access.
       */
      const project =
        await userHasProjectAccess(
          task.project,
          req.user.id
        );

      if (!project) {
        return res.status(403).json({
          message:
            "You do not have permission to delete this task",
        });
      }

      await Task.deleteOne({
        _id: task._id,
      });

      return res.json({
        message: "Task deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete task error:",
        error
      );

      return res.status(500).json({
        message:
          error.message ||
          "Failed to delete task",
      });
    }
  }
);

export default router;