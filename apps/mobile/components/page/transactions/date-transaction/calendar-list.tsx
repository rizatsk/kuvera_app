import { Colors } from '@/constants/theme';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

const maxDate = moment().format('YYYY-MM-DD');
const initialDate = maxDate;

const initialRange = {
    start: null, end: null, marked: {
        [maxDate]: {
            marked: true
        }
    }
};

interface Props {
    setRangeDate: Dispatch<SetStateAction<{ start: string | null, end: string | null }>>
}

interface RangeState {
    start: string | null;
    end: string | null;
    marked: MarkedDates;
}

const CalendarListScreen = (props: Props) => {
    const [range, setRange] = useState<RangeState>(initialRange);

    // Warna yang digunakan untuk range
    const RANGE_COLOR = '#70d7c7';
    const START_END_COLOR = '#70d7c7';
    const handleDayPress = useCallback((day: DateData) => {
        const dateString = day.dateString;
        let newRange: RangeState = { start: range.start, end: range.end, marked: {} };

        if (!range.start || (range.start && range.end)) {
            newRange.start = dateString;
            newRange.end = null;
            newRange.marked = {
                [dateString]: { startingDay: true, color: START_END_COLOR, textColor: 'white' },
            };
        } else {
            // Kasus 2: Sudah ada start -> Tetapkan end
            const startMoment = moment(range.start);
            const endMoment = moment(dateString);

            if (endMoment.isBefore(startMoment)) {
                // Jika End sebelum Start -> Ganti Start
                newRange.start = dateString;
                newRange.end = null;
                newRange.marked = {
                    [dateString]: { startingDay: true, color: START_END_COLOR, textColor: 'white' },
                };
            } else {
                // Pilihan End yang Valid
                newRange.end = dateString;
                let date = startMoment.clone();

                // Loop untuk mengisi tanggal di antara start dan end
                while (date.isSameOrBefore(endMoment)) {
                    const currentDay = date.format('YYYY-MM-DD');

                    if (currentDay === newRange.start) {
                        newRange.marked[currentDay] = { startingDay: true, color: START_END_COLOR, textColor: 'white' };
                    } else if (currentDay === newRange.end) {
                        newRange.marked[currentDay] = { endingDay: true, color: START_END_COLOR, textColor: 'white' };
                    } else {
                        newRange.marked[currentDay] = { color: RANGE_COLOR, textColor: 'white' };
                    }
                    date.add(1, 'days');
                }
            }
        }

        props.setRangeDate({
            start: newRange.start,
            end: newRange.end
        });
        setRange(newRange);
    }, [range.start, range.end]);

    const markedDates = useMemo(() => {
        return range.marked;
    }, [range.marked]);

    return (
        <CalendarList
            markingType='period'
            calendarStyle={{ width: '100%' }}
            current={initialDate}
            pastScrollRange={24}
            futureScrollRange={0}
            onDayPress={handleDayPress}
            markedDates={markedDates}
            renderHeader={renderCustomHeader}
            calendarHeight={300}
            theme={theme}
            horizontal={false}
            pagingEnabled={false}
            staticHeader={false}
            maxDate={maxDate}
        />
    );
};

const theme = {
    textDayFontSize: 14,
    selectedDayBackgroundColor: Colors.tealKuvera,
    selectedDayTextColor: 'white',
    todayTextColor: Colors.tealKuvera,
    arrowColor: Colors.tealKuvera,
};

function renderCustomHeader(date: any) {
    const header = date.toString('MMMM yyyy');
    const [month, year] = header.split(' ');
    const textStyle: TextStyle = {
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.tealKuvera,
        paddingRight: 5
    };

    return (
        <View style={styles.header}>
            <Text style={[textStyle]}>{`${month}`}</Text>
            <Text style={[textStyle]}>{year}</Text>
        </View>
    );
}

export default CalendarListScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    },
});