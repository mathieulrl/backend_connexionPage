import User from './db/schemas/user-schema.js'
import { hashPassword } from './utils/crypto-utils.js'

export function registerRoutes(app) {
  // function qui récupère les données de la base de données
  app.get('/users', async function handler(request, reply) {
    const users = await User.find()
    return users
  })

  app.get('/users/:id', async function handler(request, reply) {
    const user = await User.findById(request.params.id)
    return user
  })

  app.post('/users', async function handler(request, reply) {
    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: await hashPassword(request.body.password)
    })
    await user.save()
    console.log('user saved') 
    return request.body
  })

  app.post('/auth/token', async function handler(request, reply) {
    
    const username= request.body.username
    const password= await hashPassword(request.body.password)

    const user = await User.findOne({
      $or:[
      {username: username},
      {email: username}
    ]
  })
    if(!user){
      return reply.status(401).send({error: 'User not found'})
    }
    else {
      const isSamePassword = await user.comparePassword(password, user.password)
      if(!isSamePassword){
        return reply.status(401).send({error: 'Password incorrect'})
      }
      else {
        return {}
      }
      
    }

})



