import React, { useState } from 'react';
import {
   View,
   Text,
   Heading,
   Input,
   FormControl,
   WarningOutlineIcon,
   Button,
   CheckIcon,
   VStack,
   HStack,
   Select,
   TextArea,
   Modal,
   ScrollView,
   useToast,
} from 'native-base';
import styles from './home.styles';
import * as yup from 'yup';
import { Formik } from 'formik';
import Datepicker from '../../components/molecules/Datepicker';
import moment from 'moment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
   const toast = useToast();
   const navigation = useNavigation();
   const [data, setData] = useState({});
   const [showModal, setShowModal] = useState(false);

   const initialValues = {
      name: '',
      address: '',
      startDate: '',
      endDate: '',
      propertyType: '',
      furnitureType: '',
      bedRoom: '',
      rentPrice: '',
      note: '',
   };

   const propertyType = ['Flat', 'House', 'Bungalow'];
   const bedRoom = ['Studio', 'One', 'Two', 'Three'];
   const furnitureType = ['Furnished', 'Unfurnished', 'Part Furnished'];

   const bookingValidation = yup.object().shape({
      name: yup
         .string()
         .min(8, 'Name must be at least 8 characters long')
         .required('Name is Required'),
      address: yup
         .string()
         .min(8, 'Address must be at least 8 characters long')
         .required('Address is required'),
      startDate: yup.string().required('Start Date is required'),
      endDate: yup.string().required('End Date is required'),
      propertyType: yup.string().required('Property Type is required'),
      furnitureType: yup.string().required('Furniture Type is required'),
      bedRoom: yup.string().required('Bed Room is required'),
      rentPrice: yup
         .number()
         .integer('Rental Price must be Integer')
         .moreThan(0, 'Price must be greater than 0')
         .required('Price is required'),
   });

   const onConfirm = (data) => {
      setShowModal(true);
      setData(data);
   };

   const isDatePickerDisabled = (startDate) => {
      if (!startDate) return true;
      return false;
   };

   const handleOnOk = async (resetForm) => {
      try {
         const response = await axios.post(
            'http://192.168.0.113:8000/rental/create',
            data,
         );
         toast.show({
            description: response.data.message,
            placement: 'top',
            backgroundColor:
               response.data.message === 'Created success'
                  ? 'blue.700'
                  : 'red.600',
         });
         console.log(response.data.message);
         if (response.data.message === 'Created success') {
            setShowModal(false);
            resetForm();
            return navigation.navigate('Category');
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <ScrollView>
            <View style={styles.formContainer}>
               <View>
                  <Heading size='2xl'>Rental Form</Heading>
                  <Text fontSize='md' style={styles.subTitle}>
                     Takes less than 10 minutes to fill out all the information
                     needed
                  </Text>
               </View>
               <View style={styles.formInput}>
                  <Formik
                     initialValues={initialValues}
                     onSubmit={onConfirm}
                     validationSchema={bookingValidation}
                  >
                     {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                     }) => (
                        <>
                           <VStack space={4}>
                              <FormControl
                                 isRequired
                                 isInvalid={
                                    'name' in errors && 'name' in touched
                                 }
                              >
                                 <FormControl.Label>Name</FormControl.Label>
                                 <Input
                                    name='name'
                                    placeholder='Input your name'
                                    value={values.name}
                                    onBlur={handleBlur('name')}
                                    onChangeText={handleChange('name')}
                                 />
                                 <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size='xs' />}
                                 >
                                    {errors.name}
                                 </FormControl.ErrorMessage>
                              </FormControl>

                              <FormControl
                                 isRequired
                                 isInvalid={
                                    'address' in errors && 'address' in touched
                                 }
                              >
                                 <FormControl.Label>Address</FormControl.Label>
                                 <Input
                                    name='address'
                                    placeholder='Input your address'
                                    value={values.address}
                                    onBlur={handleBlur('address')}
                                    onChangeText={handleChange('address')}
                                 />
                                 <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size='xs' />}
                                 >
                                    {errors.address}
                                 </FormControl.ErrorMessage>
                              </FormControl>

                              <HStack space={4} width='47.5%'>
                                 <FormControl
                                    isRequired
                                    isInvalid={
                                       'startDate' in errors &&
                                       'startDate' in touched
                                    }
                                 >
                                    <FormControl.Label>
                                       Start Date
                                    </FormControl.Label>
                                    <Datepicker
                                       setFieldValue={setFieldValue}
                                       fieldName='startDate'
                                       value={values.startDate}
                                       onBlur={handleBlur('startDate')}
                                       error={errors.startDate}
                                       touched={touched.startDate}
                                       minimumDate={new Date()}
                                    />
                                    <FormControl.ErrorMessage
                                       leftIcon={
                                          <WarningOutlineIcon size='xs' />
                                       }
                                    >
                                       {errors.startDate}
                                    </FormControl.ErrorMessage>
                                 </FormControl>

                                 <FormControl
                                    isRequired
                                    isInvalid={
                                       'endDate' in errors &&
                                       'endDate' in touched
                                    }
                                 >
                                    <FormControl.Label>
                                       End Date
                                    </FormControl.Label>
                                    <Datepicker
                                       setFieldValue={setFieldValue}
                                       fieldName='endDate'
                                       value={values.endDate}
                                       onBlur={handleBlur('endDate')}
                                       error={errors.endDate}
                                       touched={touched.startDate}
                                       minimumDate={values.startDate}
                                       isDisabled={isDatePickerDisabled(
                                          values.startDate,
                                       )}
                                    />
                                    <FormControl.ErrorMessage
                                       leftIcon={
                                          <WarningOutlineIcon size='xs' />
                                       }
                                    >
                                       {errors.endDate}
                                    </FormControl.ErrorMessage>
                                 </FormControl>
                              </HStack>

                              <FormControl
                                 isRequired
                                 isInvalid={
                                    'propertyType' in errors &&
                                    'propertyType' in touched
                                 }
                              >
                                 <FormControl.Label>
                                    Property Type
                                 </FormControl.Label>
                                 <Select
                                    onValueChange={(itemValue) =>
                                       setFieldValue('propertyType', itemValue)
                                    }
                                    value={values.propertyType}
                                    fieldName='propertyType'
                                    onBlur={handleBlur('propertyType')}
                                    placeholder='Choose Property Type'
                                 >
                                    {propertyType.map((p) => (
                                       <Select.Item
                                          label={p}
                                          value={p}
                                          key={p}
                                       />
                                    ))}
                                 </Select>
                                 <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size='xs' />}
                                 >
                                    {errors.propertyType}
                                 </FormControl.ErrorMessage>
                              </FormControl>

                              <FormControl
                                 isRequired
                                 isInvalid={
                                    'bedRoom' in errors && 'bedRoom' in touched
                                 }
                              >
                                 <FormControl.Label>Bed Room</FormControl.Label>
                                 <Select
                                    onValueChange={(itemValue) =>
                                       setFieldValue('bedRoom', itemValue)
                                    }
                                    value={values.bedRoom}
                                    fieldName='bedRoom'
                                    onBlur={handleBlur('bedRoom')}
                                    placeholder='Choose Bed Room'
                                 >
                                    {bedRoom.map((p) => (
                                       <Select.Item
                                          label={p}
                                          value={p}
                                          key={p}
                                       />
                                    ))}
                                 </Select>
                                 <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size='xs' />}
                                 >
                                    {errors.bedRoom}
                                 </FormControl.ErrorMessage>
                              </FormControl>

                              <FormControl
                                 isRequired
                                 isInvalid={
                                    'furnitureType' in errors &&
                                    'furnitureType' in touched
                                 }
                              >
                                 <FormControl.Label>
                                    Furniture Type
                                 </FormControl.Label>
                                 <Select
                                    onValueChange={(itemValue) =>
                                       setFieldValue('furnitureType', itemValue)
                                    }
                                    value={values.furnitureType}
                                    fieldName='furnitureType'
                                    onBlur={handleBlur('furnitureType')}
                                    placeholder='Choose Furniture Type'
                                 >
                                    {furnitureType.map((p) => (
                                       <Select.Item
                                          label={p}
                                          value={p}
                                          key={p}
                                       />
                                    ))}
                                 </Select>
                                 <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size='xs' />}
                                 >
                                    {errors.furnitureType}
                                 </FormControl.ErrorMessage>
                              </FormControl>

                              <FormControl
                                 isRequired
                                 isInvalid={
                                    'rentPrice' in errors &&
                                    'rentPrice' in touched
                                 }
                              >
                                 <FormControl.Label>
                                    Rent Price
                                 </FormControl.Label>
                                 <Input
                                    name='rentPrice'
                                    placeholder='Input your Rent Price'
                                    value={values.rentPrice}
                                    onBlur={handleBlur('rentPrice')}
                                    onChangeText={handleChange('rentPrice')}
                                    keyboardType='numeric'
                                 />
                                 <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size='xs' />}
                                 >
                                    {errors.rentPrice}
                                 </FormControl.ErrorMessage>
                              </FormControl>

                              <FormControl>
                                 <FormControl.Label>Note</FormControl.Label>
                                 <TextArea
                                    name='note'
                                    placeholder='Input your Note'
                                    value={values.note}
                                    onBlur={handleBlur('note')}
                                    onChangeText={handleChange('note')}
                                    textAlignVertical='top'
                                 />
                              </FormControl>

                              <Button
                                 size='lg'
                                 leftIcon={<CheckIcon size='5' mt='0.5' />}
                                 onPress={handleSubmit}
                              >
                                 Submit
                              </Button>

                              <Modal
                                 isOpen={showModal}
                                 onClose={() => setShowModal(false)}
                                 size='lg'
                              >
                                 <Modal.Content maxWidth='250'>
                                    <Modal.CloseButton />
                                    <Modal.Header>Confirm?</Modal.Header>
                                    <Modal.Body>
                                       <VStack space={3}>
                                          {Object.entries(data).map((item) => {
                                             if (item[1] === '') return;
                                             const nameFunc = () => {
                                                if (item[0] === 'name')
                                                   return 'Name';
                                                if (item[0] === 'address')
                                                   return 'Address';
                                                if (item[0] === 'startDate')
                                                   return 'Start Date';
                                                if (item[0] === 'endDate')
                                                   return 'End Date';
                                                if (item[0] === 'propertyType')
                                                   return 'Property Type';
                                                if (item[0] === 'furnitureType')
                                                   return 'Furniture Type';
                                                if (item[0] === 'bedRoom')
                                                   return 'Bed Room';
                                                if (item[0] === 'rentPrice')
                                                   return 'Rent Price';
                                                if (item[0] === 'note')
                                                   return 'Note';
                                             };
                                             return (
                                                <HStack
                                                   alignItems='center'
                                                   justifyContent='space-between'
                                                   key={item[0]}
                                                >
                                                   <Text fontWeight='bold'>
                                                      {nameFunc()}
                                                   </Text>
                                                   <Text color='blueGray.400'>
                                                      {typeof item[1] ===
                                                      'string'
                                                         ? item[1]
                                                         : moment(
                                                              item[1],
                                                           ).format(
                                                              'YYYY-MM-DD',
                                                           )}
                                                   </Text>
                                                </HStack>
                                             );
                                          })}
                                       </VStack>
                                    </Modal.Body>
                                    <Modal.Footer>
                                       <HStack width='100%' space='3'>
                                          <Button
                                             flex='1'
                                             onPress={() => setShowModal(false)}
                                             colorScheme='danger'
                                          >
                                             Cancel
                                          </Button>
                                          <Button
                                             flex='1'
                                             onPress={() =>
                                                handleOnOk(resetForm)
                                             }
                                          >
                                             Submit
                                          </Button>
                                       </HStack>
                                    </Modal.Footer>
                                 </Modal.Content>
                              </Modal>
                           </VStack>
                        </>
                     )}
                  </Formik>
               </View>
            </View>
         </ScrollView>
      </>
   );
};

export default Home;
