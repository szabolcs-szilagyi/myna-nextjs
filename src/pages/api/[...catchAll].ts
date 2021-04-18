import { Backend } from "../../backend/main";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => new Promise(async resolve => {
  const backend = new Backend();
  const listener = await backend.getListener();
  listener(req, res);
  res.on("finish", resolve);
})
