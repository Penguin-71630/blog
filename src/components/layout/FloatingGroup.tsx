/**
 * FloatingGroup Component
 *
 * Floating action buttons for navigation and utilities.
 * - Scroll to top/bottom
 * - Search
 * - Theme toggle
 * - Christmas effects toggle
 * - Expand/collapse toggle
 */

import { bgmConfig, christmasConfig } from '@constants/site-config';
import { useIsMounted } from '@hooks/useIsMounted';
import { Icon } from '@iconify/react';
import { cn } from '@lib/utils';
import { useStore } from '@nanostores/react';
import { $bgmPanelOpen, toggleBgmPanel } from '@store/bgm';
import { christmasEnabled, disableChristmasCompletely, enableChristmas, initChristmasState } from '@store/christmas';
import { $isDrawerOpen, openModal } from '@store/modal';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';

interface FloatingButtonProps {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FloatingButton({ onClick, ariaLabel, title, children, className }: FloatingButtonProps) {
  const isMounted = useIsMounted();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full bg-background/80 p-2 opacity-80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-background hover:opacity-100',
        className,
      )}
      aria-label={ariaLabel}
      title={isMounted ? title : undefined}
    >
      {children}
    </button>
  );
}

export default function FloatingGroup() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const isDrawerOpen = useStore($isDrawerOpen);
  const isChristmasEnabled = useStore(christmasEnabled);
  const isBgmPanelOpen = useStore($bgmPanelOpen);

  // Initialize christmas state on mount
  useEffect(() => {
    initChristmasState();
  }, []);

  // Initialize theme state
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));

      // Watch for theme changes
      const observer = new MutationObserver(() => {
        setIsDarkTheme(document.documentElement.classList.contains('dark'));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      return () => observer.disconnect();
    }
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

  const toggleChristmas = () => {
    if (christmasEnabled.get()) {
      disableChristmasCompletely();
    } else {
      enableChristmas();
    }
  };

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const newIsDark = !isDarkTheme;
    const theme = newIsDark ? 'dark' : 'light';

    root.classList.add('theme-transition');
    root.classList.toggle('dark', newIsDark);
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    setIsDarkTheme(newIsDark);

    setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 100);
  }, [isDarkTheme]);

  const openSearch = useCallback(() => {
    openModal('search');
  }, []);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Hide when drawer is open
  const isHidden = isDrawerOpen;

  return (
    <motion.div
      className="fixed right-4 tablet:right-4 bottom-4 z-50 flex flex-col gap-2 text-primary"
      style={{
        right: 'max(1rem, calc((100vw - 1400px) / 2))',
      }}
      animate={{
        x: isHidden ? 200 : 0,
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? 'none' : 'auto',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col gap-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            <FloatingButton onClick={toggleTheme} ariaLabel="切换主题" title="切换主题">
              <Icon icon={isDarkTheme ? 'ri:sun-line' : 'ri:moon-line'} className="h-5 w-5" />
            </FloatingButton>
            <FloatingButton onClick={openSearch} ariaLabel="搜索" title="搜索">
              <Icon icon="ri:search-line" className="h-5 w-5" />
            </FloatingButton>
            {christmasConfig.enabled && (
              <FloatingButton onClick={toggleChristmas} ariaLabel="切换圣诞特效" title="切换圣诞特效">
                <Icon icon={isChristmasEnabled ? 'ri:snowy-fill' : 'ri:snowy-line'} className="h-5 w-5" />
              </FloatingButton>
            )}
            <FloatingButton onClick={scrollToTop} ariaLabel="回到顶部" title="回到顶部">
              <Icon icon="ri:arrow-up-s-line" className="h-5 w-5" />
            </FloatingButton>
            <FloatingButton onClick={scrollToBottom} ariaLabel="滚到底部" title="滚到底部">
              <Icon icon="ri:arrow-down-s-line" className="h-5 w-5" />
            </FloatingButton>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingButton onClick={toggleExpand} ariaLabel="展开/收起工具栏" title="展开/收起工具栏" className="size-9 flex-center">
        <Icon icon={isExpanded ? 'ri:close-large-fill' : 'ri:magic-fill'} className="size-4" />
      </FloatingButton>
    </motion.div>
  );
}
