'use client'

export function AgentSVG1({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-colors duration-300 group-hover:stroke-[#D4A574] ${className}`}
      stroke="#8C9E8E"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head */}
      <rect x="25" y="10" width="30" height="24" rx="4" />
      {/* Eyes */}
      <circle cx="35" cy="22" r="2.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      <circle cx="45" cy="22" r="2.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Antenna */}
      <line x1="40" y1="10" x2="40" y2="3" />
      <circle cx="40" cy="2" r="1.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Body */}
      <rect x="22" y="38" width="36" height="30" rx="3" />
      {/* Circuit lines */}
      <line x1="30" y1="48" x2="50" y2="48" />
      <line x1="30" y1="53" x2="44" y2="53" />
      <line x1="30" y1="58" x2="48" y2="58" />
      {/* Arms */}
      <line x1="22" y1="45" x2="10" y2="55" />
      <line x1="58" y1="45" x2="70" y2="55" />
      {/* Hands */}
      <circle cx="10" cy="55" r="2" />
      <circle cx="70" cy="55" r="2" />
      {/* Legs */}
      <line x1="32" y1="68" x2="28" y2="88" />
      <line x1="48" y1="68" x2="52" y2="88" />
      {/* Feet */}
      <line x1="24" y1="88" x2="32" y2="88" />
      <line x1="48" y1="88" x2="56" y2="88" />
    </svg>
  )
}

export function AgentSVG2({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-colors duration-300 group-hover:stroke-[#D4A574] ${className}`}
      stroke="#8C9E8E"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hexagonal head */}
      <polygon points="40,8 55,16 55,30 40,38 25,30 25,16" />
      {/* Eye visor */}
      <line x1="30" y1="22" x2="50" y2="22" />
      <circle cx="35" cy="22" r="2" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      <circle cx="45" cy="22" r="2" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Neck */}
      <line x1="40" y1="38" x2="40" y2="44" />
      {/* Trapezoid body */}
      <polygon points="26,44 54,44 58,72 22,72" />
      {/* Core circle */}
      <circle cx="40" cy="58" r="6" />
      <circle cx="40" cy="58" r="2.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Side modules */}
      <rect x="12" y="50" width="10" height="8" rx="1" />
      <rect x="58" y="50" width="10" height="8" rx="1" />
      {/* Legs */}
      <line x1="32" y1="72" x2="30" y2="90" />
      <line x1="48" y1="72" x2="50" y2="90" />
      {/* Feet */}
      <polygon points="24,90 36,90 34,94 26,94" />
      <polygon points="44,90 56,90 54,94 46,94" />
    </svg>
  )
}

export function AgentSVG3({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-colors duration-300 group-hover:stroke-[#D4A574] ${className}`}
      stroke="#8C9E8E"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Rounded head */}
      <ellipse cx="40" cy="20" rx="16" ry="14" />
      {/* Single eye band */}
      <line x1="28" y1="18" x2="52" y2="18" />
      <circle cx="34" cy="18" r="3" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      <circle cx="46" cy="18" r="3" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Antenna pair */}
      <line x1="30" y1="8" x2="26" y2="2" />
      <line x1="50" y1="8" x2="54" y2="2" />
      <circle cx="26" cy="2" r="1.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      <circle cx="54" cy="2" r="1.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Cylindrical body */}
      <rect x="24" y="36" width="32" height="34" rx="6" />
      {/* Data slots */}
      <line x1="32" y1="44" x2="48" y2="44" />
      <line x1="32" y1="50" x2="42" y2="50" />
      <line x1="32" y1="56" x2="46" y2="56" />
      <line x1="32" y1="62" x2="40" y2="62" />
      {/* Floating hands */}
      <circle cx="14" cy="52" r="4" />
      <line x1="24" y1="50" x2="18" y2="52" />
      <circle cx="66" cy="52" r="4" />
      <line x1="56" y1="50" x2="62" y2="52" />
      {/* Legs */}
      <line x1="34" y1="70" x2="30" y2="90" />
      <line x1="46" y1="70" x2="50" y2="90" />
      <line x1="26" y1="90" x2="34" y2="90" />
      <line x1="46" y1="90" x2="54" y2="90" />
    </svg>
  )
}

export function AgentSVG4({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-colors duration-300 group-hover:stroke-[#D4A574] ${className}`}
      stroke="#8C9E8E"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Diamond head */}
      <polygon points="40,6 56,20 40,34 24,20" />
      {/* Central eye */}
      <circle cx="40" cy="20" r="4" />
      <circle cx="40" cy="20" r="1.5" fill="#8C9E8E" className="group-hover:fill-[#D4A574] transition-colors duration-300" />
      {/* Connector */}
      <line x1="40" y1="34" x2="40" y2="40" />
      {/* Inverted trapezoid body */}
      <polygon points="20,40 60,40 54,72 26,72" />
      {/* Shield emblem */}
      <polygon points="40,48 48,54 46,64 40,68 34,64 32,54" />
      <line x1="40" y1="52" x2="40" y2="64" />
      {/* Arm joints */}
      <circle cx="16" cy="48" r="3" />
      <circle cx="64" cy="48" r="3" />
      <line x1="20" y1="46" x2="19" y2="48" />
      <line x1="60" y1="46" x2="61" y2="48" />
      {/* Arm extensions */}
      <line x1="16" y1="51" x2="10" y2="64" />
      <line x1="64" y1="51" x2="70" y2="64" />
      <circle cx="10" cy="64" r="2" />
      <circle cx="70" cy="64" r="2" />
      {/* Legs */}
      <line x1="32" y1="72" x2="28" y2="92" />
      <line x1="48" y1="72" x2="52" y2="92" />
      <line x1="24" y1="92" x2="32" y2="92" />
      <line x1="48" y1="92" x2="56" y2="92" />
    </svg>
  )
}
