"use client";

import { DictionaryType } from '@/app/dictionaries/en';
import React, { useEffect, useRef, useState } from 'react';

export default function TimerClient({ dict }: { dict: DictionaryType; }) {
    const [start, setStart] = useState(false);
    const [second, setSecond] = useState(Number(localStorage.getItem('second')) || 0);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (start) {
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    setSecond(prev => prev + 1);
                }, 1000);
            }
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            localStorage.setItem('second', String(second));
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [start]);

    function resetTime() {
        setStart(false);
        setSecond(0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    useEffect(() => {
        if (second > 299) {
            resetTime();
        }
    }, [second]);

    const min = Math.trunc(second / 60);
    const sec = second % 60;

    return (
        <>
            <h1 className='text-vw leading-none sm:text-7xl font-bold'>Let see your speaking pace!</h1>
            <h3 className='mt-8 dark:bg-neutral-950 rounded-md py-2 px-4'>{start ? <b>Keep going!</b> : !start && second > 0 ? "Your speaking pace: " + Math.trunc(100 * 60 / second) + " words per minute" : <b>Click start to time your speech!</b>}</h3>
            <div className="sm:flex gap-8">
                <div className='px-4 bg-neutral-800 flex sm:flex-col sm:justify-center sm:gap-4 rounded-md mt-8 items-center justify-between py-4'>
                    {<button className='bg-neutral-900 px-2 py-1 rounded-md' onClick={(!start && second > 0) ? resetTime : () => setStart(prev => !prev)}>{start ? "I'm done!" : (second > 0) ? "Reset" : "Start!"}</button>}
                    <h2 className='font-bold text-5xl font-mono tabular-nums'>{min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}</h2>
                </div>
                <div>
                    <h2 className='mt-4 font-bold text-2xl'>Read this <span className='font-mono dark:text-neutral-600'>(100 words)</span></h2>
                    <p className='dark:bg-neutral-800 mt-2 rounded-md p-4 text-sm/8 font-serif'>Self-improvement is a lifelong journey of refining who you are and who you aspire to become. It begins with self-awareness—recognizing strengths, weaknesses, and patterns that shape your daily life. Growth comes from consistent effort: setting clear goals, building habits, and embracing challenges as opportunities to learn. Discipline fuels progress, but so does compassion—acknowledging setbacks without self-criticism. Reading, reflecting, and seeking feedback expand perspective, while mindfulness keeps you grounded in the present. True improvement isn’t about perfection; it’s about becoming a little better each day, aligning actions with values, and steadily moving toward the best version of yourself.</p>
                </div>
            </div>
        </>
    );
}
