import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-3.5 text-gray-400"
        />
        <input
          type="text"
          placeholder="搜索法律条款、关键词或国家名称..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-gray-500">热门搜索：</span>
        <button
          onClick={() => onChange('解雇')}
          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          解雇
        </button>
        <button
          onClick={() => onChange('社保')}
          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          社保
        </button>
        <button
          onClick={() => onChange('预告期')}
          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          预告期
        </button>
        <button
          onClick={() => onChange('劳动合同')}
          className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          劳动合同
        </button>
      </div>
    </div>
  );
}
