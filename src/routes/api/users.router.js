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

        // this.get('/logout', (req, res) => {
        //     req.session.destroy(err => {
        //         if(err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        //         res.redirect('/products')
        //     })
        // });
        

        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            try {
                const { first_name, last_name, role, email, password, age } = req.body;

                if (!first_name || !last_name || !role || !email || !password || !age)
                    return res.sendClientError('incomplete values')

                const exists = await usersManager.getByEmail(email);

                if (exists)
                    return res.sendClientError('user already exists')
                
                const hashedPassword = createHash(password);

                const newUser = {
                    ...req.body
                };

                newUser.password = hashedPassword;

                const result = await usersManager.save(newUser);

                res.sendSuccess(result)
            } catch (error) {
                res.sendServerError(error.message);
            }
        })

        // this.get('/current', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            
        // })
    }
    
}


