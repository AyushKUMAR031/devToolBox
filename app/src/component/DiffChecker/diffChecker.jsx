import { useState } from 'react';
import { diffWords } from 'diff';
import sheet from './style.module.css';

export default function DiffChecker() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [diffResult, setDiffResult] = useState([]);

    function handleCompare() {
        const result = diffWords(text1, text2);
        setDiffResult(result);
    }

    return (
        <div className={sheet.diffContainer}>
            <h1>Diff Checker</h1>
            <div className={sheet.inputSection}>
                <textarea 
                    placeholder="Enter text 1..." 
                    value={text1} 
                    onChange={(e) => setText1(e.target.value)}
                />
                <textarea 
                    placeholder="Enter text 2..." 
                    value={text2} 
                    onChange={(e) => setText2(e.target.value)}
                />
            </div>
            <button 
                className={sheet.compareBtn} 
                onClick={handleCompare}
                disabled={!text1.trim() || !text2.trim()}
            >
                Compare
            </button>

            <div className={sheet.resultSection}>
                {diffResult.map((part, index) => (
                    <span
                        key={index}
                        className={
                            part.added 
                                ? sheet.added 
                                : part.removed 
                                ? sheet.removed 
                                : sheet.normal
                        }
                    >
                        {part.value}
                    </span>
                ))}
            </div>
        </div>
    );
}
