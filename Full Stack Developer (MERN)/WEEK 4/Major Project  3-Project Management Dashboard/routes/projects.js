import { Router } from "express";
import mongoose from "mongoose";

import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/projects
 *
 * Get projects owned by the authenticated user
 * or projects where the authenticated user is a member.
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({
      $or: [
        {
          owner: userId,
        },
        {
          members: userId,
        },
      ],
    })
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar")
      .sort({
        createdAt: -1,
      });

    return res.json(projects);
  } catch (error) {
    console.error(
      "Get projects error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to load projects",
    });
  }
});

/**
 * GET /api/projects/:id
 *
 * Get one project by ID.
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await Project.findOne({
      _id: id,
      $or: [
        {
          owner: userId,
        },
        {
          members: userId,
        },
      ],
    })
      .populate("owner", "name email avatar")
      .populate("members", "name email avatar");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.json(project);
  } catch (error) {
    console.error(
      "Get project error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to load project",
    });
  }
});

/**
 * POST /api/projects
 *
 * Create a new project.
 */
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      description = "",
      color = "#6366f1",
      members = [],
    } = req.body;

    /**
     * Validate project name.
     */
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const normalizedName = name.trim();

    if (normalizedName.length < 2) {
      return res.status(400).json({
        message:
          "Project name must be at least 2 characters",
      });
    }

    if (normalizedName.length > 100) {
      return res.status(400).json({
        message:
          "Project name cannot exceed 100 characters",
      });
    }

    /**
     * Validate color.
     */
    const colorRegex = /^#[0-9A-Fa-f]{6}$/;

    if (!colorRegex.test(color)) {
      return res.status(400).json({
        message:
          "Project color must be a valid hexadecimal color",
      });
    }

    /**
     * Normalize member IDs.
     */
    const requestedMembers = Array.isArray(members)
      ? members
      : [];

    const validMemberIds = requestedMembers.filter(
      (memberId) =>
        mongoose.Types.ObjectId.isValid(memberId)
    );

    /**
     * Make sure requested members actually exist.
     */
    let existingMemberIds = [];

    if (validMemberIds.length > 0) {
      const users = await User.find({
        _id: {
          $in: validMemberIds,
        },
      }).select("_id");

      existingMemberIds = users.map((user) =>
        user._id.toString()
      );
    }

    /**
     * Always include the project owner.
     */
    const allMemberIds = [
      req.user.id,
      ...existingMemberIds,
    ];

    const uniqueMemberIds = [
      ...new Set(
        allMemberIds.map((id) => id.toString())
      ),
    ];

    /**
     * Create project.
     */
    const project = await Project.create({
      name: normalizedName,
      description: description.trim(),
      color,
      owner: req.user.id,
      members: uniqueMemberIds,
    });

    /**
     * Return populated project.
     */
    const populatedProject =
      await Project.findById(project._id)
        .populate("owner", "name email avatar")
        .populate("members", "name email avatar");

    return res.status(201).json(
      populatedProject
    );
  } catch (error) {
    console.error(
      "Create project error:",
      error
    );

    return res.status(400).json({
      message:
        error.message ||
        "Failed to create project",
    });
  }
});

/**
 * PUT /api/projects/:id
 *
 * Update a project.
 *
 * Only the project owner can update it.
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await Project.findOne({
      _id: id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        message:
          "Project not found or you are not the owner",
      });
    }

    const {
      name,
      description,
      color,
      members,
    } = req.body;

    /**
     * Update name.
     */
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          message: "Project name cannot be empty",
        });
      }

      if (name.trim().length > 100) {
        return res.status(400).json({
          message:
            "Project name cannot exceed 100 characters",
        });
      }

      project.name = name.trim();
    }

    /**
     * Update description.
     */
    if (description !== undefined) {
      project.description =
        String(description).trim();
    }

    /**
     * Update color.
     */
    if (color !== undefined) {
      const colorRegex =
        /^#[0-9A-Fa-f]{6}$/;

      if (!colorRegex.test(color)) {
        return res.status(400).json({
          message:
            "Project color must be a valid hexadecimal color",
        });
      }

      project.color = color;
    }

    /**
     * Update members.
     */
    if (members !== undefined) {
      if (!Array.isArray(members)) {
        return res.status(400).json({
          message:
            "Members must be an array",
        });
      }

      const validIds = members.filter(
        (memberId) =>
          mongoose.Types.ObjectId.isValid(
            memberId
          )
      );

      const users = await User.find({
        _id: {
          $in: validIds,
        },
      }).select("_id");

      const existingIds = users.map((user) =>
        user._id.toString()
      );

      /**
       * Owner must always remain a member.
       */
      const memberIds = [
        req.user.id,
        ...existingIds,
      ];

      project.members = [
        ...new Set(
          memberIds.map((memberId) =>
            memberId.toString()
          )
        ),
      ];
    }

    await project.save();

    const updatedProject =
      await Project.findById(project._id)
        .populate("owner", "name email avatar")
        .populate("members", "name email avatar");

    return res.json(updatedProject);
  } catch (error) {
    console.error(
      "Update project error:",
      error
    );

    return res.status(400).json({
      message:
        error.message ||
        "Failed to update project",
    });
  }
});

/**
 * DELETE /api/projects/:id
 *
 * Delete a project and all tasks belonging to it.
 *
 * Only the project owner can delete it.
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
          message: "Invalid project ID",
        });
      }

      const project =
        await Project.findOne({
          _id: id,
          owner: req.user.id,
        });

      if (!project) {
        return res.status(404).json({
          message:
            "Project not found or you are not the owner",
        });
      }

      /**
       * Delete all tasks belonging
       * to the project first.
       */
      const taskDeleteResult =
        await Task.deleteMany({
          project: project._id,
        });

      /**
       * Delete project.
       */
      await Project.deleteOne({
        _id: project._id,
      });

      return res.json({
        message: "Project deleted successfully",
        deletedTasks:
          taskDeleteResult.deletedCount || 0,
      });
    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      return res.status(500).json({
        message:
          error.message ||
          "Failed to delete project",
      });
    }
  }
);

export default router;
