import React from 'react';

export const BrandLogo: React.FC = () => {
    return (
        <div dir="ltr" className="flex items-center gap-1 ps-2 select-none">
            <div className="text-[44px] font-serif font-bold text-ink leading-[0.85] tracking-tight">
                Souk<br />Bladi
            </div>

            <div className="w-[58px] h-[76px] mt-1 relative shrink-0">
                <svg
                    viewBox="0 0 100 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full overflow-visible"
                    aria-hidden="true"
                >
                    {/* Main stems */}
                    <path d="M42 12 Q 55 45 45 105" stroke="#403328" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M45 25 Q 70 30 72 38" stroke="#403328" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M48 55 Q 75 55 75 65" stroke="#403328" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <path d="M46 75 Q 60 90 62 95" stroke="#403328" strokeWidth="2" fill="none" strokeLinecap="round" />

                    {/* Top left leaf */}
                    <g>
                        <path d="M44 18 Q 15 10 10 32 Q 30 42 47 28 Z" fill="#5C7243" />
                        <path d="M44 18 Q 25 25 15 30" stroke="#8FA374" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Top right leaf */}
                    <g>
                        <path d="M44 15 Q 75 -5 85 15 Q 65 30 46 22 Z" fill="#5C7243" />
                        <path d="M44 15 Q 65 10 80 15" stroke="#8FA374" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Bottom left leaf */}
                    <g>
                        <path d="M46 80 Q 25 105 30 120 Q 55 110 47 90 Z" fill="#5C7243" />
                        <path d="M46 80 Q 40 105 35 115" stroke="#8FA374" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </g>

                    {/* Olives */}
                    <g transform="translate(26, 56) rotate(-35)">
                        <ellipse cx="0" cy="0" rx="14" ry="19" fill="#B98838" />
                        <path d="M 6 -10 Q 12 0 6 10" stroke="#E4C381" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </g>
                    <g transform="translate(70, 38) rotate(45)">
                        <ellipse cx="0" cy="0" rx="12" ry="17" fill="#B98838" />
                        <path d="M 5 -8 Q 10 0 5 8" stroke="#E4C381" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </g>
                    <g transform="translate(74, 72) rotate(-15)">
                        <ellipse cx="0" cy="0" rx="13" ry="18" fill="#B98838" />
                        <path d="M 6 -9 Q 11 0 6 9" stroke="#E4C381" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </g>
                    <g transform="translate(62, 102) rotate(15)">
                        <ellipse cx="0" cy="0" rx="12" ry="17" fill="#B98838" />
                        <path d="M 5 -9 Q 10 0 5 9" stroke="#E4C381" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </g>
                </svg>
            </div>
        </div>
    );
};