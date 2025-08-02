'use client';

import * as React from 'react';
import { RotateCcw, ArrowUpRight, Loader2 } from 'lucide-react';
import { motion, type Transition } from 'motion/react';

interface Notification {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  hash: string;
  author: string;
  url: string;
  count?: number;
}

const transition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 26,
};

const getCardVariants = (i: number) => ({
  collapsed: {
    marginTop: i === 0 ? 0 : -44,
    scaleX: 1 - i * 0.05,
  },
  expanded: {
    marginTop: i === 0 ? 0 : 4,
    scaleX: 1,
  },
});

const textSwitchTransition: Transition = {
  duration: 0.22,
  ease: 'easeInOut',
};

const notificationTextVariants = {
  collapsed: { opacity: 1, y: 0, pointerEvents: 'auto' },
  expanded: { opacity: 0, y: -16, pointerEvents: 'none' },
};

const viewAllTextVariants = {
  collapsed: { opacity: 0, y: 16, pointerEvents: 'none' },
  expanded: { opacity: 1, y: 0, pointerEvents: 'auto' },
};

function NotificationList() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchCommits = React.useCallback(async () => {
    try {
      const response = await fetch('/api/commits');
      if (!response.ok) {
        throw new Error('Failed to fetch commits');
      }
      const data = await response.json();
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching commits:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // Initial fetch
    fetchCommits();

    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(fetchCommits, 30000);

    return () => clearInterval(interval);
  }, [fetchCommits]);

  if (isLoading) {
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 p-3 rounded-3xl w-xs space-y-1 shadow-md">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="size-6 animate-spin text-neutral-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 p-3 rounded-3xl w-xs space-y-1 shadow-md">
        <div className="text-center py-4">
          <p className="text-sm text-red-500 dark:text-red-400">
            Failed to load commits
          </p>
          <button 
            onClick={fetchCommits}
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 mt-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-neutral-200 dark:bg-neutral-900 p-3 rounded-3xl w-xs space-y-1 shadow-md"
      initial="collapsed"
      whileHover="expanded"
    >
      <div>
        {notifications.map((notification, i) => (
          <motion.div
            key={notification.id}
            className="bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-2 shadow-sm hover:shadow-lg transition-shadow duration-200 relative"
            variants={getCardVariants(i)}
            transition={transition}
            style={{
              zIndex: notifications.length - i,
            }}
          >
            <a
              href={notification.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {notification.title}
                </h1>
                {notification.count && (
                  <div className="flex items-center text-xs gap-0.5 font-medium text-neutral-500 dark:text-neutral-300">
                    <RotateCcw className="size-3" />
                    <span>{notification.count}</span>
                  </div>
                )}
              </div>
              <div className="text-xs text-neutral-500 font-medium">
                <span>{notification.time}</span>
                &nbsp;•&nbsp;
                <span>{notification.subtitle}</span>
                {notification.author && (
                  <>
                    &nbsp;•&nbsp;
                    <span>by {notification.author}</span>
                  </>
                )}
              </div>
            </a>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="size-5 rounded-full bg-neutral-400 text-white text-xs flex items-center justify-center font-medium">
          {notifications.length}
        </div>
        <span className="grid">
          <motion.span
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300 row-start-1 col-start-1"
            variants={notificationTextVariants}
            transition={textSwitchTransition}
          >
            Recent Commits
          </motion.span>
          <motion.span
            className="text-sm font-medium text-neutral-600 dark:text-neutral-300 flex items-center gap-1 cursor-pointer select-none row-start-1 col-start-1"
            variants={viewAllTextVariants}
            transition={textSwitchTransition}
          >
            <a
              href="https://github.com/sfabara/next-portfolio/commits/main"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              View all <ArrowUpRight className="size-4" />
            </a>
          </motion.span>
        </span>
      </div>
    </motion.div>
  );
}

export { NotificationList };
