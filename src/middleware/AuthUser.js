import jwt from 'jsonwebtoken'


export const dynamic = 'force-dynamic';


const AuthUser = async (req) => {

    const token = req.headers.get('Authorization')?.split(' ')[1];
    // console.log('--------000000-------->>>>>>', token);

    if (!token) return false;

    try {
        const AuthUserInfo = jwt.verify(token, "default_secret_key");
        if (AuthUserInfo) return AuthUserInfo;

        console.log(AuthUserInfo, '<<<<<<<**********_________---------------')

    } catch (error) {
        console.error(error);
        return false;
    }

};

export default AuthUser;
