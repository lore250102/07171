# 🚀 部署指南

快速将你的劳动法律查询系统部署到网上！

## 选项 1: Vercel（推荐，最快）⭐

### 步骤 1: 准备 GitHub 项目

```bash
cd D:\Pheebs\labor-law-website

# 初始化 git
git init
git add .
git commit -m "Initial commit: Global Labor Law Database"

# 创建新的 GitHub 仓库
# 访问 https://github.com/new，创建 labor-law-database 仓库

# 关联远程仓库
git remote add origin https://github.com/YOUR_USERNAME/labor-law-database.git
git branch -M main
git push -u origin main
```

### 步骤 2: 在 Vercel 上部署

1. 访问 [Vercel](https://vercel.com)
2. 用 GitHub 账户登录或注册
3. 点击 "Add New" → "Project"
4. 搜索并选择 "labor-law-database"
5. 点击 "Import"
6. 使用默认设置，直接点击 "Deploy"

✅ 完成！您的网站现在在线了！

网址格式：`https://labor-law-database.vercel.app`

---

## 选项 2: Railway（替代方案）

### 步骤 1: 在 Railway 上创建项目

1. 访问 [Railway](https://railway.app)
2. 登录（支持 GitHub 登录）
3. 点击 "New Project" → "Deploy from GitHub"
4. 授权 Railway 访问你的 GitHub
5. 选择 "labor-law-database" 仓库

### 步骤 2: 配置环境

- Framework: `Next.js`
- Root Directory: `.`

### 步骤 3: 部署

点击 "Deploy" 按钮，等待构建完成（通常 2-5 分钟）

✅ 完成！

---

## 选项 3: Netlify

### 步骤 1: 连接 GitHub

1. 访问 [Netlify](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 "GitHub"
4. 授权并选择 "labor-law-database" 仓库

### 步骤 2: 配置构建

- Build command: `npm run build`
- Publish directory: `.next`

### 步骤 3: 部署

点击 "Deploy site"

✅ 完成！

---

## 选项 4: Docker + 云服务器

### 创建 Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制 package.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制代码
COPY . .

# 构建
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动
CMD ["npm", "start"]
```

### 部署到 AWS / Google Cloud / Azure

```bash
# 构建 Docker 镜像
docker build -t labor-law-db:latest .

# 推送到容器仓库
docker push your-registry/labor-law-db:latest

# 在云平台上部署
# 详见各平台文档
```

---

## 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
# 访问 http://localhost:3000

# 生产构建
npm run build
npm start
```

---

## 添加自定义域名

### 在 Vercel 上

1. 项目设置 → "Domains"
2. 添加你的自定义域名
3. 按照 DNS 配置指示操作

示例：
- 将 `labor-law.com` 指向 Vercel
- 配置 DNS 记录：
  ```
  CNAME: labor-law-database.vercel.app
  ```

### 在其他平台上

类似的流程，具体步骤参考各平台文档。

---

## 后续维护

### 更新法律数据

编辑 `public/data/laws.json` 并推送：

```bash
git add public/data/laws.json
git commit -m "Update: Add new labor laws"
git push origin main
```

自动部署触发，网站会立即更新！

### 修改网站内容

编辑任何 TypeScript/CSS 文件并推送，Vercel 自动重新部署。

```bash
git add .
git commit -m "Feature: Improve UI"
git push origin main
```

### 添加 SSL/HTTPS

所有上述平台都提供**免费的自动 SSL 证书**，无需额外配置！

---

## 监控和日志

### Vercel

- 访问 Dashboard 查看部署日志
- 自动错误跟踪和报告

### 性能监控

- 内置 Core Web Vitals 监控
- 实时性能指标

---

## 预期成本

| 平台 | 免费计划 | 付费计划 |
|------|---------|---------|
| **Vercel** | ✅ 完全免费 | $20/月起 |
| **Railway** | $5 免费额度/月 | 按使用付费 |
| **Netlify** | ✅ 完全免费 | $19/月起 |
| **AWS** | 免费层（1年） | 按使用付费 |

---

## 故障排除

### 构建失败

检查日志：
```bash
# Vercel 上查看部署日志
# 常见问题：
# - Node 版本不兼容
# - 缺少依赖
# - 构建脚本错误
```

### 网站加载慢

- 检查 Core Web Vitals
- 优化图片资源
- 启用缓存

### 数据不更新

- 清除浏览器缓存
- 检查 JSON 文件是否有效
- 重新部署

---

## 本地测试生产构建

```bash
npm run build
npm run start
# 访问 http://localhost:3000
```

---

## 下一步

1. ✅ 部署网站
2. 📊 添加更多国家和法律条款
3. 🔄 设置自动爬虫更新数据
4. 📢 宣传你的网站
5. 💬 收集用户反馈并改进

---

**问题?** 查看平台的官方文档或提交 GitHub Issue！
