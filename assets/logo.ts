
// This file stores the embedded SVG logo to avoid external network requests and CORS issues.
// It represents the "Ícone Colégio e Curso" logo in vertical format.

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160">
  <!-- Orange Circle Background -->
  <circle cx="100" cy="50" r="42" fill="#F97316"/>
  
  <!-- Inner White Ring (Subtle detail) -->
  <circle cx="100" cy="50" r="39" fill="none" stroke="white" stroke-width="0.5" opacity="0.3"/>
  
  <!-- Letter 'i' (Custom Shapes) -->
  <!-- Dot -->
  <circle cx="100" cy="28" r="8" fill="white"/>
  <!-- Body -->
  <rect x="92" y="40" width="16" height="32" rx="1" fill="white"/>
  
  <!-- Text: ícone -->
  <text x="100" y="125" text-anchor="middle" fill="#374151" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="46" letter-spacing="-2">ícone</text>
  
  <!-- Text: COLÉGIO E CURSO -->
  <text x="100" y="145" text-anchor="middle" fill="#4B5563" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="11" letter-spacing="1">COLÉGIO E CURSO</text>
</svg>
`;

// Encode SVG to Base64 to be used safely in img tags
const base64Svg = btoa(unescape(encodeURIComponent(svgContent)));
export const LOGO_DATA_URI = `data:image/svg+xml;base64,${base64Svg}`;
