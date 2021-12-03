import UsersController from '../controllers/user'
import { isAdminOrSameUser, protectRoute } from '../middlewares/auth'
import UserModel from '../models/users'

const usersController = new UsersController(UserModel)

const userRoute = (app) => {

	app.route('/login')
		.post((req, res) => {
			usersController.login(req, res)
		})

	app.route('/users/:id?')
		.post((req, res) => {
			usersController.create(req, res)
		})
		.get([protectRoute, isAdminOrSameUser], (req, res) => {
			usersController.find(req, res)
		})
		.put([protectRoute, isAdminOrSameUser], (req, res) => {
			usersController.update(req, res)
		})
		.delete([protectRoute, isAdminOrSameUser], (req, res) => {
			usersController.delete(req, res)
		})
}

module.exports = userRoute