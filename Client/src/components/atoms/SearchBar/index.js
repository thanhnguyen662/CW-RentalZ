import { useNavigation } from '@react-navigation/native';
import { Input, Box, Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = (props) => {
   const navigation = useNavigation();
   const { handleOnSearch } = props;
   const [input, setInput] = useState();

   const timeout = useRef(null);

   const handleChangeText = (value) => {
      setInput(value);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         const formValues = {
            searchKeyword: value,
         };
         handleOnSearch(formValues);
      }, 400);
   };

   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         setInput('');
      });
      return unsubscribe;
   }, []);

   return (
      <>
         <Box
            space={5}
            alignItems='center'
            style={{ backgroundColor: 'white' }}
            mb='5'
            mt='4'
            mx='4'
            borderRadius='10'
         >
            <Input
               value={input}
               onChangeText={(value) => handleChangeText(value)}
               placeholder='Search'
               borderRadius='10'
               placeholderTextColor='gray.900'
               borderWidth='0'
               py='3'
               InputLeftElement={
                  <Icon
                     ml='2'
                     size='5'
                     color='gray.500'
                     as={<Ionicons name='ios-search' />}
                  />
               }
            />
         </Box>
      </>
   );
};

export default SearchBar;
