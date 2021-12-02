import Express from 'express'
import bodyParser from 'body-parser'

import {
    verifyToken,
    protectRoute
} from './middlewares/auth'
import database from './database'
import userRoute from './routes/userRoute'

const app = Express()
const port = 3000

app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(Express.json()) 
app.use(verifyToken)

userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

database.connect().then(() => {
    app.listen(port, () => console.log('Api rodando na porta 3000'))
})
