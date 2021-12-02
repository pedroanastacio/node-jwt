import { generateToken } from '../services/auth'

class UsersController {

    constructor(Users) {
        this.Users = Users
    }

    async login(req, res) {
        const { username, password } = req.body

        try {
            const user = await this.Users.findOne({ 'username': username, 'password': password })

            if (user) {
                const payload = {
                    sub: 1,
                    id: user._id,
                    name: user.name,
                    roles: user.admin ? ['admin'] : []
                }

                const token = generateToken(payload)
        
                return res.send({
                    token
                })
            }

            res.status(404).send({ error: "Could not find the user" })

        } catch (error) {
            res.send(error)
        }     
    }

    async create(req, res) {
        try {
            const user = new this.Users(req.body)
            await user.save()

            res.status(201).send('Created user')
        } catch (error) {
            res.send(error)
        }
    }

    async find(req, res) {
        const { id } = req.params
        const query = {}

        if (id)
            query._id = id

        try {
            const users = await this.Users.find(query)
            res.send({ users })

        } catch (error) {
            res.send(error)
        }
    }

    async update(req, res) {
        const { id } = req.params

        if (!id)
            return res.status(400).send({ error: "User ID is missing" })

        try {
            const updatedUser = await this.Users.findOneAndUpdate({ _id: id }, req.body, {
                new: true
            })

            if (updatedUser)
                return res.send('Updated user')

            res.status(409).send({ error: 'Could not update the user' })

        } catch (error) {
            res.send(error)
        }
    }

    async delete(req, res) {
        const { id } = req.params

        if (!id)
            return res.status(400).send({ error: "User ID is missing" })
        
        try {
            const deletedUser = await this.Users.deleteOne({ _id: id })

            if(deletedUser.deletedCount)
                return res.send("Deleted user")
            
            res.status(409).send({ error: "Could not delete the user" })

        } catch (error) {
            res.send(error)
        }
    }
}

export default UsersController
