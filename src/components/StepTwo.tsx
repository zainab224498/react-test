import React, { useEffect, useState } from 'react';
import {
  Button,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { modalState } from '../state/modalState';
import { ChevronDownIcon } from '@chakra-ui/icons';

const StepTwo: React.FC = () => {
  const [state, setState] = useRecoilState(modalState);
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [errorCountry, setErrorCountry] = useState('');
  const [errorLanguage, setErrorLanguage] = useState('');

  useEffect(() => {
    if (state.interests.length > 1) {
      setLanguage(state.interests[1]);
      setCountry(state.interests[2]);
    }
  }, [state.interests]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setErrorLanguage('');
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setErrorCountry('');
  };

  const handleNext = () => {
    if (!language && !country) {
      setErrorCountry('Please select a country/region');
      setErrorLanguage('Please select a language');
    } else if (!country) {
      setErrorCountry('Please select a country/region');
    } else if (!language) {
      setErrorLanguage('Please select a language');
    } else {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        interests: [prev.interests[0], language, country],
      }));
      console.log('Next step with:', { language, country });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={{ base: 0, md: 16 }}>
      <Text fontSize="1.6rem" fontWeight="bold" color="#434E61" textAlign="center" mb="16" my="12">
        Pick your language and country/region
      </Text>

      <Menu>
        <MenuButton
          as={Button}
          bg="#F6F6F6"
          border="none"
          color="#B3B3B3"
          width="full"
          textAlign="left"
          padding="15px"
          rightIcon={<ChevronDownIcon />} 
        >
          {language || 'Select Language'}
        </MenuButton>
        <MenuList>
          {['english', 'spanish', 'french', 'arabic'].map((lang) => (
            <MenuItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              _hover={{ bg: '#FF8C1E' }} // Change option background on hover
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {errorLanguage && (
        <Text color="red.500" fontSize="sm" textAlign="center">
          {errorLanguage}
        </Text>
      )}

      <Menu>
        <MenuButton
          as={Button}
          bg="#F6F6F6"
          border="none"
          color="#B3B3B3"
          width="full"
          textAlign="left"
          padding="15px"
          mt="12px"
          rightIcon={<ChevronDownIcon />} 
        >
          {country || 'Select Country/Region'}
        </MenuButton>
        <MenuList>
          {['usa', 'spain', 'france', 'emirates', 'syria'].map((cnt) => (
            <MenuItem
              key={cnt}
              onClick={() => handleCountryChange(cnt)}
              _hover={{ bg: '#FF8C1E' }} 
            >
              {cnt.charAt(0).toUpperCase() + cnt.slice(1)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {errorCountry && (
        <Text color="red.500" fontSize="sm" textAlign="center">
          {errorCountry}
        </Text>
      )}

      <Button
        bg="#FF8C1E"
        color="white"
        size="sm"
        px={{ base: '5.3rem', md: '5.6rem' }}
        py="2"
        mt="8rem"
        borderRadius="md"
        _hover={{
          bgGradient: 'linear(to-r, #FF8C1E, #f7b948, #FF8C1E)',
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default StepTwo;