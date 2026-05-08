/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Admin User APIs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *
 *     responses:
 *       200:
 *         description: Users fetched
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *
 *     responses:
 *       200:
 *         description: User fetched
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 * 
 *     responses:
 *       200:
 *         description: User deleted
 */