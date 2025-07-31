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
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Interactive Gallery',
    description:
      'Immerse yourself in our cutting-edge interactive gallery, designed to showcase a diverse array of visual content with unparalleled clarity and style. This feature allows users to effortlessly navigate through high-resolution images, from awe-inspiring landscapes to intimate portraits and abstract art. With smooth transitions, intuitive controls, and responsive design, our gallery adapts to any device, ensuring a seamless browsing experience.',
    tags: ['React', 'TypeScript', 'Responsive', 'Gallery', 'Interactive'],
  },
  {
    id: 2,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: '3D Globe Explorer',
    description: `Embark on a virtual journey around the world with our state-of-the-art 3D globe feature. This interactive marvel allows users to explore geographical data, global trends, and worldwide connections with unprecedented ease and detail. Spin the globe with a flick of your mouse, zoom into street-level views, or soar high for a continental perspective.`,
    tags: ['Three.js', 'WebGL', '3D', 'Geographic', 'Data Viz'],
  },
  {
    id: 3,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Image Mouse Trail',
    description: `Transform your browsing experience with our mesmerizing Image Mouse Trail feature. As you move your cursor across the screen, watch in wonder as a trail of carefully curated images follows in its wake, creating a dynamic and engaging visual spectacle. This innovative feature goes beyond mere aesthetics.`,
    tags: ['CSS', 'Animation', 'Interactive', 'Creative', 'Frontend'],
  },
  {
    id: 4,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'E-commerce Platform',
    description: `A full-featured e-commerce platform built with modern technologies. Features include user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard. The platform is optimized for performance and scalability with server-side rendering and static generation.`,
    tags: ['Next.js', 'Stripe', 'Database', 'Authentication', 'E-commerce'],
  },
  {
    id: 5,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Real-time Chat App',
    description: `A modern real-time chat application featuring instant messaging, group chats, file sharing, emoji reactions, and user presence indicators. Built with WebSocket technology for seamless real-time communication and includes features like message encryption and offline message sync.`,
    tags: ['WebSocket', 'Real-time', 'Chat', 'Node.js', 'Security'],
  },
  {
    id: 6,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Analytics Dashboard',
    description: `Comprehensive analytics dashboard providing insights into user behavior, performance metrics, and business intelligence. Features interactive charts, real-time data updates, customizable widgets, and export functionality. Built with modern data visualization libraries and optimized for large datasets.`,
    tags: ['Analytics', 'Charts', 'Data Viz', 'Dashboard', 'Business Intelligence'],
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
                    src={item.url?.src}
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
                    src={item.url.src}
                    alt=''
                    className='h-full  object-contain w-[60%] mx-auto'
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
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="text-sm px-3 py-1 bg-[#f5f3ee] dark:bg-[#1f1e1d] rounded-full text-[#3B3A3A] dark:text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
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
