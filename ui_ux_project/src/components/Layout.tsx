// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode; // Указываем тип для children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      {children}
    </Box>
  );
};

export default Layout;