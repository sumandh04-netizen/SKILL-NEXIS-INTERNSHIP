import { Router } from "express";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/analytics
 *
 * Returns dashboard and analytics data:
 * - Total tasks
 * - Completed tasks
 * - Total projects owned by current user
 * - Total team members
 * - Overall progress
 * - Tasks by priority
 * - Tasks by status
 * - Tasks per member
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    /**
     * Fetch the data required for analytics.
     *
     * Tasks are populated with:
     * - assignee name
     * - project name
     */
    const [tasks, totalProjects, totalMembers] = await Promise.all([
      Task.find({})
        .populate("assignee", "name email avatar")
        .populate("project", "name color")
        .sort({ createdAt: -1 })
        .lean(),

      Project.countDocuments({
        owner: userId,
      }),

      User.countDocuments(),
    ]);

    /**
     * Total task count.
     */
    const totalTasks = tasks.length;

    /**
     * Completed tasks.
     */
    const completedTasks = tasks.filter(
      (task) => task.status === "DONE"
    ).length;

    /**
     * Overall project/task progress.
     */
    const overallProgress =
      totalTasks > 0
        ? Math.round(
            tasks.reduce(
              (total, task) => total + Number(task.progress || 0),
              0
            ) / totalTasks
          )
        : 0;

    /**
     * Tasks grouped by priority.
     */
    const priorityNames = [
      "LOW",
      "MEDIUM",
      "HIGH",
      "URGENT",
    ];

    const byPriority = priorityNames.map((priority) => ({
      name: priority,
      value: tasks.filter(
        (task) => task.priority === priority
      ).length,
    }));

    /**
     * Tasks grouped by status.
     */
    const statusNames = [
      "TODO",
      "IN PROGRESS",
      "DONE",
    ];

    const byStatus = statusNames.map((status) => ({
      name: status,
      value: tasks.filter(
        (task) => task.status === status
      ).length,
    }));

    /**
     * Tasks grouped by assignee.
     */
    const memberMap = {};

    tasks.forEach((task) => {
      const memberName =
        task.assignee?.name || "Unassigned";

      if (!memberMap[memberName]) {
        memberMap[memberName] = 0;
      }

      memberMap[memberName] += 1;
    });

    const membersData = Object.entries(memberMap)
      .map(([name, taskCount]) => ({
        name,
        tasks: taskCount,
      }))
      .sort((a, b) => b.tasks - a.tasks);

    /**
     * Project progress.
     */
    const projectMap = {};

    tasks.forEach((task) => {
      const projectId =
        task.project?._id?.toString() || "unknown";

      const projectName =
        task.project?.name || "Unknown Project";

      if (!projectMap[projectId]) {
        projectMap[projectId] = {
          id: projectId,
          name: projectName,
          color: task.project?.color || "#6366f1",
          totalTasks: 0,
          completedTasks: 0,
          progressTotal: 0,
        };
      }

      projectMap[projectId].totalTasks += 1;

      projectMap[projectId].progressTotal += Number(
        task.progress || 0
      );

      if (task.status === "DONE") {
        projectMap[projectId].completedTasks += 1;
      }
    });

    const projectProgress = Object.values(projectMap).map(
      (project) => ({
        id: project.id,
        name: project.name,
        color: project.color,
        totalTasks: project.totalTasks,
        completedTasks: project.completedTasks,
        progress:
          project.totalTasks > 0
            ? Math.round(
                project.progressTotal /
                  project.totalTasks
              )
            : 0,
      })
    );

    /**
     * Recent activity based on recently created/updated tasks.
     */
    const recentActivity = tasks
      .slice(0, 10)
      .map((task) => ({
        id: task._id,
        title: task.title,
        status: task.status,
        priority: task.priority,
        type: task.type,
        progress: task.progress,
        assignee: task.assignee
          ? {
              id: task.assignee._id,
              name: task.assignee.name,
              avatar: task.assignee.avatar || "",
            }
          : null,
        project: task.project
          ? {
              id: task.project._id,
              name: task.project.name,
              color: task.project.color,
            }
          : null,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      }));

    /**
     * Response.
     */
    return res.json({
      totalTasks,
      completedTasks,
      totalProjects,
      totalMembers,
      overallProgress,
      byPriority,
      byStatus,
      membersData,
      projectProgress,
      recentActivity,
    });
  } catch (error) {
    console.error(
      "Analytics route error:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Failed to load analytics",
    });
  }
});

export default router;