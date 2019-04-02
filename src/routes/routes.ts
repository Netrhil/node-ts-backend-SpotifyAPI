import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    res.status(200).send({
        message: "GET request successful!!!"
      });
});

export default router;