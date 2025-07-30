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
import { motion } from 'motion/react';

const items = [
  {
    id: 1,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Accordion',
    description:
      'Immerse yourself in our cutting-edge interactive gallery, designed to showcase a diverse array of visual content with unparalleled clarity and style. This feature allows users to effortlessly navigate through high-resolution images, from awe-inspiring landscapes to intimate portraits and abstract art. With smooth transitions, intuitive controls, and responsive design, our gallery adapts to any device, ensuring a seamless browsing experience. Dive deeper into each piece with expandable information panels, offering insights into the artist, technique, and story behind each image. ',
    tags: ['Sunrise', 'Mountains', 'Golden', 'Scenic', 'Inspiring'],
  },
  {
    id: 2,
    url:    "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Globe Section',
    description: `Embark on a virtual journey around the world with our state-of-the-art 3D globe feature. This interactive marvel allows users to explore geographical data, global trends, and worldwide connections with unprecedented ease and detail. Spin the globe with a flick of your mouse, zoom into street-level views, or soar high for a continental perspective. Our globe section integrates real-time data feeds, showcasing everything from climate patterns and population densities to economic indicators and cultural hotspots. Customizable layers let you focus on specific data sets, while intuitive tooltips provide in-depth information at every turn. `,
    tags: ['Misty', 'Path', 'Mysterious', 'Serene', 'Rugged'],
  },
  {
    id: 3,
    url: "https://www.bytefederal.com/img/bytewallet/screen.webp",
    title: 'Image Mouse Trail',
    description: `Transform your browsing experience with our mesmerizing Image Mouse Trail feature. As you move your cursor across the screen, watch in wonder as a trail of carefully curated images follows in its wake, creating a dynamic and engaging visual spectacle. This innovative feature goes beyond mere aesthetics; it's an interactive showcase of your content, products, or artwork. Each image in the trail can be clickable, leading to detailed views or related content, turning casual mouse movements into opportunities for discovery.`,
    tags: ['Pathway', 'Adventure', 'Peaks', 'Challenging', 'Breathtaking'],
  },
];
export default function Projects() {
  return (
    <div className='flex gap-4'>
      {items.map((item, i) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
}
