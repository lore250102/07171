'use client';

import { ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  formatCountry,
  formatRegion,
  regionCnToCountryCns,
  countryCnToRegionCn,
} from '@/data/regions';

interface FilterPanelProps {
  /** 已选中的中文区域名列表（多选） */
  selectedRegions: string[];
  /** 已选中的中文国家名列表（多选） */
  selectedCountries: string[];
  /** 已选中的分类列表（多选） */
  selectedCategories: string[];

  /** 全部可选区域（中文名，按顺序） */
  regions: string[];
  /** 全部可选国家（中文名，按顺序） */
  countries: string[];
  /** 全部可选分类 */
  categories: string[];

  onRegionsChange: (values: string[]) => void;
  onCountriesChange: (values: string[]) => void;
  onCategoriesChange: (values: string[]) => void;
  onReset: () => void;
}

/**
 * 左侧筛选面板
 *
 * 联动规则：
 * 1. 勾选某个「区域」→ 「国家」列表自动过滤为该区域下的国家（无匹配的国家会被隐藏）。
 * 2. 勾选某个「国家」→ 其所属「区域」会被自动勾选（若尚未选中）；反向联动。
 * 3. 三个筛选器都支持多选。全部支持一键清除。
 */
export default function FilterPanel({
  selectedRegions,
  selectedCountries,
  selectedCategories,
  regions,
  countries,
  categories,
  onRegionsChange,
  onCountriesChange,
  onCategoriesChange,
  onReset,
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    region: true,
    country: true,
    category: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const hasFilters =
    selectedRegions.length > 0 ||
    selectedCountries.length > 0 ||
    selectedCategories.length > 0;

  /* --------- 联动派生：勾选 region → 过滤 country 列表 --------- */

  const visibleCountries = useMemo(() => {
    if (selectedRegions.length === 0) return countries;
    const allowed = new Set<string>();
    for (const r of selectedRegions) {
      for (const c of regionCnToCountryCns[r] ?? []) {
        allowed.add(c);
      }
    }
    // 保留 countries 原本顺序
    return countries.filter((c) => allowed.has(c));
  }, [selectedRegions, countries]);

  /* --------- 事件处理 --------- */

  const toggleRegion = (region: string) => {
    const nextRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];

    // 若取消勾选某 region，同时把该 region 下已选国家一并移除，避免出现"看不见但仍在过滤"的国家
    if (selectedRegions.includes(region)) {
      const removed = new Set(regionCnToCountryCns[region] ?? []);
      const nextCountries = selectedCountries.filter((c) => !removed.has(c));
      onCountriesChange(nextCountries);
    }
    onRegionsChange(nextRegions);
  };

  const toggleCountry = (country: string) => {
    const nextCountries = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country];

    // 反向联动：勾选某个国家时，自动勾选其所属 region（若尚未勾选）
    if (!selectedCountries.includes(country)) {
      const region = countryCnToRegionCn[country];
      if (region && !selectedRegions.includes(region)) {
        onRegionsChange([...selectedRegions, region]);
      }
    }
    onCountriesChange(nextCountries);
  };

  const toggleCategory = (category: string) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoriesChange(next);
  };

  return (
    <div className="bg-white rounded-lg p-6 card-shadow sticky top-8">
      {/* 筛选标题 */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900 text-lg">筛选选项 Filters</h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            清除 Reset
          </button>
        )}
      </div>

      {/* 地区筛选 Region */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('region')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition"
        >
          <h4 className="font-semibold text-gray-900">地区 Region</h4>
          <ChevronDown
            size={18}
            className={`transform transition ${
              expandedSections.region ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.region && (
          <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
            {regions.map((region) => (
              <label
                key={region}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="ml-3 text-gray-700 text-sm">
                  {formatRegion(region)}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 国家筛选 Country */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('country')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition"
        >
          <h4 className="font-semibold text-gray-900">
            国家 Country
            {selectedRegions.length > 0 && (
              <span className="ml-2 text-xs font-normal text-gray-500">
                （已按地区过滤）
              </span>
            )}
          </h4>
          <ChevronDown
            size={18}
            className={`transform transition ${
              expandedSections.country ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.country && (
          <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
            {visibleCountries.length === 0 ? (
              <p className="text-xs text-gray-400 p-2">
                当前地区下暂无国家数据
              </p>
            ) : (
              visibleCountries.map((country) => (
                <label
                  key={country}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country)}
                    onChange={() => toggleCountry(country)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-3 text-gray-700 text-sm">
                    {formatCountry(country)}
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </div>

      {/* 分类筛选 Category */}
      <div>
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition"
        >
          <h4 className="font-semibold text-gray-900">分类 Category</h4>
          <ChevronDown
            size={18}
            className={`transform transition ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                  className="w-4 h-4 text-blue-600 rounded"
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
