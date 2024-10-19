import React, { useEffect, useState } from 'react';
import { ChakraProvider, Button, Box, Image } from '@chakra-ui/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { modalState } from './state/modalState';
import ModalSteps from './components/ModalSteps';

const App = () => {
  const [state, setState] = useRecoilState(modalState);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  const openModal = () => {
    // Reset state when opening the modal
    setState({
      currentStep: 0,
      interests: [] as string[],
      isModalOpen: true,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ChakraProvider>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={`${viewportHeight}px`} // Set height dynamically
        flexDirection="column"
        backgroundColor="#434E61"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={{ base: "300px", md: "400px", lg: "541px" }}
          height={{ base: "150px", md: "200px", lg: "251px" }}
          objectFit="contain"
        />
        <Button
          bg="#FF8C1E"
          color="white"
          px={{ base: "4rem", md: "8rem" }} 
          py="2"
          mt="20"
          borderRadius="md"
          _hover={{
            bgGradient: 'linear(to-r, #FF8C1E, #f7b948, #FF8C1E)',
          }}
          onClick={openModal}
        >
          OPEN MODAL
        </Button>
        {state.isModalOpen && <ModalSteps />}
      </Box>
    </ChakraProvider>
  );
};

export default () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
