# V Emperor Blog — Code Map

简要说明项目结构，方便快速上手和定位文件。

## 技术栈
- Next.js 15（App Router）+ React + TypeScript
- Tailwind CSS 用于样式
- Framer Motion、GSAP、Lenis 用于动效与平滑滚动
- Swiper 用于轮播

## 运行
- 开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run start`

## 目录结构速览
- `app/`
  - `page.tsx`：首页（Hero、Event/Slider、WhoWeAre、OnDemand、PartyTolls、Footer）。
  - `about/page.tsx`：关于页，渲染 about-portfolio 版本的 `Home`。
  - `blog/`：Notion 驱动的博客列表/详情页，使用 `notion-blog/` 下的模块。
  - 其他子目录：`imprints/`、`toolbox/`。
- `components/`
  - 通用组件：`hero.tsx`、`event.tsx`、`footer.tsx`、`eye.tsx`、`slider.tsx` 等。
  - `about-portfolio/`：关于页的组件集合（`Hero`、`About`、`Process`、`Parallax`、`FrontEnd`、`Testimonials`、`Services` 等），动画在 `about-portfolio/animation/`。
- `constants/`
  - `index.ts`：首页导航、轮播卡片等数据。
  - `about-portfolio.ts`、`portfolio.ts`：关于页和作品集的数据源。
- `public/`
  - 静态资源（图片、视频、图标）。`public/index.ts` 聚合导出供 `@/public` 引用。
- `motion/`：动效 variants。
- `styles/`：全局样式与 Tailwind 配置。
- `notion-blog/`：Notion 博客的组件、hooks、服务与样式。需要 `NOTION_DATABASE_ID`、`NOTION_AUTH_TOKEN` 环境变量来拉取内容。

## 关键点
- 平滑滚动与动画：Lenis 在页面组件中初始化；局部动效多用 Framer Motion，部分用 GSAP（注意清理事件和动画上下文）。
- 轮播：`components/home-slider.tsx` 使用 Swiper，首个卡片支持视频（来自 `constants/index.ts` 的 `eventItems`）。
- 关于页首屏：`components/about-portfolio/Hero.tsx` 使用全屏背景图，`Home.tsx` 组合多个段落组件。

## 调整资源
- 静态文件放在 `public/` 下；如替换图片/视频，更新文件或修改对应 `constants/*.ts` 数据。
- `public/index.ts` 导出别名供 `@/public` 导入，缺文件会导致编译失败。
