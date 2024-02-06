import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    // console.log('will you just fucking look right here please', token);
    if (!token) return false;

    try {
        const authUserInfo = await jwt.verify(token, "default_secret_key");

        // console.log(authUserInfo);
        if (authUserInfo) return authUserInfo;
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default AuthUser;