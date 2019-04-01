import { Request, Response, Router } from "express";
import  { AuthApi, IAuthClass}  from '../services/spotify-api/auth-flow';

const router = Router();


router.get("/", async (req: Request, res: Response) => {

    const auth : IAuthClass = new AuthApi();
    const token = await auth.getToken();

    res.status(200).send({
        message: "GET request successful!!!" + token
      });
});

export default router;
