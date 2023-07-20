import Router from '../router.js';
import { passportStrategiesEnum } from '../../config/enums.js';
import { userLogin, userCurrent , userLogout, userRegister, logGithub, logFacebook, logGoogle, callbackGithub, callbackGoogle, callbackFacebook } from '../../controllers/users.controller.js';


export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, userLogin);
        this.get('/logout',['PUBLIC'], passportStrategiesEnum.NOTHING, userLogout);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, userRegister);
        this.get('/current', ['ADMIN','USER'], passportStrategiesEnum.JWT, userCurrent);
        this.get('/github', ['PUBLIC'], passportStrategiesEnum.github, logGithub);
        this.get('/github-callback', ['PUBLIC'], passportStrategiesEnum.github, callbackGithub);
        this.get('/google', ['PUBLIC'], passportStrategiesEnum.google, logGoogle);
        this.get('/google-callback', ['PUBLIC'], passportStrategiesEnum.google, callbackGoogle);
        this.get('/facebook', ['PUBLIC'], passportStrategiesEnum.facebook, logFacebook);
        this.get('/facebook-callback', ['PUBLIC'], passportStrategiesEnum.facebook, callbackFacebook);
    }
    
}