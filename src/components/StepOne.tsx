import React, { useEffect, useState } from 'react';
import { Input, Button, Text, Icon, Box, Flex, Heading, FormErrorMessage } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../state/modalState';
import { MdOutlineEdit } from 'react-icons/md';

const StepOne: React.FC = () => {
  const [state, setState] = useRecoilState(modalState);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Set the initial name from the modalState when the component mounts
  useEffect(() => {
    if (state.interests.length > 0) {
      setName(state.interests[0]); // Assuming the first interest is the name
    }
  }, [state.interests]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(''); // Clear error on input change
  };

  const handleNext = () => {
    if (!name.trim()) {
      setError('You should type your name first');
    } else {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        interests: [name, ...prev.interests.slice(1)], // Keep the rest of the interests
      }));
      // Proceed to the next step
      console.log('Next step with name:', name);
    }
  };

  return (
    <Flex direction="column" align="center" px={{ md: "4.2rem" }} py={{ base: 0, md: 8 }}>
      <Box bg="#434E61" width="24" height="24" display="flex" alignItems="center" justifyContent="center" borderRadius="md" my={4}>
        <Text fontSize="4xl" fontWeight="bold" color="white">A</Text>
      </Box>
      <Text color="gray.400" textAlign="center" mb={6} textShadow="0px 4px 3px rgba(0, 0, 0, 0.3)">
        alice@wonderland.space
      </Text>
      <Heading as="h2" color="#434E61" size="lg" textAlign="center" mb={2} textShadow="1px 1px 0 rgba(0, 0, 0, 1), -1px -1px 0 rgba(0, 0, 0, 1), 1px -1px 0 rgba(0, 0, 0, 1), -1px 1px 0 rgba(0, 0, 0, 1)">
        Welcome to Giki
      </Heading>
      <Box position="relative" mb={1} px={8} width="full">
        <Input
          value={name}
          onChange={handleChange}
          textColor="#FF8C1E"
          textAlign="center"
          fontWeight="bold"
          bg="#F6F6F6"
          border="none"
          fontSize={{ base: '16px', md: '19px' }}
          px="58px"
          placeholder="Type Name.."
          _placeholder={{ color: 'gray.400', fontWeight: '200' }} // Set placeholder color        
          _focus={{ border: "none", boxShadow: "none" }} // Remove border and shadow on focus
        />
        <Icon
          as={MdOutlineEdit}
          position="absolute"
          right="45px"
          top="50%"
          transform="translateY(-50%)"
          zIndex="10"
          color="gray.300"
        />
      </Box>
      {error && (
        <Text color="red.500" fontSize="sm" textAlign="center">
          {error}
        </Text>
      )}
      <Text color="black" textAlign="center" my={4} fontSize="sm" textShadow="0px 2px 2px rgba(0, 0, 0, 0.3)">
        Your answers to the next few questions will help us find the right communities for you.
      </Text>
      <Button
        bg="#FF8C1E"
        color="white"
        size="sm"
        px={{ base: '5.3rem', md: '6.2rem' }}
        py={2}
        mb={4}
        rounded="md"
        _hover={{
          bgGradient: 'linear(to-r, #FF8C1E, #f7b948, #FF8C1E)',
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </Flex>
  );
};

export default StepOne;