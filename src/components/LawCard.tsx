import { ExternalLink, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface LawCardProps {
  law: {
    id: string;
    country: string;
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
  };
}

/**
 * 中文国家名 → 🇺🇳 国旗 emoji。
 * 覆盖当前项目 regions.ts 定义的全部国家。
 */
const COUNTRY_FLAGS: Record<string, string> = {
  // 东南亚
  新加坡: '🇸🇬',
  泰国: '🇹🇭',
  马来西亚: '🇲🇾',
  越南: '🇻🇳',
  菲律宾: '🇵🇭',
  柬埔寨: '🇰🇭',
  缅甸: '🇲🇲',
  // 东亚
  日本: '🇯🇵',
  韩国: '🇰🇷',
  中国台湾: '🇹🇼',
  中国香港: '🇭🇰',
  // 南亚
  印度: '🇮🇳',
  尼泊尔: '🇳🇵',
  孟加拉: '🇧🇩',
  斯里兰卡: '🇱🇰',
  // 印尼 / 澳新
  印尼: '🇮🇩',
  澳大利亚: '🇦🇺',
  // 独联体
  俄罗斯: '🇷🇺',
  哈萨克斯坦: '🇰🇿',
  阿塞拜疆: '🇦🇿',
  乌兹别克斯坦: '🇺🇿',
  // 东北欧
  罗马尼亚: '🇷🇴',
  波兰: '🇵🇱',
  芬兰: '🇫🇮',
  匈牙利: '🇭🇺',
  乌克兰: '🇺🇦',
  塞尔维亚: '🇷🇸',
  希腊: '🇬🇷',
  捷克: '🇨🇿',
  瑞典: '🇸🇪',
  立陶宛: '🇱🇹',
  波黑: '🇧🇦',
  北马其顿: '🇲🇰',
  摩尔多瓦: '🇲🇩',
  克罗地亚: '🇭🇷',
  保加利亚: '🇧🇬',
  斯洛伐克: '🇸🇰',
  斯洛文尼亚: '🇸🇮',
  // 西欧
  奥地利: '🇦🇹',
  英国: '🇬🇧',
  瑞士: '🇨🇭',
  卢森堡: '🇱🇺',
  法国: '🇫🇷',
  德国: '🇩🇪',
  意大利: '🇮🇹',
  荷兰: '🇳🇱',
  西班牙: '🇪🇸',
  比利时: '🇧🇪',
  葡萄牙: '🇵🇹',
  // 中东
  巴基斯坦: '🇵🇰',
  土耳其: '🇹🇷',
  阿联酋: '🇦🇪',
  卡塔尔: '🇶🇦',
  沙特阿拉伯: '🇸🇦',
  伊拉克: '🇮🇶',
  约旦: '🇯🇴',
  阿曼: '🇴🇲',
  // 非洲
  埃及: '🇪🇬',
  肯尼亚: '🇰🇪',
  摩洛哥: '🇲🇦',
  南非: '🇿🇦',
  尼日利亚: '🇳🇬',
  突尼斯: '🇹🇳',
  坦桑尼亚: '🇹🇿',
  // 美国
  美国: '🇺🇸',
  // 拉美
  墨西哥: '🇲🇽',
  秘鲁: '🇵🇪',
  智利: '🇨🇱',
  巴西: '🇧🇷',
  阿根廷: '🇦🇷',
  哥伦比亚: '🇨🇴',
  危地马拉: '🇬🇹',
  玻利维亚: '🇧🇴',
  哥斯达黎加: '🇨🇷',
  萨尔瓦多: '🇸🇻',
  厄瓜多尔: '🇪🇨',
  多米尼加: '🇩🇴',
  洪都拉斯: '🇭🇳',
  尼加拉瓜: '🇳🇮',
};

export default function LawCard({ law }: LawCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCountryFlag = (country: string) => COUNTRY_FLAGS[country] || '🌍';

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'verified') {
      return <CheckCircle size={16} className="text-green-600" />;
    }
    return <AlertCircle size={16} className="text-yellow-600" />;
  };

  const getStatusText = (status: string) => {
    if (status === 'verified') return '已验证';
    if (status === 'ai_draft') return 'AI初译';
    return '待审';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`rounded-lg border-2 transition-all cursor-pointer ${getImportanceColor(
        law.importance
      )} ${expanded ? 'ring-2 ring-blue-400' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        {/* 卡片头部 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getCountryFlag(law.country)}</span>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{law.country}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-gray-300 text-gray-700">
                  {law.article}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{law.law_name}</span> • {law.category}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-gray-300">
              {getStatusIcon(law.verification_status)}
              <span className="text-xs font-medium text-gray-700">
                {getStatusText(law.verification_status)}
              </span>
            </div>
          </div>
        </div>

        {/* 中文翻译 - 总是显示 */}
        <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
          <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase">中文翻译</h4>
          <p className="text-gray-800 text-sm leading-relaxed">{law.chinese_translation}</p>
        </div>

        {/* 展开/收缩指示 */}
        <div className="text-center">
          <button
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? '▼ 收起详情' : '▶ 展开详情'}
          </button>
        </div>

        {/* 展开内容 */}
        {expanded && (
          <div className="mt-6 pt-6 border-t border-gray-300 space-y-4">
            {/* 原文 */}
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                原文 ({law.original_language})
              </h4>
              <div className="relative group">
                <p className="text-gray-700 text-sm p-4 bg-gray-50 rounded-lg border border-gray-200 italic max-h-32 overflow-y-auto whitespace-pre-wrap">
                  {law.original_text}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(law.original_text);
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white border border-gray-300 rounded p-1 hover:bg-gray-50"
                  title={copied ? '已复制!' : '复制原文'}
                >
                  <Copy size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* 元数据 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">译者</p>
                <p className="font-medium text-gray-900">{law.translator}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">最后更新</p>
                <p className="font-medium text-gray-900">{law.last_updated}</p>
              </div>
            </div>

            {/* 来源链接 */}
            <div>
              <p className="text-xs text-gray-600 mb-2">原始来源</p>
              <a
                href={law.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm break-all"
              >
                {law.source_url.substring(0, 50)}...
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
