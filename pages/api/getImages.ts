// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import getImages from '../../utils/getImages';

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const results = getImages(req.body.url)
    res.status(200).json(results);
}
