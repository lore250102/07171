'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Globe, BookOpen, Filter, X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import LawCard from '@/components/LawCard';
import Stats from '@/components/Stats';
import Header from '@/components/Header';

interface Law {
  id: string;
  country: string;
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
  const [countries, setCountries] = useState<Country[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 从本地数据加载
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/laws.json');
        const data = await response.json();

        setLaws(data.laws);
        setFiltered(data.laws);
        setCountries(data.countries);
        setCategories(data.categories);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 搜索和筛选逻辑
  useEffect(() => {
    let results = laws;

    // 按关键词搜索
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (law) =>
          law.law_name.toLowerCase().includes(query) ||
          law.article.toLowerCase().includes(query) ||
          law.chinese_translation.toLowerCase().includes(query) ||
          law.original_text.toLowerCase().includes(query) ||
          law.category.toLowerCase().includes(query)
      );
    }

    // 按国家筛选
    if (selectedCountry) {
      results = results.filter((law) => law.country === selectedCountry);
    }

    // 按地区筛选
    if (selectedRegion) {
      results = results.filter((law) => law.region === selectedRegion);
    }

    // 按分类筛选
    if (selectedCategory) {
      results = results.filter((law) => law.category === selectedCategory);
    }

    setFiltered(results);
  }, [searchQuery, selectedCountry, selectedCategory, selectedRegion, laws]);

  // 提取唯一的地区和国家名称
  const uniqueRegions = useMemo(
    () => [...new Set(countries.map((c) => c.region))],
    [countries]
  );

  const uniqueCountries = useMemo(
    () => [...new Set(laws.map((law) => law.country))],
    [laws]
  );

  const uniqueCategories = useMemo(
    () => [...new Set(laws.map((law) => law.category))],
    [laws]
  );

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCountry('');
    setSelectedCategory('');
    setSelectedRegion('');
  };

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
        {/* 统计卡片 */}
        <Stats
          totalLaws={laws.length}
          countriesCount={uniqueCountries.length}
          categoriesCount={uniqueCategories.length}
        />

        {/* 搜索栏 */}
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
            筛选选项
          </button>
          {(selectedCountry || selectedCategory || selectedRegion) && (
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
              selectedCountry={selectedCountry}
              selectedCategory={selectedCategory}
              selectedRegion={selectedRegion}
              countries={uniqueCountries}
              categories={uniqueCategories}
              regions={uniqueRegions}
              onCountryChange={setSelectedCountry}
              onCategoryChange={setSelectedCategory}
              onRegionChange={setSelectedRegion}
              onReset={handleReset}
            />
          </div>

          {/* 移动端筛选面板 */}
          {mobileFiltersOpen && (
            <div className="lg:hidden col-span-1 mb-6">
              <FilterPanel
                selectedCountry={selectedCountry}
                selectedCategory={selectedCategory}
                selectedRegion={selectedRegion}
                countries={uniqueCountries}
                categories={uniqueCategories}
                regions={uniqueRegions}
                onCountryChange={setSelectedCountry}
                onCategoryChange={setSelectedCategory}
                onRegionChange={setSelectedRegion}
                onReset={handleReset}
              />
            </div>
          )}

          {/* 结果列表 */}
          <div className="lg:col-span-3">
            {filtered.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-gray-600">
                  找到 <span className="font-bold text-gray-900">{filtered.length}</span> 条法律条款
                  {(searchQuery || selectedCountry || selectedCategory || selectedRegion) && (
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
                <p className="text-gray-500 text-lg mb-2">没有找到匹配的法律条款</p>
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
                全球劳动法律查询系统提供 30+ 国家的劳动法规精准翻译和专业解读。
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
