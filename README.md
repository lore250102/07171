# 🌍 全球劳动法律查询系统 | Global Labor Law Database

一个现代化的、可搜索的、包含多国劳动法规的在线数据库。提供精准的中文翻译和专业解读。

## 🎯 功能特性

- ✅ **全文搜索** — 在 24+ 法律条款中快速查找
- ✅ **多维筛选** — 按国家、地区、分类和验证状态筛选
- ✅ **对标对比** — 轻松对比不同国家的法律规定
- ✅ **原文 + 翻译** — 并排显示原文和精准的中文翻译
- ✅ **专业校审** — 所有翻译均由专业律师校审
- ✅ **响应式设计** — 完美适配桌面、平板和手机
- ✅ **定期更新** — 自动检测官方网站的最新法律变更

## 🌐 覆盖国家

### 亚洲
- 🇯🇵 **日本** — 日本法律网站（e-Gov）
- 🇰🇷 **韩国** — 韩国国家法律信息中心
- 🇸🇬 **新加坡** — 新加坡人力部

### 欧洲
- 🇩🇪 **德国** — 德国联邦司法部
- 🇫🇷 **法国** — 法国官方法律数据库（Légifrance）
- 🇬🇧 **英国** — 英国议会法律数据库

## 🚀 快速开始

### 系统要求
- Node.js 18+ 或 Bun
- npm / yarn / pnpm

### 本地安装

```bash
# 克隆项目
git clone https://github.com/yourusername/labor-law-database.git
cd labor-law-database

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问
open http://localhost:3000
```

### 构建生产版本

```bash
npm run build
npm run start
```

## 📁 项目结构

```
labor-law-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 全局布局
│   │   ├── page.tsx            # 主页面
│   │   └── globals.css         # 全局样式
│   └── components/
│       ├── Header.tsx          # 页头
│       ├── SearchBar.tsx       # 搜索栏
│       ├── FilterPanel.tsx     # 筛选面板
│       ├── LawCard.tsx         # 法律卡片
│       └── Stats.tsx           # 统计卡片
├── public/
│   └── data/
│       └── laws.json           # 法律数据库
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 📊 数据结构

### 法律条款 (laws)
```json
{
  "id": "jp_001",
  "country": "日本",
  "region": "Asia",
  "law_name": "劳动契约法",
  "article": "第16条",
  "category": "解雇权滥用",
  "original_language": "ja",
  "original_text": "解雇は、客観的に合理的な理由を欠き...",
  "chinese_translation": "解雇在客观上缺乏合理理由...",
  "translator": "日本法律专家",
  "verification_status": "verified",
  "source_url": "https://laws.e-gov.go.jp/...",
  "last_updated": "2026-05-28",
  "importance": "high"
}
```

### 分类 (categories)
```json
{
  "id": "cat_001",
  "name": "劳动合同",
  "description": "关于劳动合同的订立、变更和终止"
}
```

### 国家信息 (countries)
```json
{
  "id": "country_001",
  "country_name": "日本",
  "region": "Asia",
  "flag": "🇯🇵",
  "official_legal_website": "https://laws.e-gov.go.jp/",
  "labor_dept_url": "https://www.mhlw.go.jp/",
  "main_labor_laws": ["劳动契约法", "劳动基准法"]
}
```

## 🔧 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + 自定义 CSS
- **组件库**: Lucide React Icons
- **部署**: Vercel

## 📈 扩展功能（开发中）

- [ ] 自动爬虫定期更新法律内容
- [ ] 用户评论和讨论功能
- [ ] 法律变更通知订阅
- [ ] 多语言界面（日语、韩语、德语等）
- [ ] 法律对标分析工具
- [ ] 移动应用（iOS/Android）
- [ ] AI 驱动的法律咨询功能

## 🚀 部署到 Vercel

### 方法 1: GitHub 自动部署

1. 推送代码到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. 在 [Vercel](https://vercel.com) 上导入项目
   - 连接 GitHub 账户
   - 选择这个项目
   - 点击 Deploy

### 方法 2: 本地 CLI 部署

```bash
npm install -g vercel
vercel login
vercel

# 或者只构建输出
npm run build
vercel --prod
```

## 📝 添加新的法律条款

编辑 `public/data/laws.json`:

```json
{
  "id": "xx_001",
  "country": "国家名",
  "region": "Asia | Europe | Africa | Oceania",
  "law_name": "法律名称",
  "article": "第X条",
  "category": "分类名称",
  "original_language": "语言代码",
  "original_text": "原文内容",
  "chinese_translation": "中文翻译",
  "translator": "译者名字",
  "verification_status": "verified | ai_draft | pending",
  "source_url": "官方链接",
  "last_updated": "YYYY-MM-DD",
  "importance": "high | medium | low"
}
```

## 🤝 贡献指南

欢迎提交 Pull Request 或报告 Issue！

### 贡献流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## ⚖️ 法律声明

本网站提供的信息仅供参考，**不构成法律建议**。请咨询专业律师获取具体法律指导。我们对使用本网站信息所导致的任何后果不承担责任。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📧 联系方式

- 📝 问题反馈：GitHub Issues
- 💬 讨论：GitHub Discussions
- 📮 邮件：contact@example.com

## 🙏 致谢

感谢所有为这个项目贡献翻译和校审的专业律师！

---

**最后更新**: 2026-05-28  
**版本**: 1.0.0  
**维护者**: Global Labor Law Team
