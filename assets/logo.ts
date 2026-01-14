
// This file stores the embedded SVG logo to avoid external network requests and CORS issues.
// Represents the vertical "Ícone Colégio e Curso" logo exactly as requested.

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 260">
  <g transform="translate(120, 85)">
     <!-- Outer Ring (Gray/Silver) -->
     <circle r="66" fill="none" stroke="#9CA3AF" stroke-width="2" />
     <!-- Inner Ring (White gap) -->
     <circle r="63" fill="none" stroke="white" stroke-width="3" />
     <!-- Main Orange Circle -->
     <circle r="60" fill="#EA580C" />
     
     <!-- Letter 'i' (White) -->
     <!-- Dot -->
     <circle cx="0" cy="-28" r="13" fill="white" />
     <!-- Body with curved foot -->
     <path d="M-11 -8 h22 v40 a 8 8 0 0 0 12 6 v12 h-34 z" fill="white" />
  </g>
  
  <!-- Text: ícone -->
  <!-- Note: Using a heavy sans-serif font to match the brand -->
  <text x="120" y="200" text-anchor="middle" fill="#374151" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="75" letter-spacing="-3">ícone</text>
  
  <!-- Accent on the 'i' in ícone -->
  <path d="M96 155 l8 -12 l6 12 z" fill="#374151" />

  <!-- Text: COLÉGIO E CURSO -->
  <text x="120" y="235" text-anchor="middle" fill="#4B5563" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="22" letter-spacing="0.5">COLÉGIO E CURSO</text>
</svg>
`;

// Encode SVG to Base64 to be used safely in img tags
const base64Svg = btoa(unescape(encodeURIComponent(svgContent)));
export const LOGO_DATA_URI = `data:image/svg+xml;base64,${base64Svg}`;
