"use client";

import type { DictionaryType } from '@/app/dictionaries/en';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { defaultRecord } from '@/utils/defaultRecord';

export type RecordMap = { ja: number; en: number; };

export default function TimerClient({ dict, locale }: { dict: DictionaryType; locale: keyof RecordMap; }) {
    const [start, setStart] = useState(false);
    const [second, setSecond] = useState(0);
    const [record, setRecord] = useState(defaultRecord);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const raw = localStorage.getItem('record');
            if (raw) {
                const parsed = JSON.parse(raw) as Partial<RecordMap>;
                setRecord(prev => ({ ...prev, ...parsed }));
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (start && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setSecond(prev => prev + 1);
            }, 1000);
        }

        return () => {
            clearTimer();
        };
    }, [start, clearTimer]);

    useEffect(() => {
        if (start && second >= 300) {
            stopAndSave();
        }
    }, [second, start]);

    const stopAndSave = () => {
        clearTimer();
        setStart(false);
        setRecord(prev => {
            const next = { ...prev, [locale]: second } as RecordMap;
            try {
                localStorage.setItem('record', JSON.stringify(next));
            } catch (e) {
                console.error(e);
            }
            return next;
        });
    };

    function resetTime() {
        setStart(false);
        setSecond(0);
        clearTimer();
    }

    const min = Math.trunc(second / 60);
    const sec = second % 60;

    return (
        <div className='text-neutral-800 dark:text-white'>
            <Link href={`/${locale}/tools/char-count`} className='bg-neutral-100 hover:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 px-4 py-2 rounded-md font-bold'>👈 {dict.charCount.speechTimer.back} <span className='font-mono text-neutral-500 bg-neutral-300 dark:text-neutral-400 dark:bg-neutral-800 px-1 rounded-sm ml-2'>{dict.univeral.new}</span></Link>
            <h1 className='text-vw leading-none sm:text-7xl font-bold mt-8'>{dict.charCount.speechTimer.title}</h1>
            <div className='mt-8 bg-white/40 dark:bg-neutral-950 rounded-md py-2 px-4'>
                <h3>
                    {start ? <b>{dict.charCount.speechTimer.timed}</b> : <b>{dict.charCount.speechTimer.prepare}</b>}
                </h3>
                <p><b>{dict.charCount.speechTimer.record[0]}</b>: {Boolean(record[locale]) ? Math.trunc(dict.charCount.speechTimer.limit * 60 / record[locale]) : 0} {dict.charCount.speechTimer.record[1]}</p>
            </div>
            <div className="sm:flex gap-8">
                <div className='px-4 bg-neutral-100 dark:bg-neutral-800 flex sm:flex-col sm:justify-center sm:gap-4 rounded-md mt-8 items-center justify-between py-4'>
                    {<button
                        className='bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-700 px-2 py-1 rounded-md font-bold'
                        onClick={(!start && second > 0)
                            ? resetTime
                            : () => {
                                if (start) {
                                    stopAndSave();
                                } else {
                                    setStart(true);
                                }
                            }}
                    >
                        {start ? (dict.charCount.speechTimer.stop) : (second > 0) ? (dict.charCount.speechTimer.reset) : (dict.charCount.speechTimer.start)}
                    </button>}
                    <h2 className='font-bold text-5xl font-mono tabular-nums'>{min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}</h2>
                </div>
                <div>
                    <h2 className='mt-4 font-bold text-2xl'>{dict.charCount.speechTimer.instruct} <span className='font-mono dark:text-neutral-600'>({dict.charCount.speechTimer.limit} {dict.charCount.speechTimer.unit})</span></h2>
                    <p className='bg-neutral-100 dark:bg-neutral-800 mt-2 rounded-md p-4 text-sm/8 font-serif'>{dict.charCount.speechTimer.passage}</p>
                </div>
            </div>
        </div>
    );
}
