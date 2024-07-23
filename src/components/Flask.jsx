
export const Flask = ({ reactant }) => (
    <svg viewBox="0 0 100 200" className="flask">
        <defs>
        <mask id="flaskMask">
            <rect x="10" y="10" width="80" height="180" fill="white" />
            <circle cx="50" cy="30" r="20" fill="black" />
        </mask>
        </defs>
        <rect x="10" y="10" width="80" height="180" fill="none" stroke="black" mask="url(#flaskMask)" />
        <circle cx="50" cy="30" r="20" fill="none" stroke="black" />
        <g className="reactant" fill={reactant.color}>
        {/* Reactant will be inserted here */}
        </g>
    </svg>
);
  