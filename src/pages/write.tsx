import { useState } from 'react';
import '../styles/globals.css';

const WriteRecord: React.FC = () => {
const [word, setWord] = useState<string>('');
const [japanese, setJapanese] = useState<string>('');
const [wordClass, setWordClass] = useState<string>('');
const [sample, setSample] = useState<string>('');
const [memo, setMemo] = useState<string>('');
const [message, setMessage] = useState<string>('');

const handleAddRecord = async () => {

    const response = await fetch('/api/getMaxKey', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        });
    const data = await response.json();
    const key = data.maxKey + 1;
    console.log("key is",key);
    const newRecord = { key, word, japanese, wordClass,sample,memo };

    const response1 = await fetch('/api/addRecord', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
    });
    const result = await response1.json();
        setWord('');
        setJapanese('');
        setWordClass('');
        setSample('');
        setMemo('');
        setMessage(result.message);
};

return (
    <div>
        <ul>
        <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter word"
        />
        </ul>

        <ul>
        <input
        type="text"
        value={japanese}
        onChange={(e) => setJapanese(e.target.value)}
        placeholder="Enter Japanese translation"
        />
        </ul>

        <ul>
        <input
        type="text"
        value={wordClass}
        onChange={(e) => setWordClass(e.target.value)}
        placeholder="Enter wordClass translation"
        />
        </ul>

        <ul>
        <input
        type="text"
        value={sample}
        onChange={(e) => setSample(e.target.value)}
        placeholder="Enter sample sentence"
        />
        </ul>

        <ul>
        <input
        type="text"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="Enter memo sentence"
        />
        </ul>

        <button onClick={handleAddRecord}>Add Record</button>
        {message && <p>{message}</p>}
    </div>
);
};

export default WriteRecord;