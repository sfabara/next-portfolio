'use client';

import * as React from 'react';
import { RotateCcw, ArrowUpRight } from 'lucide-react';
import { motion, type Transition } from 'motion/react';

const notifications = [
  {
    id: 1,
    title: 'feat: user icon',
    subtitle: 'Commit d6d5334',
    time: '3 days ago',
    count: undefined,
    hash: 'd6d5334',
  },
  {
    id: 2,
    title: 'feat: responsive mobile scroll trigger',
    subtitle: 'Commit 56132e3',
    time: '3 days ago',
    hash: '56132e3',
  },
  {
    id: 3,
    title: 'feat: added rolling text + new dialog style',
    subtitle: 'Commit 844e1cb',
    time: '4 days ago',
    hash: '844e1cb',
  },
];

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
              href={`https://github.com/sfabara/next-portfolio/commit/${notification.hash}`}
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
            Notifications
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
