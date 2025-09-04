import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { IconButton } from '@material-tailwind/react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <IconButton
      variant="text"
      size="sm"
      onClick={toggleTheme}
      className={`transition-all duration-300 ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 text-yellow-500" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;