import { BookOpen, Globe, Layers } from 'lucide-react';

interface StatsProps {
  totalLaws: number;
  countriesCount: number;
  categoriesCount: number;
}

export default function Stats({
  totalLaws,
  countriesCount,
  categoriesCount,
}: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* 法律条款统计 */}
      <div className="bg-white rounded-lg p-6 card-shadow hover:scale-105 transition-transform">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-lg p-3">
            <BookOpen size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">法律条款</p>
            <p className="text-3xl font-bold text-gray-900">{totalLaws}</p>
            <p className="text-xs text-gray-500 mt-1">精选核心条款</p>
          </div>
        </div>
      </div>

      {/* 国家数量统计 */}
      <div className="bg-white rounded-lg p-6 card-shadow hover:scale-105 transition-transform">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 rounded-lg p-3">
            <Globe size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">覆盖国家</p>
            <p className="text-3xl font-bold text-gray-900">{countriesCount}</p>
            <p className="text-xs text-gray-500 mt-1">包括亚欧地区</p>
          </div>
        </div>
      </div>

      {/* 分类数量统计 */}
      <div className="bg-white rounded-lg p-6 card-shadow hover:scale-105 transition-transform">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 rounded-lg p-3">
            <Layers size={24} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">分类体系</p>
            <p className="text-3xl font-bold text-gray-900">{categoriesCount}</p>
            <p className="text-xs text-gray-500 mt-1">系统化组织</p>
          </div>
        </div>
      </div>
    </div>
  );
}
