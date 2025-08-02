import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/ui/linear-dialog';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const items = [
  {
    id: 1,
    url: "https://assets.intalchemy.com/Screenshot%202025-08-02%20at%202.37.15%E2%80%AFPM.png",
    title: 'Byte Wallet',
    description:
      'React Native based custodial wallet with banking on ramping and off-ramping of crypto assets.',
    tags: ['React Native', 'TypeScript', 'Hono API', 'Plaid'],
    link: "https://hitzoom.bytefederal.com/bytewallet"
  },
  {
    id: 2,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Byte Vault',
    description: `Crypto currency vault for the non-custodial storage of crypto assets with secure, encrypted local storage.`,
    tags: ['React Native', 'TypeScript', 'Fast API'],
    link: "https://www.bytefederal.com/vault"
  },
  {
    id: 3,
    url: "https://assets.intalchemy.com/Screenshot%202025-08-02%20at%202.34.50%E2%80%AFPM.png",
    title: 'Interactive Alchemy',
    description: `Software consulting, web design and software development business focused on curating and consulting custom software solutions for clients with custom built CMS platform as a service created with Next.js `,
    tags: ['Next.js', 'Tailwind CSS', 'CMS', 'Software Development'],
    link: "https://interactivealchemy.studio"
  },
  {
    id: 4,
    url: "https://assets.intalchemy.com/memories.png",
    title: 'Permanent Memories',
    description: `Web 3.0 web-app in Next.js that allows users to connect their ‘Wander’ wallet to web client, use Arweave cryptocurrency to permanently store images and videos in a google drive style interface`,
    tags: ['Next.js', 'Arweave', 'Database', 'Authentication', 'E-commerce'],
    link: "https://permanentmemories.io"
  },
  {
    id: 5,
    url: "https://assets.intalchemy.com/Screenshot%202025-08-02%20at%202.34.18%E2%80%AFPM.png",
    title: 'Ascii Component Library',
    description: `A modern component library for customizable, animated ascii art with a focus on accessibility and performance.`,
    tags: ['React', 'Tailwind CSS', 'Component Library'],
    link: "https://interactivealchemy.studio/ascii-components"
  },
  {
    id: 6,
    url: "https://www.martianrepublic.org/assets/wallet/img/marscoin_wallet.png",
    title: 'Martian Republic',
    description: `Developed and designed client side HD wallet for Marscoin cryptocurrency. Users can authenticate and create a client side non-custodial wallet by leveraging bitcoin-lib.js and pbkdf2 to encrypt and decrypt in localstorage.Architected proposal system protocol on the blockchain based on Pebas to construct transactions and broadcast them on chain. Proposal protocol is based on OP_CODE null transactions with users able to propose changes to DAO as well as vote on the proposals without the use of smart contracts`,
    tags: ['Bitcoin', 'DAO', 'Blockchain', 'Proposal System', 'Marscoin'],
    link: "https://martianrepublic.org"
  },
];
interface ProjectsProps {
  initialCount?: number;
  showExpandButton?: boolean;
  expandButtonText?: string;
}

export default function Projects({ 
  initialCount = 3, 
  showExpandButton = false,
  expandButtonText = "View More Projects"
}: ProjectsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialCount);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => setShowAll(true), 100);
  };

  return (
    <div className="space-y-6">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <AnimatePresence>
          {displayedItems.map((item, i) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Dialog
                  transition={{
                    type: 'spring',
                    bounce: 0.05,
                    duration: 0.5,
                  }}
                >
              <DialogTrigger className='bg-[#e8d5b8] dark:bg-[#2a2928] rounded-2xl p-6 border border-[#3B3A3A] hover:shadow-lg transition-all duration-300 flex w-full flex-col overflow-hidden'>
                <div className="h-48 bg-gradient-to-br from-[#e8d5b8] to-[#3B3A3A] rounded-lg mb-4 flex items-center justify-center">
                  <DialogImage
                    // @ts-ignore
                    src={item.url}
                    alt=''
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>
                <DialogTitle className='text-xl font-bold text-[#151515] dark:text-white mb-2'>
                  {item.title}
                </DialogTitle>
                <p className="text-sm text-[#3B3A3A] dark:text-gray-400 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded text-[#3B3A3A] dark:text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className='absolute bottom-2 right-2 p-2 bg-[#f5f3ee] dark:bg-[#1f1e1d] hover:bg-[#e8d5b8] dark:hover:bg-[#3B3A3A] rounded-full transition-colors'>
                  <Plus className='w-4 h-4 text-[#3B3A3A] dark:text-gray-400' />
                </button>
              </DialogTrigger>
              <DialogContainer className='pt-20'>
                <DialogContent
                  style={{
                    borderRadius: '24px',
                  }}
                  className='bg-[#e8d5b8] dark:bg-[#2a2928] border border-[#3B3A3A] shadow-2xl relative flex h-full mx-auto flex-col overflow-y-auto lg:w-[900px] w-[80%]'
                >
                  <DialogImage
                    // @ts-ignore
                    src={item.url}
                    alt=''
                    className='h-[50%]  object-contain w-[60%] mx-auto rounded-2xl'
                  />
                  <div className='p-6'>
                    <DialogTitle className='text-4xl font-bold text-[#151515] dark:text-white mb-4'>
                      {item.title}
                    </DialogTitle>

                    <DialogDescription
                      disableLayoutAnimation
                      variants={{
                        initial: { opacity: 0, scale: 0.8, y: -40 },
                        animate: { opacity: 1, scale: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.8, y: -50 },
                      }}
                    >
                      <p className='text-base text-[#3B3A3A] dark:text-gray-400 mb-6 leading-relaxed'>
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="text-sm px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[56px] sm:h-[64px] flex items-center p-[8px] sm:p-[11px] rounded-full hover:shadow-lg transition-all duration-300 w-fit mx-auto"
                      >
                        <div className="border border-[#3B3A3A] bg-[#ff3f17] h-[39px] sm:h-[43px] rounded-full flex items-center justify-center text-white">
                          <p className="font-medium tracking-tight mr-2 sm:mr-3 ml-2 flex items-center gap-2 justify-center text-sm sm:text-base">
                            VIEW PROJECT
                          </p>
                        </div>
                        <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[22px] sm:size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
                          <svg
                            width="16"
                            height="16"
                            className="sm:w-[18px] sm:h-[18px]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </a>
                    </DialogDescription>
                  </div>
                  <DialogClose className='text-[#3B3A3A] dark:text-gray-400 bg-[#f5f3ee] dark:bg-[#1f1e1d] p-4 hover:bg-[#e8d5b8] dark:hover:bg-[#3B3A3A] rounded-full transition-colors' />
                </DialogContent>
              </DialogContainer>
            </Dialog>
          </motion.div>
        );
      })}
        </AnimatePresence>
      </div>
      
      {showExpandButton && !showAll && (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleExpand}
            className="group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] flex items-center p-[11px] rounded-full mx-auto hover:shadow-lg transition-all duration-300"
          >
            <div className="border border-[#3B3A3A] bg-[#ff3f17] h-[43px] rounded-full flex items-center justify-center text-white">
              <p className="font-medium tracking-tight mr-3 ml-2 flex items-center gap-2 justify-center">
                {expandButtonText}
              </p>
            </div>
            <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
              <Plus
                size={18}
                className="group-hover:rotate-45 ease-in-out transition-all"
              />
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
}
