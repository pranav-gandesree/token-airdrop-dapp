import React from "react";

type CardProps = {
  title: string;
  number: number;
  subtitle: string;
  className?: string;
};

const Card: React.FC<CardProps> = ({ title, number, subtitle, className }) => {
  return (
    <div className={`w-64 h-40 bg-gray-100 rounded-lg shadow-md p-4 flex flex-col items-center justify-center ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{number}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default Card;
