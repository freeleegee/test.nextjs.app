import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data = {
    key: number;
    word: string;
    japanese: string;
    wordClass: string;
    sample: string;
    memo: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
const { keyword = '' } = req.query;
console.log("the keyword is", keyword);

const filePath = path.join(process.cwd(), 'data.json');

try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data: Data[] = JSON.parse(jsonData);
    const filteredData = data.filter(item => item.word.toLowerCase().includes((keyword as string).toLowerCase()));
    res.status(200).json(filteredData);
} catch (error) {
    return res.status(500).json({ message: 'Error reading file' });
    console.error('Fetch error:', error);
}

}
