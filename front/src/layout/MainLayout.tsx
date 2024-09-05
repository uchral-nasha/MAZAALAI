import type { ReactNode } from 'react';

import Navbar from '@/navigation/Navbar';
import { Footer } from '@/templates/Footer';
import { AppConfig } from '@/utils/AppConfig';

import { Meta } from './Meta';

const MainLayout = ({ children }: { children: ReactNode }) => (
  <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);

export { MainLayout };
