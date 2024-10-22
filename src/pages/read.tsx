import { useState } from 'react';
import '../styles/globals.css';

const MatchComponent: React.FC = () => {
const [keyword, setKeyword] = useState<string>('');
const [results, setResults] = useState<{ key:number; word: string; japanese: string; wordClass:string; sample: string; memo:string }[]>([]);
const [status, setStatus] = useState('success'); 
const [message, setMessage] = useState<string>('');

const handleSearch = async () => {
const response = await fetch(`/api/search?keyword=${keyword}`);
const data = await response.json();
setMessage(data.message);
if (response.status === 200) {
    setResults(data);
    setStatus('success');
}
else{
    setStatus('error');
}
};

return (
<div>
<input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Enter keyword"/>
<button onClick={handleSearch}>Search</button>

{status === 'error' && (<p>message: {message}</p>)}
{status === 'success' && (
<ul>
{
results.map((item, index) => (
<li key={index}>
<p>Key: {item.key}</p>   
<p>Word: {item.word}</p>
<p>Japanese: {item.japanese}</p>
<p>WordClass: {item.wordClass}</p>
<p>Sample: {item.sample}</p>
<p>Memo: {item.memo}</p>
</li>
))
}
</ul>
)}
</div>
);
};

export default MatchComponent;
