import { Router } from 'express'
import UserModel from '../dao/models/user.models.js'
//import passport from 'passport'

const router = Router()

//Register
router.get('/register', (req, res) =>{
    res.render('session/register')
})
router.post('/register', async(req, res) =>{
    const userParams =req.body
    const user = new UserModel(userParams)
    await user.save()
    res.redirect('/session/login')
})

//Login
router.get('/login', (req, res) =>{
    res.render('session/login')
})
router.post('/login', async(req, res) => {
    const {email, password}= req.body

    const user = await UserModel.findOne({email, password}).lean().exec();
    if(!user) return res.status(401).render('errors/error', {error: 'Usuario o password invalido'})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        social: req.user.social
    }
    res.redirect('/api/products')
})


 
//Logout
router.get('/logout', async (req, res) => {
    if(error) return res.status(500).render('errors/error', {error: error})

    res.redirect('/session/login')
})
// router.get('/logins', (req, res) => {
//     res.render('logins')
// })


// router.get('/login-local', (req, res) => {
//     res.render('login')
// })
// router.post('/login-local', passport.authenticate('login', '/session/faillogin')   ,  async (req, res) => {
    
//     if(!req.user) return res.status(400).send('Invalid credentials')
//     req.session.user = req.user
    
//     res.send('Login Success')
// })
// router.get('/faillogin', (req, res) => {
//     res.json({error: 'Failed login'})
// })

// router.get('/register', passport.authenticate('register', {failureRedirect: '/session/failregister'}), async (req, res) => {
//     res.send('Register Success!!')
// })
// router.get('/failregister', async(req, res) => {
//     console.error('Failed Stragtregy');
//     res.send({error: 'Failed'})
// })

// router.get('/logout', (req, res) => req.session.destroy(err => {
//     if(err) res.send(err)
//     else res.send('logout ok')
// }) )


// router.get(
//     '/login-github',
//     passport.authenticate('github', {scope: ['user:email']}),
//     async (req, res) => {}
// )

// router.get(
//     '/githubcallback',
//     passport.authenticate('github', {failureRedirect: '/logins'}),
//     async(req, res) => {
//         console.log("Callback: ", req.user);
//         req.session.user = req.user
//         console.log(req.session);
//         res.redirect('/')
//     }
// )
// router.get(
//     '/login-google',
//     passport.authenticate('google', {scope: ['email', 'profile']}),
//     async (req, res) => {}
// )

// router.get(
//     '/googlecallback',
//     passport.authenticate('google', {failureRedirect: '/sessions/logins'}),
//     async(req, res) => {
//         console.log("Callback Google: ", req.user);
//         req.session.user = req.user
//         console.log(req.session);
//         res.redirect('/')
//     }
// )

export default Router