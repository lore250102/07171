'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import LawCard from '@/components/LawCard';
import Stats from '@/components/Stats';
import Header from '@/components/Header';
import {
  regions as regionDefinitions,
  allCountries,
  countryCnToRegionCn,
  regionCnToCountryCns,
} from '@/data/regions';

interface Law {
  id: string;
  country: string;
  /**
   * region 字段可为：
   * 1. 中文区域名（推荐，如 "东南亚地区"）——由 regions.ts 定义
   * 2. 旧版粗略英文（如 "Asia" / "Europe"）——为向后兼容自动映射
   */
  region: string;
  law_name: string;
  article: string;
  category: string;
  original_language: string;
  original_text: string;
  chinese_translation: string;
  translator: string;
  verification_status: string;
  source_url: string;
  last_updated: string;
  importance: string;
}

interface Country {
  country_name: string;
  region: string;
  flag: string;
}

interface Category {
  name: string;
  description: string;
}

export default function Home() {
  const [laws, setLaws] = useState<Law[]>([]);
  const [filtered, setFiltered] = useState<Law[]>([]);
  const [dataCountries, setDataCountries] = useState<Country[]>([]);
  const [dataCategories, setDataCategories] = useState<Category[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* -------- 加载数据 -------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/laws.json');
        const data = await response.json();
        setLaws(data.laws ?? []);
        setFiltered(data.laws ?? []);
        setDataCountries(data.countries ?? []);
        setDataCategories(data.categories ?? []);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  /**
   * 归一化：给一条 law 计算它的"中文区域名"。
   * - 优先取 law.region（已是中文区域名时直接用）。
   * - 否则通过 country 反查 regions.ts 的映射。
   * - 兜底：把旧数据里的 "Asia" / "Europe" 等粗略英文尽力映射到本项目区域。
   */
  const resolveRegionCn = (law: Law): string | undefined => {
    if (law.region && law.region in regionCnToCountryCns) return law.region;
    const byCountry = countryCnToRegionCn[law.country];
    if (byCountry) return byCountry;
    // 旧数据 legacy 映射：Asia/Europe/... → 尝试映射到本项目已知区域
    const legacyMap: Record<string, string | undefined> = {
      Asia: countryCnToRegionCn[law.country], // 用国家反查
      Europe: countryCnToRegionCn[law.country],
    };
    return legacyMap[law.region];
  };

  /* -------- 搜索 + 筛选 -------- */
  useEffect(() => {
    let results = laws;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (law) =>
          law.law_name.toLowerCase().includes(query) ||
          law.article.toLowerCase().includes(query) ||
          law.chinese_translation.toLowerCase().includes(query) ||
          law.original_text.toLowerCase().includes(query) ||
          law.category.toLowerCase().includes(query) ||
          law.country.toLowerCase().includes(query)
      );
    }

    if (selectedCountries.length > 0) {
      const set = new Set(selectedCountries);
      results = results.filter((law) => set.has(law.country));
    }

    if (selectedRegions.length > 0) {
      const set = new Set(selectedRegions);
      results = results.filter((law) => {
        const r = resolveRegionCn(law);
        return r ? set.has(r) : false;
      });
    }

    if (selectedCategories.length > 0) {
      const set = new Set(selectedCategories);
      results = results.filter((law) => set.has(law.category));
    }

    setFiltered(results);
  }, [
    searchQuery,
    selectedCountries,
    selectedRegions,
    selectedCategories,
    laws,
  ]);

  /* -------- 侧栏筛选可选项 -------- */

  /** 区域：使用 regions.ts 定义的全部 12 个区域（中文名，保持声明顺序） */
  const uniqueRegions = useMemo(
    () => regionDefinitions.map((r) => r.nameCn),
    []
  );

  /** 国家：使用 regions.ts 定义的全部国家（中文名，按 region 顺序） */
  const uniqueCountries = useMemo(
    () => allCountries.map((c) => c.nameCn),
    []
  );

  /** 分类：来自 laws.json 的实际数据 */
  const uniqueCategories = useMemo(
    () => [...new Set(laws.map((law) => law.category))],
    [laws]
  );

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCountries([]);
    setSelectedCategories([]);
    setSelectedRegions([]);
  };

  const hasFilters =
    !!searchQuery ||
    selectedCountries.length > 0 ||
    selectedCategories.length > 0 ||
    selectedRegions.length > 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container-custom py-8">
        <Stats
          totalLaws={laws.length}
          countriesCount={uniqueCountries.length}
          categoriesCount={uniqueCategories.length}
        />

        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* 移动端筛选按钮 */}
        <div className="lg:hidden mb-6 flex gap-2">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Filter size={18} />
            筛选选项 Filters
          </button>
          {hasFilters && (
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 侧边栏筛选 - 桌面版 */}
          <div className="hidden lg:block">
            <FilterPanel
              selectedRegions={selectedRegions}
              selectedCountries={selectedCountries}
              selectedCategories={selectedCategories}
              regions={uniqueRegions}
              countries={uniqueCountries}
              categories={uniqueCategories}
              onRegionsChange={setSelectedRegions}
              onCountriesChange={setSelectedCountries}
              onCategoriesChange={setSelectedCategories}
              onReset={handleReset}
            />
          </div>

          {/* 移动端筛选面板 */}
          {mobileFiltersOpen && (
            <div className="lg:hidden col-span-1 mb-6">
              <FilterPanel
                selectedRegions={selectedRegions}
                selectedCountries={selectedCountries}
                selectedCategories={selectedCategories}
                regions={uniqueRegions}
                countries={uniqueCountries}
                categories={uniqueCategories}
                onRegionsChange={setSelectedRegions}
                onCountriesChange={setSelectedCountries}
                onCategoriesChange={setSelectedCategories}
                onReset={handleReset}
              />
            </div>
          )}

          {/* 结果列表 */}
          <div className="lg:col-span-3">
            {filtered.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-gray-600">
                  找到{' '}
                  <span className="font-bold text-gray-900">
                    {filtered.length}
                  </span>{' '}
                  条法律条款
                  {hasFilters && (
                    <button
                      onClick={handleReset}
                      className="ml-4 text-blue-600 hover:text-blue-700 underline"
                    >
                      清除筛选
                    </button>
                  )}
                </div>
                <div className="grid gap-4 auto-rows-max">
                  {filtered.map((law) => (
                    <LawCard key={law.id} law={law} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg card-shadow">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  没有找到匹配的法律条款
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  尝试调整搜索条件或筛选选项
                </p>
                <button
                  onClick={handleReset}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  重置筛选
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">关于本站</h3>
              <p className="text-gray-600 text-sm">
                全球劳动法律查询系统覆盖 12 个区域、80+ 国家的劳动法规，提供精准的中文翻译和专业解读。
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">数据来源</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ 官方法律网站</li>
                <li>✓ 专业律师翻译</li>
                <li>✓ 定期更新维护</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4">免责声明</h3>
              <p className="text-gray-600 text-sm">
                本网站提供的信息仅供参考，不构成法律建议。请咨询专业律师获取具体法律指导。
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Global Labor Law Database. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
