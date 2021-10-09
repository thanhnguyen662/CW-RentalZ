import moment from 'moment';
import {
   AspectRatio,
   Box,
   Button,
   HStack,
   Image,
   Modal,
   Text,
   TextArea,
   VStack,
   useToast,
} from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import priceFormat from '../../../utils/priceFormat';
import styles from './CategoryCard.style';
import axios from 'axios';

const imageArray = [
   'https://pix10.agoda.net/hotelImages/200524/-1/e7e36079645da64601ea20c5249c367d.jpg?s=1024x768',
   'https://exp.cdn-hotels.com/hotels/22000000/21320000/21314100/21314041/e1260dcb_y.jpg?impolicy=fcrop&w=500&h=333&q=high',
   'https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/92/2019/11/20071929/0919-AJS-NOI-Hotel-des-Arts-SGN-1091-Web-1500x690.jpg',
   'https://www.gannett-cdn.com/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzv032bDTPdXr5CZdCAQtC9dv4PODm9CLuVw&usqp=CAU',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2oJr8oZY0uNl5esuMyJSXHOLlFXaNeL5fw&usqp=CAU',
];

const CategoryCard = (props) => {
   const { item, handleOnDelete } = props;

   const toast = useToast();
   const [showModal, setShowModal] = useState(false);
   const [showModalNote, setShowModalNote] = useState(false);
   const [showModalNote2, setShowModalNote2] = useState(false);
   const [extra, setExtra] = useState([]);
   const randomImage = Math.floor(Math.random() * imageArray.length);

   const getExtraNote = async () => {
      try {
         const response = await axios.get(
            'http://192.168.0.113:8000/rental/get/extra',
            {
               params: { propertyId: item.properties[0].id },
            },
         );
         setExtra(response.data);
         setShowModalNote(true);
      } catch (error) {
         console.log(error);
      }
   };

   const onChangeEditForm = (key, value) => {
      setExtra((prev) => {
         const find = prev.findIndex((item) => item.type === key);
         prev[find].description = value;
         return [...prev];
      });
   };

   const handleSubmitEditForm = async () => {
      try {
         const response = await axios.post(
            'http://192.168.0.113:8000/rental/update/extra',
            { extra },
         );
         if (response.data.message === 'Update success')
            setShowModalNote(false);
         toast.show({
            description: response.data.message,
            placement: 'top',
            backgroundColor: 'blue.700',
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <TouchableOpacity
            style={styles.categoryCardContainer}
            onPress={() => getExtraNote()}
         >
            <Box overflow='hidden'>
               <Box style={styles.categoryCard}>
                  <HStack style={styles.user} space={3}>
                     <Box flex='1'>
                        <Image
                           style={{ width: 50, height: 50 }}
                           resizeMode={'cover'}
                           borderRadius={500}
                           alt='Alternate Text'
                           source={{
                              uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-512.png',
                           }}
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
                        <Text fontWeight='bold' fontSize='xl' color='#FF424E'>
                           {priceFormat(item.price)}
                        </Text>
                        <HStack>
                           <Text fontSize='12'>
                              {moment(item.startDate).format('YYYY-MM-DD')}{' '}
                              {'to '}
                           </Text>
                           <Text fontSize='12'>
                              {moment(item.endDate).format('YYYY-MM-DD')}
                           </Text>
                        </HStack>
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
                     <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={() => setShowModal(true)}
                     >
                        <AntDesign name='close' size={25} color='black' />
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.noteIcon}
                        onPress={() => setShowModalNote2(true)}
                     >
                        <SimpleLineIcons
                           name='notebook'
                           size={20}
                           color='black'
                        />
                     </TouchableOpacity>
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
         <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth='400px'>
               <Modal.CloseButton />
               <Modal.Header>Are you sure?</Modal.Header>
               <Modal.Body>
                  <Text fontSize='16' fontWeight='bold'>
                     Do you really want to delete this item? This process will
                     be undone.
                  </Text>
               </Modal.Body>
               <Modal.Footer>
                  <Button.Group space={2}>
                     <Button
                        variant='ghost'
                        colorScheme='blueGray'
                        onPress={() => {
                           setShowModal(false);
                        }}
                     >
                        Cancel
                     </Button>
                     <Button
                        onPress={() => {
                           handleOnDelete(item.id);
                        }}
                        colorScheme='red'
                     >
                        Delete
                     </Button>
                  </Button.Group>
               </Modal.Footer>
            </Modal.Content>
         </Modal>
         <Modal
            isOpen={showModalNote}
            onClose={() => setShowModalNote(false)}
            size='lg'
         >
            <Modal.Content maxWidth='350'>
               <Modal.CloseButton />
               <Modal.Header>Extra note</Modal.Header>
               <Modal.Body>
                  <VStack space={3}>
                     {extra?.map((item) => {
                        const type = () => {
                           if (item.type === 'propertyType')
                              return 'Property Type';
                           if (item.type === 'bedRoom') return 'Bed Room';
                           if (item.type === 'furnitureType')
                              return 'Furniture Type';
                        };
                        return (
                           <Box key={item.id}>
                              <Text bold mb='2'>
                                 {type()}
                              </Text>
                              <TextArea
                                 h={20}
                                 w={'100%'}
                                 textAlignVertical='top'
                                 value={
                                    item.description === null
                                       ? 'None'
                                       : item.description
                                 }
                                 onChangeText={(value) =>
                                    onChangeEditForm(item.type, value)
                                 }
                              />
                           </Box>
                        );
                     })}
                  </VStack>
               </Modal.Body>
               <Modal.Footer>
                  <Button flex='1' onPress={handleSubmitEditForm}>
                     <Box flexDirection='row' alignItems='center'>
                        <Feather name='edit-2' color='white' />
                        <Text color='white' pl='2'>
                           Edit Note
                        </Text>
                     </Box>
                  </Button>
               </Modal.Footer>
            </Modal.Content>
         </Modal>
         <Modal
            isOpen={showModalNote2}
            onClose={() => setShowModalNote2(false)}
         >
            <Modal.Content maxWidth='400px'>
               <Modal.CloseButton />
               <Modal.Header>Note of Post</Modal.Header>
               <Modal.Body>
                  <Text fontSize='16' fontWeight='bold'>
                     {item.note}
                  </Text>
               </Modal.Body>
            </Modal.Content>
         </Modal>
      </>
   );
};

export default CategoryCard;
