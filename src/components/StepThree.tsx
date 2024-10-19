import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  Text,
  Image
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../state/modalState';

const images = [
  { src: 'engineering.jpg', title: 'Engineering' },
  { src: 'computer.png', title: 'Computer' },
  { src: 'medicine.png', title: 'Medicine' },
  { src: 'pharmtech.png', title: 'Pharmtech' },
];

const StepThree: React.FC = () => {
  const [state, setState] = useRecoilState(modalState);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (state.interests.length > 3) {
      setSelectedPhotos(state.interests.slice(1, 4)); // Ensure only the first three are selected
    }
  }, [state.interests]);

  const togglePhotoSelection = (photo: string) => {
    setSelectedPhotos(prev => {
      if (prev.includes(photo)) {
        return prev.filter(p => p !== photo); // Deselect the image
      } else if (prev.length < 3) {
        return [...prev, photo]; // Select the new image
      }
      return prev; // Do not add if already 3 images are selected
    });
  };

  const handleNext = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setState(prev => ({ ...prev, isModalOpen: false })); // Close the main modal here too
  };

  const isButtonDisabled = selectedPhotos.length !== 3; // Button is disabled unless exactly 3 images are selected

  return (
    <Box className="flex flex-col items-center">
      <Text fontSize="1.8rem" fontWeight="bold" color="#434E61" textAlign="center" mb="4" mt={{ base: 8, md: 16 }} mx={{ base: 0, md: 12 }}>
        Tell us what you’re interested in
      </Text>
      <Flex
        wrap="wrap" // Allow items to wrap to the next line
        justifyContent="center"
        mb="4"
      >
        {images.map(image => (
          <Box
            key={image.src}
            position="relative"
            textAlign="center"
            mx="1"
            my="2"
            borderWidth="2px"
            borderColor={selectedPhotos.includes(image.src) ? 'orange.300' : 'transparent'}
            borderRadius="md"
            cursor="pointer"
            onClick={() => togglePhotoSelection(image.src)}
          >
            <Image
              src={image.src}
              alt={image.title}
              boxSize="28"
              borderRadius="md"
              objectFit="cover"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }}
            />
            <Text
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              color="white"
              textShadow="0 0 5px rgba(0, 0, 0, 0.5)"
              fontSize="14px"
            >
              {image.title}
            </Text>
          </Box>
        ))}
      </Flex>
      <Button
        bg={isButtonDisabled ? '#B3B3B3' : '#FF8C1E'}
        color="white"
        isDisabled={isButtonDisabled}
        size="sm"
        px={{ base: "3.9rem", md: "4.2rem" }}
        py="2"
        mt={{ base: "2rem", lg: "7rem" }}
        _hover={{
          bgGradient: 'linear(to-r, #FF8C1E, #f7b948, #FF8C1E)',
        }}
        onClick={handleNext}
      >
        Pick 3 more
      </Button>

      {/* Modal for success message */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent mx={{ base: '4', md: '0' }}>
          <ModalHeader color="#FF8C1E">Success!</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody textAlign="center" fontSize={{ base: '1.2rem', md: '1.6rem' }} fontWeight="bold" color="#434E61" mb="8">
            You submitted successfully.
            <Text as="p">
              Thank you.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StepThree;