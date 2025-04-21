import { useState } from 'react';
import sheet from './style.module.css';
import axios from 'axios';

export default function CodeConverter() {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [sourceLang, setSourceLang] = useState('cpp');
    const [targetLang, setTargetLang] = useState('java');
    const [loading, setLoading] = useState(false);


    const handleConvert = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/convert', {
                inputCode,
                sourceLang,
                targetLang
            });
            setOutputCode(response.data.convertedCode);
        } catch (error) {
            console.error('Conversion error:', error);
            setOutputCode('Conversion failed.');
        }
        setLoading(false);
    };

    return (
        <div className={sheet.converterContainer}>
            <h1 className={sheet.title}>Code Converter</h1>

            <div className={sheet.selectSection}>
                <label>
                    From:
                    <select
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                        className={sheet.dropdown}
                    >
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="c">C</option>
                        <option value="js">JavaScript</option>
                    </select>
                </label>

                <span className={sheet.arrow}>➔</span>

                <label>
                    To:
                    <select
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className={sheet.dropdown}
                    >
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="c">C</option>
                        <option value="js">JavaScript</option>
                    </select>
                </label>
            </div>

            <div className={sheet.editorSection}>
                <textarea
                    className={sheet.textArea}
                    placeholder="Enter your source code here..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                />

                <textarea
                    className={sheet.textArea}
                    placeholder="Converted code will appear here..."
                    value={outputCode}
                    readOnly
                />
            </div>

            {/* <button onClick={convertCode} className={sheet.convertButton} disabled={isLoading}>
                {isLoading ? 'Converting...' : 'Convert'}
            </button> */}

            <button onClick={handleConvert} disabled={loading}>
                {loading ? 'Converting...' : 'Convert'}
            </button>   
        </div>
    );
}
