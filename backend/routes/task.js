const router = require('express').Router()
const tasksController = require('../controllers/task')
const requireRoles = require('../middleware/requireRoles')
const ROLES_LIST = require('../config/rolesList')

// Routes accessible by all authenticated users
router.route('/')
  .get(requireRoles([...Object.values(ROLES_LIST)]), tasksController.getAll)

// Get notifications for the authenticated user
router.route('/notifications')
  .get(requireRoles([...Object.values(ROLES_LIST)]), tasksController.getNotifications)

// Mark notification as read
router.route('/notifications/:taskId/:notificationId')
  .patch(requireRoles([...Object.values(ROLES_LIST)]), tasksController.markNotificationRead)

// Add comment to task
router.route('/:id/comments')
  .post(requireRoles([...Object.values(ROLES_LIST)]), tasksController.addComment)

// PATCH route for all authenticated users (for status update)
router.route('/:id')
  .patch(requireRoles([...Object.values(ROLES_LIST)]), tasksController.update)

// Admin and Root only routes
router.use(requireRoles([ROLES_LIST.Root, ROLES_LIST.Admin]))

router.route('/')
  .post(tasksController.create)

router.route('/:id')
  .get(tasksController.getById)
  .delete(tasksController.delete)

router.route('/assign')
  .post(tasksController.assignUser)

router.route('/assign/:id')
  .get(tasksController.getAssignUser)
  .delete(tasksController.deleteAssign)

router.route('/unassigned/:taskId')
  .get(tasksController.getUnassignedUsers)

router.route('/inspect')
  .post(tasksController.inspect)

module.exports = router