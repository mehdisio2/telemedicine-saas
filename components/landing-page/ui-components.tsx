import React from 'react';
import { THEME } from './theme';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const PrimaryButton = ({ children, onClick, className = '' }: ButtonProps) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 active:scale-95 ${className}`}
        style={{ backgroundColor: THEME.colors.primary, color: 'white' }}
    >
        {children}
    </button>
);

export const SecondaryButton = ({ children, onClick, className = '' }: ButtonProps) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border hover:bg-gray-50 active:scale-95 ${className}`}
        style={{
            backgroundColor: 'white',
            borderColor: THEME.colors.primary,
            color: THEME.colors.primary
        }}
    >
        {children}
    </button>
);

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
    <div className="text-center mb-12">
        <h2
            className="text-3xl md:text-4xl mb-4"
            style={{ color: THEME.colors.black, fontWeight: 600 }}
        >
            {title}
        </h2>
        <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: THEME.colors.mediumGrey, fontWeight: 400 }}
        >
            {subtitle}
        </p>
    </div>
);
