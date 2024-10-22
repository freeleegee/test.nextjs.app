import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data = {
    key:number;
    word: string;
    wordClass:string;
    japanese: string;
    sample: string;
    memo:string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
const newRecord: Data = req.body;

const filePath = path.join(process.cwd(), 'data.json');
const jsonData = fs.readFileSync(filePath, 'utf-8');

if (jsonData) {
    const data: Data[] = JSON.parse(jsonData);
    data.push(newRecord);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
else{
    const groupRecords = [];
    groupRecords.push(newRecord);
    fs.writeFileSync(filePath, JSON.stringify(groupRecords, null, 2), 'utf-8');
}

res.status(200).json({ message: 'Record added successfully' });
} else {
res.status(405).json({ message: 'Method not allowed' });
}
}