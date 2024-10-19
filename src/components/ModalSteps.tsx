import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../state/modalState';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Box,
  useDisclosure,
} from '@chakra-ui/react';

const stepsComponents = [StepOne, StepTwo, StepThree];

const ModalSteps: React.FC = () => {
  const [state, setState] = useRecoilState(modalState);
  const CurrentStepComponent = stepsComponents[state.currentStep];


  const prevStep = () => {
    if (state.currentStep > 0) {
      setState({ ...state, currentStep: state.currentStep - 1 });
    }
  };

  const closeModal = () => {
    setState({ ...state, isModalOpen: false });
  };

  return (
    <>
      <Modal isOpen={state.isModalOpen} onClose={closeModal} closeOnOverlayClick={false} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent px={{ base: '2', md: '4' }} mx={{ base: '4', md: '0' }}>
          <ModalBody>
            <Flex direction="column" align="center" >
              <CurrentStepComponent />
            </Flex>
          </ModalBody>
          <ModalFooter pt={0}>
            <Flex direction="column" align="center" justify="center" width="100%">
              {state.currentStep > 0 && (
                <Button
                  bg="gray.200"
                  color="black"
                  _hover={{ bg: 'gray.400' }}
                  size="sm"
                  px={{ base: '5.3rem', md: '5.6rem' }}
                  py={2}
                  rounded="md"
                  onClick={prevStep}
                >
                  Back
                </Button>
              )}
              <Flex justify="center" mt={4}>
                {stepsComponents.map((_, index) => (
                  <Box
                    key={index}
                    w="1"
                    h="1"
                    mx="1"
                    borderRadius="full"
                    bg={
                      index < state.currentStep
                        ? '#FF8C1E'
                        : index === state.currentStep
                          ? '#FF8C1E'
                          : '#434E61'
                    }
                  />
                ))}
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const isStepValid = (step: number) => {
  // Implement validation logic based on the step
  return true; // Replace with actual validation
};

export default ModalSteps;