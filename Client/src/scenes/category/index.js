import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FlatList, Heading, View } from 'native-base';
import React, { useEffect, useState } from 'react';
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
               console.log('Category: ', response.data);
               setData(response.data);
            } catch (error) {
               console.log(error);
            }
         };
         getCategory();
      });
      return unsubscribe;
   }, []);

   return (
      <View style={styles.categoryContainer}>
         <View style={styles.header}>
            <Heading size='2xl'>Category</Heading>
         </View>
         <View style={styles.content}>
            <FlatList
               data={data}
               keyExtractor={(item) => item.id}
               contentContainerStyle={{ marginHorizontal: 15 }}
               renderItem={({ item }) => {
                  return <CategoryCard item={item} />;
               }}
            />
         </View>
      </View>
   );
};

export default Category;
