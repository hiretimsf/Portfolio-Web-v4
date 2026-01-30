# Bundle Size Optimization Guide

## How to Analyze Bundle Size

Bundle analyzer has been configured. Run:

```bash
npm run analyze
```

This will build your app and open interactive visualizations showing:
- Size of each JavaScript bundle
- Which dependencies contribute most to bundle size
- What code is included in each chunk

## Known Issues to Investigate

Based on the codebase review, these are the main bundle size concerns:

### 1. Multiple Icon Libraries (HIGH PRIORITY)

You're using 3 different icon libraries:
- `lucide-react` (0.562.0) - ~91KB
- `react-icons` (5.5.0) - ~200KB+
- `@tabler/icons-react` (3.36.1) - ~500KB+

**Recommendation**: Consolidate to `lucide-react` only
- It's the smallest and most modern
- Has excellent tree-shaking
- Covers most common use cases

**Action**:
1. Run `npm run analyze` to see actual impact
2. Search codebase for icon usage:
   ```bash
   npx grep -r "from 'react-icons'" .
   npx grep -r "from '@tabler/icons-react'" .
   ```
3. Replace with Lucide equivalents
4. Remove unused packages

### 2. Heavy Radix UI Components

You import 20+ Radix UI primitives. Check if all are used:

```bash
npx depcheck --ignore-dirs=.next,node_modules
```

### 3. Particle Animation Library

`@tsparticles/*` packages (~300KB+) for sparkles effect:
- Consider lazy loading this component
- Only load when actually visible/needed
- Use dynamic imports:

```typescript
const Sparkles = dynamic(() => import('@/components/ui/sparkles'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />
});
```

## Optimization Checklist

- [ ] Run `npm run analyze` to establish baseline
- [ ] Consolidate icon libraries to lucide-react
- [ ] Remove unused Radix UI components
- [ ] Lazy load heavy components (Sparkles, etc.)
- [ ] Check for duplicate dependencies
- [ ] Verify tree-shaking is working
- [ ] Consider code-splitting heavy pages
- [ ] Review large dependencies in analyzer

## Target Bundle Sizes

For good performance:
- **Main JS bundle**: < 200KB (gzipped)
- **Total first load JS**: < 300KB (gzipped)
- **Largest chunk**: < 150KB (gzipped)

## Monitoring

Add to CI/CD:
```bash
npm run build && npm run analyze
```

Track bundle size over time with:
- [Bundlephobia](https://bundlephobia.com/) for dependency research
- GitHub Actions with bundle size reporting
- Next.js built-in webpack bundle analyzer

## Quick Wins

1. **Remove unused dependencies**:
   ```bash
   npm prune
   npx depcheck
   ```

2. **Check for duplicates**:
   ```bash
   npm ls lucide-react
   npm ls react-icons
   ```

3. **Analyze specific imports**:
   - Avoid barrel imports: `import { Button } from '@radix-ui/react'`
   - Use direct imports: `import { Button } from '@radix-ui/react-button'`

## Resources

- [Next.js Bundle Analyzer Docs](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Import Cost VSCode Extension](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
