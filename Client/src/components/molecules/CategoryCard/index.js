import React from 'react';
import { Image, View, Box, AspectRatio, Text, HStack } from 'native-base';
import styles from './CategoryCard.style';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

const imageArray = [
   'https://pix10.agoda.net/hotelImages/200524/-1/e7e36079645da64601ea20c5249c367d.jpg?s=1024x768',
   'https://exp.cdn-hotels.com/hotels/22000000/21320000/21314100/21314041/e1260dcb_y.jpg?impolicy=fcrop&w=500&h=333&q=high',
   'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/92/2019/11/20071929/0919-AJS-NOI-Hotel-des-Arts-SGN-1091-Web-1500x690.jpg',
   'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzv032bDTPdXr5CZdCAQtC9dv4PODm9CLuVw&usqp=CAU',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2oJr8oZY0uNl5esuMyJSXHOLlFXaNeL5fw&usqp=CAU',
];

const CategoryCard = (props) => {
   const randomImage = Math.floor(Math.random() * imageArray.length);
   const { item } = props;
   return (
      <TouchableOpacity
         style={styles.categoryCardContainer}
         onPress={() => console.log(item.id)}
      >
         <Box overflow='hidden'>
            <Box style={styles.categoryCard}>
               <HStack style={styles.user} space={3}>
                  <Box flex='1'>
                     <Image
                        style={{ width: 50, height: 50 }}
                        resizeMode={'contain'}
                        borderRadius={500}
                        source={{
                           uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png',
                        }}
                        alt='Alternate Text'
                     />
                  </Box>
                  <Box flex='4'>
                     <Text fontWeight='bold' fontSize='lg'>
                        {item.name}
                     </Text>
                     <Text>{item.address}</Text>
                  </Box>
                  <Box
                     flex='2'
                     style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                     }}
                  >
                     <Text>{moment(item.startDate).format('YYYY-MM-DD')}</Text>
                     <Text>{moment(item.endDate).format('YYYY-MM-DD')}</Text>
                  </Box>
               </HStack>
               <Box>
                  <AspectRatio ratio={16 / 10}>
                     <Image
                        source={{
                           uri: imageArray[randomImage],
                        }}
                        alt='image'
                        rounded='15'
                     />
                  </AspectRatio>
               </Box>
               <Box style={{ marginTop: 15, paddingHorizontal: 15 }}>
                  <HStack flex='1' alignItems='center'>
                     <HStack flex='1' space='2' alignItems='center'>
                        <Feather name='moon' size={25} />
                        <Text>{item.properties[0].bedRoom}</Text>
                     </HStack>
                     <HStack flex='1' space='2' alignItems='center'>
                        <Feather name='home' size={25} />
                        <Text>{item.properties[0].propertyType}</Text>
                     </HStack>
                     <HStack flex='1' space='2' alignItems='center'>
                        <Feather name='image' size={25} />
                        <Text>{item.properties[0].furnitureType}</Text>
                     </HStack>
                  </HStack>
               </Box>
            </Box>
         </Box>
      </TouchableOpacity>
   );
};

export default CategoryCard;
