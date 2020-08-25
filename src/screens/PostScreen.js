import React, { useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { toogleBooked, removePost } from '../store/actions/post'

export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')

  const post = useSelector(state =>
    state.post.allPosts.find(p => p.id === postId)
  )

  const booked = useSelector(state =>
    state.post.bookedPosts.some(post => post.id === postId)
  )

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const toggleHandler = useCallback(() => {
    dispatch(toogleBooked(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы точно хотите удалить пост?',
      [
        {
          text: 'Отменить',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress() {
            navigation.navigate('Main')
            dispatch(removePost(postId))
          }
        }
      ],
      { cancelable: false }
    )
  }

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <View style={styles.pwd}>
      <Button 
        title='Удалить'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
       </View>
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date')
  const booked = navigation.getParam('booked')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconName = booked ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: 'Фото от ' + new Date(date).toLocaleDateString(),

    headerTitleStyle: {
      fontFamily: "Cinzel",
      fontWeight: "100"
    },

    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Take photo' iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    //marginTop: 15,
    width: '100%',
    height: 440
  },
  textWrap: {
    padding: 13
  },
  title: {
    fontFamily: 'open-roboto',
    fontSize: 17
  },
  pwd: {
    padding: 10
  }
})
