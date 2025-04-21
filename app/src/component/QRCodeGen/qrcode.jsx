import QRCode from "react-qr-code";
import { useState, useEffect, useRef } from "react";
import sheet from "./style.module.css";

export default function QRCodeGen() {
    const [qrCode, setQRCode] = useState("");
    const [input, setInput] = useState("");
    const [qrSize, setQrSize] = useState(300); // Default size

    const qrRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (qrRef.current) {
                setQrSize(Math.min(qrRef.current.clientWidth * 0.8, 300));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size setup

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleGenerateQR() {
        setQRCode(input);
        setInput('');
    }

    return (
        <div className={sheet.design}>
            <h1>QR Code Generator</h1>
            <center className={sheet.qrcontainer} ref={qrRef}>
                <div>
                    <input 
                        onChange={(e) => setInput(e.target.value)}
                        type="text" 
                        name="qr-code" 
                        value={input} 
                        placeholder="Enter your data here..." 
                    />
                    <button  
                        disabled={input && input.trim() !== "" ? false : true} 
                        onClick={handleGenerateQR}
                    >
                        Generate
                    </button>
                </div>
                <div 
                    className={
                        qrCode 
                        ? sheet.qrVisible 
                        : `${sheet.qrVisible} ${sheet.qrBlur}`
                    }
                >
                    <QRCode 
                        id="qr-code-value" 
                        value={qrCode} 
                        size={qrSize} 
                        bgColor="#fff"
                    />
                </div>
            </center>
        </div>
    )
}
