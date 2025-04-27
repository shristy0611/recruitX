import { useLanguage } from '@/lib/i18n-config';
import { useState } from 'react';

interface SkillTagInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  placeholder?: string;
  label?: string;
  helpText?: string;
  error?: string;
  suggestions?: string[];
}

export default function SkillTagInput({
  value,
  onChange,
  placeholder = '',
  label,
  helpText,
  error,
  suggestions = [],
}: SkillTagInputProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Filter suggestions based on input
    if (newValue.trim() && suggestions.length > 0) {
      const filtered = suggestions.filter(
        suggestion => suggestion.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle key down events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove the last tag when backspace is pressed and input is empty
      const newSkills = [...value];
      newSkills.pop();
      onChange(newSkills);
    }
  };

  // Add a new skill
  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !value.includes(trimmedSkill)) {
      const newSkills = [...value, trimmedSkill];
      onChange(newSkills);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove: string) => {
    const newSkills = value.filter(skill => skill !== skillToRemove);
    onChange(newSkills);
  };

  // Select a suggestion
  const selectSuggestion = (suggestion: string) => {
    addSkill(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`flex flex-wrap gap-2 p-2 border rounded-md ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500`}
        >
          {value.map((skill, index) => (
            <div
              key={index}
              className="bg-indigo-100 text-indigo-800 text-sm px-2 py-1 rounded-md flex items-center"
            >
              <span>{skill}</span>
              <button
                type="button"
                className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                onClick={() => removeSkill(skill)}
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (inputValue.trim() && filteredSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow for clicks
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            className="flex-grow min-w-[120px] outline-none border-none p-1"
            placeholder={placeholder || t('actions.addTags')}
          />
        </div>
        
        {/* Suggestions dropdown */}
        {showSuggestions && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onMouseDown={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
