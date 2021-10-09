import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, Heading, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/atoms/SearchBar';
import CategoryCard from '../../components/molecules/CategoryCard';
import styles from './category.style';

const Category = () => {
   const navigation = useNavigation();
   const [data, setData] = useState([]);

   useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
         const getCategory = async () => {
            try {
               const response = await axios.get(
                  'http://192.168.0.113:8000/rental/get',
               );
               console.log(response.data);
               setData(response.data.reverse());
            } catch (error) {
               console.log(error);
            }
         };
         getCategory();
      });
      return unsubscribe;
   }, []);

   const handleOnDelete = async (rentalId) => {
      try {
         const response = await axios.post(
            'http://192.168.0.113:8000/rental/delete',
            { rentalId },
         );
         console.log('rentalId:', rentalId);
         setData(data.filter((d) => d.id !== response.data.id));
      } catch (error) {
         console.log(error);
      }
   };

   const handleOnSearch = async (formValue) => {
      console.log(formValue);
      try {
         const response = await axios.get(
            'http://192.168.0.113:8000/rental/get/search',
            {
               params: formValue,
            },
         );
         setData(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <View style={styles.categoryContainer}>
         <View style={styles.header}>
            <Heading size='2xl'>Category</Heading>
         </View>
         <SearchBar handleOnSearch={handleOnSearch} />
         <View style={styles.content}>
            {data.length >= 0 && (
               <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={{ marginHorizontal: 15 }}
                  renderItem={({ item }) => {
                     return (
                        <CategoryCard
                           item={item}
                           handleOnDelete={handleOnDelete}
                        />
                     );
                  }}
               />
            )}
         </View>
      </View>
   );
};

export default Category;
