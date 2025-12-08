import React from 'react';
import { THEME } from './theme';

import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    href?: string;
}

export const PrimaryButton = ({ children, onClick, className = '', href }: ButtonProps) => {
    const baseStyles = `flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-90 active:scale-95 ${className}`;
    const styles = { backgroundColor: THEME.colors.primary, color: 'white' };

    if (href) {
        return (
            <Link href={href} className={baseStyles} style={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={baseStyles}
            style={styles}
        >
            {children}
        </button>
    );
};

export const SecondaryButton = ({ children, onClick, className = '', href }: ButtonProps) => {
    const baseStyles = `flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 border hover:bg-gray-50 active:scale-95 ${className}`;
    const styles = {
        backgroundColor: 'white',
        borderColor: THEME.colors.primary,
        color: THEME.colors.primary
    };

    if (href) {
        return (
            <Link href={href} className={baseStyles} style={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={baseStyles}
            style={styles}
        >
            {children}
        </button>
    );
};

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
