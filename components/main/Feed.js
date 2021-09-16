import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/posts';
import { getUserThunk } from '../../store/user';

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserThunk());
    dispatch(getPostsThunk())
  }, []);

  return (
    <SafeAreaView>
      {user?.userName && (
        <>
          <Text>{user.userName}</Text>
          <Text>{user.email}</Text>
        </>
      )}
    </SafeAreaView>
  )
}

export default Feed

const styles = StyleSheet.create({})
