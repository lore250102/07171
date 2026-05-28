import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
  selectedCountry: string;
  selectedCategory: string;
  selectedRegion: string;
  countries: string[];
  categories: string[];
  regions: string[];
  onCountryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onReset: () => void;
}

export default function FilterPanel({
  selectedCountry,
  selectedCategory,
  selectedRegion,
  countries,
  categories,
  regions,
  onCountryChange,
  onCategoryChange,
  onRegionChange,
  onReset,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    region: true,
    country: true,
    category: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasFilters = selectedCountry || selectedCategory || selectedRegion;

  return (
    <div className="bg-white rounded-lg p-6 card-shadow sticky top-8">
      {/* 筛选标题 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-lg">筛选选项</h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            清除
          </button>
        )}
      </div>

      {/* 地区筛选 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('region')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition"
        >
          <h4 className="font-semibold text-gray-900">地区</h4>
          <ChevronDown
            size={18}
            className={`transform transition ${
              expandedSections.region ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.region && (
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="region"
                checked={selectedRegion === ''}
                onChange={() => onRegionChange('')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">全部</span>
            </label>
            {regions.map((region) => (
              <label
                key={region}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="region"
                  checked={selectedRegion === region}
                  onChange={() => onRegionChange(region)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-700">{region}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 国家筛选 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('country')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition"
        >
          <h4 className="font-semibold text-gray-900">国家</h4>
          <ChevronDown
            size={18}
            className={`transform transition ${
              expandedSections.country ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.country && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="country"
                checked={selectedCountry === ''}
                onChange={() => onCountryChange('')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">全部国家</span>
            </label>
            {countries.map((country) => (
              <label
                key={country}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="country"
                  checked={selectedCountry === country}
                  onChange={() => onCountryChange(country)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-700">{country}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 分类筛选 */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition"
        >
          <h4 className="font-semibold text-gray-900">分类</h4>
          <ChevronDown
            size={18}
            className={`transform transition ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === ''}
                onChange={() => onCategoryChange('')}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-gray-700">全部分类</span>
            </label>
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-gray-700 text-sm">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
