import React, { useState, useEffect } from 'react';
import styles from './style.module.css';

const ColorConverter = () => {
    const [color, setColor] = useState('');
    const [convertedColor, setConvertedColor] = useState({ rgb: '', rgba: '', hsl: '' });

    useEffect(() => {
        if (color) {
            convertColor(color);
        }
    }, [color]);

    const convertColor = (input) => {
        try {
            const ctx = document.createElement('canvas').getContext('2d');
            ctx.fillStyle = input;
            const rgb = ctx.fillStyle;
            const rgba = rgb.replace('rgb', 'rgba').replace(')', ', 1)');

            const [r, g, b] = rgb.match(/\d+/g).map(Number);
            const hsl = rgbToHsl(r, g, b);

            setConvertedColor({ rgb, rgba, hsl });
        } catch (error) {
            setConvertedColor({ rgb: 'Invalid color', rgba: 'Invalid color', hsl: 'Invalid color' });
        }
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
    };

    return (
        <div className={styles.converterContainer}>
            <h1>Color Converter</h1>
            <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#FF5733 or rgb(255,87,51)"
                className={styles.input}
            />
            <div className={styles.resultSection}>
                <p className={styles.resultBox}><strong>RGB:</strong> {convertedColor.rgb}</p>
                <p className={styles.resultBox}><strong>RGBA:</strong> {convertedColor.rgba}</p>
                <p className={styles.resultBox}><strong>HSL:</strong> {convertedColor.hsl}</p>
                <div className={styles.colorPreview} style={{ backgroundColor: color }} />
            </div>
        </div>
    );
};

export default ColorConverter;