/**
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

import Row from "./src/components/Row";
import Button from "./src/components/Button";


const App: () => Node = () => {
  const [count, setCount] = useState('0 ');
  const [dec, setDec] = useState('1');
  const [flip, setFlip] = useState(false);

  const handleNumber = (val) => {
    const integer = val.replace(/\s/g, '')
    const value = flipHandler(val)

    const trim = value.replace(/\s/g, '')
    const trimCount = count.replace(/\s/g, '')
    const lastIndexVal = trimCount[trimCount.length - 1]


    if ((trim == '+' || trim == '*' || trim == '-' || trim == '/') && (lastIndexVal == '+' || lastIndexVal == '*' || lastIndexVal == '-' || lastIndexVal == '/')) {
      setCount(count); setDec(dec)
    } else {
      if (trimCount == '0') {
        if (trim == '+' || trim == '*' || trim == '-' || trim == '/') {
          setCount(count); setDec(dec)
        } else {
          setCount(value); setDec(integer)
        }
      } else {
        if ((trimCount == 'I' && (trim == 'I' || trim == 'II' || trim == 'III' || trim == 'IV' || trim == 'V' || trim == 'VI' || trim == 'VII' || trim == 'VIII' || trim == 'IX'))) {

          setCount(value); setDec(integer)
        } else {

          setCount(count.concat(value)); setDec(dec.concat(integer))
        }
      }
    }
  }

  const equalHandler = () => {

    if (flip) {
      const stringList = eval(dec).toString()
      const mask = flipHandler(stringList)

      setDec(stringList)
      setCount((mask.toString()) + ' ')
    } else {
      setCount((eval(count.replace(/\s/g, '')).toString()) + ' ')
    }
  }

  const flipHandler = (val = '') => {
    if (flip) {
      return (toRoman(val).length != 0 ? toRoman(val) : val) + (' ')
    } else {
      return (toArabic(val) ? toArabic(val) : val) + (' ')
    }
  }

  const chartRoman = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  const toRoman = (val) => (
    chartRoman.reduce((acc, numeral) => {
      const [romVal, remainder] = acc;
      const [roman, value] = numeral;
      return [romVal + roman.repeat(remainder / value), remainder % value];
    }, ['', val])[0]
  )

  const chartArabic = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000
  }

  const toArabic = (val) => {
    const dec = val.slice(0, 2);
    if (!val) {
      return 0;
    } else {
      return dec in chartArabic ? chartArabic[dec] + toArabic(val.slice(2)) : chartArabic[val[0]] + toArabic(val.slice(1));
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.value}>
        {count}
      </Text>
      <Row>
        <Button
          text="C"
          theme="secondary"
          onPress={() => { setCount(flip ? 'I ' : '0 '); setDec('1') }}
        />
        <Button
          text={flip ? "Roman" : "Arabic"}
          theme="secondary"
          size="double"
          onPress={() => { setFlip(!flip); flipHandler(); setCount(!flip ? 'I ' : '0 '); }}
        />
        <Button
          text="/"
          theme="accent"
          onPress={() => handleNumber('/')}
        />
      </Row>

      <Row>
        <Button text={flip ? "VII" : "7"} onPress={() => handleNumber('7')} />
        <Button text={flip ? "VIII" : "8"} onPress={() => handleNumber('8')} />
        <Button text={flip ? "IX" : "9"} onPress={() => handleNumber('9')} />
        <Button
          text="*"
          theme="accent"
          onPress={() => handleNumber('*')}
        />
      </Row>

      <Row>
        <Button text={flip ? "IV" : "4"} onPress={() => handleNumber('4')} />
        <Button text={flip ? "V" : "5"} onPress={() => handleNumber('5')} />
        <Button text={flip ? "VI" : "6"} onPress={() => handleNumber('6')} />
        <Button
          text="-"
          theme="accent"
          onPress={() => handleNumber('-')}
        />
      </Row>

      <Row>
        <Button text={flip ? "I" : "1"} onPress={() => handleNumber('1')} />
        <Button text={flip ? "II" : "2"} onPress={() => handleNumber('2')} />
        <Button text={flip ? "III" : "3"} onPress={() => handleNumber('3')} />
        <Button
          text="+"
          theme="accent"
          onPress={() => handleNumber('+')}
        />
      </Row>

      <Row>

        {flip ? null : <Button
          text="0"
          size="double"
          onPress={() => handleNumber('0')}
        />}

        <Button
          text="="
          theme="accent"
          onPress={() => equalHandler()}
        />
      </Row>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end"
  },
  value: {
    color: "#fff",
    fontSize: 40,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10
  }
});

export default App;
