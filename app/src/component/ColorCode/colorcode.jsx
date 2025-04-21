import React, { useState, useEffect } from 'react';
import namer from 'color-namer'; // for getting closest name
import styles from './style.module.css';

const ColorConverter = () => {
    const [color, setColor] = useState('');
    const [convertedColor, setConvertedColor] = useState({
        rgb: '',
        rgba: '',
        hsl: '',
        name: '',
    });

    useEffect(() => {
        if (color.trim()) {
            convertColor(color.trim());
        }
    }, [color]);

    const convertColor = (input) => {
        try {
            const ctx = document.createElement('canvas').getContext('2d');
            ctx.fillStyle = input;
            const computed = ctx.fillStyle;

            if (!computed || computed === 'transparent') {
                throw new Error('Invalid color');
            }

            let r, g, b;
            if (computed.startsWith('rgb')) {
                const rgbMatch = computed.match(/\d+/g);
                if (!rgbMatch || rgbMatch.length < 3) throw new Error('Invalid RGB');
                [r, g, b] = rgbMatch.map(Number);
            } else if (computed.startsWith('#')) {
                const hex = computed.slice(1);
                if (hex.length === 3) {
                    r = parseInt(hex[0] + hex[0], 16);
                    g = parseInt(hex[1] + hex[1], 16);
                    b = parseInt(hex[2] + hex[2], 16);
                } else if (hex.length === 6) {
                    r = parseInt(hex.substring(0, 2), 16);
                    g = parseInt(hex.substring(2, 4), 16);
                    b = parseInt(hex.substring(4, 6), 16);
                } else {
                    throw new Error('Invalid hex');
                }
            } else {
                throw new Error('Unsupported format');
            }

            const rgb = `rgb(${r}, ${g}, ${b})`;
            const rgba = `rgba(${r}, ${g}, ${b}, 1)`;
            const hsl = rgbToHsl(r, g, b);
            const hex = rgbToHex(r, g, b);
            const name = namer(hex).ntc[0].name;

            setConvertedColor({ rgb, rgba, hsl, name });
        } catch (err) {
            setConvertedColor({
                rgb: 'Invalid color',
                rgba: 'Invalid color',
                hsl: 'Invalid color',
                name: 'Unknown',
            });
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

    const rgbToHex = (r, g, b) =>
        '#' +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('');

    return (
        <div className={styles.converterContainer}>
            <h1>Color Converter</h1>
            <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#FF5733 or rgb(255,87,51) or red"
                className={styles.input}
            />
            <div className={styles.resultSection}>
                <p className={styles.resultBox}><strong>RGB:</strong> {convertedColor.rgb}</p>
                <p className={styles.resultBox}><strong>RGBA:</strong> {convertedColor.rgba}</p>
                <p className={styles.resultBox}><strong>HSL:</strong> {convertedColor.hsl}</p>
                <p className={styles.resultBox}><strong>Name:</strong> {convertedColor.name}</p>
                <div className={styles.colorPreview} style={{ backgroundColor: color }} />
            </div>
        </div>
    );
};

export default ColorConverter;
