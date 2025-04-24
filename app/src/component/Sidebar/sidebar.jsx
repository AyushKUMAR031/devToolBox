import { useState } from 'react';
import sheet from './style.module.css';
import QRCodeGen from '../QRCodeGen/qrcode';
import DiffChecker from '../DiffChecker/diffChecker';
import CodeConverter from '../CodeConvertor/codeConv';
import ColorConverter from '../ColorCode/colorcode';

export default function Sidebar() {
    const [activeTool, setActiveTool] = useState('QRCodeGen');

    const renderContent = () => {
        switch (activeTool) {
            case 'QRCodeGen': return <QRCodeGen />;
            case 'DiffChecker': return <DiffChecker />;
            case 'CodeConverter': return <CodeConverter />;
            case 'ColorCodeConverter': return <ColorConverter />;
            default: return <QRCodeGen />;
        }
    };

    return (
        <div className={sheet.container}>
            <div className={sheet.sidebar}>
                <h2 className={sheet.title}>Tools Ayush</h2>
                <button onClick={() => setActiveTool('QRCodeGen')}>QR-Code Generator</button>
                <button onClick={() => setActiveTool('DiffChecker')}>Diff Checker</button>
                <button onClick={() => setActiveTool('CodeConverter')}>Code Converter</button>
                <button onClick={() => setActiveTool('ColorCodeConverter')}>Color Code Converter</button>
            </div>

            <div className={sheet.content}>
                {renderContent()}
            </div>
        </div>
    );
}
