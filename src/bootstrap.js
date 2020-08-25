import * as Font from 'expo-font'
import { DB } from './db'

export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-roboto': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
      'Playfair': require('../assets/fonts/OleoScript-Regular.ttf'),
      'Pacifico': require('../assets/fonts/Pacifico-Regular.ttf'),
      'Cinzel': require('../assets/fonts/Roboto-Medium.ttf'),
    })
    await DB.init()
    console.log('Database started...')
  } catch (e) {
    console.log('Error: ', e)
  }
}
