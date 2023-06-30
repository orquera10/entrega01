import Router from '../router.js';
import Users from '../../dao/dbManager/user.manager.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { isValidPassword, generateToken, createHash } from '../../utils.js';
import Carts from '../../dao/dbManager/carts.manager.js';

const usersManager = new Users();
const cartManager = new Carts();

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            const { email, password } = req.body;
            const user = await usersManager.getByEmail(email);
            
            if (!user) return res.sendClientError('incorrect credentials');

            const comparePassword = isValidPassword(user, password);

            if (!comparePassword) {
                return res.sendClientError('incorrect credentials');
            }

            const accessToken = generateToken(user);
            res.cookie(
                'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
            ).sendSuccess({ accessToken });
            // res.sendSuccess({ accessToken });
        });


        this.get('/logout',['PUBLIC'], passportStrategiesEnum.NOTHING, (req, res) => {
            res.clearCookie("coderCookieToken").redirect('/login')
        });
        

        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {
                const { first_name, last_name, email, password, age } = req.body;

                if (!first_name || !last_name || !email || !password || !age)
                    return res.sendClientError('incomplete values')

                const exists = await usersManager.getByEmail(email);

                if (exists)
                    return res.sendClientError('user already exists')
                
                const cart = await cartManager.addCarts({ products: [] });

                const hashedPassword = createHash(password);

                const newUser = {
                    ...req.body, role: "USER", cart: cart._id
                };

                newUser.password = hashedPassword;

                const result = await usersManager.save(newUser);

                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error.message);
            }
        })

        this.get('/github', ['PUBLIC'], passportStrategiesEnum.github, async (req, res) => {
            res.sendSuccess("User registered")
        })

        this.get('/github-callback', ['PUBLIC'], passportStrategiesEnum.github, async (req, res) => {
            
            const accessToken = generateToken(req.user);
            
            res.cookie(
                'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
            )
            res.redirect('/')
        })

        this.get('/google', ['PUBLIC'], passportStrategiesEnum.google, async (req, res) => {
            res.sendSuccess("User registered")
        })

        this.get('/google-callback', ['PUBLIC'], passportStrategiesEnum.google, async (req, res) => {
            
            const accessToken = generateToken(req.user);
            
            res.cookie(
                'coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }
            )
            res.redirect('/')
        })
    }
    
}


