import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data.json');
    let fileContents = '';

    try {
        fileContents = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        return res.status(500).json({ message: 'Error reading file' });
        console.error('Fetch error:', error);
    }
    if (!fileContents) {
        return res.status(200).json({ maxKey: 0 });
    }
    const records = JSON.parse(fileContents);
    const maxKey = Math.max(...records.map((record: { key: number }) => record.key), 0);
    res.status(200).json({ maxKey });
} else {
    res.status(405).json({ message: 'Method not allowed' });
}
}
