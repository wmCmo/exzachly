import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
    return (
        <div
            onClick={() => onChange(!checked)}
            className={`select-none cursor-pointer h-8 w-16 ${checked ? 'dark:bg-neutral-800 bg-neutral-500' : 'bg-white'} shadow-md rounded-full flex items-center p-1 transition-colors ease-in-out duration-300`}
        >
            <div
                className={`h-6 w-6 ${checked ? 'dark:bg-neutral-700 bg-neutral-400' : 'bg-blue-500 shadow-blue-500/50 shadow-sm'} rounded-full transition-transform ${checked ? 'translate-x-8' : ''} ease-in-out duration-300`}
            ></div>
        </div>
    );
}