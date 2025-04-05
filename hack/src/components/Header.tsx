import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 animate-fadeIn">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-gray-500 animate-fadeIn delay-100">{subtitle}</p>}
    </div>
  );
}