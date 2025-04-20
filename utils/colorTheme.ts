export interface ColorTheme {
  // Basic colors
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  
  // Primary colors
  primary: string;
  primaryDark: string;
  
  // Accent colors
  accent: string;
  accentDark: string;
  
  // Status colors
  success: string;
  warning: string;
  danger: string;
  dangerDark: string;
  
  // Button colors
  buttonBackground: string;
  buttonBackgroundPressed: string;
  buttonText: string;
  buttonTextContrast: string;
  
  // Toggle colors
  toggleBgOff: string;
  toggleCircle: string;
  
  // List item states
  itemPressed: string;
}

export const lightColors: ColorTheme = {
  // Basic colors
  background: '#F9FAFB',
  cardBackground: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  
  // Primary colors
  primary: '#7144F8',
  primaryDark: '#5E35DC',
  
  // Accent colors
  accent: '#00B8D4',
  accentDark: '#0093B0',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  
  // Button colors
  buttonBackground: '#F3F4F6',
  buttonBackgroundPressed: '#E5E7EB',
  buttonText: '#4B5563',
  buttonTextContrast: '#FFFFFF',
  
  // Toggle colors
  toggleBgOff: '#D1D5DB',
  toggleCircle: '#FFFFFF',
  
  // List item states
  itemPressed: 'rgba(0, 0, 0, 0.05)',
};

export const darkColors: ColorTheme = {
  // Basic colors
  background: '#111827',
  cardBackground: '#1F2937',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  border: '#374151',
  
  // Primary colors
  primary: '#8B5CF6',
  primaryDark: '#7C3AED',
  
  // Accent colors
  accent: '#06B6D4',
  accentDark: '#0891B2',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  
  // Button colors
  buttonBackground: '#374151',
  buttonBackgroundPressed: '#4B5563',
  buttonText: '#E5E7EB',
  buttonTextContrast: '#FFFFFF',
  
  // Toggle colors
  toggleBgOff: '#4B5563',
  toggleCircle: '#F9FAFB',
  
  // List item states
  itemPressed: 'rgba(255, 255, 255, 0.05)',
};