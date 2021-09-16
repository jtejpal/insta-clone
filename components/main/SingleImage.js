import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const SingleImage = (props) => {
  console.log(`props`, props)
  const image = props.route.params.image
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <Image source={{uri: image}} resizeMode="contain" style={{flex: 1}} />
      </SafeAreaView>
    </View>
  )
}

export default SingleImage

const styles = StyleSheet.create({})
