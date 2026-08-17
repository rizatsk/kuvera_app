import CustomText from "@/components/custom-text";
import ModalKuvera from "@/components/modal-bottom";
import { Colors } from "@/constants/theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { modalStyles } from "../../../input/date-time-input/style";
import CalendarListScreen from "./calendar-list";
import { DateTrx } from "./type";

export interface DatePickerProps {
  onSelectDate: (params: DateTrx) => void;
  style?: ViewStyle;
  label: string;
  value: DateTrx;
  titleStyle?: TextStyle;
}

type setRange = {
  start: string | null
  end: string | null
}

const ModalDateTransactions: React.FunctionComponent<DatePickerProps> = (props) => {
  const [range, setRange] = useState<setRange>({ start: null, end: null })
  const { value, label, onSelectDate, style, titleStyle } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [textDate, setTextDate] = useState(value.keyString);

  useEffect(() => {
    switch (value.keyString) {
      case "30lastday":
        setTextDate("30 Days Ago");
        break;
      case "ThisMonth":
        setTextDate("This Month");
        break;
      case "1lastyear":
        setTextDate("1 Year Ago");
        break;
      default:
        setTextDate(value.keyString);
        break;
    }
  }, [value]);

  // For Modal
  const handleOnFocus = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (valueDate: DateTrx) => {
    onSelectDate(valueDate);
    onClose();
  };

  const onClose = () => {
    setIsModalVisible(false);
    setShowPicker(false);
  };
  // End For Modal

  const showAndroidPicker = () => {
    setShowPicker(true);
  };

  const handleSubmitRangeCalender = () => {
    if (range.start && range.end) {
      handleSubmit({
        start: range.start + " 00:00:00",
        end: range.end + " 23:59:59",
        keyString: `${moment(range.start).format('DD-MM-YYYY')} - ${moment(range.end).format('DD-MM-YYYY')}`
      })
    } else if (range.start) {
      handleSubmit({
        start: range.start + " 00:00:00",
        end: range.start + " 23:59:59",
        keyString: `${moment(range.start).format('DD-MM-YYYY')}`
      })
    } else {
      onClose();
    }
  }

  const renderPicker = () => {
    return (
      <>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleSubmitRangeCalender}
            style={{ borderWidth: 1, borderColor: Colors.tealKuvera, borderRadius: 4, paddingVertical: 2, paddingHorizontal: 12 }}>
            <CustomText style={{ color: Colors.tealKuvera, fontWeight: 500 }}>Selesai</CustomText>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10, marginBottom: 80 }}>
          <CalendarListScreen setRangeDate={setRange} />
        </View>
      </>
    )
  }


  const renderModalContent = () => {
    return (
      <>
        {showPicker ? renderPicker() : (
          <View style={styles.tabContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit({
                  start: moment().format('YYYY-MM') + '-01 00:00:00',
                  end: moment().format('YYYY-MM-DD') + ' 23:59:59',
                  keyString: 'ThisMonth'
                })
              }}
              style={[styles.tab]}
            >
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                This Month
              </CustomText>
              {value.keyString === 'ThisMonth' && (
                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit({
                  start: moment().subtract(30, 'days').format('YYYY-MM-DD') + " 00:00:00",
                  end: moment().format('YYYY-MM-DD') + " 23:59:59",
                  keyString: '30lastday'
                })
              }}
              style={[styles.tab]}
            >
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                30 Days Ago
              </CustomText>
              {value.keyString === '30lastday' && (
                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                handleSubmit({
                  start: moment().subtract(1, 'years').format('YYYY-MM-DD') + " 00:00:00",
                  end: moment().format('YYYY-MM-DD') + " 23:59:59",
                  keyString: '1lastyear'
                })
              }}
              style={[styles.tab]}
            >
              <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                1 Yaer Ago
              </CustomText>
              {value.keyString === '1lastyear' && (
                <Octicons name="check" size={24} color={Colors.tealDarkKuvera} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => showAndroidPicker()
              }
              style={[{ marginTop: 10, padding: 10 }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Entypo name="calendar" size={20} color={Colors.grey[700]} />
                  <CustomText style={{ fontSize: 15, fontWeight: 500 }}>
                    Select periode
                  </CustomText>
                </View>
                <FontAwesome6 name="angle-right" size={18} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    )
  };
  // End for date time picker

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[style, { flexDirection: "row", gap: 4, alignItems: "center" }]}
        onPress={handleOnFocus}
      >
        <CustomText style={titleStyle}>{textDate}</CustomText>
        <Octicons name="chevron-down" size={20} color="black" />
      </TouchableOpacity>
      <ModalKuvera
        title={label}
        isModalVisible={isModalVisible}
        setIsModalVisible={onClose}
      >
        <View style={modalStyles.container}>{renderModalContent()}</View>
      </ModalKuvera>
    </View>
  );
};

export default ModalDateTransactions;

const styles = StyleSheet.create({
  tabContainer: {},
  tab: {
    padding: 10,
    borderBottomColor: Colors.grey[100],
    borderBottomWidth: 1,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});

