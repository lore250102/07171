import { Globe, BookOpen } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
      <div className="container-custom py-12">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={32} className="text-blue-200" />
          <h1 className="text-4xl font-bold">全球劳动法律查询系统</h1>
        </div>
        <p className="text-blue-100 text-lg mb-6 max-w-2xl">
          查询 30+ 国家的劳动法规，提供精准的中文翻译和专业解读。
          包括日本、韩国、德国、法国、英国等主要国家的最新劳动法条款。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} />
              <span className="font-semibold">24+ 法律条款</span>
            </div>
            <p className="text-blue-100 text-sm">精选核心劳动法规</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Globe size={20} />
              <span className="font-semibold">6 个国家</span>
            </div>
            <p className="text-blue-100 text-sm">覆盖亚洲和欧洲</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">✓</span>
              <span className="font-semibold">已验证翻译</span>
            </div>
            <p className="text-blue-100 text-sm">专业律师校审</p>
          </div>
        </div>
      </div>
    </header>
  );
}
