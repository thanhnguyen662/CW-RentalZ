import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './Datepicker.style';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import PropTypes from 'prop-types';

const Datepicker = (props) => {
   const {
      setFieldValue,
      fieldName,
      value,
      isDisabled,
      onBlur,
      error,
      touched,
      minimumDate,
   } = props;
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

   const minimum = () => {
      if (minimumDate) {
         return {
            minimumDate: new Date(minimumDate),
         };
      } else {
         return;
      }
   };

   return (
      <View>
         <TouchableOpacity
            style={error && touched ? styles.buttonError : styles.button}
            onPress={() => setDatePickerVisibility(true)}
            disabled={isDisabled}
            onBlur={onBlur}
         >
            <Text style={styles.dateValue}>
               {value === ''
                  ? 'Choose a date'
                  : moment(value).format('MM-DD-YYYY')}
            </Text>
         </TouchableOpacity>
         <DateTimePickerModal
            {...minimum()}
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={(e) => {
               setFieldValue(fieldName, new Date(e));
               setDatePickerVisibility(false);
            }}
            onCancel={() => setDatePickerVisibility(false)}
         />
      </View>
   );
};

Datepicker.propTypes = {
   isDisabled: PropTypes.bool,
};

Datepicker.defaultProps = {
   isDisabled: false,
};

export default Datepicker;
