import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'

const Landing = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Button title="Sign Up" onPress={()=>navigation.navigate("SignUp")}/>
      <Button title="Login" onPress={()=>navigation.navigate("Login")}/>
    </SafeAreaView>
  )
}

export default Landing

const styles = StyleSheet.create({})
