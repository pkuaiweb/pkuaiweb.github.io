# 课题组网站

## 开发与构建

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 配置说明

所有配置通过 JSON 文件管理，位于 `src/configs/` 目录。图片统一放在 `public/img/` 目录，JSON 中用 `/img/xxx.png` 路径引用。

### `app.json` - 网站基本信息
```json
{
  "logo": "W",           // 左上角方框内文字
  "labName": "Lab Name"  // 课题组名称
}
```

### `home.json` - 主页内容
```json
{
  "heroTitle": "Lab Name",           // 主标题
  "heroSubtitle": "Research Vision", // 副标题
  "ctaText": "Learn More",           // 按钮文字
  "highlights": ["...", "...", "..."], // 亮点（3个）
  "news": [                          // 最新动态
    { "date": "2026-02", "title": "..." }
  ],
  "email": "contact@lab.edu",        // 联系邮箱
  "address": "Address"               // 地址
}
```

### `projects.json` - 项目列表
```json
{
  "title": "Projects",
  "items": [
    {
      "title": "...",                  // 项目名称
      "desc": "...",                   // 项目描述
      "link": "http://example.com/",   // 项目链接
      "img": "/img/placeholder.png"    // 项目图片
    }
  ]
}
```

### `people.json` - 团队成员
```json
{
  "title": "Our Team",
  "principalInvestigatorTitle": "Principal Investigator",
  "principalInvestigator": {
    "name": "...",                     // 姓名
    "role": "...",                     // 职位
    "bio": "...",                      // 简介
    "email": "http://example.com/",    // 邮箱链接
    "website": "http://example.com/",  // 个人主页
    "avatar": "/img/placeholder.png"   // 头像
  },
  "sections": [                        // 其他成员分组
    {
      "title": "PhD Students",
      "people": [
        {
          "name": "...",
          "role": "...",
          "avatar": "/img/placeholder.png"
        }
      ]
    }
  ]
}
```

### `publications.json` - 论文发表
```json
{
  "title": "Publications",
  "years": ["All", "2026", "2025", "2024"],  // 年份筛选
  "areas": ["All", "Computer Vision", ...],  // 领域筛选
  "items": [
    {
      "title": "...",                        // 论文标题
      "authors": "...",                      // 作者
      "venue": "...",                        // 会议/期刊
      "year": "2025",                        // 年份
      "area": "Computer Vision",             // 领域
      "links": {                             // 链接
        "paper": "http://example.com/",
        "code": "http://example.com/",
        "project": "http://example.com/"
      },
      "img": "/img/placeholder.png"          // 缩略图
    }
  ]
}
```

### `awards.json` - 获奖荣誉
```json
{
  "title": "Awards",
  "items": [
    {
      "title": "...",                  // 奖项名称
      "desc": "...",                   // 奖项描述
      "img": "/img/placeholder.png",   // 奖项图片
      "link": "http://example.com/"    // 相关链接
    }
  ]
}
```
